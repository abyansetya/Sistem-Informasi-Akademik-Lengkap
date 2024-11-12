import React, { useState, useEffect } from "react";
import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function InputField({ label, type, name, value, onChange, required, placeholder }) {
    return (
        <div>
            <label className="block font-bold text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
    );
}

function SelectField({ label, name, value, onChange, options }) {
    return (
        <div>
            <label className="block font-bold text-gray-700">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="border border-gray-300 rounded p-2 w-full"
            >
                <option value="">Pilih {label}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.name || option.nama_ruang}>
                        {option.name || option.nama_ruang}
                    </option>
                ))}
            </select>
        </div>
    );
}

function JadwalDetail({ user, roles, mataKuliah }) {
    const [formData, setFormData] = useState({
        kodeMK: mataKuliah.kode_mata_kuliah,
        dosen: mataKuliah.dosen_pengampu,
        sks: mataKuliah.sks,
        ruang: mataKuliah.ruang_kelas,
        tanggal: '',
        waktuMulai: '',
        waktuSelesai: ''
    });

    const [dosenList, setDosenList] = useState([]);
    const [ruangList, setRuangList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for creating/updating jadwal (e.g., API call)
        console.log("Form submitted:", formData);
        // Add additional submission logic here
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [dosenResponse, ruangResponse] = await Promise.all([
                    fetch('/api/dosen'),
                    fetch('/api/ruang'),
                ]);

                if (!dosenResponse.ok || !ruangResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const dosenData = await dosenResponse.json();
                const ruangData = await ruangResponse.json();
                
                setDosenList(dosenData);
                setRuangList(ruangData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <AuthenticatedLayout1 role={roles}>
            <Head title={mataKuliah.nama_mata_kuliah} />

            <div className="p-8">
                <h2 className="text-2xl font-bold">{mataKuliah.nama_mata_kuliah}</h2>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <div className="my-4 space-y-4">
                    <InputField
                        label="Kode MK"
                        type="text"
                        name="kodeMK"
                        value={formData.kodeMK}
                        onChange={handleChange}
                        required
                    />

                    <SelectField
                        label="Dosen Pengampu"
                        name="dosen"
                        value={formData.dosen}
                        onChange={handleChange}
                        options={dosenList}
                    />

                    <SelectField
                        label="SKS"
                        name="sks"
                        value={formData.sks}
                        onChange={handleChange}
                        options={[{ id: 1, name: '2' }, { id: 2, name: '4' }]} // Example options, adjust as necessary
                    />

                    <SelectField
                        label="Ruang Kelas"
                        name="ruang"
                        value={formData.ruang}
                        onChange={handleChange}
                        options={ruangList}
                    />
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold">Pengaturan Jadwal</h3>
                    <form className="my-4 space-y-4" onSubmit={handleSubmit}>
                        <InputField
                            label="Tanggal"
                            type="date"
                            name="tanggal"
                            value={formData.tanggal}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Waktu Mulai"
                            type="time"
                            name="waktuMulai"
                            value={formData.waktuMulai}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Waktu Selesai"
                            type="time"
                            name="waktuSelesai"
                            value={formData.waktuSelesai}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Simpan Pengaturan Jadwal
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout1>
    );
}

export default JadwalDetail;
