import React from "react";
import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function JadwalDetail({ user, roles, mataKuliah }) {
  
    return (
        <AuthenticatedLayout1 role={roles}> 
            <Head title={mataKuliah.nama_mata_kuliah} />

            <div className="p-8">
                <h2 className="text-2xl font-bold">{mataKuliah.nama_mata_kuliah}</h2>
                <div className="my-4">
                    {user.name}
                    <p><strong>Semester:</strong> {mataKuliah.semester}</p>
                    <p><strong>SKS:</strong> {mataKuliah.sks}</p>
                    <p><strong>Kode MK:</strong> {mataKuliah.kode_mata_kuliah}</p>
                </div>

                {/* Form Pengaturan Jadwal */}
                <div>
                    <h3 className="text-xl font-bold">Pengaturan Jadwal</h3>
                    {/* Tambahkan form dan tabel sesuai kebutuhan */}
                </div>
            </div>
        </AuthenticatedLayout1>
    );
}

export default JadwalDetail;