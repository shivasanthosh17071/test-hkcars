import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";


const EditCar = () => {
  const { id } = useParams();
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
    available: true,
    featured: false,
    newImages: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`/cars/${id}`);
        const car = res.data;
        setFormData({
          ...formData,
          name: car.name || "",
          brand: car.brand || "",
          type: car.type || "",
          fuel: car.fuel || "",
          seats: car.seats || "",
          transmission: car.transmission || "",
          price: car.price || "",
          description: car.description || "",
          features: car.features?.join(", ") || "",
          available: car.available,
          featured: car.featured,
          newImages: [],
        });
        setImagePreviews(car.images || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load car data.");
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (files.length > 3) {
      alert("You can only upload up to 3 images.");
      e.target.value = "";
      setFormData((prev) => ({ ...prev, newImages: [] }));
      setImagePreviews([]);
      return;
    }

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, and WEBP image formats are allowed.");
        e.target.value = "";
        setFormData((prev) => ({ ...prev, newImages: [] }));
        setImagePreviews([]);
        return;
      }
    }

    setFormData((prev) => ({ ...prev, newImages: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("brand", formData.brand);
      form.append("type", formData.type);
      form.append("fuel", formData.fuel);
      form.append("seats", formData.seats);
      form.append("transmission", formData.transmission);
      form.append("price", formData.price);
      form.append("description", formData.description);
      form.append("featured", formData.featured);
      form.append("available", formData.available);

      formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
        .forEach((f) => form.append("features[]", f));

      if (formData.newImages.length > 0) {
        formData.newImages.forEach((file) => {
          form.append("images", file);
        });
      }

      await axios.put(`/cars/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Edit Car</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Car Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Brand</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Fuel</label>
            <input
              type="text"
              name="fuel"
              className="form-control"
              value={formData.fuel}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Transmission</label>
            <input
              type="text"
              name="transmission"
              className="form-control"
              value={formData.transmission}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Seats</label>
            <input
              type="number"
              name="seats"
              className="form-control"
              value={formData.seats}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Car Type</label>
            <input
              type="text"
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Features (comma-separated)</label>
            <input
              type="text"
              name="features"
              className="form-control"
              value={formData.features}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Replace Car Images (max 3)</label>
            <input
              type="file"
              className="form-control"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleNewImageChange}
            />
            <small className="text-muted">
              Uploading new images will replace the existing ones.
            </small>
          </div>

          {imagePreviews.length > 0 && (
            <div className="d-flex gap-2 flex-wrap mb-3">
              {imagePreviews.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
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

          <div className="col-md-6 mb-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            <label className="form-check-label">Available</label>
          </div>
          <div className="col-md-6 mb-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <label className="form-check-label">Featured</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Car"}
        </button>
      </form>
    </div>
  );
};

export default EditCar;
