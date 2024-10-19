import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout1';
import { Head, Link, useForm } from "@inertiajs/react";
import { router } from '@inertiajs/react';


function KelolaRuang({ ruangKelas }) {
    // State untuk form input
    const { data, setData, post, put, reset } = useForm({
        id: '',
        nama_ruang: '',
        gedung: '',
        kuota: ''
    });

    // Handler untuk form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.id) {
            // Update data ruangan
            put(route('bagianakademik.updateRuang', data.id), {
                onSuccess: () => reset()
            });
        } else {
            // Tambah data ruangan baru
            post(route('bagianakademik.storeRuang'), {
                onSuccess: () => reset()
            });
        }
    };

    // Handle untuk mengedit data ruangan (memuat data ke form)
    const handleEdit = (ruang) => {
        setData({
            id: ruang.id,
            nama_ruang: ruang.nama_ruang,
            gedung: ruang.gedung,
            kuota: ruang.kuota
        });
    };

    // Handler untuk menghapus ruangan
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus ruangan ini?')) {
            router.delete(route('bagianakademik.destroyRuang', id));
        }
    };

    const handleResetToInsert = () => {
        // Reset form to initial state (insert mode)
        reset(); // This will clear all form fields
    };

    // Pagination Links
    const PaginationLinks = () => {
        return (
          <div className="flex justify-center mt-4">
            {ruangKelas.links.map((link, index) => (
              <Link
                key={index}
                href={link.url ? link.url : '#'}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`mx-1 px-3 py-1 border rounded ${
                  link.active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              />
            ))}
          </div>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Ruangan" />

            {/* Form untuk input ruang baru atau edit */}
            <div className="container mx-auto p-6 max-w-7xl">
            <h1 className="text-2xl font-bold mb-4">Kelola Ruang</h1>
            <button type="button" onClick={handleResetToInsert} className="mt-4 mb-4 px-4 py-2 bg-gray-500 text-white rounded"> + Tambah Ruangan</button>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Nama Ruang"
                            value={data.nama_ruang}
                            onChange={(e) => setData('nama_ruang', e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <select
                            value={data.gedung}
                            onChange={(e) => setData('gedung', e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Pilih Gedung</option>
                            <option value="A">Gedung A</option>
                            <option value="B">Gedung B</option>
                            <option value="C">Gedung C</option>
                            <option value="D">Gedung D</option>
                            <option value="E">Gedung E</option>
                            <option value="F">Gedung F</option>
                            <option value="G">Gedung G</option>
                            <option value="H">Gedung H</option>
                            <option value="I">Gedung I</option>
                            <option value="J">Gedung J</option>
                            <option value="K">Gedung K</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Kapasitas"
                            value={data.kuota}
                            onChange={(e) => setData('kuota', e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {data.id ? 'Update Ruang' : 'Submit Ruang'}
                    </button>
                </form>

                {/* Tabel Daftar Ruang Kelas */}
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Daftar Ruang Kelas</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase leading-normal">
                                    <th className="py-2 px-2 border border-gray-300 text-center">ID</th>
                                    <th className="py-2 px-2 border border-gray-300 text-center">Nama Ruang</th>
                                    <th className="py-2 px-2 border border-gray-300 text-center">Gedung</th>
                                    <th className="py-2 px-2 border border-gray-300 text-center">Kapasitas</th>
                                    <th className="py-2 px-2 border border-gray-300 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 font-light">
                                {ruangKelas.data.map((ruang) => (
                                    <tr
                                        key={ruang.id}
                                        className="border-b border-gray-300 hover:bg-gray-50"
                                    >
                                        <td className="py-1 px-2 border border-gray-300 text-center">{ruang.id}</td>
                                        <td className="py-1 px-2 border border-gray-300 text-center">{ruang.nama_ruang}</td>
                                        <td className="py-1 px-2 border border-gray-300 text-center">{ruang.gedung}</td>
                                        <td className="py-1 px-2 border border-gray-300 text-center">{ruang.kuota}</td>
                                        <td className="py-1 px-2 border border-gray-300 text-center">
                                            <button
                                                onClick={() => handleEdit(ruang)}
                                                className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ruang.id)}
                                                className="px-2 py-1 bg-red-500 text-white rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Render Pagination */}
                    <PaginationLinks />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default KelolaRuang;
