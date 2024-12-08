import React, { useState, useEffect } from "react";
import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import { Head, router } from "@inertiajs/react";
import axios from 'axios';

function InputField({ label, type, name, value, onChange, required, placeholder, readOnly }) {
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
                readOnly={readOnly}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
    );
}

function SelectField({ label, name, value, onChange, options, labelKey = 'nama_dosen' }) {
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
                {options.map((option, index) => (
                    <option 
                        key={option.NIP || index}
                        value={option.NIP}
                    >
                        {option[labelKey]}
                    </option>
                ))}
            </select>
        </div>
    );
}

function JadwalDetail({ user, roles, mataKuliah, dosenList, ruangList, existingJadwal }) {
    const calculateEndTime = (startTime, sks) => {
        const [hours, minutes] = startTime.split(":").map(Number);
        const startMinutes = hours * 60 + minutes;
    
        let endMinutes = startMinutes + (sks * 60);
    
        const maxEndTime = 20 * 60 + 40;
    
        if (endMinutes > maxEndTime) {
            endMinutes = maxEndTime;
        }
    
        const endHours = Math.floor(endMinutes / 60);
        const endMins = endMinutes % 60;
    
        const endTime = `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
    
        return endTime;
    };
    
    
    // Initial form state as a function to allow easy resetting
    const getInitialFormState = () => ({
        kodeMK: mataKuliah.kode_mk, 
        kode_prodi: 'IF123',
        dosen: existingJadwal?.dosen_mk_id || '', 
        ruang: existingJadwal?.ruang_id || '',
        kelas: existingJadwal?.kelas || '',
        hari: existingJadwal?.hari || '',
        waktuMulai: existingJadwal?.jam_mulai || '',
        waktuSelesai: existingJadwal?.jam_selesai || '',
        sks: mataKuliah.sks,
    });

    const [formData, setFormData] = useState(getInitialFormState);
    const [isKelasExist, setIsKelasExist] = useState(false);
    const [kelasError, setKelasError] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (formData.waktuMulai) {
            setFormData((prevData) => ({
                ...prevData,
                waktuSelesai: calculateEndTime(formData.waktuMulai, formData.sks),
            }));
        }
    }, [formData.waktuMulai, formData.sks]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const checkKelasExistence = async (kelas) => {
        try {
            const response = await fetch(`/cek-jadwal/${formData.kodeMK}/${kelas}`);
            const data = await response.json();
            
            if (data.exists) {
                setIsKelasExist(true);
                setKelasError('Jadwal untuk kelas ini sudah ada.');
            } else {
                setIsKelasExist(false);
                setKelasError('');
            }
        } catch (error) {
            console.error('Error checking kelas existence:', error);
        }
    };

    const handleClassChange = (e) => {
        const selectedClass = e.target.value;
        setFormData({
            ...formData,
            kelas: selectedClass,
        });
        checkKelasExistence(selectedClass);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const startTime = formData.waktuMulai;
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const startTotalMinutes = startHour * 60 + startMinute;
    
        const minStartTime = 5 * 60 + 30;
        const maxEndTime = 20 * 60 + 40;
    
        if (startTotalMinutes < minStartTime) {
            alert("Waktu mulai tidak boleh lebih awal dari 05:30.");
            return;
        }
    
        const endTime = formData.waktuSelesai;
        const [endHour, endMinute] = endTime.split(":").map(Number);
        const endTotalMinutes = endHour * 60 + endMinute;
    
        if (endTotalMinutes > maxEndTime) {
            alert("Waktu selesai tidak boleh lebih dari 20:40.");
            return;
        }
    
        setShowModal(true);
    };

    const confirmSubmit = () => {
        setShowModal(false);

        const payload = {
            kode_mk: formData.kodeMK,
            nip_dosen: formData.dosen,
            nama_ruang: formData.ruang,
            kode_prodi: formData.kode_prodi,
            kelas: formData.kelas,
            hari: formData.hari,
            jam_mulai: formData.waktuMulai,
            jam_selesai: formData.waktuSelesai,
        };
        
        axios.post('/Kaprodi/simpanJadwal', payload)
        .then(response => {
            console.log(response);
            // Reset form to initial state after successful submission
            setFormData(getInitialFormState());
            // Optional: Add a success message or notification
            alert('Jadwal berhasil disimpan!');
        })
        .catch(error => {
            console.error(error);
            alert('Gagal menyimpan jadwal. Silakan coba lagi.');
        });
    };
    
    const cancelSubmit = () => {
        setShowModal(false);
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            router.delete(route('kaprodi.hapusJadwal', existingJadwal.id));
        }
    };

    return (
        <AuthenticatedLayout1 role={roles}>
            <Head title={mataKuliah.Name} />

            <div className="p-8">
                <h2 className="text-2xl font-bold">{mataKuliah.Name}</h2>

                <div className="my-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Kode MK"
                            type="text"
                            name="kodeMK"
                            value={formData.kodeMK}
                            onChange={handleChange}
                            required
                            placeholder="Kode Mata Kuliah"
                            readOnly
                        />

                        <SelectField
                            label="Dosen Pengampu"
                            name="dosen"
                            value={formData.dosen}
                            onChange={handleChange}
                            options={dosenList}
                            labelKey="Name"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold">Pengaturan Jadwal</h3>
                    <form className="my-4 space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold text-gray-700">Hari</label>
                                <select
                                    name="hari"
                                    value={formData.hari}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded p-2 w-full"
                                >
                                    <option value="">Pilih Hari</option>
                                    {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map((hari) => (
                                        <option key={hari} value={hari}>
                                            {hari}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700">Kelas</label>
                                <select
                                    name="kelas"
                                    value={formData.kelas}
                                    onChange={handleClassChange}
                                    className="border border-gray-300 rounded p-2 w-full"
                                >
                                    <option value="">Pilih Kelas</option>
                                    {["A", "B", "C", "D", "E", "F"].map((kelas) => (
                                        <option key={kelas} value={kelas}>
                                            {kelas}
                                        </option>
                                    ))}
                                </select>
                                {kelasError && <p className="text-red-500 text-sm mt-1">{kelasError}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Waktu Mulai"
                                type="time"
                                name="waktuMulai"
                                value={formData.waktuMulai}
                                onChange={handleChange}
                                required
                                placeholder="Waktu Mulai"
                            />

                            <InputField
                                label="Waktu Selesai"
                                type="time"
                                name="waktuSelesai"
                                value={formData.waktuSelesai}
                                onChange={handleChange}
                                required
                                placeholder="Waktu Selesai"
                                readOnly
                            />
                        </div>

                        <SelectField
                            label="Ruang Kelas"
                            name="ruang"
                            value={formData.ruang}
                            onChange={handleChange}
                            options={ruangList}
                            labelKey="nama_ruang"
                        />

                        <div className="mt-4 flex justify-between">
                            {existingJadwal ? (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Hapus Jadwal
                                </button>
                            ) : null}

                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                disabled={isKelasExist}
                            >
                                {existingJadwal ? 'Update Jadwal' : 'Simpan Jadwal'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal Konfirmasi */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Konfirmasi Penyimpanan</h3>
                        <p>Apakah Anda yakin ingin menyimpan jadwal ini?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={cancelSubmit}
                                className="mr-2 px-4 py-2 bg-gray-300 text-black rounded-md"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Ya
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout1>
    );
}

export default JadwalDetail;