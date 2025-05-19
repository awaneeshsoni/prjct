import axios from "axios";
import React from "react";

const API = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")
const Authorization = `Bearer ${token}`

const pageService = {
    getPages: () => {
        return axios.get(`${API}/pages`, {
            headers: {
                Authorization: Authorization
            }
        })
    },
    
    getPage: (id) => {
        return axios.get(`${API}/pages/${id}`, {
            headers: {
                Authorization: Authorization
            }
        })
    },
    getPublicPage: (slug) => {
        return axios.get(`${API}/pages/public/${slug}`)
    },
    createPage: (data) => {
        return axios.post(`${API}/pages`, data, {
            headers: {
                Authorization: Authorization
            }
        })
    },
    editPage: (data) => {
        return axios.put(`${API}/pages/${data.id}`, data, {
            headers: {
                Authorization: Authorization
            }
        })
    },
    deletePage: (slug) => {
        return axios.delete(`${API}/pages/${slug}`, {
            headers: {
                Authorization: Authorization
            }
        })
    }
}

export default pageService;