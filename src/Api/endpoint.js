
import axios from "axios"
const baseURL="https://fakestoreapi.com";

export const axiosInstance=axios.create({
    baseURL
})
