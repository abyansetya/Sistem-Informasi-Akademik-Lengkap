import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";

function KHS({
    user,
    roles,
    mahasiswa,
    doswal,
    rekapAll,
    rekapsmt,
    matakuliah,
    jadwal,
    irs,
}) {
    const [openSemester, setOpenSemester] = useState(null);

    return (
        <AuthenticatedLayout1 role={roles}>
            <Head title="Dashboard" />

            <div className="py-12 font-poppins">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full">
                        <h2 className="text-2xl font-bold mb-4">KHS</h2>
                        <div className="space-y-2">
                            {Array.from(
                                { length: rekapsmt[0].Semester },
                                (_, i) => i + 1
                            ).map((semester) => {
                                const semesterIRS = irs.filter((item) => {
                                    const jadwalItem = jadwal.find(
                                        (j) => j.jadwal_id === item.jadwal_id
                                    );
                                    return (
                                        jadwalItem &&
                                        semester === rekapsmt[0].Semester
                                    );
                                });

                                return (
                                    <div
                                        key={semester}
                                        className="border rounded-lg shadow-md"
                                    >
                                        <div
                                            className="bg-gray-100 py-2 px-4 flex justify-between items-center cursor-pointer"
                                            onClick={() =>
                                                setOpenSemester(
                                                    openSemester === semester
                                                        ? null
                                                        : semester
                                                )
                                            }
                                        >
                                            <h3 className="font-bold">
                                                Semester {semester}
                                            </h3>
                                            <span className="text-2xl font-bold">
                                                {openSemester === semester
                                                    ? "-"
                                                    : "+"}
                                            </span>
                                        </div>
                                        {openSemester === semester && (
                                            <div className="p-4 transition-all duration-1500">
                                                {semesterIRS.length > 0 ? (
                                                    <>
                                                        <table className="w-full min-w-[800px] border-collapse border border-gray-300  transition-all duration-1500">
                                                            <thead>
                                                                <tr className="bg-gray-100">
                                                                    <th className="border border-gray-300 p-4">
                                                                        No
                                                                    </th>
                                                                    <th className="border border-gray-300 p-4">
                                                                        Kode MK
                                                                    </th>
                                                                    <th className="border border-gray-300 p-4">
                                                                        Mata
                                                                        Kuliah
                                                                    </th>
                                                                    <th className="border border-gray-300 p-4">
                                                                        SKS
                                                                    </th>
                                                                    <th className="border border-gray-300 p-4">
                                                                        Nilai
                                                                        Huruf
                                                                    </th>
                                                                    <th className="border border-gray-300 p-4">
                                                                        Bobot
                                                                    </th>
                                                                    <th className="border border-gray-300 p-4">
                                                                        SKS x
                                                                        Bobot
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {semesterIRS.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        const jadwalItem =
                                                                            jadwal.find(
                                                                                (
                                                                                    j
                                                                                ) =>
                                                                                    j.jadwal_id ===
                                                                                    item.jadwal_id
                                                                            );
                                                                        const matakuliahItem =
                                                                            matakuliah.find(
                                                                                (
                                                                                    mk
                                                                                ) =>
                                                                                    mk.kode_mk ===
                                                                                    jadwalItem?.kode_mk
                                                                            );

                                                                        return (
                                                                            <tr
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="hover:bg-gray-100 transition-colors duration-200"
                                                                            >
                                                                                <td className="border border-gray-300 p-4">
                                                                                    {index +
                                                                                        1}
                                                                                </td>

                                                                                <td className="border border-gray-300 p-4">
                                                                                    {
                                                                                        jadwalItem?.kode_mk
                                                                                    }
                                                                                </td>
                                                                                <td className="border border-gray-300 p-4">
                                                                                    {
                                                                                        jadwalItem?.mata_kuliah_name
                                                                                    }
                                                                                </td>

                                                                                <td className="border border-gray-300 p-4">
                                                                                    {
                                                                                        jadwalItem?.sks
                                                                                    }
                                                                                </td>
                                                                                <td className="border border-gray-300 p-4">
                                                                                    -
                                                                                </td>
                                                                                <td className="border border-gray-300 p-4">
                                                                                    -
                                                                                </td>
                                                                                <td className="border border-gray-300 p-4">
                                                                                    -
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    }
                                                                )}
                                                                <tr>
                                                                    <td
                                                                        colSpan="3"
                                                                        className="border border-gray-300 p-4 font-bold text-right"
                                                                    >
                                                                        Total
                                                                    </td>
                                                                    <td className="border border-gray-300 p-4 font-bold text-right">
                                                                        {semesterIRS.reduce(
                                                                            (
                                                                                total,
                                                                                item
                                                                            ) => {
                                                                                const jadwalItem =
                                                                                    jadwal.find(
                                                                                        (
                                                                                            j
                                                                                        ) =>
                                                                                            j.jadwal_id ===
                                                                                            item.jadwal_id
                                                                                    );
                                                                                return (
                                                                                    total +
                                                                                    (jadwalItem?.sks ||
                                                                                        0)
                                                                                );
                                                                            },
                                                                            0
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                ) : (
                                                    <div className="text-center text-gray-500 py-8">
                                                        Data Kosong
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout1>
    );
}

export default KHS;
