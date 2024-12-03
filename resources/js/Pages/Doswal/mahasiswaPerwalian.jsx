import React, { useState, useEffect, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function MahasiswaPerwalian({ roles, mahasiswa = [] }) {
    const [searchQuery, setSearchQuery] = useState(""); // Menyimpan query pencarian
    const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Menyimpan pencarian
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Menyimpan status dropdown
    const [selectedAngkatan, setSelectedAngkatan] = useState(""); // Menyimpan angkatan yang dipilih

    // Filter mahasiswa berdasarkan pencarian nama dan angkatan yang dipilih
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const suggestions = mahasiswa.filter((mhs) => {
            const nama = mhs.Name || "";
            return nama.toLowerCase().includes(query.toLowerCase());
        });

        setFilteredSuggestions(suggestions);
        setIsDropdownVisible(query.length > 0 && suggestions.length > 0); // Menampilkan dropdown
    };

    // Menangani klik pada saran pencarian
    const handleSuggestionClick = (name) => {
        setSearchQuery(name); // Isi input dengan nama yang dipilih
        setIsDropdownVisible(false); // Menyembunyikan dropdown setelah memilih nama
    };

    // Menangani perubahan pada dropdown angkatan
    const handleAngkatanChange = (e) => {
        setSelectedAngkatan(e.target.value);
    };

    // Menutup dropdown jika pengguna mengklik di luar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".search-container")) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Filter mahasiswa berdasarkan pencarian dan angkatan yang dipilih
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
            .sort((a, b) => a.angkatan - b.angkatan); // Mengurutkan berdasarkan angkatan
    }, [mahasiswa, searchQuery, selectedAngkatan]);

    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Mahasiswa_Perwalian" />
            <div className="py-12 px-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 font-poppins">
                    <div className="flex flex-col border rounded-[10px] shadow-lg shadow-gray-200/50 mt-5 bg-white w-full h-full">
                        <div className="border-b-2 border-black w-[85%] mx-auto pt-4 flex">
                            <img
                                src="../mahasiswa.svg"
                                alt=""
                                className="mr-4 h-[30px]"
                            />
                            <p className="text-[30px] md:text-[24px] font-bold">
                                Mahasiswa Perwalian
                            </p>
                        </div>

                        {/* Search & Dropdown */}
                        <div className="flex items-center m-5 ml-[7.5%] space-x-4">
                            {/* Search */}
                            <div className="relative w-[20%] search-container">
                                <input
                                    type="text"
                                    placeholder="Nama mahasiswa"
                                    className="py-2 text-sm text-black font-light focus:outline-none rounded-lg w-full bg-cgrey-3 pl-4 pr-10"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={() => setIsDropdownVisible(true)}
                                />
                                {isDropdownVisible &&
                                    filteredSuggestions.length > 0 && (
                                        <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out">
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
                                                    {mhs.Name}{" "}
                                                    {/* Hanya menampilkan nama */}
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

                            {/* Dropdown Angkatan */}
                            <select
                                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 w-[200px]"
                                value={selectedAngkatan}
                                onChange={handleAngkatanChange}
                            >
                                <option value="">Angkatan</option>
                                {[2018, 2019, 2020, 2021, 2022, 2023, 2024].map(
                                    (year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* Table Mahasiswa */}
                        <div className="overflow-x-auto pr-[90px] pl-[90px] mb-5">
                            <div className="overflow-hidden rounded-lg shadow-lg">
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
                                                ANGKATAN
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                SEMESTER
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                IP{" "}
                                                <span className="block">
                                                    KUMULATIF
                                                </span>
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                JUMLAH SKS
                                                <span className="block">
                                                    KUMULATIF
                                                </span>
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                STATUS
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMahasiswa.length > 0 ? (
                                            filteredMahasiswa.map((mhs) => (
                                                <tr
                                                    key={mhs.NIM}
                                                    className="text-center hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-2 border-b">
                                                        {mhs.Name || "N/A"}
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
                                                        {mhs.NIM || "N/A"}
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
                                                        {mhs.angkatan || "N/A"}
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
                                                        {mhs.Semester || "N/A"}
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
                                                        {mhs.IPK || "0.00"}
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
                                                        {mhs.SKSk || "0"}
                                                    </td>
                                                    <td className="px-4 py-2 border-b">
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
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="px-4 py-2 text-center"
                                                >
                                                    Tidak ada data mahasiswa
                                                </td>
                                            </tr>
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

export default MahasiswaPerwalian;
