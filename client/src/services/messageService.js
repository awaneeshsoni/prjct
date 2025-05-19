import axios from "axios";
import React from "react";

const API = import.meta.env.VITE_API_URL
const token = localStorage.getItem("token")
const Authorization = `Bearer ${token}`;

const messageService = {
    getMessages: () => {
        return axios.get(`${API}/messages`, {
            headers: {
                Authorization: Authorization
            }
        })
    },

    addMessage: (data) => {
        return axios.post(`${API}/messages`, data, {
            headers: {
                Authorization: Authorization
            }
        })
    },

    deleteMessage: (id) =>{
        return axios.delete(`${API}/messages/${id}`,{
            headers: {
                Authorization: Authorization
            }
        }
        )
    }
}

export default messageService