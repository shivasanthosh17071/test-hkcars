"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CarContext = createContext()

export const useCarContext = () => {
  const context = useContext(CarContext)
  if (!context) {
    throw new Error("useCarContext must be used within a CarProvider")
  }
  return context
}

// Sample car data
const initialCars = [
  {
    id: 1,
    name: "Toyota Camry",
    brand: "Toyota",
    type: "Sedan",
    fuel: "Petrol",
    seats: 5,
    transmission: "Automatic",
    price: 2500,
    available: true,
    featured: true,
    images: [
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+1",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+2",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+3",
    ],
    description: "Comfortable and reliable sedan perfect for city drives and long trips.",
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Music System"],
    rating: 4.5,
  },
  {
    id: 2,
    name: "Honda CR-V",
    brand: "Honda",
    type: "SUV",
    fuel: "Petrol",
    seats: 7,
    transmission: "Automatic",
    price: 3500,
    available: true,
    featured: true,
    images: [
      "/placeholder.svg?height=300&width=400&text=Honda+CR-V+1",
      "/placeholder.svg?height=300&width=400&text=Honda+CR-V+2",
      "/placeholder.svg?height=300&width=400&text=Honda+CR-V+3",
    ],
    description: "Spacious SUV ideal for family trips and adventures.",
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "GPS Navigation"],
    rating: 4.7,
  },
  {
    id: 3,
    name: "Maruti Swift",
    brand: "Maruti",
    type: "Hatchback",
    fuel: "Petrol",
    seats: 5,
    transmission: "Manual",
    price: 1800,
    available: true,
    featured: false,
    images: [
      "/placeholder.svg?height=300&width=400&text=Maruti+Swift+1",
      "/placeholder.svg?height=300&width=400&text=Maruti+Swift+2",
      "/placeholder.svg?height=300&width=400&text=Maruti+Swift+3",
    ],
    description: "Compact and fuel-efficient car perfect for city commuting.",
    features: ["Air Conditioning", "Power Steering", "Music System"],
    rating: 4.2,
  },
  {
    id: 4,
    name: "Hyundai Creta",
    brand: "Hyundai",
    type: "SUV",
    fuel: "Diesel",
    seats: 5,
    transmission: "Automatic",
    price: 3200,
    available: false,
    featured: true,
    images: [
      "/placeholder.svg?height=300&width=400&text=Hyundai+Creta+1",
      "/placeholder.svg?height=300&width=400&text=Hyundai+Creta+2",
      "/placeholder.svg?height=300&width=400&text=Hyundai+Creta+3",
    ],
    description: "Modern SUV with advanced features and excellent performance.",
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Sunroof", "GPS Navigation"],
    rating: 4.6,
  },
  {
    id: 5,
    name: "Tata Nexon",
    brand: "Tata",
    type: "SUV",
    fuel: "Electric",
    seats: 5,
    transmission: "Automatic",
    price: 2800,
    available: true,
    featured: false,
    images: [
      "/placeholder.svg?height=300&width=400&text=Tata+Nexon+1",
      "/placeholder.svg?height=300&width=400&text=Tata+Nexon+2",
      "/placeholder.svg?height=300&width=400&text=Tata+Nexon+3",
    ],
    description: "Eco-friendly electric SUV with cutting-edge technology.",
    features: ["Air Conditioning", "Power Steering", "ABS", "Airbags", "Fast Charging"],
    rating: 4.4,
  },
  {
    id: 6,
    name: "Mahindra Scorpio",
    brand: "Mahindra",
    type: "SUV",
    fuel: "Diesel",
    seats: 8,
    transmission: "Manual",
    price: 3800,
    available: true,
    featured: false,
    images: [
      "/placeholder.svg?height=300&width=400&text=Mahindra+Scorpio+1",
      "/placeholder.svg?height=300&width=400&text=Mahindra+Scorpio+2",
      "/placeholder.svg?height=300&width=400&text=Mahindra+Scorpio+3",
    ],
    description: "Rugged and powerful SUV perfect for off-road adventures.",
    features: ["Air Conditioning", "Power Steering", "ABS", "4WD", "High Ground Clearance"],
    rating: 4.3,
  },
]

const initialBookings = []

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState(initialCars)
  const [bookings, setBookings] = useState(initialBookings)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)

  // Car management functions
  const addCar = (newCar) => {
    const car = {
      ...newCar,
      id: Date.now(),
      available: true,
      rating: 0,
    }
    setCars((prev) => [...prev, car])
  }

  const updateCar = (id, updatedCar) => {
    setCars((prev) => prev.map((car) => (car.id === Number.parseInt(id) ? { ...car, ...updatedCar } : car)))
  }

  const deleteCar = (id) => {
    setCars((prev) => prev.filter((car) => car.id !== Number.parseInt(id)))
  }

  const toggleCarAvailability = (id) => {
    setCars((prev) => prev.map((car) => (car.id === Number.parseInt(id) ? { ...car, available: !car.available } : car)))
  }

  // Booking management functions
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    }
    setBookings((prev) => [...prev, newBooking])
    return newBooking.id
  }

  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === Number.parseInt(id) ? { ...booking, status } : booking)),
    )
  }

  // Filter and search functions
  const getFilteredCars = (filters) => {
    return cars.filter((car) => {
      const matchesBrand = !filters.brand || car.brand === filters.brand
      const matchesFuel = !filters.fuel || car.fuel === filters.fuel
      const matchesType = !filters.type || car.type === filters.type
      const matchesSeats = !filters.seats || car.seats >= Number.parseInt(filters.seats)
      const matchesAvailable = !filters.available || car.available === filters.available
      const matchesSearch =
        !filters.search ||
        car.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.brand.toLowerCase().includes(filters.search.toLowerCase())

      return matchesBrand && matchesFuel && matchesType && matchesSeats && matchesAvailable && matchesSearch
    })
  }

  const getFeaturedCars = () => {
    return cars.filter((car) => car.featured && car.available)
  }

  const getCarById = (id) => {
    return cars.find((car) => car.id === Number.parseInt(id))
  }

  const getBookingById = (id) => {
    return bookings.find((booking) => booking.id === Number.parseInt(id))
  }

  // Admin functions
  const adminLogin = (username, password) => {
    // Simple dummy validation
    if (username === "admin" && password === "admin123") {
      setIsAdmin(true)
      localStorage.setItem("isAdmin", "true")
      return true
    }
    return false
  }

  const adminLogout = () => {
    setIsAdmin(false)
    localStorage.removeItem("isAdmin")
  }

  // Check admin status on load
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin")
    if (adminStatus === "true") {
      setIsAdmin(true)
    }
  }, [])

  const value = {
    cars,
    bookings,
    isAdmin,
    loading,
    setLoading,
    addCar,
    updateCar,
    deleteCar,
    toggleCarAvailability,
    addBooking,
    updateBookingStatus,
    getFilteredCars,
    getFeaturedCars,
    getCarById,
    getBookingById,
    adminLogin,
    adminLogout,
  }

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>
}
