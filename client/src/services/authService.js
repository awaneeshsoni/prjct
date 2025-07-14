import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token");
// const {token} = useContext(AuthContext)
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const authService = {
    login: async (data) => {
        const response = await axios.post(`${API}/auth/login`, data)
        return response;
    },
    signup: async (data) => {
        const response = await axios.post(`${API}/auth/signup`, data)
        return response;
    },
    updateUser: async (data) => {
        const response = await axios.put(`${API}/auth/user`, data ,authHeader())
        return response;
    },
    verifyUser: async (data) => {
        const response = await axios.get(`${API}/auth/verify`,authHeader())
        return response;
    }

}

export default authService