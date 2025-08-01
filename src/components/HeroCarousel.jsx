import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import "./main.css";

const slides = [
  {
    id: 1,
    title: "Evening Rides at Hyderabad Road",
    subtitle: "Hyderabad’s Most Romantic Route",
    description:
      "Take your special one for a smooth sunset drive around Necklace Road, Tank Bund, or Jubilee Hills.",
    image: "https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg",
    cta: "Find Date Night Cars",
    ctaLink: "/cars",
    features: ["LED Headlights", "Luxury Interiors", "Sunroof Options"],
  },
  {
    id: 2,
    title: "Trips from Hyderabad to Srisailam",
    subtitle: "Perfect for Long Weekend Getaways",
    description:
      "Plan long drives from Hyderabad to scenic destinations like Srisailam, Nagarjuna Sagar, or Ananthagiri Hills.",
    image:
      "https://plus.unsplash.com/premium_photo-1749756289802-f4d113c0b8ef?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Book Long Trip Cars",
    ctaLink: "/cars",
    features: ["Spacious SUVs", "Great Mileage", "Smooth Highway Performance"],
  },
  {
    id: 3,
    title: "Stylish Rides from Boduppal",
    subtitle: "Perfect for City to Suburb Drives",
    description:
      "Choose stylish hatchbacks or sedans for daily drives across Boduppal, Uppal, and Keesara.",
    image: "https://images.pexels.com/photos/326259/pexels-photo-326259.jpeg",
    cta: "Browse Hatchbacks",
    ctaLink: "/cars",
    features: ["Sleek Design", "Bluetooth Audio", "Affordable Rentals"],
  },
  {
    id: 4,
    title: "City Drives in Dilsukhnagar",
    subtitle: "Navigate with Comfort",
    description:
      "Drive through Dilsukhnagar’s busy lanes in compact, efficient cars made for Hyderabad traffic.",
    image: "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg",
    cta: "View City Cars",
    ctaLink: "/cars",
    features: ["Easy City Parking", "Fuel Efficient", "AC Comfort"],
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 22000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 50
    ) {
      if (touchStartX.current > touchEndX.current) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="hero-carousel bg-dark overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
        >
          <img src={slide.image} alt={slide.title} className="bg" />

          <div className="hero-content-wrapper">
            <div className="hero-content">
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
    </section>
  );
}
