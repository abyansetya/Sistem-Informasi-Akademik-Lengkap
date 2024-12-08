import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, Link } from "@inertiajs/react";

function VerifikasiIRS({ roles, mahasiswa = [] }) {
    const [showDropdown, setShowDropdown] = useState(null); // Untuk mengontrol dropdown
    const [selectedAngkatan, setSelectedAngkatan] = useState(null);

    // Kelompokkan mahasiswa berdasarkan angkatan
    const groupedByAngkatan = mahasiswa.reduce((acc, mhs) => {
        const angkatan = mhs.angkatan;
        if (!acc[angkatan]) {
            acc[angkatan] = [];
        }
        acc[angkatan].push(mhs);
        return acc;
    }, {});

    // Fungsi untuk toggle dropdown
    const toggleDropdown = (angkatan) => {
        if (showDropdown === angkatan) {
            setShowDropdown(null); // Menutup dropdown jika angkatan yang sama diklik
        } else {
            setShowDropdown(angkatan); // Membuka dropdown untuk angkatan yang dipilih
        }
    };

    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Verifikasi_IRS" />
            <div className="py-12 px-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                    <div className="flex-col border border-gray-300 rounded-[10px] shadow-lg shadow-gray-100/50 mt-5 bg-white w-full h-full p-6">
                        <div className="border-b-2 border-black w-[85%] mx-auto flex">
                            <img
                                src="../verifikasi.svg"
                                alt=""
                                className="mr-4 h-[30px]"
                            />
                            <p className="text-[24px] md:text-[18px] font-bold ">
                                Verifikasi IRS
                            </p>
                        </div>
                        {/* Table verifikasiIRS */}
                        <div className="overflow-x-auto pr-[90px] pl-[90px] pt-[20px] mt-4">
                            <div className="overflow-hidden rounded-lg shadow-lg flex justify-center">
                                <table className="min-w-full table-auto bg-white rounded-lg border-separate border-spacing-0">
                                    <thead className="bg-cgrey-0">
                                        <tr>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                ANGKATAN
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                STATUS
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(groupedByAngkatan).map(
                                            (angkatan, index) => (
                                                <React.Fragment key={index}>
                                                    <tr className="text-center hover:bg-gray-50">
                                                        <td className="px-4 py-2 border-b">
                                                            {angkatan || "N/A"}
                                                        </td>
                                                        <td className="px-4 py-2 border-b">
                                                            <Link
                                                                href={route(
                                                                    "doswal.VerifikasiIRSByAngkatan",
                                                                    { angkatan:angkatan }
                                                                )}
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                <button>
                                                                    Lihat
                                                                </button>
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                    {/* Dropdown untuk menampilkan nama mahasiswa */}
                                                    {showDropdown ===
                                                        angkatan && (
                                                        <tr>
                                                            <td
                                                                colSpan="2"
                                                                className="px-4 py-2 border-b"
                                                            >
                                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                                    {/* Menampilkan Nama Mahasiswa sesuai dengan angkatan */}
                                                                    <ul className="space-y-3">
                                                                        {groupedByAngkatan[
                                                                            angkatan
                                                                        ].map(
                                                                            (
                                                                                mhs,
                                                                                idx
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        idx
                                                                                    }
                                                                                    className="flex justify-between py-2"
                                                                                >
                                                                                    <span>
                                                                                        {
                                                                                            mhs.nama
                                                                                        }
                                                                                    </span>
                                                                                    <span
                                                                                        className={`px-2 py-1 rounded-full text-sm ${
                                                                                            mhs.status ===
                                                                                            "active"
                                                                                                ? "bg-red-100 text-red-800"
                                                                                                : "bg-green-100 text-green-800"
                                                                                        }`}
                                                                                    >
                                                                                        {mhs.status ===
                                                                                        "aktif"
                                                                                            ? "Aktif"
                                                                                            : "Tidak Aktif"}
                                                                                    </span>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default VerifikasiIRS;
