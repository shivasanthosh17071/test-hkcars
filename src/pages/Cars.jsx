"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Car,
  Droplet,
  Users,
  List,
} from "lucide-react";
import axios from "../api/axiosConfig";
import { useAuth } from "../AuthContext";
import CarCard from "../components/CarCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Modal, Button } from "react-bootstrap";
import CarCardShimmer from "../components/CarCardShimmer";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode] = useState("grid");
  const [filterModalShow, setFilterModalShow] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    fuel: "",
    type: "",
    seats: "",
    available: false,
    sortBy: "name",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("/cars", {});
        setCars(res.data);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

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
          !filters.seats || car.seats >= Number.parseInt(filters.seats);
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

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.brand) count++;
    if (filters.fuel) count++;
    if (filters.type) count++;
    if (filters.seats) count++;
    if (!filters.available) count++;
    return count;
  };

  const brands = [...new Set(cars.map((car) => car.brand))];
  const fuelTypes = [...new Set(cars.map((car) => car.fuel))];
  const carTypes = [...new Set(cars.map((car) => car.type))];

  if (loading) {
    return (
      <>
        <LoadingSpinner text="Loading cars..." />
        <div className="container mt-4 fade-in">
          <div className="row">
            {Array.from({ length: 6 }).map((_, i) => (
              <CarCardShimmer key={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container mt-4 fade-in">
      <div className="row align-items-center mb-4">
        {/* Heading on the left */}
        <div className="col-12 col-lg-4">
          <h2 style={{ fontSize: "1.7rem" }} className="fw-bold mb-0">
            {" "}
            Discover Your Perfect Drive
          </h2>
        </div>

        {/* Search & Filters aligned to the right */}
        <div className="col-12 col-lg-8 d-flex flex-column flex-lg-row justify-content-lg-end gap-2 mt-3 mt-lg-0">
          <div
            className="flex-grow-1 flex-lg-grow-0"
            style={{ minWidth: "250px" }}
          >
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search car"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              {filters.search && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleFilterChange("search", "")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div>
            <Button
              variant="outline-primary"
              onClick={() => setFilterModalShow(true)}
            >
              <SlidersHorizontal size={16} className="me-2" />
              Filters{" "}
              {getActiveFiltersCount() > 0 && (
                <span className="badge bg-secondary ms-1">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Car List */}
      {filteredCars.length === 0 ? (
        <div className="text-center py-5">
          <Filter size={48} className="text-muted mb-3" />
          <h4>No cars found</h4>
          <p className="text-muted">
            Try adjusting your filters to see more results.
          </p>
          <button className="btn btn-primary" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      ) : (
        <div
          className={`row ${
            viewMode === "list"
              ? "row-cols-1"
              : "row-cols-1 row-cols-md-2 row-cols-lg-3"
          }`}
        >
          {filteredCars.map((car) => (
            <CarCard key={car._id} car={car} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* Filter Modal */}
      <Modal
        show={filterModalShow}
        onHide={() => setFilterModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <SlidersHorizontal size={18} className="me-2" /> Filters
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            {/* Brand */}
            <div className="col-6">
              <label className="form-label fw-semibold small">
                <Car size={14} className="me-1" /> Brand
              </label>
              <select
                className="form-select"
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

            {/* Fuel */}
            <div className="col-6">
              <label className="form-label fw-semibold small">
                <Droplet size={14} className="me-1" /> Fuel
              </label>
              <select
                className="form-select"
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

            {/* Type */}
            <div className="col-6">
              <label className="form-label fw-semibold small">
                <List size={14} className="me-1" /> Type
              </label>
              <select
                className="form-select"
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

            {/* Seats */}
            <div className="col-6">
              <label className="form-label fw-semibold small">
                <Users size={14} className="me-1" /> Min Seats
              </label>
              <select
                className="form-select"
                value={filters.seats}
                onChange={(e) => handleFilterChange("seats", e.target.value)}
              >
                <option value="">Any</option>
                <option value="4">4+ Seats</option>
                <option value="5">5+ Seats</option>
                <option value="7">7+ Seats</option>
              </select>
            </div>

            {/* Available */}
            <div className="col-12">
              <div className="form-check form-switch mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="availableSwitch"
                  checked={filters.available}
                  onChange={(e) =>
                    handleFilterChange("available", e.target.checked)
                  }
                />
                <label
                  className="form-check-label ms-2 fw-semibold small"
                  htmlFor="availableSwitch"
                >
                  Available Only
                </label>
              </div>
            </div>

            {/* Sort */}
            <div className="col-12">
              <label className="form-label fw-semibold small">Sort By</label>
              <select
                className="form-select"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={clearFilters}>
            Clear All
          </Button>
          <Button variant="primary" onClick={() => setFilterModalShow(false)}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cars;
