import { Link } from "react-router-dom";
import  {isAxiosError} from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import type {RegisterForm} from '../types'
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

export default function RegisterView() {

    const initialValues : RegisterForm = {
        name: "",
        email: "",
        handle: "",
        password: "",
        password_confirmation: ""
    }

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues});

    const password = watch('password')
    const handleRegister = async (formData : RegisterForm) => {
        try{
            const {data} = await api.post(`/auth/register`, formData)
            toast.success(data.message)
            reset()
        } catch (error) {
            if(isAxiosError(error)){
                toast.error(error.response?.data.message)
            } else {
                console.log(error)

            }
        }
    }

    return (
        <>
            <h1 className='text-4xl text-white font-bold'>Create account</h1>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('name', {
                            required: {
                                value: true,
                                message: "Name is required"
                            },
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email', {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail is not valid",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="User name without spaces"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('handle', {
                            required: {
                                value: true,
                                message: "Handle is required"
                            },
                         
                        })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password "
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Confirm Password</label>
                    <input
                        id="confirm_password"
                        type="password"
                        placeholder="Confirm Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: {
                                value: true,
                                message: "Confirm Password is required"
                            },
                            validate: (value) => value===password || "The passwords do not match"

                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}

                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Create Account'
                />
            </form>
            <nav className='mt-10'>
                <Link className='text-center text-white text-lg block'
                    to="/auth/login">Have an account?. Sign in </Link>
            </nav>
        </>
    );
};
