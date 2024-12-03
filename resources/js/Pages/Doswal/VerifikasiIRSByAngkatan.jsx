import React, { useState, useEffect, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { jsPDF } from "jspdf";

function VerifikasiIRSByAngkatan({ roles, mahasiswa = [], angkatan }) {
    const [searchQuery, setSearchQuery] = useState(""); // Query pencarian
    const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Hasil pencarian
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Status dropdown
    const [selectedAngkatan, setSelectedAngkatan] = useState(""); // Angkatan terpilih
    const [isSubmitting, setIsSubmitting] = useState(false); // Status submit

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
        return mahasiswa
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
    }, [mahasiswa, searchQuery, selectedAngkatan]);

    const handleApproveAll = async () => {
        console.time("approveAll"); // Mulai pengukuran
        setIsSubmitting(true); // Indikator loading
        try {
            await axios.post(route("doswal.approveAll"), {
                angkatan,
            });
            console.timeEnd("approveAll"); // Akhiri pengukuran
            alert("Semua mahasiswa berhasil disetujui!");
            setIsSubmitting(false);
        } catch (error) {
            console.error("Gagal menyetujui semua:", error);
            setIsSubmitting(false);
        }
    };

    // Fungsi untuk mengunduh IRS
    const handleDownloadIRS = async (nim) => {
        try {
            const response = await axios.get(route("downloadIRS", { nim }), {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `IRS_${nim}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Gagal mengunduh IRS:", error);
            alert("Gagal mengunduh IRS");
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
                                src="../verifikasi.svg"
                                alt=""
                                className="mr-4 h-[30px]"
                            />
                            <p className="text-[24px] md:text-[22px] font-bold">
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
                            <div className="text-right ">
                                <button
                                    onClick={handleApproveAll}
                                    className={`${
                                        isSubmitting
                                            ? "bg-green-500"
                                            : "bg-white hover:bg-green-500"
                                    } text-black hover:text-black px-4 py-2 border border-gray-300 rounded shadow`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Menyetujui..."
                                        : "Setujui Semua"}
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
                                                IRS
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                STATUS
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMahasiswa.map((mhs) => (
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
                                                    <button
                                                        onClick={() =>
                                                            handleDownloadIRS(
                                                                mhs.NIM
                                                            )
                                                        }
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        Lihat
                                                    </button>
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    <button
                                                        className={`${
                                                            mhs.status_approval ===
                                                            "disetujui"
                                                                ? "bg-green-500"
                                                                : "bg-cred-1"
                                                        } text-white px-4 py-2 rounded`}
                                                    >
                                                        {mhs.status_approval ===
                                                        "disetujui"
                                                            ? "Disetujui"
                                                            : "Belum Disetujui"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
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
