"use client";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in renting a car. Can you help me?";
    const phoneNumber = "919603879248"; // Replace with actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
     <>
      <button
        className="whatsapp-float-btn"
        onClick={handleWhatsAppClick}
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="whatsapp-icon" />
      </button>

      <style>{`
        .whatsapp-float-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 58px;
          height: 58px;
          background-color: #25d366;
          border-radius: 14px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 18px rgba(37, 211, 102, 0.4);
          transition: all 0.3s ease;
          z-index: 999;
        }

        .whatsapp-float-btn:hover {
          background-color: #128c7e;
          transform: scale(1.1);
          box-shadow: 0 10px 24px rgba(18, 140, 126, 0.5);
        }

        .whatsapp-icon {
          color: white;
          width: 28px;
          height: 28px;
        }

        @media (max-width: 576px) {
          .whatsapp-float-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingWhatsApp;
