import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";


function Mahasiswa({ user, roles, students }) {
    // Inertia's useForm for handling form submissions
    const { post } = useForm();
    const [statusIRS, setStatusIRS] = useState(
        students.map((student) => ({
            id: student.id,
            status: student.status_irs,
        }))
    );

    // Toggle Status function using post
    const toggleStatus = async (studentId) => {
        try {
            // Mengambil status saat ini dari student
            const currentStatus = statusIRS.find((status) => status.id === studentId)?.status;
            const newStatus = currentStatus === "Setuju" ? "Belum Setuju" : "Setuju";
    
            // Kirim status baru ke server menggunakan axios
            const response = await axios.post(`/Kaprodi/${studentId}/acc`, { status_irs: newStatus });
    
            // Cek jika respons sukses, lalu update status IRS di client-side
            if (response.status === 200) {
                setStatusIRS((prevStatus) =>
                    prevStatus.map((status) =>
                        status.id === studentId ? { ...status, status: newStatus } : status
                    )
                );
                console.log("Status berhasil diperbarui:", response.data.message);
            } else {
                console.warn("Status berhasil diperbarui, tetapi respons tidak sesuai:", response);
            }
        } catch (error) {
            // Memastikan error ditangkap secara detail, termasuk respons dari server
            if (error.response) {
                console.error("Gagal memperbarui status:", error.response.data.message || error.message);
            } else {
                console.error("Gagal memperbarui status:", error.message);
            }
        }
    };
    

    // PaginationLinks component for pagination
    const PaginationLinks = () => {
        // Check if students.links exists before using .map
        if (!students.links) return null;

        return (
            <div className="flex justify-center mt-4">
                {students.links.map((link, index) => (
                    <Link
                        key={index} // Adding unique key
                        href={link.url ? link.url : "#"}
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
    };

    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Mahasiswa" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-1">
                        <h2 className="text-xl font-bold mb-6 text-black dark:text-black">Daftar Mahasiswa</h2>

                        {/* Search Button */}
                        <div className="flex justify-end mb-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg hover:bg-blue-600 transition">
                                <span>Search</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018.158 15H15m6-9a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 rounded-lg shadow">
                                <thead>
                                    <tr className="bg-gray-100 text-left text-gray-600 font-semibold">
                                        <th className="px-4 py-2 border-b">Nama</th>
                                        <th className="px-4 py-2 border-b">NIM</th>
                                        <th className="px-4 py-2 border-b">Angkatan</th>
                                        <th className="px-4 py-2 border-b">Status IRS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border-b">{student.nama}</td>
                                            <td className="px-4 py-2 border-b">{student.nim}</td>
                                            <td className="px-4 py-2 border-b">{student.angkatan}</td>
                                            <td className="px-4 py-2 border-b flex items-center">
                                            <button
                                                onClick={() => toggleStatus(student.id)}
                                                className={`cursor-pointer px-3 py-1 rounded-full text-sm font-semibold ${
                                                    statusIRS.find((status) => status.id === student.id)?.status === "Setuju"
                                                        ? "bg-blue-500"
                                                        : "bg-red-500"
                                                } text-white`}
                                            >
                                                {statusIRS.find((status) => status.id === student.id)?.status === "Setuju"
                                                    ? "Setuju"
                                                    : "notSet"}
                                            </button>
                                                <Link href={`/cek-irs/${student.nim}`} className="ml-3 text-blue-600 hover:underline">Cek IRS</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <PaginationLinks />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Mahasiswa;
