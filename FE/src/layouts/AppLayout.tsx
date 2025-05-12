
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getUser } from "../api/DevTreeApi";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    const {data, isError, isLoading} = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false,
    })

    if (isLoading) return 'Cargando...'
    if (isError){
        return <Navigate to="/auth/login" />
    }
    // If there is data, show the layout
    if (data) return <DevTree data={data} />
}