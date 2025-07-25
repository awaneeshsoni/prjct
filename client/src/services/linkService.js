import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const linkService = {
    getLinks: () => {
        return axios.get(`${API}/links`, authHeader());
    },

    getLink: (id) => {
        return axios.get(`${API}/links/${id}`, authHeader());
    },

    addLink: async  (data) => {
        const res = await axios.post(`${API}/links`, data, authHeader());
        return res.data.link
    },

    editLink: async (data) => {
        const res = await axios.put(`${API}/links/${data.id}`, data, authHeader());
        return res.data.link;
    },

    deleteLink: (id) => {
        return axios.delete(`${API}/links/${id}`, authHeader());
    },
};

export default linkService;
