import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import person from "../../../../public/person.svg";

function Dashboard({ user, roles, mahasiswa, doswal, rekapAll, rekapsmt }) {

    function sksk() {}

    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Dashboard" />

            <div className="py-12 font-poppins">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex border rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 p-6 items-center gap-[20px]">
                        <div className="w-[30%] flex flex-col">
                            <h1 className="font-bold text-[20px]">Profil</h1>
                            <img
                                src="../fotoprofil.svg"
                                alt=""
                                className="w-[120px] self-center mt-4"
                            />
                            <div className="items-center flex flex-col mt-4 w-full">
                                <p className="font-bold text-[18px]">
                                    {mahasiswa.Name}
                                </p>
                                <p className="text-cgrey-2 text-[13px]">
                                    NIP. {mahasiswa.NIM}
                                </p>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex w-full mb-[20px]">
                                <div className=" items-center flex-1 flex flex-col gap-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <img src={person} alt="" />
                                        <p className="font-bold text-cgrey-2">
                                            Dosen Wali
                                        </p>
                                    </div>
                                    <p className="translate-y-2 font-bold text-[20px]">
                                        {doswal.Name}
                                    </p>
                                    <p className="">NIP: {doswal.NIP}</p>
                                </div>
                                <div className="items-center flex-1 flex flex-col gap-5">
                                    <p className="font-bold text-cgrey-2">
                                        Semester
                                    </p>
                                    <p className="text-[20px] font-bold text-black">
                                        {rekapsmt[0].Semester}
                                    </p>
                                </div>
                                <div className="items-center flex-1 flex flex-col gap-5">
                                    <p className="font-bold text-cgrey-2 ">
                                        Status Akademik
                                    </p>
                                    <div className="w-[100px] bg-cgreen-2 rounded-md flex justify-center items-center py-1 text-white">
                                        {mahasiswa.status}
                                    </div>
                                </div>
                            </div>
                            <div className="h-[3px] border bg-black w-full" />
                            <div className="flex mt-[20px]">
                                <div className="items-center flex-1 flex flex-col ">
                                    <p>IPK</p>
                                    {/* {JSON.stringify(rekapsmt)} */}
                                    <p>{rekapsmt[0].IPK}</p>
                                </div>
                                <div className="items-center flex-1 flex flex-col">
                                    <p>SKSK</p>
                                    <p>84</p>
                                </div>
                                <div className="items-center flex-1 flex flex-col">
                                    <p>Semester Akademik</p>
                                    <p>2024/2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
