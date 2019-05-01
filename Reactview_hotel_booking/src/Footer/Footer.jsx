import "./Footer.css";
import React from "react";

function template() {
  return (
    <div className="footer">
    &copy;{new Date().getFullYear()} rights belongs me
    </div>
  );
};

export default template;
