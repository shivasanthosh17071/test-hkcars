"use client";

import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  CheckCircle,
  Clock,
  Timer,
  XCircle,
  Filter,
  Search,
  ArrowLeft,
} from "lucide-react";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    sort: "latest",
  });
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  useEffect(() => {
    axios
      .get("/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    let filtered = [...bookings];

    if (filters.search.trim()) {
      filtered = filtered.filter((b) =>
        b.customerName?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== "All") {
      filtered = filtered.filter((b) => b.status === filters.status);
    }

    if (filters.sort === "latest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sort === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredBookings(filtered);
  }, [bookings, filters]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle size={18} color="green" />;
      case "Pending":
        return <Clock size={18} color="orange" />;
      case "Completed":
        return <Timer size={18} color="blue" />;
      case "Cancelled":
        return <XCircle size={18} color="red" />;
      default:
        return null;
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalData({
      status: booking.status || "",
      pickupLocation: booking.pickupLocation || "",
      gasTankReading: booking.gasTankReading || "",
      notes: booking.notes || "",
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSave = async () => {
    try {
      await axios.put(`/bookings/${selectedBooking._id}`, modalData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = bookings.map((b) =>
        b._id === selectedBooking._id ? { ...b, ...modalData } : b
      );
      setBookings(updated);
      closeModal();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className="m-2 m-md-4 py-4" style={{ minHeight: "700px" }}>
      <button
        className="btn mb-2 d-flex align-items-center"
        onClick={() => navigate("/admin/dashboard")}
      >
        <ArrowLeft size={18} className="me-2" />
        Back
      </button>

      <h2 className="mb-4">All Bookings</h2>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
        <div className="input-group w-auto">
          <span className="input-group-text">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by user"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="input-group w-auto">
          <span className="input-group-text">
            <Filter size={16} />
          </span>
          <select
            className="form-select"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="input-group w-auto">
          <span className="input-group-text">Sort</span>
          <select
            className="form-select"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="">None</option>
            <option value="latest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      {loading ? (
        <LoadingSpinner />
      ) : filteredBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Car</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Pickup</th>
                <th>Return</th>
                <th>Status</th>
                <th>Pickup Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.carName}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.customerPhone}</td>
                  <td>{booking.customerEmail}</td>
                  <td>{new Date(booking.pickupDateTime).toLocaleString()}</td>
                  <td>{new Date(booking.returnDateTime).toLocaleString()}</td>
                  <td>
                    {getStatusIcon(booking.status)} {booking.status}
                  </td>
                  <td>{booking.pickupLocation}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => openModal(booking)}
                    >
                      View / Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedBooking && (
        <Modal show={showModal} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Booking Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              {/* Booking Details */}
              {Object.entries(selectedBooking).map(([key, value]) => {
                if (
                  ["_id", "__v", "createdAt", "updatedAt"].includes(key) ||
                  ["status", "pickupLocation", "gasTankReading", "notes"].includes(key)
                )
                  return null;
                return (
                  <div className="col-md-6 mb-3" key={key}>
                    <strong>{key}:</strong>{" "}
                    {typeof value === "object" ? JSON.stringify(value) : value}
                  </div>
                );
              })}

              {/* Editable Fields */}
              <div className="col-md-6 mb-3">
                <label>Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={modalData.status}
                  onChange={handleModalChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  className="form-control"
                  value={modalData.pickupLocation}
                  onChange={handleModalChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Gas Tank Reading</label>
                <select
                  name="gasTankReading"
                  className="form-select"
                  value={modalData.gasTankReading}
                  onChange={handleModalChange}
                >
                  <option value="">Select</option>
                  <option value="Full">Full</option>
                  <option value="3/4">¾</option>
                  <option value="1/2">½</option>
                  <option value="1/4">¼</option>
                </select>
              </div>

              <div className="col-md-12 mb-3">
                <label>Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  className="form-control"
                  value={modalData.notes}
                  onChange={handleModalChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleModalSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Bookings;
