import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import axios from 'axios';

function Mahasiswa({ user, roles, students }) {
    // Toggle Status function
    const toggleStatus = async (studentId) => {
        try {
            await axios.post(`/kaprodi/update-status-irs/${studentId}`);
            window.location.reload(); // Refresh the page to show updated status
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Mahasiswa" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-6 text-black dark:text-black">Daftar Mahasiswa (tabelbaru)</h2>

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
                                                <span
                                                    onClick={() => toggleStatus(student.id)}
                                                    className={`cursor-pointer px-3 py-1 rounded-full text-sm font-semibold ${student.status_irs === "Setuju" ? "bg-green-500" : "bg-red-500"} text-white`}
                                                >
                                                    {student.status_irs}
                                                </span>
                                                <a href={`/cek-irs/${student.nim}`} className="ml-3 text-blue-600 hover:underline">Cek IRS</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Mahasiswa;
