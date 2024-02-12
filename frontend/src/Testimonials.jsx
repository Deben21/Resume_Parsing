import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import "aos/dist/aos.css";
import bhuwan from "./images/bhuwan.JPG";
import debendra from "./images/debendra.JPG";
import ganesh from "./images/ganesh.JPG";
import saroj from "./images/saroj.JPG";

const testimonialsData = [
  {
    id: 1,
    author: "Bhuwan Thapa",
    text: "Your resume, our code - a perfect match.",
    image: bhuwan,
  },
  {
    id: 2,
    author: "Debendra Pun",
    text: "In the world of resumes, let our code be your guiding light.",
    image: debendra,
  },
  {
    id: 3,
    author: "Ganesh Gautam",
    text: "Unleash the power of code to decode resumes effortlessly.",
    image: ganesh,
  },
  {
    id: 4,
    author: "Saroj Paudel",
    text: "Elevating HR tech with intelligent resume parsing solutions.",
    image: saroj,
  },
];

const Testimoni = ({ author, text, image }) => (
  <div className="testimonial_container_content">
    <img className="testimonial_image" src={image} alt={`${author}'s avatar`} />
    <p className="testimonial_text">{text}</p>
    <p className="testimonial_author">- {author}</p>
  </div>
);

const Testimonials = () => {
  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="testimonial">
        <div className="testimonial_box" data-aos="fade-up">
          <h1>
            <span className="gradient-text">Hear</span> From Our
            <span className="gradient-text"> Team</span>
          </h1>
          <div className="testimonial_container">
            <Slider {...sliderSettings}>
              {testimonialsData.map((testimonial) => (
                <Testimoni key={testimonial.id} {...testimonial} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
