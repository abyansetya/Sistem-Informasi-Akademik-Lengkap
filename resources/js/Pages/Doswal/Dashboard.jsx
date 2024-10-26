import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function Dashboard({ user, roles }) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Dashboard" />

            <div className="py-12 px-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                    {/* Flex container untuk card-card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full items-stretch">
                        {/* Card Profil */}
                        <div className="flex flex-col sm:flex-row border rounded-xl shadow-sm p-4 items-center gap-4 bg-white w-full max-w-full sm:max-w-sm lg:max-w-md">
                            <img
                                src="../fotoprofil.svg"
                                alt="Dr. Sutikno"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <div className="flex flex-col justify-center">
                                <p className="font-medium text-[24px] md:text-[18px] whitespace-nowrap">
                                    {user.name}
                                </p>
                                <p className="text-cgrey-2 text-[12px] md:text-[13px]">
                                    Dosen Wali
                                </p>
                            </div>
                        </div>

                        {/* Card Mahasiswa Bimbingan */}
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-100/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Mahasiswa bimbingan
                            </p>
                            <span className="text-[14px] md:text-[20px] font-medium">
                                25
                            </span>
                        </div>

                        {/* Card Mahasiswa Perwalian */}
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-100/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Mahasiswa perwalian aktif
                            </p>
                            <span className="text-[14px] md:text-[20px] font-medium">
                                154
                            </span>
                        </div>

                        {/* Card Mahasiswa Non-Aktif */}
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-100/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Mahasiswa non-aktif
                            </p>
                            <span className="text-[14px] md:text-[20px] font-medium">
                                23
                            </span>
                        </div>

                        {/* Card Jadwal Mengajar */}
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-100/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Jadwal mengajar
                            </p>
                        </div>

                        {/* Card Status Perkembangan Mahasiswa */}
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-100/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Status Perkembangan Mahasiswa
                            </p>
                        </div>
                    </div>
                    {/* Container status Perkembangan Mahasiswa */}
                    <div className="flex flex-col border rounded-[10px] shadow-lg shadow-gray-100/50 mt-5 bg-white w-full h-full">
                        <div className=" border-b-2 border-black w-[85%] mx-auto">
                            <p className="text-[24px] md:text-[22px] font-bold pt-4">
                                Status Perkembangan
                                <span className="block">Mahasiswa</span>
                            </p>
                        </div>
                        {/* Tabel Status Perkembangan Mahasiswa */}
                        <div className="flex flex-col items-center p-6 border border-black m-10 rounded-[10px] w-[70%] mx-auto">
                            <div className="text-start">
                                <p className="text-[24px] font-bold">
                                    Mahasiswa Wali
                                </p>
                                <p className="text-[12px] text-gray-500">
                                    Semester ganjil 2024/2025
                                </p>
                            </div>
                            <div className="flex flex-row justify-around mt-4 bg-cgrey-1 p-[30px] rounded-lg w-[50%] mx-auto border-gray-900">
                                <div className="flex flex-col items-center mx-4">
                                    <p className="text-[15px]">Aktif</p>
                                    <p className="text-[16px] font-bold">154</p>
                                </div>
                                <div className="flex flex-col items-center mx-4">
                                    <p className="text-[15px]">Tidak aktif</p>
                                    <p className="text-[16px] font-bold text-red-500">
                                        23
                                    </p>
                                </div>
                                <div className="flex flex-col items-center mx-4">
                                    <p className="text-[15px]">Bimbingan</p>
                                    <p className="text-[16px] font-bold">25</p>
                                </div>
                            </div>
                            {/* Tombol Periksa */}
                            <button className="mt-6 px-10 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Periksa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
