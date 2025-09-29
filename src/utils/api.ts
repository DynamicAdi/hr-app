import axios from "axios"

export const api = axios.create({
    baseURL: `https://job-three-ashen.vercel.app/api`,
})