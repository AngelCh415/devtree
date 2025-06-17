import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";

export default function ProfileView() {
    const queryClient = useQueryClient();
    // Use the query client to get the user data from the cache
    // This assumes that the user data is stored under the key 'user'
    // If you are using a different key, replace 'user' with the appropriate key
    const data : User = queryClient.getQueryData(['user'])!;

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({defaultValues: {
        handle: data.handle,
        description: data.description,
    }});

    const handleUserProfileForm = (formData: ProfileForm) => {
        console.log(formData);
    }

    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    { ...register('handle', {
                        required: {
                            value: true,
                            message: 'El campo es requerido'
                        }
                    }) }

                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    { ...register('description') }
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ () => {} }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}