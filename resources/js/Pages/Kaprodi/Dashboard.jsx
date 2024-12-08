import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function Dashboard({ user, roles }) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Dashboard" />

            {/* Header Section */}
            <div className="p-8">
                <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                        {/* {user.name.charAt(0)} */}
                    </div>

                    {/* User Information */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-700">Ketua Program Studi</h2>
                        <p className="text-gray-500">Nama: {user.name}</p>
                        <p className="text-gray-500">NIP: {user.nip}</p>
                        <p className="text-gray-500">Fakultas Sains dan Matematika</p>
                    </div>
                </div>
            </div>

            {/* Statistic Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div className="flex space-x-4">
                    {/* ISS Accepted */}
                    <div className="border rounded-lg p-6 w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <h3 className="text-lg font-bold text-gray-700">ISS Accepted</h3>
                        <p className="text-4xl font-bold text-blue-600">70%</p>
                        <p className="text-gray-500">30% Not Set</p>
                    </div>
                    {/* Lulus */}
                    <div className="border rounded-lg p-6 w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <h3 className="text-lg font-bold text-gray-700">Lulus 2021</h3>
                        <p className="text-4xl font-bold text-red-600">60%</p>
                        <p className="text-gray-500">40% Not Set</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8">
                    <button
                        onClick={() => window.location.href = route("kaprodi.jadwalKuliah")}
                        className="w-full md:w-64 bg-blue-500 text-white py-4 px-6 rounded-lg text-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
                    >
                        SET JADWAL KULIAH
                    </button>
                    <button
                        onClick={() => window.location.href = route("kaprodi.mahasiswa")}
                        className="w-full md:w-64 bg-blue-500 text-white py-4 px-6 rounded-lg text-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
                    >
                        MAHASISWA
                    </button>
                </div>
            </div>

            {/* Mata Kuliah Section */}
            <div className="p-8">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Mata Kuliah</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4 border-b-2 text-left text-gray-600">Kode MK</th>
                                <th className="p-4 border-b-2 text-left text-gray-600">Nama Matkul</th>
                                <th className="p-4 border-b-2 text-left text-gray-600">Kursi Terisi</th>
                                <th className="p-4 border-b-2 text-left text-gray-600">Smt Prioritas</th>
                                <th className="p-4 border-b-2 text-left text-gray-600">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array(5).fill().map((_, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition duration-200">
                                    <td className="p-4 border-b">PAK0931</td>
                                    <td className="p-4 border-b">Sistem Informasi</td>
                                    <td className="p-4 border-b">130 / 200</td>
                                    <td className="p-4 border-b">70 / 200</td>
                                    <td className="p-4 border-b">
                                        <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all duration-300 ease-in-out">
                                            Cek Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;