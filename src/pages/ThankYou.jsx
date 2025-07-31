"use client";

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Car, Phone, MessageCircle, Home } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const { bookingId, carName, totalAmount } = location.state || {};

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppClick = () => {
    const message = `Hi! My booking has been confirmed. Booking ID: ${bookingId}. Please provide further details about pickup.`;
    const phoneNumber = "919603879248";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <div className="mb-4">
              <CheckCircle size={80} className="text-success" />
            </div>
            <h1 className="display-4 text-success mb-3">Booking Confirmed!</h1>
            <p className="lead text-muted">
              Thank you for choosing DriveEasy. Your booking has been
              successfully submitted.
            </p>
          </div>

          {bookingId && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Booking Details</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong>Booking ID:</strong>
                    <div className="text-primary">{bookingId}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Car:</strong>
                    <div>{carName}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Total Amount:</strong>
                    <div className="text-success">₹{totalAmount}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Status:</strong>
                    <span className="badge bg-warning">
                      Pending Confirmation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">What's Next?</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-start">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      1
                    </div>
                    <div>
                      <h6>Confirmation Call</h6>
                      <p className="text-muted small mb-0">
                        Our team will call you within 2 hours to confirm your
                        booking details.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-start">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      2
                    </div>
                    <div>
                      <h6>Document Verification</h6>
                      <p className="text-muted small mb-0">
                        Please keep your driving license and ID proof ready for
                        verification.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-start">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      3
                    </div>
                    <div>
                      <h6>Car Pickup</h6>
                      <p className="text-muted small mb-0">
                        Visit our location at the scheduled time to pick up your
                        car.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-start">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      4
                    </div>
                    <div>
                      <h6>Enjoy Your Drive</h6>
                      <p className="text-muted small mb-0">
                        Hit the road and enjoy your self-drive experience!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <Phone size={40} className="text-primary mb-3" />
                  <h6>Need Help?</h6>
                  <p className="text-muted small">Call us for any queries</p>
                  <a
                    href="tel:+919603879248"
                    className="btn btn-outline-primary"
                  >
                    +91 9603879248
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <MessageCircle size={40} className="text-success mb-3" />
                  <h6>WhatsApp Support</h6>
                  <p className="text-muted small">Chat with us instantly</p>
                  <button
                    className="btn btn-success"
                    onClick={handleWhatsAppClick}
                  >
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link to="/" className="btn btn-primary">
                <Home size={16} className="me-2" />
                Back to Home
              </Link>
              <Link to="/cars" className="btn btn-outline-primary">
                <Car size={16} className="me-2" />
                Browse More Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
