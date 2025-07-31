"use client";

import { useState, useEffect, useRef } from "react";
import { Car, Users, Award, Clock } from "lucide-react";

const StatsCounter = () => {
  const [counters, setCounters] = useState({
    cars: 0,
    customers: 0,
    experience: 0,
    support: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: <Car size={40} className="text-primary mb-3" />,
      target: 50,
      suffix: "+",
      label: "Cars Available",
      key: "cars",
    },
    {
      icon: <Users size={40} className="text-primary mb-3" />,
      target: 500,
      suffix: "+",
      label: "Happy Customers",
      key: "customers",
    },
    {
      icon: <Award size={40} className="text-primary mb-3" />,
      target: 5,
      suffix: "+",
      label: "Years Experience",
      key: "experience",
    },
    {
      icon: <Clock size={40} className="text-primary mb-3" />,
      target: 24,
      suffix: "/7",
      label: "Customer Support",
      key: "support",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat) => {
      let current = 0;
      const increment = stat.target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        setCounters((prev) => ({
          ...prev,
          [stat.key]: Math.floor(current),
        }));
      }, 40);
    });
  };

  return (
    <section ref={sectionRef} className="py-5 bg-light">
      <div className="container">
        <div className="row text-center">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div className="h-100 p-4">
                {stat.icon}
                <div className="h2 text-primary fw-bold mb-2">
                  {counters[stat.key]}
                  {stat.suffix}
                </div>
                <div className="text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
