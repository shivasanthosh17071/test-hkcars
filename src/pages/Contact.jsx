"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
} from "lucide-react";
import Requirements from "./Requirements";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Format message
  const message = `New Client Inquiry:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
Message: ${formData.message}`;

  // WhatsApp API
  const phoneNumber = "91603879248"; // Use international format without +
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Open WhatsApp chat
  window.open(url, "_blank");

  // Optional: Reset form and show success
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setSubmitted(true);
  setIsSubmitting(false);
  setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  setTimeout(() => setSubmitted(false), 40000);
};


  const handleWhatsAppClick = () => {
    const message = "Hi! I'd like to know more about HK Self Drive Cars.";
    const phoneNumber = "91603879248";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fade-in mt-4">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">
            HK Self-Driving Car Rentals
          </h1>
          <p className="lead mb-0">
            Car rentals made easy — doorstep delivery, 24/7 support, flexible plans.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Form */}
            <div className="col-lg-8 mb-5">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h4 className="mb-0">Client Inquiry Form</h4>
                </div>
                <div className="card-body">
                  {submitted && (
                    <div className="alert alert-success" role="alert">
                      <strong>Thank you!</strong> Your message has been sent
                      successfully. We'll get back to you shortly.
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email Address *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Subject *</label>
                        <select
                          className="form-select"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="support">Customer Support</option>
                          <option value="feedback">Feedback</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Message *</label>
                      <textarea
                        className="form-control"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        placeholder="Tell us how we can assist."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="me-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="col-lg-4">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title">Contact & Support</h5>
                  <div className="d-flex align-items-center mb-3">
                    <Phone size={20} className="text-primary me-3" />
                    <div>
                      <div className="fw-bold">Phone</div>
                      <a href="tel:+919603879248" className="text-decoration-none">
                        +91 96038 79248
                      </a>
                      <br />
                      <a href="tel:+917981592802" className="text-decoration-none">
                        +91 79815 92802
                      </a>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <Mail size={20} className="text-primary me-3" />
                    <div>
                      <div className="fw-bold">Email</div>
                      <a href="mailto:hkselfdrivecars1122@gmail.com" className="text-decoration-none">
                        hkselfdrivecars1122@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="d-flex align-items-start mb-3">
                    <MapPin size={20} className="text-primary me-3 mt-1" />
                    <div>
                      <div className="fw-bold">Service Areas</div>
                      <div className="text-muted">
                        Boduppal • Vanasthalipuram • Dilsukhnagar
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <Clock size={20} className="text-primary me-3" />
                    <div>
                      <div className="fw-bold">Hours</div>
                      <div className="text-muted">24 hours (Support 24/7)</div>
                    </div>
                  </div>
                  <button
                    className="btn btn-success w-100"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle size={16} className="me-2" />
                    Chat on WhatsApp
                  </button>
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title">Quick Response</h6>
                  <p className="card-text small text-muted">
                    For emergencies, contact +91 63000 98395. Regular queries responded within ~15 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services & Booking Summary */}
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="card p-4 shadow-sm">
                <h5>About HK Self‑Driving Car Rentals</h5>
                <p>
                  Established recently, HK Self‑Drive Cars offers flexible rental
                  options across Boduppal, Vanasthalipuram, and Dilsukhnagar.
                  Choose from hatchbacks, sedans, SUVs, and EVs. Rentals available
                  hourly, daily, weekly, or monthly. Add-ons include GPS, baby seats,
                  insurance, fuel options, and chauffeur services. We also offer
                  doorstep delivery and pickup.
                </p>

                <Requirements/>
              </div>
            </div>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default Contact;
