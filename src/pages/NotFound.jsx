"use client"
import { Link } from "react-router-dom"
import { Home, Car, ArrowLeft } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light fade-in">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-6">
            <div className="mb-4">
              <div className="display-1 text-primary fw-bold">404</div>
              <Car size={80} className="text-muted" />
            </div>

            <h2 className="mb-3">Oops! Page Not Found</h2>
            <p className="text-muted mb-4">
              The page you're looking for seems to have taken a different route. Don't worry, let's get you back on
              track!
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link to="/" className="btn btn-primary">
                <Home size={16} className="me-2" />
                Go Home
              </Link>
              <Link to="/cars" className="btn btn-outline-primary">
                <Car size={16} className="me-2" />
                Browse Cars
              </Link>
              <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
                <ArrowLeft size={16} className="me-2" />
                Go Back
              </button>
            </div>

            <div className="mt-5">
              <p className="text-muted small">
                If you believe this is an error, please{" "}
                <Link to="/contact" className="text-decoration-none">
                  contact us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
