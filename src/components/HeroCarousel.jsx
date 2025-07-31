import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./main.css";

const slides = [
  {
    id: 1,
    title: "Explore Premium Cars",
    subtitle: "Drive with Style and Comfort",
    description:
      "Discover a range of luxury and performance vehicles designed for an unforgettable driving experience.",
    image: "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg",
    cta: "Browse Cars",
    ctaLink: "/cars",
    features: ["Luxury Interiors", "Top Performance", "Advanced Safety"],
  },
  {
    id: 2,
    title: "SUVs for Every Terrain",
    subtitle: "Power Meets Versatility",
    description:
      "Whether it's city streets or rugged trails, our SUV lineup is built to handle every journey.",
    image: "https://images.pexels.com/photos/593172/pexels-photo-593172.jpeg",
    cta: "Explore SUVs",
    ctaLink: "/cars",
    features: ["All-Wheel Drive", "Spacious Interiors", "Modern Tech"],
  },
  {
    id: 3,
    title: "Unleash Performance",
    subtitle: "Sports Cars Collection",
    description:
      "Experience the thrill of high-speed driving with our exclusive lineup of sports cars.",
    image: "https://images.pexels.com/photos/326259/pexels-photo-326259.jpeg",
    cta: "View Sports Cars",
    ctaLink: "/cars",
    features: ["High Horsepower", "Aerodynamic Design", "Precision Handling"],
  },
];


export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 50000); // Reduced for better UX
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
        >
          <img src={slide.image} alt={slide.title} className="bg" />

          <div className="hero-content-wrapper">
            <div className="hero-content">
              {/* <h5 className="text-secondary">{slide.subtitle}</h5> */}
              
              <h1 className="text-white">{slide.title}</h1>
              <p>{slide.description}</p>

              <ul className="hero-feature-list">
                {slide.features.map((feature, i) => (
                  <li key={i} className="hero-feature-item">
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="hero-buttons">
                <Link to={slide.ctaLink} className="hero-btn-primary">
                  {slide.cta} <ArrowRight size={18} />
                </Link>
                <button className="hero-btn-secondary">
                  <Play size={18} /> Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="hero-nav-arrow left" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="hero-nav-arrow right" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
