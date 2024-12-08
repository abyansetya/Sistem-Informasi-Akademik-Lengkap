import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, Link } from "@inertiajs/react";
import Calendar from "@/Components/Calendar";

function Dashboard({ user, roles, dosen }) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Dashboard" />

            <div className="py-12 px-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full items-stretch">
                        <div className="flex flex-col gap-[30px]">
                            <div className="flex flex-col sm:flex-row border rounded-xl shadow-sm p-4 items-center gap-4 bg-white w-full max-w-full sm:max-w-sm lg:max-w-md h-[30%]">
                                <img
                                    src="../fotoprofil.svg"
                                    alt="Dr. Sutikno"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <div className="flex flex-col justify-center">
                                    <p className="font-medium text-[24px] md:text-[18px] whitespace-nowrap">
                                        {dosen.Name}
                                    </p>
                                    <p className="text-cgrey-2 text-[12px] md:text-[13px]">
                                        Dosen Wali
                                    </p>
                                </div>
                            </div>
                            <div className="w-full max-w-full sm:max-w-sm lg:max-w-md shadow-md">
                                <Calendar />
                            </div>
                        </div>
                        <div className="flex flex-col gap-[30px] md:col-start-2">
                            {/* Card Mahasiswa Perwalian */}
                            <Link
                                href={route("doswal.mahasiswaPerwalian")}
                                className="hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-100/50 p-4 items-center justify-between bg-white w-full h-full hover:bg-gray-50">
                                    <img
                                        src="../mahasiswa.svg"
                                        alt=""
                                        className="h-[30px]"
                                    />
                                    <p className="text-[16px] md:text-[24px] font-medium">
                                        Mahasiswa perwalian
                                    </p>
                                </div>
                            </Link>

                            {/* Card Monitoring Matakuliah */}
                            <Link
                                href={route("doswal.monitoringMK")}
                                className="hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-100/50 p-4 items-center justify-between bg-white w-full h-full hover:bg-gray-50">
                                    <img
                                        src="../monitoring.svg"
                                        alt=""
                                        className="h-[30px]"
                                    />
                                    <p className="text-[16px] md:text-[24px] font-medium">
                                        Monitoring Matakuliah
                                    </p>
                                </div>
                            </Link>
                            {/* Verifikasi IRS */}
                            <Link
                                href={route("doswal.verifikasiIRS")}
                                className="hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-100/50 p-4 items-center justify-between bg-white w-full h-full hover:bg-gray-50">
                                    <img
                                        src="../verifikasi.svg"
                                        alt=""
                                        className="h-[30px]"
                                    />
                                    <p className="text-[16px] md:text-[24px] font-medium">
                                        Verifikasi IRS
                                    </p>
                                </div>
                            </Link>
                            {/* Status Perkembangan Mahasiswa */}
                            <Link
                                href={route("doswal.statusPerkembangan")}
                                className="hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-100/50 p-4 items-center justify-between bg-white w-full h-full hover:bg-gray-50">
                                    <img
                                        src="../perkembangan.svg"
                                        alt=""
                                        className="h-[30px]"
                                    />
                                    <p className="text-[16px] md:text-[24px] font-medium">
                                        Status Perkembangan Mahasiswa
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Container Status Perkembangan Mahasiswa */}
                    <div className="flex flex-col border rounded-[10px] shadow-lg shadow-gray-100/50 mt-[4%] bg-white w-full h-full">
                        <div className="border-b-2 border-black w-[85%] mx-auto">
                            <p className="text-[24px] md:text-[22px] font-bold pt-4">
                                Status Perkembangan
                                <span className="block">Mahasiswa</span>
                            </p>
                        </div>
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
                            <Link href={route("doswal.statusPerkembangan")}>
                                <button className="mt-6 px-10 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                    Periksa
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
