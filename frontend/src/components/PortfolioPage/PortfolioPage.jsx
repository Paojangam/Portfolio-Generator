import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import "./PortfolioPage.css";

export default function PortfolioPage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getProfile(id).then(p => {
      setProfile(p);
      setLoading(false);
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!profile) return <div className="loading">Profile not found</div>;

  const { hero = {}, about = {}, skills = [], services = [], projects = [], testimonials = [], blog = {}, contact = {} } = profile;

  // render differently based on template
  if (profile.template === "template2") {
    return (
      <div className="portfolio template2">
        <header className="hero split">
          <div className="left">
            <h1>{hero.name}</h1>
            <h2>{hero.title}</h2>
            <p className="tagline">{hero.tagline}</p>
            <p className="contactline">{about.email} · {about.phone}</p>
          </div>
          <div className="right">
            <img src={hero.image || "https://via.placeholder.com/320x220"} alt={hero.name} />
          </div>
        </header>

        <section className="about">
          <h3>About</h3>
          <p>{about.bio}</p>
        </section>

        <section className="skills">
          <h3>Skills</h3>
          <div className="skill-list">{skills.map((s,i) => <span key={i} className="s">{s}</span>)}</div>
        </section>

        <section className="services">
          <h3>Services</h3>
          <div className="services-grid">
            {services.map((s,i) => <div key={i} className="service-card"><h4>{s.title}</h4><p>{s.description}</p></div>)}
          </div>
        </section>

        <section className="projects">
          <h3>Portfolio</h3>
          <div className="projects-grid">
            {projects.map((p,i) => <div key={i} className="proj"><img src={p.image || "https://via.placeholder.com/260"} alt={p.title} /><h4>{p.title}</h4><p>{p.description}</p></div>)}
          </div>
        </section>

        {testimonials.length>0 && <section className="testimonials">
          <h3>Testimonials</h3>
          {testimonials.map((t,i) => <blockquote key={i}>{t}</blockquote>)}
        </section>}

        {blog.title && <section className="blog"><h3>{blog.title}</h3><p>{blog.summary}</p></section>}

        <section className="contact">
          <h3>Contact</h3>
          <p>{contact.message}</p>
          <p>Email: {contact.email} · Phone: {contact.phone}</p>
        </section>
      </div>
    );
  }

  // default: template1 (hero-focused yellow)
  return (
    <div className="portfolio template1">
      <header className="hero hero-1">
        <div className="hero-inner">
          <div className="hero-left">
            <img className="avatar-large" src={hero.image || "https://via.placeholder.com/160"} alt={hero.name}/>
            <h1>{hero.name}</h1>
            <h2>{hero.title}</h2>
            <p className="tagline">{hero.tagline}</p>
          </div>
          <div className="hero-right">
            <p className="contactline">{about.email} · {about.phone} · {about.location}</p>
          </div>
        </div>
      </header>

      <section className="about">
        <h3>About</h3>
        <p>{about.bio}</p>
      </section>

      <section className="skills">
        <h3>Skills</h3>
        <div className="skill-list">{skills.map((s,i) => <span key={i} className="s">{s}</span>)}</div>
      </section>

      <section className="services">
        <h3>Services</h3>
        <div className="services-grid">
          {services.map((s,i) => <div key={i} className="service-card"><h4>{s.title}</h4><p>{s.description}</p></div>)}
        </div>
      </section>

      <section className="projects">
        <h3>Portfolio</h3>
        <div className="projects-grid">
          {projects.map((p,i) => <div key={i} className="proj"><img src={p.image || "https://via.placeholder.com/260"} alt={p.title} /><h4>{p.title}</h4><p>{p.description}</p></div>)}
        </div>
      </section>

      {testimonials.length>0 && <section className="testimonials">
        <h3>Testimonials</h3>
        {testimonials.map((t,i) => <blockquote key={i}>{t}</blockquote>)}
      </section>}

      {blog.title && <section className="blog"><h3>{blog.title}</h3><p>{blog.summary}</p></section>}

      <section className="contact">
        <h3>Contact</h3>
        <p>{contact.message}</p>
        <p>Email: {contact.email} · Phone: {contact.phone}</p>
      </section>

      <footer className="footer">Generated with PortfolioGen</footer>
    </div>
  );
}
