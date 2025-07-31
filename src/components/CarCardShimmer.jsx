const CarCardShimmer = () => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="shimmer-card">
        <div className="shimmer-img shimmer" />
        <div className="p-3">
          <div className="shimmer-line shimmer w-75 mb-2" />
          <div className="shimmer-line shimmer w-50 mb-2" />
          <div className="shimmer-line shimmer w-100 mb-2" />
          <div className="shimmer-line shimmer w-25" />
        </div>
      </div>

      <style jsx>{`
        .shimmer-card {
          background: #fff;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }

        .shimmer-img {
          height: 180px;
          background-color: #e0e0e0;
        }

        .shimmer-line {
          height: 12px;
          border-radius: 4px;
          background-color: #e0e0e0;
        }

        .shimmer {
          position: relative;
          overflow: hidden;
        }

        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmerMove 1.5s infinite;
        }

        @keyframes shimmerMove {
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default CarCardShimmer
