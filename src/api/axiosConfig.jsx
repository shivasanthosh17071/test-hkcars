import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://car-rental-test-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
// testing server :   https://car-rental-test-1.onrender.com/api
//localhost :  http://localhost:8000/