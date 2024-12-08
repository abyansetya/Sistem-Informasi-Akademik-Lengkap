import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import verifikasi from "@/../../public/verifikasi.svg";

function Jadwalirs({ roles, mahasiswa, irs }) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Jadwal_Irs" />
            <div className="py-12 px-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 font-poppins">
                    <div className="flex flex-col border rounded-[10px] shadow-lg shadow-gray-200/50 mt-5 bg-white w-full h-full">
                        <div className="border-b-2 border-black w-[85%] mx-auto pt-4 flex items-center">
                            <img
                                src={verifikasi}
                                alt="Verifikasi"
                                className="mr-4 h-[30px]"
                            />
                            <p className="text-[30px] md:text-[18px] font-bold">
                                IRS
                            </p>
                            <div className="flex flex-wrap">
                                {mahasiswa && (
                                    <h2
                                        key={mahasiswa.NIM}
                                        className="text-[18px] font-semibold ml-2"
                                    >
                                        {mahasiswa.Name}
                                    </h2>
                                )}
                            </div>
                        </div>
                        <div className="overflow-x-auto pr-[90px] pl-[90px] mb-5 mt-5">
                            <table className="min-w-full table-auto bg-white rounded-lg border-separate border-spacing-0">
                                <thead className="bg-cgrey-0">
                                    <tr>
                                        <th className="px-4 py-2 font-semibold text-[15px]">
                                            Kode MK
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px]">
                                            Mata Kuliah
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px]">
                                            SKS
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px]">
                                            Hari
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px]">
                                            Jam
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px]">
                                            Ruang
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="shadow ">
                                    {irs && irs.length > 0 ? (
                                        irs.map((ir) => (
                                            <tr key={ir.irs_id} className=" ">
                                                <td className="px-4 py-2 text-[15px] text-center">
                                                    {ir.kode_mk}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center">
                                                    {ir.mata_kuliah_name}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center">
                                                    {ir.sks}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center">
                                                    {ir.hari}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center">
                                                    {ir.jam_mulai} -{" "}
                                                    {ir.jam_selesai}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center">
                                                    {ir.nama_ruang}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center py-4"
                                            >
                                                Tidak ada data IRS
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Jadwalirs;
