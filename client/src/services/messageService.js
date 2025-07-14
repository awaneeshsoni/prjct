import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")
// const {token} = useContext(AuthContext)
// const Authorization = `Bearer ${token}`;
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const messageService = {
    getMessages: () => {
        return axios.get(`${API}/messages`, authHeader())
    },

    addMessage: (data) => {
        return axios.post(`${API}/messages`, data, authHeader())
    },

    deleteMessage: (id) =>{
        return axios.delete(`${API}/messages/${id}`,authHeader())
    }
}

export default messageService