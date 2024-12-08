import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, Link } from "@inertiajs/react";

function JadwalKuliah({ user, roles, mataKuliah }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        kodeMK: '',
        name: '',
        sks: '',
        semester: '',
        prioritasSemester: '',
    });
    const [errors, setErrors] = useState({}); // State to handle validation errors
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const data = new FormData();
        data.append('kodeMK', formData.kodeMK);
        data.append('name', formData.name);
        data.append('sks', formData.sks);
        data.append('semester', formData.semester);
        data.append('prioritasSemester', formData.prioritasSemester);

        try {
            const response = await fetch('/mata-kuliah', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: data,
            });

            if (response.ok) {
                alert('Mata kuliah berhasil ditambahkan!');
                closeModal();
                // Optionally refresh mataKuliah list here
            } else {
                const result = await response.json();
                if (result.errors) {
                    setErrors(result.errors); // Capture errors from backend
                } else {
                    throw new Error('Gagal mengirim data');
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Gagal menambahkan mata kuliah!');
        }
    };

    const filteredMataKuliah = mataKuliah.filter((matkul) =>
        matkul.Name.toLowerCase().includes(searchQuery)
    );

    const cardsPerPage = 16;
    const [currentPage, setCurrentPage] = useState(0);
    const startIndex = currentPage * cardsPerPage;
    const currentCards = filteredMataKuliah.slice(startIndex, startIndex + cardsPerPage);

    const goToNextPage = () => {
        if (startIndex + cardsPerPage < filteredMataKuliah.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Jadwal Kuliah" />
            <meta name="csrf-token" content="{{ csrf_token() }}"></meta>

            <div className="flex justify-between items-center p-8">
                <h1 className="text-2xl font-bold">Jadwal Kuliah</h1>
                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Cari Mata Kuliah..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border p-2 w-64 rounded-lg"
                    />
                    <button
                        onClick={openModal}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
                    >
                        Tambah Mata Kuliah
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6 p-8">
                {currentCards.map((matkul) => (
                    <div key={matkul.id} className="border p-4 rounded-lg shadow-md flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-lg font-bold">{matkul.Name}</h3>
                            <p>SKS: {matkul.sks}</p>
                            <p>Semester: {matkul.semester}</p>
                        </div>
                        <div className="mt-4">
                            <button className="w-full px-4 py-2 rounded-lg font-bold bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out">
                                <Link href={route('kaprodi.jadwalDetail', { id: matkul.id })}>Set Jadwal</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center p-8">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                >
                    Prev
                </button>
                <button
                    onClick={goToNextPage}
                    disabled={startIndex + cardsPerPage >= filteredMataKuliah.length}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Tambah Mata Kuliah</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Kode MK</label>
                                <input
                                    type="text"
                                    name="kodeMK"
                                    value={formData.kodeMK}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 rounded p-2 w-full"
                                />
                                {errors.kodeMK && <p className="text-red-500 text-xs">{errors.kodeMK}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nama Mata Kuliah</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 rounded p-2 w-full"
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">SKS</label>
                                <input
                                    type="number"
                                    name="sks"
                                    value={formData.sks}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 rounded p-2 w-full"
                                />
                                {errors.sks && <p className="text-red-500 text-xs">{errors.sks}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Semester</label>
                                <select
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 rounded p-2 w-full"
                                >
                                    <option value="">Pilih Semester</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                                        <option key={semester} value={semester}>
                                            {semester}
                                        </option>
                                    ))}
                                </select>
                                {errors.semester && <p className="text-red-500 text-xs">{errors.semester}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Prioritas Semester</label>
                                <input
                                    type="number"
                                    name="prioritasSemester"
                                    value={formData.prioritasSemester}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-300 rounded p-2 w-full"
                                />
                                {errors.prioritasSemester && <p className="text-red-500 text-xs">{errors.prioritasSemester}</p>}
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

export default JadwalKuliah;
