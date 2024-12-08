import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import search from "../../../../public/search-black.svg";
import { ChevronDown, ChevronUp } from "lucide-react";
import _ from "lodash";
import Swal from "sweetalert2";
import axios from "axios";

export default function JadwalKuliah({
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

    const handleSetujuiProdi = (kodeProdi) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Semua jadwal untuk prodi ini akan disetujui!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Setujui",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                // Melakukan POST request dengan axios
                axios
                    .post(`/Dekan/setujuiProdiJadwal/${kodeProdi}`)
                    .then((response) => {
                        // Menampilkan swal jika berhasil
                        Swal.fire({
                            title: "Berhasil!",
                            text: "Semua jadwal telah disetujui.",
                            icon: "success",
                        }).then(() => {
                            // Reload halaman setelah user mengklik OK pada Swal
                            window.location.reload();
                        });
                    })
                    .catch((error) => {
                        // Menampilkan swal jika terjadi error
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menyetujui jadwal.",
                            "error"
                        );
                        console.error("Error saat melakukan request: ", error);
                    });
            }
        });
    };

    const handleTolakProdi = (kodeProdi) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Semua jadwal untuk prodi ini akan ditolak!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Tolak",
            cancelButtonText: "Batal",
            dangerMode: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Melakukan POST request untuk menolak semua jadwal
                axios
                    .post(`/Dekan/tolakProdiJadwal/${kodeProdi}`)
                    .then((response) => {
                        Swal.fire(
                            "Berhasil!",
                            "Semua jadwal telah ditolak.",
                            "success"
                        );
                        // Refresh halaman atau data setelah sukses
                        window.location.reload(); // Reload halaman
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menolak jadwal.",
                            "error"
                        );
                        console.error("Error saat melakukan request: ", error);
                    });
            }
        });
    };

    const handleResetProdi = (kodeProdi) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Semua jadwal untuk prodi ini akan direset!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Reset",
            cancelButtonText: "Batal",
            dangerMode: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Melakukan POST request untuk menolak semua jadwal
                axios
                    .post(`/Dekan/resetProdiJadwal/${kodeProdi}`)
                    .then((response) => {
                        Swal.fire(
                            "Berhasil!",
                            "Semua jadwal telah direset.",
                            "success"
                        );
                        // Refresh halaman atau data setelah sukses
                        window.location.reload(); // Reload halaman
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat reset jadwal.",
                            "error"
                        );
                        console.error("Error saat melakukan request: ", error);
                    });
            }
        });
    };

    const ProdiTable = () => {
        return (
            <div className="overflow-x-auto mt-4 rounded-lg">
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg text-sm font-poppins">
                    <thead>
                        <tr className="bg-gray-100 text-black uppercase leading-normal">
                            <th className="py-3 px-3 text-center">No</th>
                            <th className="py-3 px-3 text-center">
                                Program Studi
                            </th>
                            <th className="py-3 px-3 text-center">
                                Total Jadwal
                            </th>
                            <th className="py-3 px-3 text-center">
                                Detail Jadwal
                            </th>
                            <th className="py-3 px-3 text-center">Status</th>
                            <th className="py-3 px-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 font-light">
                        {filteredProdi.map((prodiItem, index) => {
                            const prodiSchedules = filteredjadwalKuliah.filter(
                                (jadwal) =>
                                    jadwal.nama_prodi === prodiItem.nama_prodi
                            );

                            // Hitung total jadwal
                            const scheduleCount = prodiSchedules.length;

                            // Cek apakah semua jadwal sudah memiliki status
                            const allSchedulesHaveStatus = prodiSchedules.every(
                                (jadwal) =>
                                    statusJadwal.some(
                                        (s) => s.jadwal_id === jadwal.jadwal_id
                                    )
                            );

                            // Cek apakah ada jadwal baru (tidak ada dalam statusJadwal)
                            const hasNewSchedule = prodiSchedules.some(
                                (jadwal) =>
                                    !statusJadwal.some(
                                        (s) => s.jadwal_id === jadwal.jadwal_id
                                    )
                            );

                            // Cek status approved hanya jika semua jadwal memiliki status
                            const allApproved =
                                !hasNewSchedule &&
                                prodiSchedules.length > 0 &&
                                prodiSchedules.every(
                                    (jadwal) =>
                                        statusJadwal.find(
                                            (s) =>
                                                s.jadwal_id === jadwal.jadwal_id
                                        )?.status === "approved"
                                );

                            // Cek status rejected
                            const allRejected =
                                !hasNewSchedule &&
                                prodiSchedules.length > 0 &&
                                prodiSchedules.every(
                                    (jadwal) =>
                                        statusJadwal.find(
                                            (s) =>
                                                s.jadwal_id === jadwal.jadwal_id
                                        )?.status === "rejected"
                                );

                            // Determine status text and color
                            let statusText = "";
                            let statusColor = "";

                            if (prodiSchedules.length === 0) {
                                statusText = "Belum ada jadwal";
                                statusColor = "text-gray-500";
                            } else if (hasNewSchedule) {
                                statusText = "Dalam proses";
                                statusColor = "text-yellow-500";
                            } else if (allApproved) {
                                statusText = "Disetujui";
                                statusColor = "text-green-500";
                            } else if (allRejected) {
                                statusText = "Ditolak";
                                statusColor = "text-red-500";
                            } else {
                                statusText = "Dalam proses";
                                statusColor = "text-yellow-500";
                            }
                            return (
                                <tr
                                    key={prodiItem.kode_prodi}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-5 px-3 text-center ">
                                        {index + 1}
                                    </td>
                                    <td className="py-5 px-3 text-center">
                                        {prodiItem.nama_prodi}
                                    </td>
                                    <td className="py-5 px-3 text-center">
                                        {scheduleCount} Jadwal
                                    </td>
                                    <td className="py-5 px-3 text-center">
                                        <Link
                                            href={route("dekan.jadwal.detail", {
                                                kode_prodi:
                                                    prodiItem.kode_prodi,
                                            })}
                                            className="bg-cpurple-1 text-white px-4 py-2 rounded hover:opacity-70 transition-colors"
                                        >
                                            Lihat Detail Jadwal
                                        </Link>
                                    </td>
                                    <td className="py-5 px-3 text-center">
                                        <span
                                            className={`font-medium ${statusColor}`}
                                        >
                                            {statusText}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 text-center">
                                        {prodiSchedules.length === 0 ? (
                                            <span className="font-medium bg-cgrey-1 text-white px-4 py-2 rounded hover:cursor-not-allowed">
                                                Belum ada jadwal
                                            </span>
                                        ) : hasNewSchedule ? (
                                            <div className="w-full flex gap-3 justify-center">
                                                <button
                                                    onClick={() =>
                                                        handleSetujuiProdi(
                                                            prodiItem.kode_prodi
                                                        )
                                                    }
                                                    className="bg-cgreen-2 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                                                >
                                                    Setujui
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleTolakProdi(
                                                            prodiItem.kode_prodi
                                                        )
                                                    }
                                                    className="w-[80px] rounded text-white font-poppins font-normal bg-cred-1 py-2"
                                                >
                                                    Tolak
                                                </button>
                                            </div>
                                        ) : allApproved || allRejected ? (
                                            <button
                                                onClick={() =>
                                                    handleResetProdi(
                                                        prodiItem.kode_prodi
                                                    )
                                                }
                                                className="text-white font-medium px-4 py-2 rounded bg-cgrey-2 hover:opacity-70"
                                            >
                                                Reset
                                            </button>
                                        ) : (
                                            <div className="w-full flex gap-3 justify-center">
                                                <button
                                                    onClick={() =>
                                                        handleSetujuiProdi(
                                                            prodiItem.kode_prodi
                                                        )
                                                    }
                                                    className="bg-cgreen-2 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                                                >
                                                    Setujui
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleTolakProdi(
                                                            prodiItem.kode_prodi
                                                        )
                                                    }
                                                    className="w-[80px] rounded text-white font-poppins font-normal bg-cred-1 py-2"
                                                >
                                                    Tolak
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    // Tambahkan fungsi filterProdi
    const filteredProdi = (prodi || []).filter((prodiItem) =>
        prodiItem.nama_prodi.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredjadwalKuliah = jadwalKuliah.data;

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

    const handleSetujuiAll = () => {
        post(`/Dekan/setujuiAllJadwal`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusJadwal((prevStatus) =>
                    prevStatus.map((jadwal) => ({
                        ...jadwal,
                        status: "approved",
                    }))
                );
            },
        });
    };

    const handleResetAll = () => {
        post(`/Dekan/resetAllJadwal`, {
            preserveScroll: true,
            onSuccess: () => {
                setStatusJadwal((prevStatus) =>
                    prevStatus.map((jadwal) => ({
                        ...jadwal,
                        status: "onprocess",
                    }))
                );
            },
        });
    };

    return (
        <AuthenticatedLayout1 role={roles}>
            <Head title="Kelola Jadwal" />
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
                        <h1 className="font-bold text-[20px] mb-[5px]">
                            Program Studi
                        </h1>
                        <div className="h-[4px] bg-black border w-full" />
                        <div className="flex items-center w-full justify-between mt-[10px]">
                            <div className="w-[250px] h-[40px] bg-[#FFF6F6] shadow-lg flex items-center rounded-[10px] px-3 gap-2">
                                <input
                                    type="text"
                                    placeholder="Cari Program Studi"
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
                        <ProdiTable />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout1>
    );
}
