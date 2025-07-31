"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Car,
  Shield,
  Clock,
  Award,
  ArrowRight,
  CheckCircle,
  Phone,
  MessageCircle,
  MapPin,
  Star,
  Users,
  Globe,
  Sparkles,
  CreditCard,
  Headphones,
  Navigation,
  Heart,
  ThumbsUp,
  Target,
  Compass,
  Gift,
  Package,
  Book,
  

} from "lucide-react"
import { useCarContext } from "../context/CarContext"
import HeroCarousel from "../components/HeroCarousel"
import FeaturedCarsCarousel from "../components/FeaturedCarsCarousel"
import TestimonialCarousel from "../components/TestimonialCarousel"
import LoadingSpinner from "../components/LoadingSpinner"

const Home = () => {
  const { getFeaturedCars, loading } = useCarContext()
  const [featuredCars, setFeaturedCars] = useState([])

  useEffect(() => {
    setFeaturedCars(getFeaturedCars())
  }, [])

 const services = [
  {
    title: "Wide Coverage Across Hyderabad",
    description:
      "We serve multiple key areas including Boduppal, Vanasthalipuram, and Dilsukhnagar with 24/7 service availability.",
    color: "primary",
    icon: <MapPin size={32} />,
    features: ["Multiple pickup locations", "Doorstep delivery", "Pan-city access"],
  },
  {
    title: "Flexible Rental Plans",
    description:
      "Choose from hourly, daily, weekly, or monthly plans to suit your needs — perfect for both short and long trips.",
    color: "success",
    icon: <Clock size={32} />,
    features: ["Hourly to Monthly rentals", "Tourist-friendly options", "No account needed"],
  },
  
  {
    title: "Value-Added Services",
    description:
      "Enjoy added convenience with GPS, insurance, doorstep delivery, and fuel options — all under one roof.",
    color: "warning",
    icon: <Package size={32} />,
    features: ["GPS, Insurance", "Doorstep pickup", "Fuel plans available"],
  },
{
  title: "International Tourist Friendly",
  description:
    "Visiting from abroad? We welcome tourists with easy booking and passport-based verification.",
  color: "primary",
  icon: <Globe size={32} />,
  features: ["Tourist bookings accepted", "No local ID required", "English support available"],
},
];

  const processSteps = [
    {
      step: "1",
      title: "Select Your Ride",
      description: "Choose from our premium collection of vehicles that suit your style and needs.",
      icon: <Car size={24} />,
      color: "primary",
      image: "https://images.unsplash.com/photo-1592891056565-d035c022bfdb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      step: "2",
      title: "Book Instantly",
      description: "Complete your reservation with our secure, lightning-fast booking process.",
      icon: <CreditCard size={24} />,
      color: "warning",
      image: "https://images.unsplash.com/photo-1643792801605-1f8081811439?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyJTIwa2V5c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      step: "3",
      title: "Hit the Road",
      description: "Pick up your car and start your adventure with complete freedom and flexibility.",
      icon: <Navigation size={24} />,
      color: "success",
      image: "https://images.unsplash.com/photo-1536825591064-574efec257f2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]





  if (loading) {
    return <LoadingSpinner text="Loading premium experience..." />
  }

  return (
    <div
      className="position-relative"
      style={{
        animation: "fadeIn 0.8s ease-in-out",
      }}
    >
      {/* Fixed Background Image */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1592186383436-5eaa625b59d9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          zIndex: -2,
        }}
      />

      {/* Animated Background Overlay */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(45deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 25%, rgba(16, 185, 129, 0.1) 50%, rgba(245, 158, 11, 0.1) 75%, rgba(239, 68, 68, 0.1) 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
          zIndex: -1,
        }}
      />

      {/* Main Content */}
   <div className="fade-in">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Quick Stats Banner */}
      <section
        className="py-4"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container">
          <div className="row text-center text-white">
            <div className="col-6 col-md-3 mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <Car size={24} className="me-2" />
                <div>
                  <div className="h5 mb-0 fw-bold">100+</div>
                  <small className="opacity-75">Premium Cars</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <Users size={24} className="me-2" />
                <div>
                  <div className="h5 mb-0 fw-bold">50K+</div>
                  <small className="opacity-75">Happy Customers</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <MapPin size={24} className="me-2" />
                <div>
                  <div className="h5 mb-0 fw-bold">25+</div>
                  <small className="opacity-75">Cities Covered</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center justify-content-center">
                <Star size={24} className="me-2" fill="currentColor" />
                <div>
                  <div className="h5 mb-0 fw-bold">4.9</div>
                  <small className="opacity-75">Average Rating</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Featured Cars Section */}
<section className="py-5" style={{ background: "var(--bg-secondary)" }}>
  <div className="container">
    <div className="row align-items-center mb-4">
      <div className="col-12 col-lg-6 mb-4 mb-lg-0">
        {/* <div className="d-flex align-items-center mb-2">
          <Sparkles size={20} className="text-primary me-2" />
          <span className="badge bg-primary text-white px-3 py-2 rounded-pill">
            Featured Collection
          </span>
        </div> */}
        <h2 className="h4 h-lg-2 fw-bold text-gradient mb-2">
           Your drive - our pride
        </h2>
        <p className="text-muted mb-0 small">
         We're proudly serving you from our key locations across Hyderabad. Visit our branches at Vanasthalipuram, Boduppal, and Dilsukhnagar.
        </p>
      </div>
      <div className="col-12 col-lg-6 text-lg-end text-center">
        <Link to="/cars" className="btn btn-primary btn-sm btn-lg-lg px-3 py-2">
          <Globe size={18} className="me-1" />
          View All Cars
          <ArrowRight className="ms-1" size={18} />
        </Link>
      </div>
    </div>

    <div className="row">
      <div className="col-12">
        <FeaturedCarsCarousel />
      </div>
    </div>
  </div>
</section>

      {/* How It Works Section */}
      <section className="py-5" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-5">
          
            <h2 className="display-5 fw-bold text-gradient mb-3">
             Simple Process : Book in 3 Easy Steps
            </h2>
            <p
              className="lead text-muted mx-auto"
              style={{ maxWidth: "600px" }}
            >
              Get started with DriveEasy in just three simple steps and begin
              your premium driving experience.
            </p>
          </div>

          <div className="row">
            {processSteps.map((step, index) => (
              <div key={index} className="col-lg-4 mb-4">
                <div className="premium-card h-100 overflow-hidden">
                  <div className="position-relative">
                    <img
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 start-0 m-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                        style={{
                          width: "40px",
                          height: "40px",
                          background: `var(--${step.color}-color)`,
                          color: "white",
                        }}
                      >
                        {step.step}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          background: `var(--${step.color}-color)`,
                          color: "white",
                        }}
                      >
                        {step.icon}
                      </div>
                      <h5 className="fw-bold mb-0">{step.title}</h5>
                    </div>
                    <p className="text-muted">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Services Section */}
     {/* Services Section */}
<section className="py-5">
  <div className="container">
    <div className="text-center mb-5">
      <div className="d-flex align-items-center justify-content-center mb-3">
        <Award size={24} className="text-secondary me-2" />
        <span className="badge bg-secondary text-white px-3 py-2 rounded-pill">
          Our Services
        </span>
      </div>
      <h2 className="display-5 fw-bold text-gradient-secondary mb-3">
        Everything You Need
      </h2>
      <p
        className="lead text-light mx-auto"
        style={{ maxWidth: "700px" }}
      >
        Our self-drive car rentals offer full flexibility, transparent pricing,
        and a wide vehicle selection to meet your travel needs in and around Hyderabad.
      </p>
    </div>

    <div className="row">
      {services.map((service, index) => (
        <div key={index} className="col-lg-6 col-xl-3 mb-4">
          <div className="premium-card h-100 p-4 text-center">
            <div className="mb-4">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "80px",
                  height: "80px",
                  background: `var(--${service.color}-color)`,
                  color: "white",
                }}
              >
                {service.icon}
              </div>
              <h5 className="fw-bold mb-3">{service.title}</h5>
              <p className="text-muted mb-4">{service.description}</p>
            </div>
            <div className="mt-auto">
              {service.features.map((feature, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2">
                  <CheckCircle
                    size={16}
                    className={`text-${service.color} me-2`}
                  />
                  <small className="text-muted">{feature}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>







<section className="py-5" style={{ background: "var(--bg-secondary)" }}>
  <div className="container">
    <div className="row align-items-center">
      {/* Left Content about Hyderabad */}
      <div className="col-lg-6 mb-5 mb-lg-0">
        <div className="d-flex align-items-center mb-3">
          <MapPin size={24} className="text-primary me-2" />
          <span className="badge bg-primary text-white px-3 py-2 rounded-pill">
            Hyderabad’s Self-Drive Hub
          </span>
        </div>
        <h2 className="display-5 fw-bold text-gradient mb-4">
          Self-Drive Cars in Hyderabad
        </h2>
        <p className="lead text-muted mb-4">
          Discover the freedom of driving on your own terms with HK Self-Drive Cars – proudly serving Hyderabad since 2019. Whether you need a car for a quick day trip, weekend getaway, or business travel, we offer hassle-free rentals tailored to your schedule.
        </p>

        <ul className="list-unstyled">
          <li className="mb-3 d-flex">
            <CheckCircle size={20} className="text-success me-2 mt-1" />
            <span className="text-muted">
              Wide fleet of well-maintained cars — hatchbacks, sedans & SUVs
            </span>
          </li>
          <li className="mb-3 d-flex">
            <CheckCircle size={20} className="text-success me-2 mt-1" />
            <span className="text-muted">
              Doorstep delivery available across Hyderabad
            </span>
          </li>
          <li className="mb-3 d-flex">
            <CheckCircle size={20} className="text-success me-2 mt-1" />
            <span className="text-muted">
              Simple booking — just a valid driving license & ID proof
            </span>
          </li>
          <li className="mb-3 d-flex">
            <CheckCircle size={20} className="text-success me-2 mt-1" />
            <span className="text-muted">
              Serving all key localities including Vanasthalipuram, Boduppal & Dilsukhnagar
            </span>
          </li>
        </ul>

        <div className="badge bg-light text-dark px-3 py-2 rounded-pill">
          Trusted by 50,000+ customers in Hyderabad
        </div>
      </div>

      {/* Right Image + Instagram */}
      <div className="col-lg-6">
        <div className="position-relative mb-4">
          <div className="glass-card p-4">
            <img
              src="https://images.unsplash.com/photo-1710225358761-4f5891df657d?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Self Drive Car Experience"
              className="img-fluid rounded-3"
            />
          </div>

          {/* Floating Ratings */}
          <div className="position-absolute top-0 end-0 translate-middle">
            <div className="glass-card p-3 text-center">
              <div className="h4 text-primary mb-0">4.9★</div>
              <small className="text-muted">Customer Rating</small>
            </div>
          </div>

          <div className="position-absolute bottom-0 start-0 translate-middle">
            <div className="glass-card p-3 text-center">
              <div className="h4 text-success mb-0">24/7</div>
              <small className="text-muted">Support</small>
            </div>
          </div>
        </div>

     
      </div>
    </div>
  </div>
</section>




      {/* Testimonials Section */}
      <TestimonialCarousel />

      {/* Contact & CTA Section */}
   <section
  className="py-5 position-relative overflow-hidden"
  style={{
    // background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
  }}
>


  <div className="container position-relative text-white">
    <div className=" row align-items-center  shadow-lg rounded-4"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
      <div  className=" col-lg-8 p-4 "
         >
        <div className="d-flex align-items-center mb-3">
          <Sparkles size={28} className="text-warning me-2" />
          <span className="badge bg-light text-dark px-3 py-2 rounded-pill fw-bold shadow-sm">
            Ready to Drive?
          </span>
        </div>
        <h2 className="display-5 text-white fw-bold mb-3">
          Start Your Journey with HK Self Drive Cars
        </h2>
        <p className="lead mb-4" style={{ opacity: 0.9 }}>
          Explore a wide range of vehicles for daily, weekly, or monthly
          rentals. Enjoy 24/7 customer care, doorstep delivery, and bookings
          made easy—just with your license and ID.
        </p>

        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="d-flex align-items-center">
              <Phone size={20} className="me-2 text-warning" />
              <div>
                <div className="fw-bold">Call Us</div>
                <small className="opacity-75">96038 79248 / 79815 92802</small>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="d-flex align-items-center">
              <MessageCircle size={20} className="me-2 text-warning" />
              <div>
                <div className="fw-bold">WhatsApp</div>
                <small className="opacity-75">96038 79248</small>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="d-flex align-items-center">
              <MapPin size={20} className="me-2 text-warning" />
              <div>
                <div className="fw-bold">Service Areas</div>
                <small className="opacity-75">
                  Boduppal, Vanasthalipuram, Dilsukhnagar
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 text-center">
        <div
          className="p-4 "
          style={{
           
            borderLeft: "3px solid rgba(255, 255, 255, 1)",
          }}
        >
          <h5 className="fw-bold mb-3 text-white">Instant Car Booking</h5>
          <p className="mb-4" style={{ opacity: 0.9 }}>
            Rent your vehicle in just 2 minutes.
          </p>

          <div className="d-grid gap-3">
            <Link to="/cars" className="btn btn-warning btn-lg text-dark fw-bold">
              <Car className="me-2" size={20} />
              Book Now
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline-light btn-lg fw-bold"
              style={{ borderColor: "#ffc107" }}
            >
              <Users className="me-2" size={20} />
              Talk to Team
            </Link>
          </div>

          <div className="row mt-4 text-center text-white">
            <div className="col-4">
              <Shield size={20} className="text-warning mb-1" />
              <div className="small fw-bold">Insured</div>
            </div>
            <div className="col-4">
              <Clock size={20} className="text-warning mb-1" />
              <div className="small fw-bold">24x7</div>
            </div>
            <div className="col-4">
              <Star size={20} className="text-warning mb-1" fill="currentColor" />
              <div className="small fw-bold">Top Rated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
     {/* Store Locations Section */}
<section className="py-5 bg-light">
  <div className="container">
    <div className="text-center mb-5">
      <div className="d-flex align-items-center justify-content-center mb-3">
        <MapPin size={24} className="text-primary me-2" />
        <span className="badge bg-primary text-white px-3 py-2 rounded-pill">
          Our Locations
        </span>
      </div>
      <h2 className="display-5 fw-bold text-gradient mb-3">Visit Our Branches</h2>
      <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
        We’re available in multiple cities! Find the nearest store and book your ride in person.
      </p>
    </div>

    <div className="row g-4">
  {/* Location Cards */}
  <div className="col-md-4">
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title fw-bold">Boduppal Branch</h5>
        <p className="card-text text-muted">
          Near Boduppal X Roads, Hyderabad, Telangana - 500092
        </p>
        <p className="mb-1"><Phone size={14} className="me-2" />+91 96038 79248</p>
        <p><MessageCircle size={14} className="me-2" />hkselfdrivecars1122@gmail.com</p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title fw-bold">Vanasthalipuram Branch</h5>
        <p className="card-text text-muted">
          Near Vanasthalipuram Police Station, Hyderabad, Telangana - 500070
        </p>
        <p className="mb-1"><Phone size={14} className="me-2" />+91 79815 92802</p>
        <p><MessageCircle size={14} className="me-2" />hkselfdrivecars1122@gmail.com</p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title fw-bold">Dilsukhnagar Branch</h5>
        <p className="card-text text-muted">
          Opp. Metro Station, Dilsukhnagar, Hyderabad, Telangana - 500036
        </p>
        <p className="mb-1"><Phone size={14} className="me-2" />+91 63000 98395</p>
        <p><MessageCircle size={14} className="me-2" />hkselfdrivecars1122@gmail.com</p>
      </div>
    </div>
  </div>
</div>


  
  </div>
</section>

    </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .btn:hover {
          transform: translateY(-2px);
        }

       

        .position-relative {
          position: relative;
        }

        .position-fixed {
          position: fixed;
        }

        .position-absolute {
          position: absolute;
        }
      `}</style>
    </div>
  )
}

export default Home
