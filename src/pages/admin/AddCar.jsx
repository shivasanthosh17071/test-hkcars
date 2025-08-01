"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import { Button, Form, Card, Spinner } from "react-bootstrap";

const AddCar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // Redirect if token is missing
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    fuel: "",
    seats: "",
    transmission: "",
    price: "",
    description: "",
    features: "",
    featured: false,
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const validateForm = () => {
    for (let key in formData) {
      if (key !== "images" && key !== "featured" && !formData[key]) {
        alert(`Please fill the ${key} field.`);
        return false;
      }
    }
    if (formData.images.length === 0) {
      alert("Please upload at least one image.");
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (files.length > 3) {
      alert("You can only upload up to 3 images.");
      e.target.value = "";
      setFormData((prev) => ({ ...prev, images: [] }));
      setImagePreviews([]);
      return;
    }

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, and WEBP image formats are allowed.");
        e.target.value = "";
        setFormData((prev) => ({ ...prev, images: [] }));
        setImagePreviews([]);
        return;
      }
    }

    setFormData((prev) => ({ ...prev, images: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "features") {
          value
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
            .forEach((f) => form.append("features[]", f));
        } else if (key === "images") {
          value.forEach((file) => form.append("images", file));
        } else {
          form.append(key, value);
        }
      });

      const res = await axios.post("/cars/add", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        navigate("/admin/dashboard");
      } else {
        alert("Unexpected server response.");
      }
    } catch (error) {
      console.error("Add Car Error:", error);
      alert(error?.response?.data?.message || "Failed to add car.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <Card className="shadow p-4">
        <h3 className="mb-4 text-center">Add New Car</h3>
        <Form onSubmit={handleSubmit}>
          {/* Basic Fields */}
          <Form.Group className="mb-3">
            <Form.Label>Car Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter car name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>

          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hatchback / SUV / Sedan"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="mb-3 col-md-4">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Petrol / Diesel / EV"
                value={formData.fuel}
                onChange={(e) =>
                  setFormData({ ...formData, fuel: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3 col-md-4">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="number"
                value={formData.seats}
                onChange={(e) =>
                  setFormData({ ...formData, seats: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3 col-md-4">
              <Form.Label>Transmission</Form.Label>
              <Form.Control
                type="text"
                placeholder="Automatic / Manual"
                value={formData.transmission}
                onChange={(e) =>
                  setFormData({ ...formData, transmission: e.target.value })
                }
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Rental Price (₹/day)</Form.Label>
            <Form.Control
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Car Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write some details about the car"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Features (comma separated)</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., AC, Bluetooth, GPS"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
            />
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Car Images (max 3)</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            <Form.Text className="text-muted">Only JPG, PNG, WEBP allowed</Form.Text>
          </Form.Group>

          {imagePreviews.length > 0 && (
            <div className="mb-3 d-flex gap-2 flex-wrap">
              {imagePreviews.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`preview-${idx}`}
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>
          )}

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label="Feature this car"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" /> Uploading...
                </>
              ) : (
                "Add Car"
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddCar;
