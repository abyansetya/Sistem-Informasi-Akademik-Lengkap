import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import { Chart, COLORS } from "@/Components/piechart";

function monitoringMK({ user, roles }) {
    const courseData = [
        { name: "Terisi", value: 120 },
        { name: "Belum Terisi", value: 80 },
    ];

    const prioritasData = [
        { name: "Terisi", value: 105 },
        { name: "Belum Mengisi", value: 25 },
    ];

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Monitoring Matakuliah" />
            <div className="py-12 px-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                    {/* Section Monitoring mata kuliah */}
                    <div className="flex flex-col border rounded-md bg-white shadow-sm">
                        <div className="border-b-2 border-black w-max-auto ml-[40px] mt-5 w-[93%] ">
                            <p className="text-[30px] md:text-[24px] font-bold">
                                Monitoring Mata Kuliah
                            </p>
                        </div>
                        <div className="flex flex-col m-10">
                            <p className="font-semibold text-[16px]">
                                Nama Mata kuliah
                            </p>
                            <div className=""></div>
                            <p className="font-semibold text-[16px] pt-5">
                                Semester Prioritas{" "}
                                <span className="pl-[100px] font-extralight">5</span>
                            </p>
                        </div>
                        {/* Piechart */}
                        <div className="flex justify-around my-8">
                            <div className="flex flex-col border rounded-md bg-white shadow-sm p-4 ">
                                <div className=" w-max-auto mb-4 flex justify-center">
                                    <p className="font-semibold text-[14px]">
                                        Kursi Terisi
                                    </p>
                                </div>
                                <Chart
                                    data={courseData}
                                    width={250}
                                    height={250}
                                />
                                <p className="flex justify-center font-bold text-[13px]">
                                    120/200
                                </p>
                            </div>
                            <div className="flex flex-col border rounded-md bg-white shadow-sm p-4">
                                <div className="w-max-auto mb-4 flex justify-center">
                                    <p className="font-semibold text-[14px]">
                                        Semester Prioritas
                                    </p>
                                </div>
                                <Chart
                                    data={prioritasData}
                                    width={250}
                                    height={250}
                                />
                                <p className="flex justify-center font-bold text-[13px]">
                                    105/130
                                </p>
                            </div>
                            <div className="flex flex-col border rounded-md bg-white shadow-sm p-4 w-1/3 h-[260px]">
                                <div className="w-max-auto mb-4 flex justify-center">
                                    <p className="font-semibold text-[14px]">
                                        Kelas Terisi
                                    </p>
                                </div>
                                <div className="flex-grow">
                                    <table className="table-auto w-full text-center">
                                        <thead>
                                            <tr className="flex justify-between">
                                                <th className="pb-2 font-bold">
                                                    Kelas
                                                </th>
                                                <th className="pb-2 font-bold">
                                                    Kelas Terisi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="flex justify-between">
                                                <td className="py-2 pr-4">A</td>
                                                <td className="py-2 pr-4">
                                                    30 / 50
                                                </td>
                                            </tr>
                                            <tr className="flex justify-between">
                                                <td className="py-2 pr-4">B</td>
                                                <td className="py-2 pr-4">
                                                    30 / 50
                                                </td>
                                            </tr>
                                            <tr className="flex justify-between">
                                                <td className="py-2 pr-4">C</td>
                                                <td className="py-2 pr-4">
                                                    30 / 50
                                                </td>
                                            </tr>
                                            <tr className="flex justify-between">
                                                <td className="py-2 pr-4">D</td>
                                                <td className="py-2 pr-4">
                                                    30 / 50
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Piechart end */}
                        <div className="flex flex-col border rounded-md bg-white shadow-sm p-4 m-10">
                            <p className="font-bold text-[22px] border-b-2 border-black">
                                List Mahasiswa
                            </p>
                            <div className="flex justify-between mt-6">
                                <p className="font-semibold text-[17px] mt-6">
                                    Semester
                                </p>
                                <div className="relative w-[20%] mt-[15px]">
                                    <input
                                        type="text"
                                        placeholder="Nama mahasiswa"
                                        className="py-2 text-sm text-black font-light focus:outline-none rounded-lg w-full bg-cgrey-3 pl-4 pr-10"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                    <button className="absolute top-[19px] right-0 transform -translate-y-1/2 bg-cpurple-1 text-white p-2 flex items-center justify-center rounded-lg h-9.5 w-9 ">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 33 31"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M21.3125 18.0833H20.2262L19.8413 17.7346C21.1888 16.2621 22 14.3504 22 12.2708C22 7.63375 17.9987 3.875 13.0625 3.875C8.12625 3.875 4.125 7.63375 4.125 12.2708C4.125 16.9079 8.12625 20.6667 13.0625 20.6667C15.2762 20.6667 17.3112 19.9046 18.8787 18.6388L19.25 19.0004V20.0208L26.125 26.4662L28.1737 24.5417L21.3125 18.0833ZM13.0625 18.0833C9.63875 18.0833 6.875 15.4871 6.875 12.2708C6.875 9.05458 9.63875 6.45833 13.0625 6.45833C16.4862 6.45833 19.25 9.05458 19.25 12.2708C19.25 15.4871 16.4862 18.0833 13.0625 18.0833Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto pr-[50px] pl-[50px] mt-6">
                                <div className="overflow-hidden rounded-lg shadow-lg flex justify-around">
                                    <table className="min-w-full table-auto bg-cgrey-0 rounded-sm border-separate border-spacing-0 ">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 font-normal text-[15px]">
                                                    NAMA
                                                </th>
                                                <th className="px-4 py-2 font-normal text-[15px]">
                                                    NIM
                                                </th>
                                                <th className="px-4 py-2 font-normal text-[15px]">
                                                    SEMESTER
                                                </th>
                                                <th className="px-4 py-2 font-normal text-[15px]">
                                                    EDIT
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default monitoringMK;
