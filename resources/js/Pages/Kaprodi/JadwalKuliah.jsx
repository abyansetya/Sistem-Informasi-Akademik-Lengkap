import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function JadwalKuliah({user,roles}) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Jadwal Kuliah" />
            {/* Filter Section */}
            <div className="flex justify-between p-8">
                <div className="flex space-x-4">
                    <div>
                        <label className="block font-bold text-gray-700">Nama Matkul</label>
                        <div className="flex">
                            <input 
                                type="text"
                                placeholder="Nama Mata Kuliah"
                                className="border border-gray-300 rounded p-2"
                            />
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018.158 15H15m6-9a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block font-bold text-gray-700">Semester</label>
                        <select className="border border-gray-300 rounded p-2">
                            <option>GANJIL</option>
                            <option>GENAP</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-4 gap-6 p-8">
                {/* Sample Card */}
                {Array(8).fill().map((_, index) => (
                    <div
                        key={index}
                        className={`border p-4 rounded-lg shadow-md ${
                            index % 2 === 0 ? 'border-red-500' : 'border-yellow-500'
                        }`}
                    >
                        <div className="h-40 bg-gray-200 mb-4"></div>
                        <h3 className="text-lg font-bold">Sistem Informasi</h3>
                        <p>Dosen: Bapak Kuri Kurniawan S.pd</p>
                        <p>Ruangan: C101</p>
                        <p>Pukul: 13:00</p>
                        <button
                            className={`mt-4 px-4 py-2 rounded-lg font-bold ${
                                index % 2 === 0 ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                            }`}
                        >
                            {index % 2 === 0 ? 'Pengaturan' : 'Lihat'}
                        </button>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

export default JadwalKuliah;

