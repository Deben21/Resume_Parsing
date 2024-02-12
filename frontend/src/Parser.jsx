import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Parser = () => {
  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);
  return (
    <div className="parser">
      <div className="parsing_container">
        <h1 data-aos="fade-right">
          Start Using Our <span className="gradient-text">Service</span>
        </h1>
        <div className="parsing_container_content" data-aos="fade-left">
          <h1>Resume Parser</h1>
          <form>
            <label>Upload Resume:</label>
            <input type="file" id="resume" accept=".pdf,.doc,.docx" />
            <button type="submit">Parse Resume</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Parser;
