"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Award,
  Users,
  TrendingUp,
  ShieldCheck,
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

    const message = `New Client Inquiry:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
Message: ${formData.message}`;

    const phoneNumber = "91603879248";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

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
      {/* Hero / Overview */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-2 text-light" >HK Self Drive Cars</h1>
          <p className="lead mb-2">
            "Unlock the freedom to explore. Rent a car and embark on your journey."
          </p>
          <p className="lead mb-0">
            Drive the experience. Your adventure begins with a rental car.
          </p>
        </div>
      </section>

      {/* Main Section */}
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
                    <div className="alert alert-success">
                      <strong>Thank you!</strong> We'll get back to you shortly.
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
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
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
                  <h5>Contact & Support</h5>
                  <div className="d-flex align-items-center mb-3">
                    <Phone className="text-primary me-3" size={20} />
                    <div>
                      <div className="fw-bold">Phone</div>
                      <a href="tel:+919603879248">+91 96038 79248</a><br />
                      <a href="tel:+917981592802">+91 79815 92802</a>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <Mail className="text-primary me-3" size={20} />
                    <div>
                      <div className="fw-bold">Email</div>
                      <a href="mailto:hkselfdrivecars1122@gmail.com">
                        hkselfdrivecars1122@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="d-flex align-items-start mb-3">
                    <MapPin className="text-primary me-3 mt-1" size={20} />
                    <div>
                      <div className="fw-bold">Service Areas</div>
                      Boduppal • Vanasthalipuram • Dilsukhnagar
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <Clock className="text-primary me-3" size={20} />
                    <div>
                      <div className="fw-bold">Hours</div>
                      24/7 Availability
                    </div>
                  </div>
                  <button className="btn btn-success w-100" onClick={handleWhatsAppClick}>
                    <MessageCircle className="me-2" size={16} />
                    Chat on WhatsApp
                  </button>
                </div>
              </div>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6>Quick Response</h6>
                  <p className="small text-muted">
                    For emergencies, call <strong>+91 63000 98395</strong>.
                    General queries answered within ~15 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info Section */}
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="card shadow-sm p-4">
                <h4 className="mb-3">About HK Self Drive Cars</h4>
                <p>
                  <strong>HK Self Drive Cars</strong> is one of the top-rated self-drive car rental services in Hyderabad,
                  founded in 2019 by <strong>Tharun</strong>. Our mission is to provide safe, flexible, and
                  budget-friendly travel options to customers who value independence.
                </p>
                <p>
                  We offer a wide selection of vehicles — hatchbacks, sedans, SUVs — with flexible rental durations and 24/7 support.
                  Book easily online, enjoy doorstep delivery, and experience a hassle-free journey.
                </p>
                <h5 className="mt-4">Our Mission</h5>
                <p>
                  To make travel easy and independent by providing clean, safe, and affordable self-drive cars with great customer service.
                </p>

                <h5 className="mt-4">Our Vision</h5>
                <p>
                  To become South India’s most trusted self-drive car rental brand, offering the best experience in service, value, and convenience.
                </p>

                <div className="row text-center mt-4">
                  <div className="col-md-4">
                    <Users className="text-success mb-2" size={32} />
                    <h6>50,000+ Happy Customers</h6>
                  </div>
                  <div className="col-md-4">
                    <TrendingUp className="text-warning mb-2" size={32} />
                    <h6>100+ Vehicles in Fleet</h6>
                  </div>
                  <div className="col-md-4">
                    <ShieldCheck className="text-primary mb-2" size={32} />
                    <h6>99% Customer Satisfaction</h6>
                  </div>
                </div>

                {/* Rental Requirements Component */}
                <div className="mt-5">
                  <Requirements />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
