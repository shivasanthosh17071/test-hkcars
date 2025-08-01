import { useState, useEffect } from "react";

const TopBanner = () => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShouldRender(false), 6000); // Unmount after animation
    return () => clearTimeout(timeout);
  }, []);

  if (!shouldRender) return null;

  return (
    <section
      className="fixed-bottom d-flex justify-content-center slide-banner"
      style={{
        padding: "10px 0",
        backgroundColor: "transparent",
        zIndex: 1050,
      }}
    >
      <style>{`
        @keyframes slideSlowLeftToRight {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          40% {
            transform: translateX(0%);
            opacity: 1;
          }
          60% {
            transform: translateX(0%);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .slide-banner {
          animation: slideSlowLeftToRight 6s ease-in-out forwards;
        }
      `}</style>

      <div
        className="container px-4 py-2 d-flex flex-column flex-md-row align-items-center justify-content-between shadow"
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          color: "#000",
        }}
      >
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <i className="bi bi-stars text-warning me-2" />
          <span className="fw-semibold">
            🚗 Hyderabad’s Largest Self-Drive Car Rental
          </span>
        </div>
        <div className="d-flex align-items-center small text-dark">
          <i className="bi bi-geo-alt-fill text-info me-2" />
          <span>Boduppal • Vanasthalipuram • Dilsukhnagar</span>
        </div>
      </div>
    </section>
  );
};

export default TopBanner;
