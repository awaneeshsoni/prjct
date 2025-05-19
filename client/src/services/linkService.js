import React from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")
const Authorization = `Bearer ${token}`

const linkService = {
    getLinks: () => {
        return axios.get(`${API}/links`, {
            headers: {
                Authorization: Authorization,
            }
        });
    },

    getLink: (id) => {
        return axios.get(`${API}/links/${id}`, {
            headers: {
                Authorization: Authorization
            }
        })
    },

    addLink: (data) => {
        return axios.post(`${API}/links`, data, {
            headers: {
                Authorization: Authorization
            },
        })
    },

    editLink: (data) => {
        return axios.put(`${API}/links/${data.id}`, data, {
            headers: {
                Authorization: Authorization
            }
        })
    },

    deleteLink: (id) => {
        return axios.delete(`${API}/links/${id}`, {
            headers: {
                Authorization: Authorization
            }
        })
    }
}

export default linkService