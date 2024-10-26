import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function JadwalDetail({ mataKuliah }) {
    return (
        <AuthenticatedLayout>
            <Head title={mataKuliah.nama_mata_kuliah} />

            <div className="p-8">
                <h2 className="text-2xl font-bold">{mataKuliah.nama_mata_kuliah}</h2>
                <div className="my-4">
                    <p><strong>Semester:</strong> {mataKuliah.semester}</p>
                    <p><strong>SKS:</strong> {mataKuliah.sks}</p>
                    <p><strong>Kode MK:</strong> {mataKuliah.kode_mata_kuliah}</p>
                </div>

                {/* Form Pengaturan Jadwal */}
                <div>
                    <h3 className="text-xl font-bold">Pengaturan Jadwal</h3>
                    {/* Tambahkan form dan tabel sesuai gambar di atas */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default JadwalDetail;
