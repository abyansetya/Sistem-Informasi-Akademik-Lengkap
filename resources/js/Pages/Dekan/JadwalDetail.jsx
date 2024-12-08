import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import search from "../../../../public/search-black.svg";

export default function JadwalDetail({
    user,
    roles,
    jadwalKuliah,
    dosen,
    prodi,
}) {
    const { post } = useForm();
    const [statusJadwal, setStatusJadwal] = useState(
        jadwalKuliah.data.map((jadwal) => ({
            jadwal_id: jadwal.jadwal_id,
            status: jadwal.status,
        }))
    );

    const [searchTerm, setSearchTerm] = useState("");

    const filteredjadwalKuliah = jadwalKuliah.data.filter((jadwal) =>
        jadwal.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatTime = (time) => time.split(":").slice(0, 2).join(":");

    // Fungsi untuk mengubah status
    const handleSetujui = (jadwal_id) => {
        post(`/Dekan/${jadwal_id}/setujuiJadwal`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusJadwal((prevStatus) =>
                    prevStatus.map((jadwal) =>
                        jadwal.jadwal_id === jadwal_id
                            ? { ...jadwal, status: "approved" }
                            : jadwal
                    )
                );
            },
        });
    };

    const handleTolak = (jadwal_id) => {
        post(`/Dekan/${jadwal_id}/tolakJadwal`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusJadwal((prevStatus) =>
                    prevStatus.map((jadwal) =>
                        jadwal.jadwal_id === jadwal_id
                            ? { ...jadwal, status: "rejected" }
                            : jadwal
                    )
                );
            },
        });
    };

    const handleReset = (jadwal_id) => {
        post(`/Dekan/${jadwal_id}/resetJadwal`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusJadwal((prevStatus) =>
                    prevStatus.map((jadwal) =>
                        jadwal.jadwal_id === jadwal_id
                            ? { ...jadwal, status: "onprocess" }
                            : jadwal
                    )
                );
            },
        });
    };

    const renderStatusButton = (jadwal) => {
        if (jadwal.status === "onprocess") {
            return (
                <>
                    <button
                        onClick={() => handleSetujui(jadwal.jadwal_id)}
                        className="w-[80px] rounded text-white font-poppins font-normal bg-cgreen-2 py-2"
                    >
                        Setujui
                    </button>
                    <button
                        onClick={() => handleTolak(jadwal.jadwal_id)}
                        className="w-[80px] rounded text-white font-poppins font-normal bg-cred-1 py-2"
                    >
                        Tolak
                    </button>
                </>
            );
        }
        return (
            <button
                onClick={() => handleReset(jadwal.jadwal_id)}
                className="w-[80px] rounded text-white font-poppins font-normal bg-cgrey-2 py-2"
            >
                Reset
            </button>
        );
    };

    const PaginationLinks = () => (
        <div className="flex justify-center mt-4">
            {jadwalKuliah.links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || "#"}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`mx-1 px-3 py-1 border rounded ${
                        link.active
                            ? "bg-blue-500 text-white"
                            : "bg-white text-black"
                    }`}
                    preserveScroll
                />
            ))}
        </div>
    );

    return (
        <AuthenticatedLayout1 role={roles}>
            <Head title="Detail Jadwal" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                <div className="flex border rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 p-6 items-center gap-[20px]">
                    <div className="w-[30%] flex flex-col">
                        <h1 className="font-bold text-[20px]">Profil</h1>
                        <img
                            src="/fotoprofil.svg"
                            alt="Profil"
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
                            Admin{" "}
                            {roles.length > 0 ? roles : "No role available"}
                        </p>
                        <p className="text-[18px]">
                            Fakultas Sains dan Matematika
                        </p>
                    </div>
                </div>

                <div className="flex border rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 p-6 items-center gap-[20px]">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold text-[20px]  mb-[5px]">
                                Detail Jadwal - {prodi.nama_prodi}
                            </h1>
                            <Link
                                href={route("dekan.jadwalkuliah")}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mb-2"
                            >
                                Kembali
                            </Link>
                        </div>
                        <div className="h-[4px] bg-black border w-full" />
                        <div className="flex items-center w-full justify-between mt-[10px]">
                            {/* Search Bar */}
                            <div className="w-[200px] h-[40px] bg-[#FFF6F6] shadow-lg flex items-center rounded-[10px] px-3 gap-2">
                                <input
                                    type="text"
                                    placeholder="Cari Mata Kuliah"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="focus:outline-none focus:ring-0 appearance-none w-full bg-transparent border-none text-sm text-gray-600"
                                />
                                <img
                                    src={search}
                                    alt="Cari"
                                    className="w-5 h-5"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto mt-4 rounded-lg">
                            {jadwalKuliah.data.length > 0 ? (
                                <table className="min-w-full table-auto bg-white shadow-md rounded-lg text-sm font-poppins">
                                    <thead>
                                        <tr className="bg-gray-100 text-black uppercase leading-normal">
                                            <th className="py-3 px-3 text-center">
                                                No
                                            </th>
                                            <th className="py-3 px-3 text-center">
                                                Mata Kuliah
                                            </th>
                                            <th className="py-3 px-3 text-center">
                                                Hari
                                            </th>
                                            <th className="py-3 px-3 text-center">
                                                Waktu
                                            </th>
                                            <th className="py-3 px-3 text-center">
                                                Status
                                            </th>
                                            <th className="py-3 px-3 text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 font-light">
                                        {filteredjadwalKuliah.map(
                                            (jadwal, index) => (
                                                <tr
                                                    key={jadwal.jadwal_id}
                                                    className="border-b hover:bg-gray-50"
                                                >
                                                    <td className="py-3 px-3 text-center">
                                                        {(jadwalKuliah.current_page -
                                                            1) *
                                                            jadwalKuliah.per_page +
                                                            index +
                                                            1}
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        {jadwal.Name}
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        {jadwal.hari}
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        {formatTime(
                                                            jadwal.jam_mulai
                                                        )}{" "}
                                                        -{" "}
                                                        {formatTime(
                                                            jadwal.jam_selesai
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-3 text-center">
                                                        <span
                                                            className={`${
                                                                jadwal.status ===
                                                                "approved"
                                                                    ? "text-green-500"
                                                                    : jadwal.status ===
                                                                      "rejected"
                                                                    ? "text-red-500"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {jadwal.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-3 text-center flex gap-2 justify-center">
                                                        {renderStatusButton(
                                                            jadwal
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-4 text-gray-500 font-poppins">
                                    Tidak ada jadwal untuk disetujui/ditolak
                                </div>
                            )}
                        </div>

                        <PaginationLinks />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout1>
    );
}
