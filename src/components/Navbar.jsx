"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import HKLOGO from "../assets/HKLOGO.png";

const quotes = [
  "Start your journey from LB Nagar — where every rental opens a new road to explore.",
  "Vanastalipuram to Vikarabad — rent your drive and own your weekend getaway.",
  "From Boduppal to Banjara Hills, we put the keys to freedom in your hands.",
  "Your perfect ride is waiting at LB Nagar. All that’s missing is your destination.",
  "Planning a long drive? Vanastalipuram branch is just the beginning of your escape.",
  "Boduppal to Araku Valley — make memories one smooth drive at a time.",
  "Charminar, Chilkur or the coast — our LB Nagar cars take you where maps end and memories begin.",
  "Rent from Vanastalipuram and experience Hyderabad like never before — comfortably and conveniently.",
  "From Boduppal streets to Telangana retreats — drive the experience with HK Self Drive Cars.",
];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [token, setToken] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    setToken(storedToken);

    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        setUserInfo(JSON.parse(userData));
      } catch (e) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedUserData = localStorage.getItem("userData");
      if (updatedUserData) {
        const parsed = JSON.parse(updatedUserData);
        if (JSON.stringify(parsed) !== JSON.stringify(userInfo)) {
          setUserInfo(parsed);
        }
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [userInfo]);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    setToken(storedToken);
  }, [navigate]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // Scrolling down
      } else {
        setShowNavbar(true); // Scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Change quote every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setUserInfo(null);
    setToken(null);
    setIsOpen(false);
    setShowLogoutModal(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Billboard with rotating quote */}
      {!showNavbar && (
        <div
          className="text-center text-white py-2 fw-bold d-none d-md-block"
          style={{
            backgroundColor: "#111",
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 998,
            transition: "opacity 0.3s ease",
          }}
        >
          {quotes[quoteIndex]}
        </div>
      )}

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow-sm fixed-top bg-white py-2 px-3"
        style={{
          top: showNavbar ? "0" : "-100px",
          transition: "top 0.4s",
          zIndex: 999,
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            onClick={() => setIsOpen(false)}
          >
            <img src={HKLOGO} alt="HK Logo" height={80} className="me-2 ms-4" />
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              {["/", "/cars", "/about", "/offers", "/contact"].map(
                (path, index) => {
                  const labels = ["Home", "Cars", "About", "Offers", "Contact"];
                  return (
                    <li className="nav-item" key={index}>
                      <Link
                        className={`nav-link px-3 py-2 ${
                          isActive(path) ? "active text-dark fw-bold" : ""
                        }`}
                        to={path}
                        onClick={() => setIsOpen(false)}
                      >
                        {labels[index]}
                      </Link>
                    </li>
                  );
                }
              )}

              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link d-flex align-items-center ${
                        isActive("/account")
                          ? "active text-dark fw-bold"
                          : ""
                      }`}
                      to="/account"
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={16} className="me-1" />
                      {userInfo?.name || "Dashboard"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn text-danger logout-btn d-flex align-items-center"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      <LogOut size={16} className="me-1" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="btn text-success d-flex align-items-center px-3"
                    to="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={16} className="me-1" />
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-0 rounded shadow">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLogoutModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
