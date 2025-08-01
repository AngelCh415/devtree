import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "../components/NavigationTabs";
import { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLink";

type DevTreeProps = {
    data: User
}


export default function DevTree({data}: DevTreeProps) {
    const [enabledLinks, setEnabledLinks] =  useState<SocialNetwork[]>(JSON.parse(data.links).filter( (item:
        SocialNetwork) => item.enabled));

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled));
    }, [data]);

    return (
        <>
        <header className="bg-slate-800 py-5">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                <div className="w-full p-5 lg:p-0 md:w-1/3">
                    <img src="/logo.svg" className="w-full block" />
                </div>
                <div className="md:w-1/3 md:flex md:justify-end">
                    <button
                        className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                        onClick={() => {}}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </header>
        <div className="bg-gray-100  min-h-screen py-10">
            <main className="mx-auto max-w-5xl p-10 md:p-0">
                <NavigationTabs/>
                
                <div className="flex justify-end">
                    <Link 
                        className="font-bold text-right text-slate-800 text-2xl"
                        to={''}
                        target="_blank"
                        rel="noreferrer noopener"
                    >Visitar Mi Perfil: /{data.handle}</Link>
                </div>

                <div className="flex flex-col md:flex-row gap-10 mt-10">
                    <div className="flex-1 ">
                        <Outlet />
                    </div>
                    <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                        <p className="text-4xl text-center text-white">{data.handle}</p>
                        {data.image && 
                            <img src={data.image} alt="Profile Image" className="mx-auto max-w-[250px]"/> 
                        }
                        <p className="text-center text-lg font-black text-white">{data.description}</p>

                        <div className="mt-20 flex flex-col gap-5">
                            {enabledLinks.map((link) => (
                                <DevTreeLink key={link.name} link={link}/>
                            ))}
                            </div>
                    </div>
                </div>
            </main>
        </div>
        <Toaster position="top-right" />
    </>
    );
};
