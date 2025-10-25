import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

export default function ProfileCard({ profile }) {
  const nav = useNavigate();
  const h = profile.hero || {};
  const about = profile.about || {};
  const skills = profile.skills || [];

  function open() {
    nav(`/portfolio/${profile.id}`);
  }

  return (
    <div className="profile-card">
      <div className="card-top">
        <img className="avatar" src={h.image || "https://via.placeholder.com/100"} alt={h.name} />
        <div className="meta">
          <div className="name">{h.name || "No name"}</div>
          <div className="title">{h.title}</div>
          <div className="location">{about.location}</div>
        </div>
      </div>
      <div className="bio">{about.bio ? (about.bio.length>120 ? about.bio.slice(0,120)+"..." : about.bio) : "No bio provided"}</div>
      <div className="skills">
        {skills.slice(0,5).map((s, i) => <span key={i} className="skill">{s}</span>)}
      </div>
      <div className="card-actions">
        <button className="btn-view" onClick={open}>View Portfolio</button>
      </div>
    </div>
  );
}
