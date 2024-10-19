import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import LeftNavbar from "@/Layouts/LeftNavbar";

function Dashboard({ user, roles }) {
    const role = roles;
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Dashboard" />
            {/* <LeftNavbar /> */}

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins ">
                <div className="flex border rounded-[15px] shadow-lg shadow-gray-500/50 shadow-offset-x-2 shadow-offset-y-2 mt-6 p-4 items-center gap-[20px]">
                    <div className="w-[30%] flex flex-col">
                        <h1 className="font-bold text-[25px] ">Profil</h1>
                        <img
                            src="../fotoprofil.svg"
                            alt=""
                            className="w-[120px] self-center mt-4"
                        />
                        <div className="items-center flex flex-col mt-4 w-full">
                            <p className="font-bold text-[18px]">{user.name}</p>
                            <p className="text-cgrey-2 text-[13px]">
                                NIP. {user.NIM_NIP}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-[18px] mb-2">
                            Admin {role}
                        </p>
                        <p className="text-[18px]">
                            Fakultas Sains dan Matematika
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
