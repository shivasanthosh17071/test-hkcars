import { Link } from "react-router-dom";
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Star,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("adminToken"));
    };

    // Listen to localStorage changes (cross-tab)
    window.addEventListener("storage", handleStorageChange);

    // Polling to catch changes in same tab
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("adminToken");
      setToken((prevToken) =>
        prevToken !== currentToken ? currentToken : prevToken
      );
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="d-flex align-items-center mb-4">
              <div className="position-relative me-3">
                <Car size={32} className="text-primary" />
                <Star
                  size={16}
                  className="position-absolute top-0 end-0 text-warning"
                  fill="currentColor"
                />
              </div>
              <h4 className="mb-0 text-gradient">HK Self-Drive Cars</h4>
            </div>
            <p
              className="text-light opacity-75 mb-4"
              style={{ lineHeight: "1.7" }}
            >
              Trusted since 2019, we offer 24/7 self-drive car rentals with
              doorstep delivery across Hyderabad. No accounts, no hidden
              terms—just pure driving freedom.
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://www.instagram.com/hk_self_drive_cars/profilecard/?igsh=MXdlOGhwNm9qNHBhbQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass rounded-circle p-2"
              >
                <Instagram size={20} />
              </a>
              <a href="#" className="btn btn-glass rounded-circle p-2">
                <Facebook size={20} />
              </a>
              <a href="#" className="btn btn-glass rounded-circle p-2">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-light mb-4 fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  to="/"
                  className="text-light opacity-75 text-decoration-none d-flex align-items-center"
                >
                  <span className="me-2">→</span> Home
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/cars"
                  className="text-light opacity-75 text-decoration-none d-flex align-items-center"
                >
                  <span className="me-2">→</span> Cars
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/about"
                  className="text-light opacity-75 text-decoration-none d-flex align-items-center"
                >
                  <span className="me-2">→</span> About Us
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/offers"
                  className="text-light opacity-75 text-decoration-none d-flex align-items-center"
                >
                  <span className="me-2">→</span> Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-light mb-4 fw-bold">Our Services</h6>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center text-light opacity-75">
                <Star
                  size={16}
                  className="text-warning me-2"
                  fill="currentColor"
                />
                Daily, Weekly, Monthly Rentals
              </li>
              <li className="mb-3 d-flex align-items-center text-light opacity-75">
                <Star
                  size={16}
                  className="text-warning me-2"
                  fill="currentColor"
                />
                Hatchback, Sedan, SUV, EVs
              </li>
              <li className="mb-3 d-flex align-items-center text-light opacity-75">
                <Star
                  size={16}
                  className="text-warning me-2"
                  fill="currentColor"
                />
                Add-ons: GPS, Insurance, Fuel
              </li>
              <li className="mb-3 d-flex align-items-center text-light opacity-75">
                <Star
                  size={16}
                  className="text-warning me-2"
                  fill="currentColor"
                />
                Doorstep Pickup & Delivery
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-light mb-4 fw-bold">Contact Information</h6>
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle p-2 me-3">
                <Phone size={16} />
              </div>
              <div>
                <div className="text-light fw-medium">Phone / WhatsApp</div>
                <a
                  href="tel:+919603879248"
                  className="text-light opacity-75 text-decoration-none d-block"
                >
                  +91 9603879248
                </a>
                <a
                  href="tel:+917981592802"
                  className="text-light opacity-75 text-decoration-none d-block"
                >
                  +91 7981592802
                </a>
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle p-2 me-3">
                <Mail size={16} />
              </div>
              <div>
                <div className="text-light fw-medium">Email</div>
                <a
                  href="mailto:hkselfdrivecars1122@gmail.com"
                  className="text-light opacity-75 text-decoration-none"
                >
                  hkselfdrivecars1122@gmail.com
                </a>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <div className="rounded-circle p-2 me-3 mt-1">
                <MapPin size={16} />
              </div>
              <div>
                <div className="text-light fw-medium">Location</div>
                <div className="text-light opacity-75">
                  Boduppal, Vanasthalipuram,
                  <br />
                  Dilsukhnagar, Hyderabad
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider my-4"></div>

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-light opacity-75 mb-0 d-flex align-items-center">
              © 2025 HK Self-Drive Cars. Made with
              <Heart
                size={16}
                className="text-danger mx-2"
                fill="currentColor"
              />
              for self-drive freedom.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex flex-wrap justify-content-md-end gap-3">
              <Link
                to="/terms"
                className="text-light opacity-75 text-decoration-none"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="text-light opacity-75 text-decoration-none"
              >
                Privacy Policy
              </Link>
              <Link
                to="/support"
                className="text-light opacity-75 text-decoration-none"
              >
                Support
              </Link>
              {token ? (
                <Link
                  to="/admin/dashboard"
                  className="text-light opacity-75 text-decoration-none"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/admin"
                  className="text-light opacity-75 text-decoration-none"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <small className="text-light opacity-50">
              Developed by{" "}
              <a
                href="https://santhoshdev.space"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
              >
                Shiva Santhosh Reddy
              </a>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
