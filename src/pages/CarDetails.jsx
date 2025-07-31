"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Fuel,
  Users,
  Settings,
  Star,
  Calendar,
  MessageCircle,
  Shield,
  CheckCircle,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "../api/axiosConfig";

const CarDetails = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in booking the ${car.name}. Can you provide more details about availability and pricing?`;
    const phoneNumber = "919603879248";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  if (loading || !car) {
    return <LoadingSpinner text="Loading car details..." />;
  }

  return (
    <div className="container py-4 fade-in">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/cars" className="btn btn-outline-secondary">
          <ArrowLeft size={16} className="me-2" />
          Back to Cars
        </Link>
      </div>

      <div className="row">
        {/* Image Gallery */}
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="position-relative">
              <img
                src={car.images?.[currentImageIndex] || "/placeholder.svg"}
                alt={`${car.name} - Image ${currentImageIndex + 1}`}
                className="card-img-top"
                style={{ height: "400px", objectFit: "cover" }}
              />
              {car.featured && (
                <span className="badge bg-warning position-absolute top-0 start-0 m-3">
                  Featured
                </span>
              )}
              <span
                className={`badge position-absolute top-0 end-0 m-3 ${
                  car.available ? "bg-success" : "bg-danger"
                }`}
              >
                {car.available ? "Available" : "Not Available"}
              </span>
            </div>

            <div className="card-body">
              <div className="row g-2">
                <div className="row g-0">
                  {car.images?.map((image, index) => (
                    <div key={index} className="col-4">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${car.name} - Thumbnail ${index + 1}`}
                        className={`img-fluid rounded cursor-pointer ${
                          currentImageIndex === index
                            ? "border border-primary border-3"
                            : ""
                        }`}
                        style={{
                          height: "80px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Car Details */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">{car.name}</h2>
              <p className="text-muted mb-3">
                {car.brand} • {car.type}
              </p>

              {car.rating > 0 && (
                <div className="d-flex align-items-center mb-3">
                  <Star
                    size={20}
                    className="text-warning me-2"
                    fill="currentColor"
                  />
                  <span className="h6 mb-0">{car.rating}/5</span>
                  <span className="text-muted ms-2">
                    (Based on customer reviews)
                  </span>
                </div>
              )}

              <div className="mb-4">
                <div className="h4 text-primary mb-0">₹{car.price}</div>
                <small className="text-muted">per day</small>
              </div>

              {/* Specs */}
              <div className="row text-center mb-4">
                <div className="col-4">
                  <div className="border rounded p-3">
                    <Fuel size={24} className="text-primary mb-2" />
                    <div className="small fw-bold">{car.fuel}</div>
                    <div className="small text-muted">Fuel Type</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border rounded p-3">
                    <Users size={24} className="text-primary mb-2" />
                    <div className="small fw-bold">{car.seats}</div>
                    <div className="small text-muted">Seats</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border rounded p-3">
                    <Settings size={24} className="text-primary mb-2" />
                    <div className="small fw-bold">{car.transmission}</div>
                    <div className="small text-muted">Transmission</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="d-grid gap-2 mb-4">
                {car.available ? (
                  <Link
                    to={`/book/${car._id}`}
                    className="btn btn-primary btn-lg"
                  >
                    <Calendar size={20} className="me-2" />
                    Book Now
                  </Link>
                ) : (
                  <button className="btn btn-secondary btn-lg" disabled>
                    Currently Unavailable
                  </button>
                )}

                <button
                  className="btn btn-success btn-lg"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle size={20} className="me-2" />
                  WhatsApp Inquiry
                </button>
              </div>

              <div className="alert alert-info d-flex align-items-center">
                <Shield size={20} className="me-2" />
                <small>
                  <strong>Safety First:</strong> All vehicles are sanitized and
                  insured
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Features */}
      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Description</h5>
              <p className="card-text">{car.description}</p>

              <h6 className="mt-4 mb-3">Features & Amenities</h6>
              <div className="row">
                {car.features?.map((feature, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <div className="d-flex align-items-center">
                      <CheckCircle size={16} className="text-success me-2" />
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rental Terms */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Rental Terms</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Minimum age: 21 years
                </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Valid driving license mandatory: 4 wheeler and above valid DL
                </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Documents required: Original Aadhaar, Driving License (2
                  wheeler with Original RC) OR Passport with ₹30,000 cash and
                  original DL
                </li>

                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Limited Kilometers
                </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  International tourists can book cars
                </li>
                <li className="mb-2">
                  <CheckCircle size={16} className="text-success me-2" />
                  Verification needed before booking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
