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

  // Redirect if token is missing
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carRes, bookingRes] = await Promise.all([
          axios.get("/cars", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/bookings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCars(carRes.data);
        setBookings(bookingRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("adminToken");
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, navigate]);

  const handleToggleAvailability = async (carId) => {
    if (window.confirm("Change availability status?")) {
      try {
        await axios.patch(
          `/cars/${carId}/toggle`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsLoading(true);
        // Re-fetch data
        const res = await axios.get("/cars", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to update car status.");
        setIsLoading(false);
      }
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm("Delete this car permanently?")) {
      try {
        await axios.delete(`/cars/${carId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars((prev) => prev.filter((car) => car._id !== carId));
      } catch (err) {
        console.error(err);
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
    <div className=" m-2 m-md-4 py-4 fade-in min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Admin Dashboard</h2>
          <p className="text-muted mb-0">Manage your car rental business</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin/add-car" className="btn btn-primary">
            <Plus size={16} className="me-2" />
            Add New Car
          </Link>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("adminToken");
                navigate("/");
              }
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-5">
        {[
          {
            icon: <Car size={40} />,
            value: stats.totalCars,
            label: "Total Cars",
            bg: "primary",
          },
          {
            icon: <Car size={40} />,
            value: stats.availableCars,
            label: "Available Cars",
            bg: "success",
          },
          {
            icon: <Calendar size={40} />,
            value: stats.totalBookings,
            label: "Total Bookings",
            bg: "info",
          },
          {
            icon: <Users size={40} />,
            value: stats.pendingBookings,
            label: "Pending Bookings",
            bg: "warning",
          },
        ].map(({ icon, value, label, bg }, i) => (
          <div className="col-lg-3 col-md-6 mb-3" key={i}>
            <div className={`card bg-${bg} text-white`}>
              <div className="card-body d-flex align-items-center">
                {icon}
                <div className="ms-3">
                  <h3 className="mb-0">{value}</h3>
                  <small>{label}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card mb-5">
        <div className="card-header">
          <h5 className="mb-0">Quick Actions</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
              <Link
                to="/admin/add-car"
                className="btn btn-outline-primary w-100"
              >
                <Plus size={16} className="me-2" />
                Add New Car
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <Link to="/admin/bookings" className="btn btn-outline-info w-100">
                <Calendar size={16} className="me-2" />
                View Bookings
              </Link>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-outline-success w-100">
                <Eye size={16} className="me-2" />
                View Reports
              </button>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-outline-secondary w-100">
                <Users size={16} className="me-2" />
                Customer List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Cars */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Manage Cars</h5>
          <span className="badge bg-secondary">{cars.length} cars</span>
        </div>
        <div className="card-body">
          {cars.length === 0 ? (
            <div className="text-center py-5">
              <Car size={48} className="text-muted mb-3" />
              <h5>No cars available</h5>
              <p className="text-muted">Add your first car to get started.</p>
              <Link to="/admin/add-car" className="btn btn-primary">
                <Plus size={16} className="me-2" />
                Add New Car
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
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Recent Bookings</h5>
            <Link
              to="/admin/bookings"
              className="btn btn-sm btn-outline-primary"
            >
              View All
            </Link>
          </div>
          <div className="card-body table-responsive">
            <table className="table table-hover">
              <thead>
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
                      <span
                        className={`badge ${
                          booking.status === "Confirmed"
                            ? "bg-success"
                            : booking.status === "Pending"
                            ? "bg-warning"
                            : booking.status === "Completed"
                            ? "bg-info"
                            : "bg-danger"
                        }`}
                      >
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
