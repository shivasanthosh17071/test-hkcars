"use client";

import { useState, useEffect } from "react";
import { User, Info, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "../api/axiosConfig";

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const [userData, setUserData] = useState({
    _id: "",
    fullName: "",
    phone: "",
    joinDate: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const customerData = localStorage.getItem("userData");
    if (customerData) {
      try {
        const user = JSON.parse(customerData);
        setUserData({
          _id: user._id,
          fullName: user.name || "",
          phone: user.mobile || "",
          joinDate: user.createdAt?.split("T")[0] || "",
        });
        setFormData({
          fullName: user.name || "",
          phone: user.mobile || "",
        });
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (userData._id) fetchBookings();
  }, [userData._id]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`/bookings/customer/${userData._id}`);
      setBookings(res.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.put(
        `/users/${userData._id}`,
        {
          fullName: formData.fullName,
          phone: formData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = {
        ...userData,
        fullName: res.data.name,
        phone: res.data.mobile,
      };

      setUserData(updated);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          mobile: res.data.mobile,
        })
      );

      alert("Profile updated successfully.");
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || "Failed to update profile.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Confirmed":
        return "primary";
      case "Completed":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h3>
          Welcome, <span className="text-primary">{userData.fullName}</span>
        </h3>
        <p className="text-muted small">Joined on: {userData.joinDate}</p>
      </div>

      <ul className="nav nav-tabs justify-content-center mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active fw-bold text-dark" : ""}`}
            onClick={() => handleTabChange("details")}
          >
            <Info size={16} className="me-1" />
            Account
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "update" ? "active fw-bold text-dark" : ""}`}
            onClick={() => handleTabChange("update")}
          >
            <User size={16} className="me-1" />
            Update
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "bookings" ? "active fw-bold text-dark" : ""}`}
            onClick={() => handleTabChange("bookings")}
          >
            <ClipboardList size={16} className="me-1" />
            Bookings
          </button>
        </li>
      </ul>

      <div className="card border-0 shadow-sm p-4 rounded-4 bg-light">
        {activeTab === "details" && (
          <div>
            <h5 className="mb-3 text-primary">Account Details</h5>
            <div className="row">
              <div className="col-md-6">
                <p><strong>User ID:</strong> {userData._id}</p>
                <p><strong>Full Name:</strong> {userData.fullName}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Mobile Number:</strong> {userData.phone}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "update" && (
          <div>
            <h5 className="mb-3 text-primary">Update Profile</h5>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                name="fullName"
                type="text"
                className="form-control"
                value={formData.fullName}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                type="text"
                className="form-control"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </div>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <h5 className="mb-4 text-center text-primary">My Bookings</h5>
            {bookings.length === 0 ? (
              <p className="text-center text-muted">No bookings found.</p>
            ) : (
              <div className="row">
                {bookings.map((b) => (
                  <div key={b._id} className="col-md-6 mb-4">
                    <div className="card h-100 shadow-sm border-0">
                      <div className="card-header d-flex justify-content-between align-items-center bg-white border-bottom">
                        <strong>{b.carName}</strong>
                        <span className={`badge bg-${getStatusColor(b.status)}`}>
                          {b.status}
                        </span>
                      </div>
                      <div className="card-body">
                        <h6 className="text-muted mb-2">Booking Details</h6>
                        <p><strong>Booking ID:</strong> {b._id}</p>
                        <p><strong>Pickup:</strong> {new Date(b.pickupDateTime).toLocaleString()}</p>
                        <p><strong>Return:</strong> {new Date(b.returnDateTime).toLocaleString()}</p>
                        <p><strong>Total Days:</strong> {b.totalDays}</p>

                        <hr />

                        <h6 className="text-muted">Customer Info</h6>
                        <p><strong>Name:</strong> {b.customerName}</p>
                        <p><strong>Email:</strong> {b.customerEmail}</p>
                        <p><strong>Phone:</strong> {b.customerPhone}</p>
                        <p><strong>DOB:</strong> {b.dateOfBirth}</p>

                        <hr />

                        <h6 className="text-muted">License Info</h6>
                        <p><strong>License:</strong> {b.driverLicenseNumber}</p>
                        <p><strong>Issued State:</strong> {b.dlIssuedState}</p>
                        <p><strong>Original Docs:</strong> {b.originalDocumentsSubmitted}</p>
                        <p><strong>Purpose:</strong> {b.purpose}</p>
                        <p><strong>Notes:</strong> {b.notes}</p>

                        <hr />

                        <h6 className="text-muted">Address</h6>
                        <p>{b.address}</p>
                        <p>
                          {b.city}, {b.state}, {b.country} - {b.pinCode}
                        </p>
                        <p className="small text-muted mt-3 mb-0">
                          Booked On: {new Date(b.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
