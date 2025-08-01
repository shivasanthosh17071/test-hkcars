"use client";
import { Link } from "react-router-dom";
import { Calendar, Ban } from "lucide-react";

const Offers = () => {
  const offers = []; // No active offers

  return (
    <div className="fade-in mt-4">
      {/* Hero Section */}
      <section className="gradient-bg text-white pb-4">
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">Special Offers</h1>
            <p className="text-dark">
              Save more on your car rentals with our exclusive deals and
              discounts
            </p>
          </div>
        </div>
      </section>

      {/* Offers Grid or Empty State */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          {offers.length === 0 ? (
            <div className="py-5">
              <Ban size={48} className="text-muted mb-3" />
              <h4 className="text-muted">No offers available right now</h4>
              <p className="text-muted">Please check back again later.</p>
            </div>
          ) : (
            <div className="row">
              {/* render offers if any (currently none) */}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 gradient-bg text-white">
        <div className="container text-center">
          <h3 className="mb-4">Ready to Save on Your Next Trip?</h3>
          <p className="text-dark mb-4">
            Don’t miss out when new deals go live. Book your car today!
          </p>
          <Link to="/cars" className="btn btn-light btn-lg">
            <Calendar size={20} className="me-2" />
            Start Booking
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Offers;
