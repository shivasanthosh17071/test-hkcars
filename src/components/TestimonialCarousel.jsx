"use client";

import { Star, Quote } from "lucide-react";
import "./TestimonialCarousel.css"; // Keep your custom styles if needed

const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Raju Anna",
      location: "Dilsukhnagar",
      rating: 5,
      comment:
        "Baap re, car was super clean and smooth to drive. Staff also spoke nicely, no tension at all. Full paisa vasool!",
      avatar: "RA",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Sowmya Garu",
      location: "Vanasthalipuram",
      rating: 5,
      comment:
        "Online booking chesanu, delivery time ki ready ga vachesaru. No issues. My family enjoyed the trip. Thanks ra!",
      avatar: "SG",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Karthik Bhai",
      location: "Boduppal",
      rating: 4,
      comment:
        "Rate kuda okay, vehicle mileage super ichindi. Hyderabad lo ilaanti service chala rare boss. Keep it up!",
      avatar: "KB",
      date: "3 days ago",
    },
  ];

  return (
    <section className="py-5 bg-light font-manrope">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6">What Hyderabadis Say</h2>
          <p className="text-muted lead">Our customers feedbacks</p>
        </div>

        <div className="row justify-content-center">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 shadow-lg h-100 hover-scale rounded-4">
                <div className="card-body p-4">
                  <div className="mb-3 text-primary">
                    <Quote size={28} className="opacity-25" />
                  </div>

                  <div className="mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-warning me-1"
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <p className="text-muted fst-italic">"{testimonial.comment}"</p>

                  <div className="d-flex align-items-center mt-4">
                    <div className="avatar text-white bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h6 className="mb-0">{testimonial.name}</h6>
                      <small className="text-muted d-block">{testimonial.location}</small>
                      <small className="text-muted">{testimonial.date}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
