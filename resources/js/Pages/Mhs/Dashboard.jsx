import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import person from "../../../../public/person.svg";
import LineChart from "@/Components/LineChartt";

function Dashboard({
    user,
    roles,
    mahasiswa,
    tahun_ajaran,
    prodi,
    doswal,
    rekapAll,
    rekapsmt,
    ipk,
    sksk,
    ipData,
}) {
    // Fungsi untuk memanipulasi dan mengurutkan data
    function formatLineChartData(data) {
        return data
            .sort((a, b) => a.Semester - b.Semester) // Mengurutkan berdasarkan Semester secara ascending
            .map((item) => ({
                name: `Semester ${item.Semester}`, // Mengubah Semester menjadi name
                IPs: parseFloat(item.IP_Semester), // Mengubah IP_Semester menjadi IPs
            }));
    }

    const LineChartData = formatLineChartData(ipData);

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
                                    NIM. {mahasiswa.NIM}
                                </p>
                                <p className="text-cgrey-2 text-[13px]">
                                    {prodi.nama_prodi} S1
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
                                    <p>{ipk}</p>
                                </div>
                                <div className="items-center flex-1 flex flex-col">
                                    <p>SKSK</p>
                                    <p>{sksk}</p>
                                </div>
                                <div className="items-center flex-1 flex flex-col">
                                    <p>Semester Akademik</p>
                                    <p> {tahun_ajaran.tahun}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 p-6 flex flex-col w-full items-center justify-center">
                        <div className="flex w-full mt-3 mb-6 ml-6 justify-between">
                            <p className="font-bold text-[20px]">
                                Statistik Mahasiswa/i
                            </p>
                            <div className="flex items-center gap-4  mr-6 ">
                                <div className="w-[50px] h-[5px] bg-[#8884d8]" />
                                <p className="font-medium">IP Semester</p>
                            </div>
                        </div>
                        <LineChart data={LineChartData} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
