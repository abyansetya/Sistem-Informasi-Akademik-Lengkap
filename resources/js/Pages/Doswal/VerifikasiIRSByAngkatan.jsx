import React, { useState, useEffect, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, Link } from "@inertiajs/react";
import verifikasi from "@/../../public/verifikasi.svg";
import axios from "axios";
import Swal from "sweetalert2";

function VerifikasiIRSByAngkatan({ roles, mahasiswa = [], angkatan }) {
    const [searchQuery, setSearchQuery] = useState(""); // Query pencarian
    const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Hasil pencarian
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Status dropdown
    const [selectedAngkatan, setSelectedAngkatan] = useState(""); // Angkatan terpilih
    const [isSubmitting, setIsSubmitting] = useState(false); // Status submit
    const [updatedMahasiswa, setUpdatedMahasiswa] = useState(mahasiswa); // State untuk melacak status mahasiswa yang diperbarui

    useEffect(() => {
        const fetchMahasiswa = async () => {
            try {
                const response = await axios.get(
                    route("doswal.getMahasiswa", { angkatan })
                );
                setUpdatedMahasiswa(response.data); // Memperbarui state mahasiswa dengan data terbaru
            } catch (error) {
                console.error("Gagal memuat data mahasiswa", error);
            }
        };

        fetchMahasiswa();
    }, [angkatan]); // Memuat data mahasiswa berdasarkan angkatan yang dipilih

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const suggestions = mahasiswa.filter((mhs) =>
            mhs.Name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSuggestions(suggestions);
        setIsDropdownVisible(query.length > 0 && suggestions.length > 0);
    };

    const handleSuggestionClick = (name) => {
        setSearchQuery(name);
        setIsDropdownVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".search-container")) {
                setIsDropdownVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const filteredMahasiswa = useMemo(() => {
        return updatedMahasiswa
            .filter((mhs) => {
                const matchesSearch = mhs.Name.toLowerCase().includes(
                    searchQuery.toLowerCase()
                );
                const matchesAngkatan =
                    selectedAngkatan === "" ||
                    mhs.angkatan.toString() === selectedAngkatan;

                return matchesSearch && matchesAngkatan;
            })
            .sort((a, b) => a.NIM - b.NIM);
    }, [updatedMahasiswa, searchQuery, selectedAngkatan]);

    const handleApprove = async (nim) => {
        const result = await Swal.fire({
            title: "Konfirmasi",
            text: `Apakah Anda yakin ingin menyetujui IRS mahasiswa dengan NIM ${nim}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, setujui",
            cancelButtonText: "Batal",
        });

        if (result.isConfirmed) {
            try {
                // Perbarui status mahasiswa di frontend menjadi 'approved'
                const updated = updatedMahasiswa.map((mhs) =>
                    mhs.NIM === nim
                        ? { ...mhs, status_approval: "approved" }
                        : mhs
                );
                setUpdatedMahasiswa(updated);

                // Simpan status baru ke server
                await axios.post(route("doswal.approveIRS"), { nim });

                Swal.fire({
                    icon: "success",
                    title: "IRS sudah disetujui",
                    text: `IRS mahasiswa dengan NIM ${nim} berhasil disetujui.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text:
                        error.response?.data?.message ||
                        "Gagal menyetujui IRS. Silakan coba lagi nanti.",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    const handleReset = async (nim) => {
        const result = await Swal.fire({
            title: "Konfirmasi",
            text: `Apakah Anda yakin ingin mereset status IRS mahasiswa dengan NIM ${nim} ke status "Onprocess"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, reset",
            cancelButtonText: "Batal",
        });

        if (result.isConfirmed) {
            try {
                // Kirimkan permintaan reset IRS ke backend
                const response = await axios.post(route("doswal.resetIRS"), {
                    nim,
                });

                // Perbarui status mahasiswa di frontend menjadi 'onprocess'
                const updated = updatedMahasiswa.map((mhs) =>
                    mhs.NIM === nim
                        ? { ...mhs, status_approval: "onprocess" }
                        : mhs
                );
                setUpdatedMahasiswa(updated);

                Swal.fire({
                    icon: "success",
                    title: "Status berhasil di-reset",
                    text: `IRS mahasiswa dengan NIM ${nim} berhasil di-reset ke status "Onprocess".`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text: "Gagal mereset status IRS. Silakan coba lagi nanti.",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Verifikasi_IRSBy_Angkatan" />
            <div className="py-12 px-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                    <div className="flex-col border border-gray-300 rounded-[10px] shadow-lg mt-5 bg-white p-6">
                        <div className="border-b-2 border-black w-[85%] mx-auto flex">
                            <img
                                src={verifikasi}
                                alt=""
                                className="mr-4 h-[30px]"
                            />
                            <p className="text-[24px] md:text-[18px] font-bold">
                                Verifikasi IRS
                            </p>
                        </div>

                        <div className="flex items-center m-5 ml-[7.5%] space-x-4 justify-between">
                            <div className="relative w-[20%] search-container">
                                <input
                                    type="text"
                                    placeholder="Nama mahasiswa"
                                    className="py-2 text-sm text-black rounded-lg w-full bg-cgrey-3 pl-4 pr-10"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setIsDropdownVisible(true)}
                                />
                                {isDropdownVisible &&
                                    filteredSuggestions.length > 0 && (
                                        <div className="absolute bg-white border w-full mt-1 rounded-md shadow-lg z-10">
                                            {filteredSuggestions.map((mhs) => (
                                                <div
                                                    key={mhs.NIM}
                                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                                    onClick={() =>
                                                        handleSuggestionClick(
                                                            mhs.Name
                                                        )
                                                    }
                                                >
                                                    {mhs.Name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
                        </div>

                        {/* Table verifikasi IRS */}
                        <div className="overflow-x-auto pr-[90px] pl-[90px] pt-[20px]">
                            <div className="overflow-hidden rounded-lg shadow-lg flex justify-center">
                                <table className="min-w-full table-auto bg-white rounded-lg border-separate border-spacing-0">
                                    <thead className="bg-cgrey-0">
                                        <tr>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                NAMA
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                NIM
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                Detail IRS
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                STATUS
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                AKSI
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMahasiswa.map((mhs) => {
                                            const statusText =
                                                mhs.status_approval ===
                                                "approved"
                                                    ? "Disetujui"
                                                    : mhs.status_approval ===
                                                      "rejected"
                                                    ? "Ditolak"
                                                    : "Onprocess";
                                            const statusColor =
                                                mhs.status_approval ===
                                                "approved"
                                                    ? "text-green-500"
                                                    : mhs.status_approval ===
                                                      "rejected"
                                                    ? "text-red-500"
                                                    : "text-yellow-500";

                                            return (
                                                <tr
                                                    key={mhs.NIM}
                                                    className="text-center"
                                                >
                                                    <td className="px-4 py-2 border-b">
                                                        {mhs.Name}
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
                                                        {mhs.NIM}
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
                                                        <Link
                                                            href={route(
                                                                "doswal.Jadwalirs",
                                                                { nim: mhs.NIM }
                                                            )}
                                                            className="text-cgrey-0 hover:bg-blue-500 bg-blue-600 p-2 rounded"
                                                        >
                                                            Lihat IRS
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
                                                        <p
                                                            className={`${statusColor} font-medium`}
                                                        >
                                                            {statusText}
                                                        </p>
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
                                                        {mhs.status_approval ===
                                                        "approved" ? (
                                                            <button
                                                                onClick={() =>
                                                                    handleReset(
                                                                        mhs.NIM
                                                                    )
                                                                }
                                                                className="bg-gray-500 text-white rounded px-4 py-2"
                                                            >
                                                                Reset
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() =>
                                                                    handleApprove(
                                                                        mhs.NIM
                                                                    )
                                                                }
                                                                className="bg-green-500 text-white rounded px-4 py-2"
                                                            >
                                                                Setujui
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default VerifikasiIRSByAngkatan;
