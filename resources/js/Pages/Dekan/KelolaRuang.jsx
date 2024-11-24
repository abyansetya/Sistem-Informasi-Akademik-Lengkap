import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import search from "../../../../public/search-black.svg";

export default function KelolaRuang({ user, roles, ruangkelas, dosen }) {
    const { post } = useForm();
    const [statusRuang, setStatusRuang] = useState(
        ruangkelas.data.map((ruang) => ({
            id: ruang.id,
            status: ruang.status,
        }))
    );

    // Fungsi untuk mengubah status
    const handleSetujui = (id) => {
        post(`/Dekan/${id}/setujui`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusRuang((prevStatus) =>
                    prevStatus.map((ruang) =>
                        ruang.id === id
                            ? { ...ruang, status: "approved" }
                            : ruang
                    )
                );
            },
        });
    };

    const handleTolak = (id) => {
        post(`/Dekan/${id}/tolak`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusRuang((prevStatus) =>
                    prevStatus.map((ruang) =>
                        ruang.id === id
                            ? { ...ruang, status: "rejected" }
                            : ruang
                    )
                );
            },
        });
    };

    const handleReset = (id) => {
        post(`/Dekan/${id}/reset`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusRuang((prevStatus) =>
                    prevStatus.map((ruang) =>
                        ruang.id === id
                            ? { ...ruang, status: "onprocess" }
                            : ruang
                    )
                );
            },
        });
    };

    const handleSetujuiAll = () => {
        post(`/Dekan/setujuiAll`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusRuang((prevStatus) =>
                    prevStatus.map((ruang) => ({
                        ...ruang,
                        status: "approved",
                    }))
                );
            },
        });
    };

    const handleResetAll = () => {
        post(`/Dekan/resetAll`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusRuang((prevStatus) =>
                    prevStatus.map((ruang) => ({
                        ...ruang,
                        status: "onprocess",
                    }))
                );
            },
        });
    };

    const PaginationLinks = () => (
        <div className="flex justify-center mt-4">
            {ruangkelas.links.map((link, index) => (
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

    const renderStatusButton = (ruang) => {
        if (ruang.status === "onprocess") {
            return (
                <>
                    <button
                        onClick={() => handleSetujui(ruang.id)}
                        className="w-[80px] rounded text-white font-poppins font-normal bg-cgreen-2 py-2"
                    >
                        Setujui
                    </button>
                    <button
                        onClick={() => handleTolak(ruang.id)}
                        className="w-[80px] rounded text-white font-poppins font-normal bg-cred-1 py-2"
                    >
                        Tolak
                    </button>
                </>
            );
        }
        return (
            <button
                onClick={() => handleReset(ruang.id)}
                className="w-[80px] rounded text-white font-poppins font-normal bg-cgrey-2 py-2"
            >
                Reset
            </button>
        );
    };

    const [searchTerm, setSearchTerm] = useState("");

    // Fungsi untuk memfilter ruang berdasarkan nama_ruang
    const filteredRuangKelas = ruangkelas.data.filter((ruang) =>
        ruang.nama_ruang.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout1 role={roles}>
            <Head title="Kelola ruang" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                <div className="flex border rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 p-6 items-center gap-[20px]">
                    <div className="w-[30%] flex flex-col">
                        <h1 className="font-bold text-[20px]">Profil</h1>
                        <img
                            src="../fotoprofil.svg"
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
                        <h1 className="font-bold text-[20px] mb-[5px]">
                            Ruang Kelas
                        </h1>
                        <div className="h-[4px] bg-black border w-full" />
                        <div className="flex items-center w-full justify-between mt-[10px]">
                            {/* Search Bar */}
                            <div className=" w-[200px] h-[40px] bg-[#FFF6F6] shadow-lg flex items-center rounded-[10px] px-3 gap-2">
                                <input
                                    type="text"
                                    placeholder="Ruang Kelas"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="focus:outline-none focus:ring-0 appearance-none w-full bg-transparent border-none text-sm text-gray-600"
                                />
                                <img
                                    src={search} // Ganti dengan path ikon Anda
                                    alt="Cari"
                                    className="w-5 h-5 "
                                />
                            </div>
                            <div className="border border-cgrey-2  gap-2 flex items-center p-2 ">
                                <button
                                    onClick={() => handleSetujuiAll()}
                                    className="text-sm px-1 rounded text-white font-poppins font-normal bg-cgreen-2 py-2"
                                >
                                    Setujui Semua
                                </button>
                                <button
                                    onClick={() => handleResetAll()}
                                    className="text-sm px-1 rounded text-white font-poppins font-normal bg-cgrey-2 py-2"
                                >
                                    Reset Semua
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto mt-4 rounded-lg">
                            {ruangkelas.data.length > 0 ? (
                                <table className="min-w-full table-auto bg-cgrey-0 rounded-lg shadow-md text-sm font-poppins">
                                    <thead>
                                        <tr className="bg-gray-100 text-black uppercase leading-normal">
                                            {[
                                                "Nama Ruang",
                                                "Gedung",
                                                "Kuota",
                                                "Program Studi",
                                                "Status",
                                                "Aksi",
                                            ].map((header, index) => (
                                                <th
                                                    key={index}
                                                    className="py-3 px-3 border-none text-center"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 border-none font-light">
                                        {filteredRuangKelas.length > 0 ? (
                                            filteredRuangKelas.map((ruang) => (
                                                <tr
                                                    key={ruang.id}
                                                    className="border-b border-none hover:bg-gray-50"
                                                >
                                                    <td className="py-2 px-2 border-none text-center">
                                                        {ruang.nama_ruang}
                                                    </td>
                                                    <td className="py-2 px-2 border-none text-center">
                                                        {ruang.gedung}
                                                    </td>
                                                    <td className="py-2 px-2 border-none text-center">
                                                        {ruang.kuota}
                                                    </td>
                                                    <td className="py-2 px-2 border-none text-center">
                                                        {ruang.nama_prodi ||
                                                            "Prodi Belum Ditetapkan"}
                                                    </td>
                                                    <td className="py-2 px-2 border-none text-center">
                                                        <p
                                                            className={`${
                                                                ruang.status ===
                                                                "approved"
                                                                    ? "text-green-500"
                                                                    : ruang.status ===
                                                                      "rejected"
                                                                    ? "text-red-500"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {ruang.status}
                                                        </p>
                                                    </td>
                                                    <td className="py-2 px-2 border-none text-center flex gap-2 justify-center">
                                                        {renderStatusButton(
                                                            ruang
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="text-center py-4 text-gray-500 font-poppins"
                                                >
                                                    Tidak ada ruangan yang
                                                    sesuai pencarian
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-4 text-gray-500 font-poppins">
                                    Tidak ada ruangan untuk disetujui/ditolak
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
