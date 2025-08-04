import { Shield, Award, Users, Clock, CheckCircle, Star, Car } from "lucide-react";

const About = () => {
  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "100+", label: "Cars in Fleet" },
    { number: "2019", label: "Year Established" },
    { number: "99%", label: "Customer Satisfaction" },
  ];

  const values = [
    { title: "Transparency", desc: "No hidden charges, clear pricing, and honest communication." },
    { title: "Quality", desc: "Well-maintained vehicles and exceptional service standards." },
    { title: "Customer First", desc: "Your satisfaction and safety are our top priorities." },
    { title: "Innovation", desc: "Continuously improving our services with the latest technology." },
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="py-5 text-white" style={{ background: "linear-gradient(135deg, var(--primary-color), var(--primary-light))" }}>
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">HK Self Drive Cars</h1>
          <p className="lead mb-3 fst-italic">
            "Unlock the freedom to explore. Rent a car and embark on your journey."<br />
            "Drive the experience. Your adventure begins with a rental car."
          </p>
          <p className="fw-medium">Trusted self-drive car rental services since 2019.</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4">Company Overview</h2>
          <p>
            <strong>HK Self Drive Cars</strong> is one of the best self-drive car rental services in Hyderabad,
            offering a wide selection of well-maintained vehicles for local and outstation travel.
            Whether you're planning a short city ride or a long road trip, our fleet includes hatchbacks,
            sedans, and SUVs to match your needs and budget.
          </p>
          <p>
            What makes us unique is our focus on <strong>customer convenience</strong> — with simple online booking,
            affordable pricing, 24/7 support, and flexible rental options. At HK Self Drive Cars,
            we don’t just rent cars — we deliver freedom, flexibility, and a great travel experience.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 mb-4">
                <div className="h2 text-primary fw-bold">{stat.number}</div>
                <div className="text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4">Mission & Vision</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Our Mission</h5>
              <p>
                To make travel easy and independent by providing clean, safe, and affordable
                self-drive cars with great customer service.
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Our Vision</h5>
              <p>
                To become South India’s most trusted self-drive car rental brand,
                offering the best experience in terms of service, value, and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4">Meet the Founder</h2>
          <div className="card shadow-sm border-0 p-4">
            <div className="d-flex align-items-center">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-4"
                style={{ width: 70, height: 70, fontSize: 28, fontWeight: "bold" }}
              >
                T
              </div>
              <div>
                <h5 className="mb-1">Tharun</h5>
                <p className="mb-2 text-muted">Founder, HK Self Drive Cars</p>
                <p className="mb-0">
                  Tharun started HK Self Drive Cars with a clear vision — to offer safe, flexible,
                  and budget-friendly travel options to people who want to explore on their own.
                  With a strong background in customer service and a passion for mobility,
                  he has built HK Self Drive Cars into a brand known for trust and quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Our Core Values</h2>
          <div className="row">
            {values.map((val, idx) => (
              <div key={idx} className="col-md-6 mb-4">
                <div className="d-flex">
                  <CheckCircle size={24} className="text-success me-3 mt-1" />
                  <div>
                    <h6 className="fw-semibold mb-1">{val.title}</h6>
                    <p className="text-muted mb-0">{val.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Milestones & Achievements</h2>
          <ul className="list-unstyled fs-5">
            <li className="mb-2">✅ Served over <strong>50,000+</strong> happy customers since 2019</li>
            <li className="mb-2">🚗 Grew the fleet to <strong>100+</strong> vehicles</li>
            <li className="mb-2">⭐ Achieved a <strong>99%</strong> customer satisfaction rate</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
