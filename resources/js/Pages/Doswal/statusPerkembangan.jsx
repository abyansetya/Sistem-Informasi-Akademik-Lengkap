import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function statusPerkembangan({ user, roles }) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Status Perkembangan" />
            <div className="py-12 px-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                    <div className="flex-col border border-gray-300 rounded-[10px] shadow-lg shadow-gray-100/50 mt-5 bg-white w-full h-full p-6">
                        <div className="border-b-2 border-black w-[85%] mx-auto">
                            <p className="text-[24px] md:text-[22px] font-bold pt-4">
                                Status Perkembangan
                                <span className="block">Mahasiswa</span>
                            </p>
                        </div>
                        {/* Tabel Status Perkembangan Mahasiswa */}
                        <div className="flex flex-col items-center p-6 border border-gray-300 m-10 rounded-[10px] w-[70%] mx-auto">
                            <div className="text-start">
                                <p className="text-[24px] font-bold">
                                    Mahasiswa Wali
                                </p>
                                <p className="text-[12px] text-cgrey-2">
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
                        </div>
                        {/* Search Bar and Dropdown under Mahasiswa Wali */}
                        <div className="flex items-center m-5 ml-[7.5%] space-x-4">
                            <p className="text-[24px] md:text-[22px] font-bold pt-4 pr-5">
                                Daftar Mahasiswa
                            </p>
                            <div className="flex items-center space-x-5">
                                {/* Search Bar */}
                                <div className="relative w-[45%]">
                                    <input
                                        type="text"
                                        placeholder="Nama mahasiswa"
                                        className="py-2 text-sm text-black font-light focus:outline-none rounded-lg w-full bg-cgrey-3 pl-4 pr-10"
                                    />
                                    <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-cpurple-1 text-white p-2 flex items-center justify-center rounded-lg h-9.5 w-9">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 33 31"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_107_8441)">
                                                <path
                                                    d="M21.3125 18.0833H20.2262L19.8413 17.7346C21.1888 16.2621 22 14.3504 22 12.2708C22 7.63375 17.9987 3.875 13.0625 3.875C8.12625 3.875 4.125 7.63375 4.125 12.2708C4.125 16.9079 8.12625 20.6667 13.0625 20.6667C15.2762 20.6667 17.3112 19.9046 18.8787 18.6388L19.25 19.0004V20.0208L26.125 26.4662L28.1737 24.5417L21.3125 18.0833ZM13.0625 18.0833C9.63875 18.0833 6.875 15.4871 6.875 12.2708C6.875 9.05458 9.63875 6.45833 13.0625 6.45833C16.4862 6.45833 19.25 9.05458 19.25 12.2708C19.25 15.4871 16.4862 18.0833 13.0625 18.0833Z"
                                                    fill="white"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_107_8441">
                                                    <rect
                                                        width="33"
                                                        height="31"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                                {/* Dropdown */}
                                <select className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 w-[200px]">
                                    <option value="">Angkatan</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                </select>
                            </div>
                        </div>
                        {/* Table Mahasiswa */}
                        <div className="overflow-x-auto pr-[90px] pl-[90px]">
                            <div className="overflow-hidden rounded-lg shadow-lg">
                                <table className="min-w-full table-auto bg-cgrey-0 rounded-sm border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                NAMA
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                NIM
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                ANGKATAN
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                STATUS
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default statusPerkembangan;
