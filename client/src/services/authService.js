import axios from "axios"

const API = import.meta.env.VITE_API_URL
const authService = {
    login: async (data) => {
        const response = await axios.post(`${API}/auth/login`, data)
        const {token, username } = response.data;
        console.log(response.data)
        if(token){
            localStorage.setItem("token", token)
            localStorage.setItem("username", username)
        }
        return response.data
    },
    signup: async (data) => {
        const response = await axios.post(`${API}/auth/signup`, data)
        const {token, username} = response.data;
        console.log(response.data)
        if(token){
            localStorage.setItem("token", token)
            localStorage.setItem("username", username)
        }
        return response.data;
    }
}

export default authService