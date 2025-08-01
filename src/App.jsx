import { Routes, Route, Navigate } from "react-router-dom";
import { CarProvider } from "./context/CarContext";
import ScrollToTop from "./flips/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import BookCar from "./pages/BookCar";
import ThankYou from "./pages/ThankYou";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Offers from "./pages/Offers";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCar from "./pages/admin/AddCar";
import EditCar from "./pages/admin/EditCar";
import Bookings from "./pages/admin/Bookings";
import UserLogin from "./pages/CustomerLogin";
import Account from "./pages/Account";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("adminToken"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/admin" replace />;
  };

  return (
    <CarProvider>
      <ScrollToTop />
      <div className="App" style={{ paddingTop: "90px" }}>
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<UserLogin />} />
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/book/:id" element={<BookCar />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/account" element={<Account />} />
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/add-car" element={  <AddCar />     }
            />
            <Route
              path="/admin/edit-car/:id"
              element={   <EditCar />}
            />
            <Route
              path="/admin/bookings"
              element={
              
                  <Bookings />
               
              }
            />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CarProvider>
  );
}

export default App;
