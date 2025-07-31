"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import axios from "../api/axiosConfig";
import { useAuth } from "../AuthContext";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Cars = () => {
  const { token } = useAuth();

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    fuel: "",
    type: "",
    seats: "",
    available: true,
    sortBy: "name",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("/cars", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(res.data);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [token]);

  const getFilteredCars = () => {
    return cars
      .filter((car) => {
        const matchesSearch = car.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const matchesBrand = !filters.brand || car.brand === filters.brand;
        const matchesFuel = !filters.fuel || car.fuel === filters.fuel;
        const matchesType = !filters.type || car.type === filters.type;
        const matchesSeats =
          !filters.seats || car.seats >= parseInt(filters.seats);
        const matchesAvailable = !filters.available || car.available === true;

        return (
          matchesSearch &&
          matchesBrand &&
          matchesFuel &&
          matchesType &&
          matchesSeats &&
          matchesAvailable
        );
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "name":
          default:
            return a.name.localeCompare(b.name);
        }
      });
  };

  useEffect(() => {
    if (!loading) {
      setFilteredCars(getFilteredCars());
    }
  }, [filters, cars, loading]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      brand: "",
      fuel: "",
      type: "",
      seats: "",
      available: true,
      sortBy: "name",
    });
  };

  const brands = [...new Set(cars.map((car) => car.brand))];
  const fuelTypes = [...new Set(cars.map((car) => car.fuel))];
  const carTypes = [...new Set(cars.map((car) => car.type))];

  if (loading) {
    return <LoadingSpinner text="Loading cars..." />;
  }

  return (
    <div className="mt-4 px-4 px-lg-4 fade-in">
      <div className="row">
        {/* Sidebar Filters */}
        <div
          className={`col-lg-3 ${showFilters ? "d-block" : "d-none d-lg-block"}`}
          style={{ fontSize: "0.85rem" }}
        >
          <div className="card mb-3" style={{ padding: "0.5rem" }}>
            <div className="card-header d-flex justify-content-between align-items-center py-2 px-3">
              <strong>Filters</strong>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={clearFilters}
                style={{ padding: "2px 6px", fontSize: "0.75rem" }}
              >
                Clear All
              </button>
            </div>
            <div className="card-body px-3 py-2">
              {/* Search */}
              <div className="mb-2">
                <label className="form-label mb-1">Search</label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text px-2">
                    <Search size={14} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search cars..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    style={{ fontSize: "0.8rem" }}
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-2">
                <label className="form-label mb-1">Brand</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div className="mb-2">
                <label className="form-label mb-1">Fuel Type</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.fuel}
                  onChange={(e) => handleFilterChange("fuel", e.target.value)}
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Car Type Filter */}
              <div className="mb-2">
                <label className="form-label mb-1">Car Type</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="">All Types</option>
                  {carTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seats Filter */}
              <div className="mb-2">
                <label className="form-label mb-1">Minimum Seats</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.seats}
                  onChange={(e) => handleFilterChange("seats", e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="4">4+ Seats</option>
                  <option value="5">5+ Seats</option>
                  <option value="7">7+ Seats</option>
                </select>
              </div>

              {/* Availability */}
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="availableOnly"
                    checked={filters.available}
                    onChange={(e) =>
                      handleFilterChange("available", e.target.checked)
                    }
                  />
                  <label className="form-check-label" htmlFor="availableOnly">
                    Available only
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Our Cars</h2>
              <p className="text-muted mb-0">
                {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary d-lg-none"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={16} />
              </button>

              <select
                className="form-select"
                style={{ width: "auto" }}
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>

              <div className="btn-group">
                <button
                  className={`btn ${
                    viewMode === "grid"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={16} />
                </button>
                <button
                  className={`btn ${
                    viewMode === "list"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {filteredCars.length === 0 ? (
            <div className="text-center py-5">
              <Filter size={48} className="text-muted mb-3" />
              <h4>No cars found</h4>
              <p className="text-muted">Try adjusting your filters.</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`row ${viewMode === "list" ? "row-cols-1" : ""}`}>
              {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
