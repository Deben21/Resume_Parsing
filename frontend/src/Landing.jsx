import React, { useEffect } from "react";
import landing from "./images/landing.png";
import Aos from "aos";
import "aos/dist/aos.css";

const Landing = () => {
  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);
  return (
    <>
      <div className="landing">
        <div className="landing_des">
          <div className="landing_des_content" data-aos="fade-right">
            <h1>
              Resume parsing <br />
              <span className="gradient-text">simplified </span>using{" "}
              <span className="gradient-text">AI</span>
            </h1>
            <p>
              See how well your resume is read by Application Tracking Systems{" "}
              <br /> (ATS) when applying to jobs.
            </p>
            <div className="btn">
              <a href="#gotolearn">Learn More</a>
            </div>
          </div>
        </div>
        <div className="landing_des">
          <div className="landing_img" data-aos="fade-left">
            <img src={landing} alt="landing" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
