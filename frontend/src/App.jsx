import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TemplateSelection from "./components/TemplateSelection/TemplateSelection";
import MultiSectionForm from "./components/MultiSectionForm/MultiSectionForm";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import PortfolioPage from "./components/PortfolioPage/PortfolioPage";
import Navbar from "./components/Navbar/Navbar";
import API from "./api";
import "./app.css";

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const navigate = useNavigate();

  async function fetchProfiles() {
    try {
      const data = await API.getProfiles();
      setProfiles(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function handleCreate(profileData) {
    // attach selected template
    const payload = { ...profileData, template: selectedTemplate };
    try {
      const created = await API.createProfile(payload);
      await fetchProfiles();
      navigate(`/portfolio/${created.id}`);
    } catch (e) {
      console.error(e);
      alert("Failed to save profile");
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="page-title">Choose template and create your portfolio</h1>
                <TemplateSelection selected={selectedTemplate} onChange={setSelectedTemplate} />
                <MultiSectionForm onCreate={handleCreate} />
                <h2 className="list-title">Professionals</h2>
                <div className="cards-grid">
                  {profiles.map((p) => (
                    <ProfileCard key={p.id} profile={p} />
                  ))}
                </div>
              </>
            }
          />
          <Route path="/portfolio/:id" element={<PortfolioPage />} />
        </Routes>
      </div>
    </>
  );
}
