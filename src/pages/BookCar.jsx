"use client";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axiosConfig";
import {
  Car,
  User,
  Calendar,
  ClipboardList,
  MapPin,
  CheckCircle,
} from "lucide-react";

const StepIndicator = ({ step }) => {
  const steps = ["Details", "Address", "License", "Schedule", "Summary"];
  return (
    <div className="d-flex justify-content-between mb-4 px-1">
      {steps.map((s, index) => (
        <div key={index} className="text-center flex-fill">
          <div
            className={`rounded-circle mx-auto mb-1 ${
              step >= index ? "bg-primary" : "bg-light"
            }`}
            style={{
              width: 32,
              height: 32,
              lineHeight: "32px",
              color: step >= index ? "white" : "#777",
              fontWeight: "bold",
            }}
          >
            {index + 1}
          </div>
          <small>{s}</small>
        </div>
      ))}
    </div>
  );
};

const BookCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    notes: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
    dateOfBirth: "",
    driverLicenseNumber: "",
    dlIssuedState: "",
    purpose: "",
    destination: "",
    originalDocumentsSubmitted: "",
  });

  const userToken = localStorage.getItem("userToken");
  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (!userToken) navigate("/login");
  }, [userToken, navigate]);

  useEffect(() => {
    if (user && user._id) {
      setFormData((prev) => ({
        ...prev,
        customerId: user._id,
        customerName: user.name || "",
        customerPhone: user.mobile || "",
        customerEmail: user.email || "",
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userToken) return;
    const fetchCar = async () => {
      try {
        const res = await axios.get(`/cars/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setCar(res.data);
      } catch (err) {
        console.log(err)
        alert("Failed to load car details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCar();
  }, [id, userToken]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const totalDays = useMemo(() => {
    const start = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
    const end = new Date(`${formData.returnDate}T${formData.returnTime}`);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [formData]);

  const totalAmount = useMemo(
    () => car?.price * totalDays,
    [car?.price, totalDays]
  );

  const isCurrentStepValid = () => {
    switch (step) {
      case 0:
        return formData.customerEmail;
      case 1:
        return formData.address && formData.city && formData.state;
      case 2:
        return formData.driverLicenseNumber && formData.dateOfBirth;
      case 3:
        return (
          formData.pickupDate &&
          formData.returnDate &&
          formData.pickupTime &&
          formData.returnTime
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!isCurrentStepValid()) return alert("Please complete this section.");
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const bookingData = {
    ...formData,
    carId: car._id,
    carName: car.name,
    carNumber: car.registrationNumber,
    pickupDateTime: `${formData.pickupDate} ${formData.pickupTime}`,
    returnDateTime: `${formData.returnDate} ${formData.returnTime}`,
    totalDays,
    totalAmount,
  };

  try {
    const res = await axios.post("/bookings/book", bookingData, {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    // ✅ Wait 2 seconds before navigating
    setTimeout(() => {
      navigate("/thank-you", {
        state: {
          bookingId: res.data._id,
          carName: res.data.carName,
          totalAmount: res.data.totalAmount,
        },
      });
    }, 2000);
  } catch (err) {
    alert("Booking failed.");
    console.log(err);
  } finally {
    setIsSubmitting(false);
  }
};


  if (isLoading)
    return <div className="text-center mt-5">Loading car details...</div>;
  if (!car)
    return <div className="text-danger text-center mt-5">Car not found.</div>;

  return (
    <div className="container mt-4 mb-5 p-3 border rounded shadow bg-white">
      <h2 className="text-center mb-4">
        <Car className="me-2" size={28} /> Book - {car.name}
      </h2>

      <StepIndicator step={step} />

      <form onSubmit={handleSubmit}>
        {step === 0 && (
          <div className="card p-4 mb-3 border-0 shadow-sm">
            <h5 className="mb-3">
              <User className="me-2" /> Your Details
            </h5>
            <input
              className="form-control mb-2"
              name="customerName"
              value={formData.customerName}
              readOnly
            />
            <input
              type="email"
              className="form-control mb-2"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              className="form-control mb-2"
              name="customerPhone"
              value={formData.customerPhone}
              readOnly
            />
          </div>
        )}

        {step === 1 && (
          <div className="card p-4 mb-3 border-0 shadow-sm">
            <h5 className="mb-3">
              <MapPin className="me-2" /> Address Info
            </h5>
            <textarea
              className="form-control mb-2"
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div className="row">
              <div className="col-md-4">
                <input
                  className="form-control mb-2"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control mb-2"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control mb-2"
                  name="pinCode"
                  placeholder="PIN Code"
                  value={formData.pinCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card p-4 mb-3 border-0 shadow-sm">
            <h5 className="mb-3">
              <ClipboardList className="me-2" /> License & ID
            </h5>
            <input
              className="form-control mb-2"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              name="driverLicenseNumber"
              placeholder="License Number"
              value={formData.driverLicenseNumber}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              name="dlIssuedState"
              placeholder="DL Issued State"
              value={formData.dlIssuedState}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {step === 3 && (
          <div className="card p-4 mb-3 border-0 shadow-sm">
            <h5 className="mb-3">
              <Calendar className="me-2" /> Booking Schedule
            </h5>
            <div className="row">
              <div className="col-md-6">
                <label>Pickup Date & Time</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                />
                <input
                  type="time"
                  className="form-control mb-2"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Return Date & Time</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                />
                <input
                  type="time"
                  className="form-control mb-2"
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <input
              className="form-control mb-2"
              name="purpose"
              placeholder="Purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              name="destination"
              placeholder="Destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              name="originalDocumentsSubmitted"
              placeholder="Documents Submitted"
              value={formData.originalDocumentsSubmitted}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {step === 4 && (
          <div className="card p-4 mb-3 border-0 shadow-sm">
            <h5 className="mb-3">
              <CheckCircle className="me-2" /> Booking Summary
            </h5>
            <p>Car: <strong>{car.name}</strong></p>
            <p>Per Day Rate: ₹{car.price}</p>
            <p>Total Days: {totalDays}</p>
            <p><strong>Total Amount: ₹{totalAmount}</strong></p>
            <textarea
              className="form-control mt-2"
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
        )}

        <div className="d-flex justify-content-between mt-3">
          {step > 0 && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={prevStep}
            >
              ← Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              className="btn btn-primary ms-auto"
              onClick={nextStep}
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking..." : "Book Now"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookCar;
