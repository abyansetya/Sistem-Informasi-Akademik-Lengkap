import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import React from "react";
import { Chart, COLORS } from "@/Components/piechart";
import {
    dataPersetujuanDekan,
    dataProgressRuangKelas,
} from "@/Constants/ChartData";

function Dashboard({ user, roles, dosen }) {
    const role = roles.length > 0 ? roles : "No role available";

    return (
        <AuthenticatedLayout role={roles} dosen={dosen}>
            <Head title="Dashboard" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
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
                                {dosen.Name}
                            </p>
                            <p className="text-cgrey-2 text-[13px]">
                                NIP. {dosen.NIP}
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
                <div className="flex justify-between gap-[10px]">
                    <div className="flex border flex-col p-6 rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 w-[50%]">
                        <h1 className="font-bold text-[20px]">
                            Persetujuan Dekan
                        </h1>
                        <div className="w-full flex items-center justify-center">
                            <Chart data={dataPersetujuanDekan} />
                        </div>
                        {/* Legend Colors */}
                        <div className="mt-4 flex flex-col gap-2">
                            {dataPersetujuanDekan.map((entry, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        style={{
                                            backgroundColor: COLORS[index],
                                        }}
                                        className="w-[20px] h-[20px] border"
                                    ></div>
                                    <span>{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex border flex-col p-6 rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 w-[50%]">
                        <h1 className="font-bold text-[20px]">
                            Persetujuan Dekan
                        </h1>
                        <div className="w-full flex items-center justify-center">
                            <Chart data={dataProgressRuangKelas} />
                        </div>
                        {/* Legend Colors */}
                        <div className="mt-4 flex flex-col gap-2">
                            {dataProgressRuangKelas.map((entry, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <div
                                        style={{
                                            backgroundColor: COLORS[index],
                                        }}
                                        className="w-[20px] h-[20px] border"
                                    ></div>
                                    <span>{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
