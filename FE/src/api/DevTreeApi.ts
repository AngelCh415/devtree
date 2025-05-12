import { isAxiosError } from "axios"
import api from "../config/axios"
import { User } from "../types"

export async function getUser() {
    try {
        const { data } = await api<User>('/user')
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        } else {
            throw new Error("An unexpected error occurred")
        }
    }
}