import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "./api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setAdminToken] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);

  // Load tokens from localStorage once on mount
  useEffect(() => {
    const savedAdminToken = localStorage.getItem("adminToken");
    const savedUserToken = localStorage.getItem("userToken");

    if (savedAdminToken) setAdminToken(savedAdminToken);
    if (savedUserToken) setUserToken(savedUserToken);
  }, []);

  // Fetch user data when userToken is set
  useEffect(() => {
    if (userToken) {
      axios
        .get("/users/customerData", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(
            "Error fetching user data:",
            error.response?.data || error.message
          );
        });
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ token, userToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
