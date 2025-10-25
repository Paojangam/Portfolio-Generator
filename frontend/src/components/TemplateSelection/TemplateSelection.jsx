import React from "react";
import "./TemplateSelection.css";

export default function TemplateSelection({ selected, onChange }) {
  return (
    <div className="template-selection">
      <div className="templates-row">
        <div className={`template-card ${selected === "template1" ? "sel" : ""}`} onClick={() => onChange("template1")}>
          <div className="template-thumb t1">Template 1</div>
          <div className="template-desc">Yellow hero, card layout, simple timeline.</div>
        </div>
        <div className={`template-card ${selected === "template2" ? "sel" : ""}`} onClick={() => onChange("template2")}>
          <div className="template-thumb t2">Template 2</div>
          <div className="template-desc">Split-screen, darker header, portfolio grid.</div>
        </div>
      </div>
    </div>
  );
}
