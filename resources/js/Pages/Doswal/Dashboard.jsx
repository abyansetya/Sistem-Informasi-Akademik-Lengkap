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
                        <div className="inline-flex border rounded-[15px] shadow-lg shadow-gray-500/50 p-4 items-center gap-[20px] bg-white w-full max-w-[400px] h-full">
                            <img
                                src="../fotoprofil.svg"
                                alt="Dr. Sutikno"
                                className="w-[100px] h-[100px] rounded-full object-cover"
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
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-500/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Mahasiswa bimbingan
                            </p>
                            <span className="text-[14px] md:text-[20px] font-medium">
                                25
                            </span>
                        </div>

                        {/* Card Mahasiswa Perwalian */}
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-500/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Mahasiswa perwalian aktif
                            </p>
                            <span className="text-[14px] md:text-[20px] font-medium">
                                154
                            </span>
                        </div>

                        {/* Card Mahasiswa Non-Aktif */}
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-500/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Mahasiswa non-aktif
                            </p>
                            <span className="text-[14px] md:text-[20px] font-medium">
                                23
                            </span>
                        </div>

                        {/* Card Jadwal Mengajar */}
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-500/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Jadwal mengajar
                            </p>
                        </div>

                        {/* Card Status Perkembangan Mahasiswa */}
                        <div className="flex flex-row border rounded-[10px] shadow-lg shadow-gray-500/50 p-4 items-center justify-between bg-white w-full h-full">
                            <p className="text-[16px] md:text-[24px] font-medium">
                                Status Perkembangan Mahasiswa
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
