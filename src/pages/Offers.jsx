"use client";
import { Link } from "react-router-dom";
import { Tag, Clock, Gift, Star, Car, Calendar } from "lucide-react";

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 20% off on weekend bookings (Friday to Sunday)",
      discount: "20% OFF",
      validUntil: "2024-12-31",
      code: "WEEKEND20",
      type: "Weekend",
      color: "primary",
    },
    {
      id: 2,
      title: "First Time User",
      description: "Special discount for new customers on their first booking",
      discount: "25% OFF",
      validUntil: "2024-12-31",
      code: "FIRST25",
      type: "New User",
      color: "success",
    },
    {
      id: 3,
      title: "Long Term Rental",
      description: "Book for 7+ days and save big on your extended trips",
      discount: "30% OFF",
      validUntil: "2024-12-31",
      code: "LONGTERM30",
      type: "Extended",
      color: "info",
    },
    {
      id: 4,
      title: "Festival Bonanza",
      description: "Celebrate festivals with special pricing on all cars",
      discount: "15% OFF",
      validUntil: "2024-11-30",
      code: "FESTIVAL15",
      type: "Festival",
      color: "warning",
    },
    {
      id: 5,
      title: "Corporate Discount",
      description: "Special rates for corporate bookings and business trips",
      discount: "18% OFF",
      validUntil: "2024-12-31",
      code: "CORPORATE18",
      type: "Corporate",
      color: "dark",
    },
    {
      id: 6,
      title: "Student Special",
      description: "Exclusive discount for students with valid ID",
      discount: "22% OFF",
      validUntil: "2024-12-31",
      code: "STUDENT22",
      type: "Student",
      color: "danger",
    },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied to clipboard!`);
  };

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

      {/* Offers Grid */}
      <section className="">
        <div className="container">
          <div className="row">
            {offers.map((offer) => (
              <div key={offer.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className={`card-header bg-${offer.color} text-white`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{offer.title}</h5>
                      <span className="badge bg-light text-dark">
                        {offer.type}
                      </span>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="text-center mb-3">
                      <div className={`display-6 fw-bold text-${offer.color}`}>
                        {offer.discount}
                      </div>
                    </div>

                    <p className="text-muted mb-3">{offer.description}</p>

                    <div className="mt-auto">
                      <div className="d-flex align-items-center mb-3">
                        <Clock size={16} className="text-muted me-2" />
                        <small className="text-muted">
                          Valid until:{" "}
                          {new Date(offer.validUntil).toLocaleDateString()}
                        </small>
                      </div>

                      <div className="d-flex align-items-center mb-3">
                        <Tag size={16} className="text-muted me-2" />
                        <code className="bg-light px-2 py-1 rounded">
                          {offer.code}
                        </code>
                        <button
                          className="btn btn-sm btn-outline-secondary ms-2"
                          onClick={() => copyToClipboard(offer.code)}
                        >
                          Copy
                        </button>
                      </div>

                      <Link to="/cars" className="btn btn-primary w-100">
                        <Car size={16} className="me-2" />
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h3>How to Use These Offers</h3>
            <p className="text-muted">
              Follow these simple steps to apply your discount
            </p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  1
                </div>
                <h6>Choose Your Car</h6>
                <p className="text-muted small">
                  Browse and select your preferred vehicle
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  2
                </div>
                <h6>Fill Booking Form</h6>
                <p className="text-muted small">
                  Enter your details and rental dates
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  3
                </div>
                <h6>Apply Coupon Code</h6>
                <p className="text-muted small">
                  Enter the offer code during checkout
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  4
                </div>
                <h6>Enjoy Savings</h6>
                <p className="text-muted small">
                  Get instant discount on your booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Terms & Conditions</h5>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <Star size={16} className="text-warning me-2" />
                      Offers are valid for limited time periods as mentioned
                    </li>
                    <li className="mb-2">
                      <Star size={16} className="text-warning me-2" />
                      Only one coupon code can be used per booking
                    </li>
                    <li className="mb-2">
                      <Star size={16} className="text-warning me-2" />
                      Discounts are applicable on base rental charges only
                    </li>
                    <li className="mb-2">
                      <Star size={16} className="text-warning me-2" />
                      Some offers may have minimum booking duration requirements
                    </li>
                    <li className="mb-2">
                      <Star size={16} className="text-warning me-2" />
                      DriveEasy reserves the right to modify or cancel offers
                      anytime
                    </li>
                    <li className="mb-0">
                      <Star size={16} className="text-warning me-2" />
                      For corporate and student discounts, valid documentation
                      required
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 gradient-bg text-white">
        <div className="container text-center">
          <h3 className="mb-4">Ready to Save on Your Next Trip?</h3>
          <p className="text-dark mb-4">
            Don't miss out on these amazing deals. Book your car today!
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
