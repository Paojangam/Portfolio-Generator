import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">PortfolioGen</Link>
        <div className="nav-actions">
          <Link to="/" className="nav-link">Create</Link>
          <a className="nav-link" href="#docs">Docs</a>
        </div>
      </div>
    </nav>
  );
}
