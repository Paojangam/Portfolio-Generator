import React, { useState } from "react";
import "./MultiSectionForm.css";

export default function MultiSectionForm({ onCreate }) {
  const [hero, setHero] = useState({ name: "", title: "", tagline: "", image: "" });
  const [about, setAbout] = useState({ bio: "", email: "", phone: "", location: "", socials: "" });
  const [skills, setSkills] = useState("");
  const [services, setServices] = useState([
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ]);
  const [projects, setProjects] = useState([
    { title: "", image: "", description: "" },
    { title: "", image: "", description: "" },
    { title: "", image: "", description: "" },
  ]);
  const [testimonials, setTestimonials] = useState([""]);
  const [blog, setBlog] = useState({ title: "", summary: "" });
  const [contact, setContact] = useState({ message: "", email: "", phone: "" });

  function updateService(idx, field, value) {
    const copy = [...services];
    copy[idx] = { ...copy[idx], [field]: value };
    setServices(copy);
  }
  function updateProject(idx, field, value) {
    const copy = [...projects];
    copy[idx] = { ...copy[idx], [field]: value };
    setProjects(copy);
  }

  function handleSubmit(e) {
    e.preventDefault(); // yes, prevent page reload
    const payload = {
      hero,
      about,
      skills: skills.split(",").map(s => s.trim()).filter(Boolean),
      services,
      projects,
      testimonials: testimonials.filter(Boolean),
      blog,
      contact,
    };
    onCreate(payload);
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Hero Section</h3>
      <div className="row">
        <input value={hero.name} onChange={e => setHero({...hero, name: e.target.value})} placeholder="Name" required />
        <input value={hero.title} onChange={e => setHero({...hero, title: e.target.value})} placeholder="Title (e.g. Software Engineer)" required />
      </div>
      <input value={hero.tagline} onChange={e => setHero({...hero, tagline: e.target.value})} placeholder="Tagline" />
      <input value={hero.image} onChange={e => setHero({...hero, image: e.target.value})} placeholder="Profile image URL (optional)" />

      <h3>About Me</h3>
      <textarea value={about.bio} onChange={e => setAbout({...about, bio: e.target.value})} placeholder="Short bio" />
      <div className="row">
        <input value={about.email} onChange={e => setAbout({...about, email: e.target.value})} placeholder="Email" />
        <input value={about.phone} onChange={e => setAbout({...about, phone: e.target.value})} placeholder="Phone" />
      </div>
      <div className="row">
        <input value={about.location} onChange={e => setAbout({...about, location: e.target.value})} placeholder="Location" />
        <input value={about.socials} onChange={e => setAbout({...about, socials: e.target.value})} placeholder="Socials (comma separated handles)" />
      </div>

      <h3>Skills (comma separated)</h3>
      <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, Node, C++..." />

      <h3>Services (3)</h3>
      {services.map((s, i) => (
        <div key={i} className="service-row">
          <input value={s.title} onChange={e => updateService(i, "title", e.target.value)} placeholder={`Service ${i+1} title`} />
          <input value={s.description} onChange={e => updateService(i, "description", e.target.value)} placeholder={`Service ${i+1} desc`} />
        </div>
      ))}

      <h3>Projects (3)</h3>
      {projects.map((p, i) => (
        <div key={i} className="project-row">
          <input value={p.title} onChange={e => updateProject(i, "title", e.target.value)} placeholder={`Project ${i+1} title`} />
          <input value={p.image} onChange={e => updateProject(i, "image", e.target.value)} placeholder={`Project ${i+1} image URL`} />
          <input value={p.description} onChange={e => updateProject(i, "description", e.target.value)} placeholder={`Project ${i+1} description`} />
        </div>
      ))}

      <h3>Testimonials (1-3)</h3>
      {testimonials.map((t, i) => (
        <input key={i} value={t} onChange={e => {
          const copy = [...testimonials];
          copy[i] = e.target.value;
          setTestimonials(copy);
        }} placeholder={`Testimonial ${i+1}`} />
      ))}

      <h3>Blog (optional)</h3>
      <input value={blog.title} onChange={e => setBlog({...blog, title: e.target.value})} placeholder="Blog title" />
      <textarea value={blog.summary} onChange={e => setBlog({...blog, summary: e.target.value})} placeholder="Blog summary (optional)" />

      <h3>Contact</h3>
      <textarea value={contact.message} onChange={e => setContact({...contact, message: e.target.value})} placeholder="Default contact message" />
      <div className="row">
        <input value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} placeholder="Contact email" />
        <input value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} placeholder="Contact phone" />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">Create Portfolio</button>
      </div>
    </form>
  );
}
