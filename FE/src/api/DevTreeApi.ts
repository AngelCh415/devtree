import { isAxiosError } from "axios"
import api from "../config/axios"

export async function getUser() {
    const token = localStorage.getItem('Auth_Token')
    try {
        const { data } = await api('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        } else {
            throw new Error("An unexpected error occurred")
        }
    }
}