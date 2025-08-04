"use client";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Car, Users, Calendar, Plus, Eye } from "lucide-react";

import axios from "../../api/axiosConfig";
import CarCard from "../../components/CarCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carRes, bookingRes] = await Promise.all([
          axios.get("/cars", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/bookings", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setCars(carRes.data);
        setBookings(bookingRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        if ([401, 403].includes(err.response?.status)) {
          localStorage.removeItem("adminToken");
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (token) fetchData();
  }, [token, navigate]);

  const handleToggleAvailability = async (carId) => {
    if (window.confirm("Change availability status?")) {
      try {
        await axios.patch(`/cars/${carId}/toggle`, {}, { headers: { Authorization: `Bearer ${token}` } });
        const res = await axios.get("/cars", { headers: { Authorization: `Bearer ${token}` } });
        setCars(res.data);
      } catch (err) {
        alert("Failed to update car status.");
      }
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm("Delete this car permanently?")) {
      try {
        await axios.delete(`/cars/${carId}`, { headers: { Authorization: `Bearer ${token}` } });
        setCars((prev) => prev.filter((car) => car._id !== carId));
      } catch (err) {
        alert("Failed to delete car.");
      }
    }
  };

  const handleEditCar = (carId) => {
    navigate(`/admin/edit-car/${carId}`);
  };

  const stats = {
    totalCars: cars.length,
    availableCars: cars.filter((car) => car.available).length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "Pending").length,
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading admin dashboard..." />;
  }

  return (
    <div className="container py-4 fade-in">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h2 className="fw-bold mb-0">Admin Dashboard</h2>
          <small className="text-muted">Manage your self-drive car rental system</small>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <Link to="/admin/add-car" className="btn btn-primary">
            <Plus size={16} className="me-2" />
            Add Car
          </Link>
          <button className="btn btn-outline-danger" onClick={() => {
            if (window.confirm("Are you sure you want to logout?")) {
              localStorage.removeItem("adminToken");
              navigate("/");
            }
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { icon: <Car size={32} />, value: stats.totalCars, label: "Total Cars", bg: "primary" },
          { icon: <Car size={32} />, value: stats.availableCars, label: "Available Cars", bg: "success" },
          { icon: <Calendar size={32} />, value: stats.totalBookings, label: "Total Bookings", bg: "info" },
          { icon: <Users size={32} />, value: stats.pendingBookings, label: "Pending Bookings", bg: "warning" },
        ].map(({ icon, value, label, bg }, idx) => (
          <div className="col-sm-6 col-md-3" key={idx}>
            <div className={`card shadow-sm border-0 bg-${bg} text-white`}>
              <div className="card-body d-flex align-items-center">
                <div>{icon}</div>
                <div className="ms-3">
                  <h4 className="mb-0">{value}</h4>
                  <small>{label}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light fw-bold">Quick Actions</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <Link to="/admin/add-car" className="btn btn-outline-primary w-100">
                <Plus size={16} className="me-2" />
                Add Car
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/bookings" className="btn btn-outline-info w-100">
                <Calendar size={16} className="me-2" />
                View Bookings
              </Link>
            </div>
            <div className="col-md-3">
              <button className="btn btn-outline-success w-100">
                <Eye size={16} className="me-2" />
                Reports
              </button>
            </div>
            <div className="col-md-3">
              <button className="btn btn-outline-dark w-100">
                <Users size={16} className="me-2" />
                Customers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Cars */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Manage Cars</h5>
          <span className="badge bg-secondary">{cars.length} Cars</span>
        </div>
        <div className="card-body">
          {cars.length === 0 ? (
            <div className="text-center py-5">
              <Car size={48} className="text-muted mb-3" />
              <h5>No Cars Found</h5>
              <p className="text-muted">Start by adding a new car.</p>
              <Link to="/admin/add-car" className="btn btn-primary mt-2">
                <Plus size={16} className="me-2" />
                Add Car
              </Link>
            </div>
          ) : (
            <div className="row">
              {cars.map((car) => (
                <CarCard
                  key={car._id}
                  car={car}
                  showActions
                  onToggleAvailability={handleToggleAvailability}
                  onEdit={handleEditCar}
                  onDelete={handleDeleteCar}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings */}
      {bookings.length > 0 && (
        <div className="card shadow-sm mb-5">
          <div className="card-header bg-light d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Recent Bookings</h5>
            <Link to="/admin/bookings" className="btn btn-sm btn-outline-primary">View All</Link>
          </div>
          <div className="card-body table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Pickup Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking._id}>
                    <td>#{booking._id}</td>
                    <td>{booking.customerName}</td>
                    <td>{booking.carName}</td>
                    <td>{booking.pickupDate}</td>
                    <td>
                      <span className={`badge 
                        ${booking.status === "Confirmed" ? "bg-success" :
                          booking.status === "Pending" ? "bg-warning" :
                          booking.status === "Completed" ? "bg-info" :
                          "bg-danger"}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>₹{booking.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
