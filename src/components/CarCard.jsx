import { Link } from "react-router-dom";
import {
  Fuel,
  Users,
  Settings,
  Star,
  Eye,
  Calendar,
  MessageCircle,
  Zap,
} from "lucide-react";

const CarCard = ({
  car,
  showActions = false,
  onToggleAvailability,
  onEdit,
  onDelete,
}) => {
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const message = `Hi! I'm interested in the ${car.name}. Can you provide more details?`;
    const phoneNumber = "919603879248";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
      <div
        className="car-card border-0 shadow-sm rounded-4 overflow-hidden transition-all h-100"
        style={{
          background: "#fff",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
      >
        {/* Image Section */}
        <div className="position-relative" style={{ overflow: "hidden" }}>
          <img
            src={car.images?.[0] || "/placeholder.svg"}
            alt={car.name}
            className="w-100"
            style={{
              height: "200px",
              objectFit: "cover",
              width: "100%",
            }}
          />
          <div
            className="position-absolute bottom-0 start-0 end-0"
            style={{
              height: "60%",
              background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.7))",
            }}
          />
          <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
            {car.featured && (
              <span className="badge bg-warning text-dark fw-semibold small rounded-pill px-2">
                <Star size={12} className="me-1" fill="currentColor" />
                Featured
              </span>
            )}
            <span
              className={`badge small rounded-pill px-2 fw-semibold ${
                car.available ? "bg-success" : "bg-danger"
              }`}
            >
              {car.available ? "Available" : "Booked"}
            </span>
          </div>
          <div className="position-absolute bottom-0 text-white px-3 pb-2">
            <h6 className="fw-bold mb-0 text-truncate">{car.name}</h6>
            <small className="text-light opacity-75">
              {car.brand} • {car.type}
            </small>
          </div>
        </div>

        {/* Details Section */}
        <div className="card-body p-3 d-flex flex-column justify-content-between">
          {/* Specs */}
          <div className="row text-center mb-2">
            <div className="col px-1">
              <div className="border rounded-3 py-1">
                <Fuel size={16} className="text-primary mb-1" />
                <div className="fw-semibold small">{car.fuel}</div>
                <small className="text-muted">Fuel</small>
              </div>
            </div>
            <div className="col px-1">
              <div className="border rounded-3 py-1">
                <Users size={16} className="text-secondary mb-1" />
                <div className="fw-semibold small">{car.seats}</div>
                <small className="text-muted">Seats</small>
              </div>
            </div>
            <div className="col px-1">
              <div className="border rounded-3 py-1">
                <Settings size={16} className="text-info mb-1" />
                <div className="fw-semibold small">{car.transmission}</div>
                <small className="text-muted">Trans</small>
              </div>
            </div>
          </div>

          {/* Rating */}
          {car.rating > 0 && (
            <div className="text-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`me-1 ${
                    i < Math.floor(car.rating) ? "text-warning" : "text-muted"
                  }`}
                  fill="currentColor"
                />
              ))}
              <small className="text-muted ms-1">({car.rating})</small>
            </div>
          )}

          {/* Price */}
          <div className="text-center mb-2">
            <span className="fw-bold text-dark fs-6">
              ₹{car.price.toLocaleString()}
            </span>
            <small className="text-muted"> / day</small>
          </div>

          {/* Actions */}
          {showActions ? (
            <div className="d-grid gap-2 mt-2">
              <button
                className={`btn btn-sm ${
                  car.available ? "btn-warning" : "btn-success"
                }`}
                onClick={() => onToggleAvailability(car._id)}
              >
                <Zap size={14} className="me-1" />
                {car.available ? "Mark Unavailable" : "Mark Available"}
              </button>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm w-50"
                  onClick={() => onEdit(car._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm w-50"
                  onClick={() => onDelete(car._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="d-grid gap-2 mt-2">
              <div className="d-flex gap-2">
                <Link
                  to={`/cars/${car._id}`}
                  className="btn p-2 btn-outline-primary btn-sm w-50"
                >
                  <Eye size={14} className="me-1" />
                  Details
                </Link>
                {car.available && (
                  <Link
                    to={`/book/${car._id}`}
                    className="btn btn-primary btn-sm w-50"
                  >
                    <Calendar size={14} className="me-1" />
                    Book
                  </Link>
                )}
              </div>
              <button
                className="btn btn-accent btn-sm w-100"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle size={14} className="me-1" />
                WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
