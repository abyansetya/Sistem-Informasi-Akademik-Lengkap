import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import search from "../../../../public/search-black.svg";
import Swal from "sweetalert2";
import axios from "axios";

export default function RuangDetail({ user, roles, ruangan, dosen, prodi }) {
    const { post } = useForm();
    const [statusRuang, setStatusRuang] = useState(
        ruangan.data.map((ruang) => ({
            id: ruang.id,
            status: ruang.status,
        }))
    );

    const [searchTerm, setSearchTerm] = useState("");

    // Handle Setujui satu ruangan
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

    // Handle Tolak satu ruangan
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

    // Handle Reset satu ruangan
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

    // Handle Setujui semua ruangan prodi
    const handleSetujuiAll = () => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Semua ruangan akan disetujui!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Setujui",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`/Dekan/setujuiProdiRuang/${prodi.kode_prodi}`)
                    .then((response) => {
                        Swal.fire({
                            title: "Berhasil!",
                            text: "Semua ruangan telah disetujui.",
                            icon: "success",
                        }).then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menyetujui ruangan.",
                            "error"
                        );
                        console.error("Error:", error);
                    });
            }
        });
    };

    // Handle Reset semua ruangan prodi
    const handleResetAll = () => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Status semua ruangan akan direset!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Reset",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`/Dekan/resetProdiRuang/${prodi.kode_prodi}`)
                    .then((response) => {
                        Swal.fire({
                            title: "Berhasil!",
                            text: "Status semua ruangan telah direset.",
                            icon: "success",
                        }).then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat mereset status ruangan.",
                            "error"
                        );
                        console.error("Error:", error);
                    });
            }
        });
    };

    // Filter ruangan berdasarkan nama
    const filteredRuangan = ruangan.data.filter((ruang) =>
        ruang.nama_ruang.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render status button
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

    // Pagination Links Component
    const PaginationLinks = () => (
        <div className="flex justify-center mt-4">
            {ruangan.links.map((link, index) => (
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
            <Head title={`Kelola Ruang - ${prodi.nama_prodi}`} />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                {/* Profile Section */}
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

                {/* Main Content Section */}
                <div className="flex border rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 p-6 items-center gap-[20px]">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold text-[20px] mb-[5px]">
                                Ruang Kelas - {prodi.nama_prodi}
                            </h1>
                            <Link
                                href={route("dekan.kelolaruang")}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mb-2"
                            >
                                Kembali
                            </Link>
                        </div>
                        <div className="h-[4px] bg-black border w-full" />

                        {/* Search and Action Buttons */}
                        <div className="flex items-center w-full justify-between mt-[10px]">
                            <div className="w-[200px] h-[40px] bg-[#FFF6F6] shadow-lg flex items-center rounded-[10px] px-3 gap-2">
                                <input
                                    type="text"
                                    placeholder="Cari Ruang Kelas"
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

                        {/* Table */}
                        <div className="overflow-x-auto mt-4 rounded-lg">
                            {ruangan.data.length > 0 ? (
                                <table className="min-w-full table-auto bg-white shadow-md rounded-lg text-sm font-poppins">
                                    <thead>
                                        <tr className="bg-gray-100 text-black uppercase leading-normal">
                                            <th className="py-3 px-3 text-center">
                                                No
                                            </th>
                                            <th className="py-3 px-3 text-center">
                                                Nama Ruang
                                            </th>
                                            <th className="py-3 px-3 text-center">
                                                Gedung
                                            </th>
                                            <th className="py-3 px-3 text-center">
                                                Kuota
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
                                        {filteredRuangan.length > 0 ? (
                                            filteredRuangan.map(
                                                (ruang, index) => (
                                                    <tr
                                                        key={ruang.id}
                                                        className="border-b hover:bg-gray-50"
                                                    >
                                                        <td className="py-3 px-3 text-center">
                                                            {index + 1}
                                                        </td>
                                                        <td className="py-3 px-3 text-center">
                                                            {ruang.nama_ruang}
                                                        </td>
                                                        <td className="py-3 px-3 text-center">
                                                            {ruang.gedung}
                                                        </td>
                                                        <td className="py-3 px-3 text-center">
                                                            {ruang.kuota}
                                                        </td>
                                                        <td className="py-3 px-3 text-center">
                                                            <span
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
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-3 text-center">
                                                            <div className="flex gap-2 justify-center">
                                                                {renderStatusButton(
                                                                    ruang
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="text-center py-4"
                                                >
                                                    Tidak ada ruangan yang
                                                    sesuai dengan pencarian
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-4">
                                    Tidak ada ruangan untuk dikelola
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <PaginationLinks />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout1>
    );
}
