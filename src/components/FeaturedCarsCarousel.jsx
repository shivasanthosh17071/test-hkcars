"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Fuel,
  Users,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "../api/axiosConfig";
import { useAuth } from "../AuthContext";

const FeaturedCarsCarousel = () => {
  const { token } = useAuth();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Adjust visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 576) setVisibleCount(1);
      else if (window.innerWidth < 768) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
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
      <h3 className="mb-4 fw-semibold text-center">Featured Cars</h3>

      <div className="overflow-hidden px-2">
        <div
          className="d-flex transition-transform"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            width: `${(featuredCars.length * 100) / visibleCount}%`,
            transition: "transform 0.5s ease",
          }}
        >
          {featuredCars.map((car) => (
            <div
              key={car._id}
              className="flex-shrink-0 px-2"
              style={{
                width: `${100 / featuredCars.length}%`,
                maxWidth: "100%",
              }}
            >
              <div className="card h-100 shadow-sm border-0 rounded- overflow-hidden">
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
                  <span className="badge bg-warning position-absolute top-0 start-0 m-2 shadow-sm px-3 py-1 rounded-pill">
                    Featured
                  </span>
                  <span
                    className={`badge position-absolute top-0 end-0 m-2 shadow-sm px-3 py-1 rounded-pill ${
                      car.available ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {car.available ? "Available" : "Booked"}
                  </span>
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-2 text-white"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    }}
                  >
                    <h6 className="mb-0 text-light">{car.name}</h6>
                    <small className="text-light">
                      {car.brand} • {car.type}
                    </small>
                  </div>
                </div>

                <div className="card-body px-3 py-2">
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
                      <div className="small text-muted">{car.transmission}</div>
                    </div>
                  </div>

                  {car.rating > 0 && (
                    <div className="d-flex align-items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`me-1 ${
                            i < Math.floor(car.rating)
                              ? "text-warning"
                              : "text-secondary opacity-50"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <small className="text-muted ms-1">({car.rating})</small>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong className="text-primary h6">₹{car.price}</strong>
                      <small className="text-muted"> /day</small>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <Link to={`/cars/${car._id}`} className="btn btn-outline-primary btn-sm">
                      View Details
                    </Link>
                    {car.available && (
                      <Link to={`/book/${car._id}`} className="btn btn-primary btn-sm">
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

      {featuredCars.length > visibleCount && (
        <>
         <button
            onClick={prevSlide}
            className="carousel-nav-btn position-absolute top-50 start-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="arrow-icon" size={24} />
          </button>

           <button
            onClick={nextSlide}
            className="carousel-nav-btn position-absolute top-50 end-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="arrow-icon" size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default FeaturedCarsCarousel;
