import axios from "axios"

export const api = axios.create({
    baseURL: `https://alpran-hr-service.vercel.app/api`,
})
