const LoadingSpinner = ({ text = "Finding the perfect car..." }) => {
  return (
    <>
      <div className=" w-100  d-flex flex-column align-items-center justify-content-center py-5">
        <div className="car-road-wrapper mb-4  w-75">
          <div className="car-icon">🚗</div>
          <div className="road-line" />
        </div>
        <p className="text-muted fw-semibold">{text}</p>
      </div>

      <style>{`
        .car-road-wrapper {
          position: relative;
          width: 160px;
          height: 60px;
        }

        .car-icon {
          font-size: 2rem;
          position: absolute;
          animation: drive 2s linear infinite;
        }

        .road-line {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          height: 4px;
          background: repeating-linear-gradient(
            to right,
            #999,
            #999 10px,
            transparent 10px,
            transparent 20px
          );
          border-radius: 2px;
        }

        @keyframes drive {
          0% {
            right: -40px;
          }
       
          100% {
            right: 560px;
          }
        }
      `}</style>
    </>
  );
};

export default LoadingSpinner;
