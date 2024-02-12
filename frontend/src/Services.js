import React, { useEffect } from "react";
import fileFormat from "./images/fileformat.png";
import resume from "./images/resume.png";
import summary from "./images/summary.png";
import ranking from "./images/ranking.png";
import Aos from "aos";
import "aos/dist/aos.css";

const Services = () => {
  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);
  return (
    <>
      <div className="services" id="gotolearn">
        <h1 data-aos="fade-left">
          What Are <span className="gradient-text">Our</span> Features?
        </h1>
        <div className="services_container">
          <div className="services_container_des" data-aos="fade-right">
            <img src={fileFormat} alt="Pic1" />
            <p>ACCEPTS MULTIPLE FILE FORMATES</p>
          </div>
          <div
            className="services_container_des"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <img src={resume} alt="Pic2" />
            <p>EXTRACTS RESUME DATA</p>
          </div>
          <div
            className="services_container_des"
            data-aos="fade-right"
            data-aos-delay="500"
          >
            <img src={summary} alt="Pic3" />
            <p>PROVIDE BRIEF SUMMARY OF RESUME</p>
          </div>
          <div
            className="services_container_des"
            data-aos="fade-right"
            data-aos-delay="700"
          >
            <img src={ranking} alt="Pic4" />
            <p>RANKS RESUME BASED ON MATCHING</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
