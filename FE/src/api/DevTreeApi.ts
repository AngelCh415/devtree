import { isAxiosError } from "axios"
import api from "../config/axios"
import { ProfileForm, User } from "../types"

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

export async function updateProfile(formData: ProfileForm) {
    try {
        const { data } = await api.patch<{ message: string }>('/user', formData)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.message){
            throw new Error(error.response?.data.message)
        }
    }
}

export async function updateProfileImage(file: File) {
    let formData = new FormData();
    formData.append('file', file);
    try {
        const { data } = await api.post('/user/image', formData)
        return data 
    } catch (error) {
        if (isAxiosError(error) && error.message){
            throw new Error(error.response?.data.message)
        }
    }
}