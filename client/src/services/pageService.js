import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")
// const {token} = useContext(AuthContext)
// const Authorization = `Bearer ${token}`
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const pageService = {
    getPages: () => {
        return axios.get(`${API}/pages`, authHeader())
    },
    
    getPage: (id) => {
        return axios.get(`${API}/pages/${id}`, authHeader())
    },
    getPublicPage: (slug) => {
        return axios.get(`${API}/pages/public/${slug}`)
    },
    createPage: (data) => {
        return axios.post(`${API}/pages`, data, authHeader())
    },
    editPage: (data) => {
        return axios.put(`${API}/pages/${data.id}`, data, authHeader())
    },
    deletePage: (slug) => {
        return axios.delete(`${API}/pages/${slug}`, authHeader())
    }
}

export default pageService;