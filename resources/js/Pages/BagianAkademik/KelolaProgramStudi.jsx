import React, {useState} from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, Link, useForm } from "@inertiajs/react";
import { router } from '@inertiajs/react';

function KelolaProgramStudi({ programStudi }) {
    // State untuk form input
    const { data, setData, post, put, reset } = useForm({
        prodi_id: "",
        kode_prodi: "",
        nama_prodi: "",
    });

    // Handler untuk form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.prodi_id) {
            // Update data Program Studi
            put(route("bagianakademik.updateProgramStudi", data.prodi_id), {
                onSuccess: () => reset(),
            });
        } else {
            // Tambah data Program Studi baru
            post(route("bagianakademik.storeProgramStudi"), {
                onSuccess: () => reset(),
            });
        }
    };
    // handle untuk mengedit data program studi (memuat data ke form)
    const handleEdit = (programstudi) => {
        setData({
            prodi_id: programstudi.prodi_id,
            kode_prodi: programstudi.kode_prodi,
            nama_prodi: programstudi.nama_prodi,
        });
    };
    // handle untuk menghapus program studi
    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus program studi ini?")) {
            router.delete(route("bagianakademik.destroyProgramStudi", id));
            console.log(id);
        }
    };

    const handleResetToInsert = () => {
        reset();
    };

    return (
        <AuthenticatedLayout role="Bagian Akademik">
            <Head title="Kelola Program Studi" />

            <div className="container mx-auto p-6 max-w-7xl">
                <h1 className="text-2xl font-bold mb-4">
                    Kelola Program Studi
                </h1>
                <button
                    type="button"
                    onClick={handleResetToInsert}
                    className="mt-4 mb-4 px-4 py-2 bg-gray-500 text-white rounded"
                >
                    {" "}
                    + Tambah Program Studi
                </button>
                {/* Form Input Program Studi Baru */}
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Kode Program Studi"
                            value={data.kode_prodi}
                            onChange={(e) =>
                                setData("kode_prodi", e.target.value)
                            }
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nama Program Studi"
                            value={data.nama_prodi}
                            onChange={(e) =>
                                setData("nama_prodi", e.target.value)
                            }
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        type="submit"
                    >
                        {data.prodi_id
                            ? "Update Program Studi"
                            : "Submit Program Studi"}
                    </button>
                </form>

                {/* tabel daftar program studi */}
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">
                        Daftar Program Studi
                    </h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 uppercase leading-normal">
                                    <th className="py-2 px-2 border border-gray-300 text-center">
                                        ID
                                    </th>
                                    <th className="py-2 px-2 border border-gray-300 text-center">
                                        Kode Program Studi
                                    </th>
                                    <th className="py-2 px-2 border border-gray-300 text-center">
                                        Nama Program Studi
                                    </th>

                                    <th className="py-2 px-2 border border-gray-300 text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 font-light">
                                {programStudi.map((programstudi) => (
                                    <tr
                                        key={programstudi.prodi_id}
                                        className="border-b border-gray-300 hover:bg-gray-50"
                                    >
                                        <td className="py-1 px-2 border border-gray-300 text-center">
                                            {programstudi.prodi_id}
                                        </td>
                                        <td className="py-1 px-2 border border-gray-300 text-center">
                                            {programstudi.kode_prodi}
                                        </td>
                                        <td className="py-1 px-2 border border-gray-300 text-center">
                                            {programstudi.nama_prodi}
                                        </td>

                                        <td className="py-1 px-2 border border-gray-300 text-center">
                                            <button
                                                onClick={() =>
                                                    handleEdit(programstudi)
                                                }
                                                className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        programstudi.prodi_id
                                                    )
                                                }
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default KelolaProgramStudi