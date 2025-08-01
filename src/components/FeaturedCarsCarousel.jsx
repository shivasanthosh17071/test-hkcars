"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Fuel,
  Users,
  Settings,
  Car,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../api/axiosConfig";
import { useAuth } from "../AuthContext";

const FeaturedCarsCarousel = () => {
  const { token } = useAuth();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateView = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 576) setVisibleCount(1);
      else if (width < 768) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const res = await axios.get("/cars/featured/cars", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeaturedCars(res.data);
      } catch (err) {
        console.error("Failed to fetch featured cars:", err);
      }
    };

    fetchFeaturedCars();
  }, [token]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % Math.max(1, featuredCars.length - (visibleCount - 1))
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + Math.max(1, featuredCars.length - (visibleCount - 1))) %
      Math.max(1, featuredCars.length - (visibleCount - 1))
    );
  };

  if (featuredCars.length === 0) return null;

  return (
    <div className="position-relative px-2 py-4">
      <h3 className="mb-4 fw-bold text-center text-dark display-6">
        Featured Cars <Car size={35}/>
      </h3>

      <div className="px-2">
        <div
          className={`d-flex flex-nowrap ${isMobile ? "hide-scrollbar" : ""}`}
          style={{
            overflowX: isMobile ? "auto" : "hidden",
            transform: !isMobile
              ? `translateX(-${currentIndex * (100 / visibleCount)}%)`
              : "none",
            transition: !isMobile ? "transform 0.5s ease-in-out" : "none",
            width: !isMobile
              ? `${(featuredCars.length * 75) / visibleCount}%`
              : "auto",
          }}
        >
          {featuredCars.map((car) => (
            <div
              key={car._id}
              className="flex-shrink-0 px-3"
              style={{
                width: isMobile
                  ? "80%"
                  : `${100 / featuredCars.length}%`,
                maxWidth: "100%",
              }}
            >
              <div
                className="h-100 border-0 card rounded-4 overflow-hidden"
                style={{
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <div className="position-relative">
                  <img
                    src={car.images[0] || "/placeholder.svg"}
                    className="card-img-top"
                    alt={car.name}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="badge bg-warning position-absolute top-0 start-0 m-2 shadow px-3 py-1 rounded-pill text-dark fw-semibold">
                    ⭐ Featured
                  </span>
                  <span
                    className={`badge position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill shadow fw-semibold ${
                      car.available ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {car.available ? "Available" : "Booked"}
                  </span>
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-3 text-white"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    }}
                  >
                    <h6 className="mb-0 fw-semibold">{car.name}</h6>
                    <small className="text-light">
                      {car.brand} • {car.type}
                    </small>
                  </div>
                </div>

                <div className="card-body px-3 py-3">
                  <div className="row text-center mb-3">
                    <div className="col">
                      <Fuel size={18} className="text-primary mb-1" />
                      <div className="small text-muted">{car.fuel}</div>
                    </div>
                    <div className="col">
                      <Users size={18} className="text-primary mb-1" />
                      <div className="small text-muted">{car.seats} Seats</div>
                    </div>
                    <div className="col">
                      <Settings size={18} className="text-primary mb-1" />
                      <div className="small text-muted">
                        {car.transmission}
                      </div>
                    </div>
                  </div>

                  {car.rating > 0 && (
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`me-1 ${
                            i < Math.floor(car.rating)
                              ? "text-warning"
                              : "text-secondary opacity-25"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <small className="text-muted ms-2">
                        ({car.rating})
                      </small>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <strong className="text-primary fs-5">
                      ₹{car.price}
                    </strong>
                    <span className="text-muted small">per day</span>
                  </div>

                  <div className="d-grid gap-2">
                    <Link
                      to={`/cars/${car._id}`}
                      className="btn btn-outline-primary btn-sm rounded-pill"
                    >
                      View Details
                    </Link>
                    {car.available && (
                      <Link
                        to={`/book/${car._id}`}
                        className="btn btn-primary btn-sm rounded-pill"
                      >
                        Book Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chevron buttons only for desktop */}
      {featuredCars.length > visibleCount && !isMobile && (
        <>
          <button
            onClick={prevSlide}
            className="carousel-nav-btn position-absolute top-50 start-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center bg-light rounded-circle shadow"
            style={{ width: 40, height: 40 }}
            aria-label="Previous"
          >
            <ChevronLeft className="text-dark" size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="carousel-nav-btn position-absolute top-50 end-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center bg-light rounded-circle shadow"
            style={{ width: 40, height: 40 }}
            aria-label="Next"
          >
            <ChevronRight className="text-dark" size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default FeaturedCarsCarousel;
