import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import verifikasi from "@/../../public/verifikasi.svg";
import axios from "axios";
import Swal from "sweetalert2";

function Jadwalirs({ user, roles, mahasiswa, irs, tahun_ajaran, rekapsmt }) {
    const handleDownloadIRS = async (semester) => {
        try {
            // Tampilkan loading state
            Swal.fire({
                title: "Memproses...",
                text: "Sedang menyiapkan dokumen IRS",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            const response = await axios.get(
                route("mhs.downloadIRS", {
                    semester,
                    NIM: mahasiswa.NIM,
                    Tahun_Ajaran: encodeURIComponent(tahun_ajaran.tahun),
                    keterangan: tahun_ajaran.keterangan,
                }),
                { responseType: "blob" }
            );
            if (!response.data) {
                throw new Error("No data received");
            }
            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `IRS_${mahasiswa.NIM}_Semester_${semester}.pdf`;
            link.click();
            // Tutup loading state dan tampilkan pesan sukses
            await Swal.fire({
                title: "Berhasil!",
                text: "File IRS berhasil diunduh",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
        } catch (error) {
            console.error("Download error:", error);
            await Swal.fire({
                title: "Gagal!",
                text: `Gagal mengunduh IRS: ${
                    error.response?.data?.message || error.message
                }`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
        }
    };
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
                            <table className="min-w-full table-auto bg-white rounded-lg border border-gray-500">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 font-semibold text-[15px] border border-gray-300">
                                            Kode MK
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px] border border-gray-300">
                                            Mata Kuliah
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px] border border-gray-300">
                                            SKS
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px] border border-gray-300">
                                            Hari
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px] border border-gray-300">
                                            Jam
                                        </th>
                                        <th className="px-4 py-2 font-semibold text-[15px] border border-gray-300">
                                            Ruang
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {irs && irs.length > 0 ? (
                                        irs.map((ir, index) => (
                                            <tr key={ir.jadwal_id || index}>
                                                <td className="px-4 py-2 text-[15px] text-center border border-gray-300">
                                                    {ir.kode_mk}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center border border-gray-300">
                                                    {ir.mata_kuliah_name}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center border border-gray-300">
                                                    {ir.sks}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center border border-gray-300">
                                                    {ir.hari}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center border border-gray-300">
                                                    {ir.jam_mulai} -{" "}
                                                    {ir.jam_selesai}
                                                </td>
                                                <td className="px-4 py-2 text-[15px] text-center border border-gray-300">
                                                    {ir.nama_ruang}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center py-4 border border-gray-300"
                                            >
                                                Tidak ada data IRS
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() =>
                                        handleDownloadIRS(rekapsmt[0].Semester)
                                    }
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Download IRS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Jadwalirs;
