import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, useForm } from "@inertiajs/react";

function AlokasiRuangan({ programStudiData, ruangKelasData, initialAlokasiData = [] }) {
    const [selectProgram, setSelectedProgram] = useState('');
    const [selectRooms, setSelectedRooms] = useState([]);
    const [selectedGedung, setSelectedGedung] = useState('all');
    const [alokasiData, setAlokasiData] = useState(initialAlokasiData);
    const [editId, setEditId] = useState(null);
    
    const { data, setData, post, put, delete: destroy } = useForm({
        program_studi_id: '',
        ruang_kelas_id: [],
    });
    
    const filteredRooms = selectedGedung === 'all'
        ? ruangKelasData
        : ruangKelasData.filter(ruang => ruang.gedung === selectedGedung);

    const handleCheckboxChange = (ruangid, checked) => {
        const updatedRooms = checked
            ? [...selectRooms, ruangid]
            : selectRooms.filter(id => id !== ruangid);
        
        setSelectedRooms(updatedRooms);
        setData('ruang_kelas_id', updatedRooms);
    };

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

        setData('program_studi_id', selectProgram);
        
        if (editId) {
            put(route('bagianakademik.updateAlokasi', editId), {
                onSuccess: ({ props }) => {
                    const newAlokasi = props.alokasi_baru || {};
                    setAlokasiData((prev) => prev.map((item) => (item.id === editId ? newAlokasi : item)));
                    resetForm();
                    alert('Alokasi berhasil diupdate');
                },
                onError: (error) => {
                    console.error("Error saat mengupdate:", error);
                    alert('Terjadi kesalahan saat mengupdate alokasi');
                },
            });
        } else {
            post(route('bagianakademik.storeAlokasi'), {
                onSuccess: ({ props }) => {
                    const newAlokasi = props.alokasi_baru || {};
                    setAlokasiData((prev) => [...prev, newAlokasi]);
                    resetForm();
                    alert('Alokasi berhasil ditambahkan');
                },
                onError: (error) => {
                    console.error("Error saat menambahkan:", error);
                    alert('Terjadi kesalahan saat menambahkan alokasi');
                },
            });
        }
    };

    const resetForm = () => {
        setEditId(null);
        setSelectedProgram('');
        setSelectedRooms([]);
        setSelectedGedung('all');
        setData({
            program_studi_id: '',
            ruang_kelas_id: [],
        });
    };

    return (
        <AuthenticatedLayout role="Bagian Akademik">
            <Head title="Alokasi Ruangan" />

            <div className="container mx-auto p-6 max-w-7xl">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                    Alokasi Ruangan
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-lg p-6 mb-10"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Pilih Program Studi
                        </label>
                        <select
                            onChange={(e) => {
                                setSelectedProgram(e.target.value);
                                setData("program_studi_id", e.target.value);
                            }}
                            value={selectProgram}
                            className="block w-full border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Pilih Program Studi</option>
                            {programStudiData.map((studi) => (
                                <option key={studi.id} value={studi.id}>
                                    {studi.nama_prodi}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectProgram && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Filter Gedung
                                </label>
                                <select
                                    onChange={(e) =>
                                        setSelectedGedung(e.target.value)
                                    }
                                    value={selectedGedung}
                                    className="block w-full border-gray-300 rounded-lg p-2"
                                >
                                    <option value="all">Semua Gedung</option>
                                    {[
                                        "A",
                                        "B",
                                        "C",
                                        "D",
                                        "E",
                                        "F",
                                        "G",
                                        "H",
                                        "I",
                                        "J",
                                        "K",
                                    ].map((gedung) => (
                                        <option key={gedung} value={gedung}>
                                            Gedung {gedung}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <h2 className="text-lg font-medium text-gray-700 mb-4">
                                Pilih Ruangan
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md text-sm">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-600 uppercase leading-normal">
                                            <th className="py-2 px-2 border border-gray-300 text-center">
                                                Nama Ruangan
                                            </th>
                                            <th className="py-2 px-2 border border-gray-300 text-center">
                                                Gedung
                                            </th>
                                            <th className="py-2 px-2 border border-gray-300 text-center">
                                                Kapasitas
                                            </th>
                                            <th className="py-2 px-2 border border-gray-300 text-center">
                                                Alokasi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 font-light">
                                        {filteredRooms.map((ruang) => (
                                            <tr
                                                key={ruang.id}
                                                className="border-b border-gray-300 hover:bg-gray-50"
                                            >
                                                <td className="py-1 px-2 border border-gray-300 text-center">
                                                    {ruang.nama_ruang}
                                                </td>
                                                <td className="py-1 px-2 border border-gray-300 text-center">
                                                    {ruang.gedung}
                                                </td>
                                                <td className="py-1 px-2 border border-gray-300 text-center">
                                                    {ruang.kuota}
                                                </td>
                                                <td className="py-1 px-2 border border-gray-300 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectRooms.includes(
                                                            ruang.id
                                                        )}
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                ruang.id,
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="form-checkbox h-5 w-5 text-blue-600"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        {editId ? "Update Alokasi" : "Tambah Alokasi"}
                    </button>
                </form>
                {/* Tabel Alokasi */}
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Data Alokasi
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto bg-white border border-gray-300 shadow-md text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase leading-normal">
                                <th className="py-2 px-2 border border-gray-300 text-center">
                                    ID
                                </th>
                                <th className="py-2 px-2 border border-gray-300 text-center">
                                    Program Studi
                                </th>
                                <th className="py-2 px-2 border border-gray-300 text-center">
                                    Ruangan
                                </th>
                                <th className="py-2 px-2 border border-gray-300 text-center">
                                    Status
                                </th>
                                <th className="py-2 px-2 border border-gray-300 text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 font-light">
                            {alokasiData.map((alokasi) => {
                                // Cari nama program studi berdasarkan ID
                                const programStudi = programStudiData.find(
                                    (studi) =>
                                        studi.id === alokasi.program_studi_id
                                );

                                // Cari nama ruangan berdasarkan ID
                                const ruangKelas = alokasi.ruang_kelas_ids.map(
                                    (ruangId) => {
                                        const ruang = ruangKelasData.find(
                                            (ruangKelas) =>
                                                ruangKelas.id === ruangId
                                        );
                                        return ruang
                                            ? ruang.nama_ruang
                                            : "Tidak Ditemukan";
                                    }
                                );

                                return (
                                    <tr
                                        key={alokasi.id}
                                        className="border-b border-gray-300 hover:bg-gray-50"
                                    >
                                        <td className="py-2 px-2 border border-gray-300 text-center">
                                            {alokasi.id}
                                        </td>
                                        <td className="py-2 px-2 border border-gray-300 text-center">
                                            {programStudi
                                                ? alokasi.programStudi
                                                      .nama_program_studi
                                                : "Tidak Ditemukan"}
                                        </td>
                                        <td className="py-2 px-2 border border-gray-300 text-center">
                                            {alokasi.ruangKelas.join(", ")}
                                        </td>
                                        <td className="py-2 px-2 border border-gray-300 text-center">
                                            {alokasi.status}
                                        </td>
                                        <td className="py-2 px-2 border border-gray-300 text-center">
                                            {alokasi.status === "pending" ? (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleSend(
                                                                alokasi.id
                                                            )
                                                        }
                                                        className="bg-yellow-500 text-white font-semibold py-1 px-2 rounded-lg mr-2 hover:bg-yellow-600 transition duration-300"
                                                    >
                                                        Kirim
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setEditId(
                                                                alokasi.id
                                                            )
                                                        }
                                                        className="bg-blue-500 text-white font-semibold py-1 px-2 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                alokasi.id
                                                            )
                                                        }
                                                        className="bg-red-500 text-white font-semibold py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-gray-500 italic">
                                                    {alokasi.status ===
                                                    "onprocess"
                                                        ? "On Process"
                                                        : "Approved"}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default AlokasiRuangan;
