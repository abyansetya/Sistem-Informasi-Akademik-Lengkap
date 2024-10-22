import React, { useState } from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, useForm } from "@inertiajs/react";
import { router } from '@inertiajs/react';

function AlokasiRuangan({ programStudiData, ruangKelasData, alokasiData }) {
    const [selectProgram, setSelectedProgram] = useState('');
    const [selectRooms, setSelectedRooms] = useState([]);
    const { post } = useForm();

    // handle Checkbox perubahan
    const handleCheckboxChange = (ruangid, checked) => {
        if (checked) {
            setSelectedRooms([...selectRooms, ruangid]);
        } else {
            setSelectedRooms(selectRooms.filter(id => id !== ruangid));
        }
    };

    // handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectProgram) {
            alert('Pilih program studi terlebih dahulu.');
            return;
        }

        if (selectRooms.length === 0) {
            alert('Pilih setidaknya satu ruangan.');
            return;
        }

        post('/AlokasiRuangan', {
            program_studi_id: selectProgram,
            ruang_kelas_id: selectRooms,
        }, {
            onSuccess: () => {
                setSelectedProgram('');
                setSelectedRooms([]);
                alert('Alokasi berhasil ditambahkan');
            },
            onError: (error) => {
                console.error(error);
            },
        });
    };

    return (
        <AuthenticatedLayout role="Bagian Akademik">
            <Head title='Alokasi Ruangan' />

            <div className="container mx-auto p-6 max-w-7xl">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Alokasi Ruangan</h1>

                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-10">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Pilih Program Studi</label>
                        <select
                            onChange={(e) => setSelectedProgram(e.target.value)}
                            value={selectProgram}
                            className="block w-full border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Pilih Program Studi</option>
                            {programStudiData.map(studi => (
                                <option key={studi.id} value={studi.id}>
                                    {studi.nama_program_studi}
                                </option>
                            ))}
                        </select>
                    </div>

                    <h2 className="text-lg font-medium text-gray-700 mb-4">Pilih Ruangan</h2>
                    <table className="min-w-full bg-white border rounded-lg overflow-hidden mb-6">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 text-left font-medium text-gray-600">Nama Ruangan</th>
                                <th className="py-2 px-4 text-left font-medium text-gray-600">Gedung</th>
                                <th className="py-2 px-4 text-left font-medium text-gray-600">Kapasitas</th>
                                <th className="py-2 px-4 text-center font-medium text-gray-600">Alokasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ruangKelasData.map(ruang => (
                                <tr key={ruang.id} className="border-b">
                                    <td className="py-2 px-4">{ruang.nama_ruang}</td>
                                    <td className="py-2 px-4">{ruang.gedung}</td>
                                    <td className="py-2 px-4">{ruang.kuota}</td>
                                    <td className="py-2 px-4 text-center">
                                        <input
                                            type="checkbox"
                                            value={ruang.id}
                                            onChange={(e) => handleCheckboxChange(ruang.id, e.target.checked)}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out'
                    >
                        Tambah Alokasi
                    </button>
                </form>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tabel Alokasi</h2>
                <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 text-left font-medium text-gray-600">ID</th>
                            <th className="py-2 px-4 text-left font-medium text-gray-600">Program Studi</th>
                            <th className="py-2 px-4 text-left font-medium text-gray-600">Ruangan</th>
                            <th className="py-2 px-4 text-left font-medium text-gray-600">Status</th>
                            <th className="py-2 px-4 text-center font-medium text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alokasiData.map(item => (
                            <tr key={item.id} className="border-b">
                                <td className="py-2 px-4">{item.id}</td>
                                <td className="py-2 px-4">{item.program_studi.nama_program_studi}</td>
                                <td className="py-2 px-4">{item.ruang_kelas.nama_ruang}</td>
                                <td className={`py-2 px-4 ${item.status === 'approve' ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.status}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    <button className="bg-yellow-400 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-500 transition duration-300 ease-in-out">Edit</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    )
}

export default AlokasiRuangan;
