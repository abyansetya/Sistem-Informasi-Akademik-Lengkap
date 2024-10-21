import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function KelolaRuang({ user, roles, ruangkelas }) {
    const { post } = useForm();
    const [statusRuang, setStatusRuang] = useState(
        ruangkelas.data.map((ruang) => ({
            id: ruang.id,
            status: ruang.status,
        }))
    );

    // Fungsi untuk mengubah status
    const handleSetujui = (id) => {
        post(`/Dekan/${id}/setujui`, {
            preserveScroll: true, // Agar tidak scroll ke atas saat submit
            onSuccess: () => {
                // Optionally, you can still handle local state updates if needed
                setStatusRuang((prevStatus) =>
                    prevStatus.map((ruang) =>
                        ruang.id === id
                            ? { ...ruang, status: "Disetujui" }
                            : ruang
                    )
                );
            },
        });
    };

    const PaginationLinks = () => {
        return (
            <div className="flex justify-center mt-4">
                {ruangkelas.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ? link.url : "#"}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`mx-1 px-3 py-1 border rounded ${
                            link.active
                                ? "bg-blue-500 text-white"
                                : "bg-white text-black"
                        }`}
                        preserveScroll // Tambahkan ini agar scroll tetap pada posisi
                    />
                ))}
            </div>
        );
    };

    const role = roles.length > 0 ? roles : "No role available";

    return (
        <AuthenticatedLayout1 role={roles}>
            <Head title="Kelola ruang" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                <div className="flex border rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 p-6 items-center gap-[20px]">
                    <div className="w-[30%] flex flex-col">
                        <h1 className="font-bold text-[20px]">Profil</h1>
                        <img
                            src="../fotoprofil.svg"
                            alt=""
                            className="w-[120px] self-center mt-4"
                        />
                        <div className="items-center flex flex-col mt-4 w-full">
                            <p className="font-bold text-[18px]">{user.name}</p>
                            <p className="text-cgrey-2 text-[13px]">
                                NIP. {user.NIM_NIP}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-[18px] mb-2">
                            Admin {role}
                        </p>
                        <p className="text-[18px]">
                            Fakultas Sains dan Matematika
                        </p>
                    </div>
                </div>

                <div className="flex border rounded-[15px] shadow-lg shadow-gray-500/50 mt-6 p-6 items-center gap-[20px]">
                    <div className="flex flex-col w-full">
                        <h1 className="font-bold text-[20px] mb-[5px]">
                            Ruang Kelas
                        </h1>
                        <div className="h-[4px] bg-black border w-full" />
                        <div className="overflow-x-auto mt-4 rounded-lg">
                            <table className="min-w-full table-auto bg-cgrey-0 rounded-lg shadow-md text-sm font-poppins">
                                <thead>
                                    <tr className="bg-gray-100 text-black uppercase leading-normal">
                                        <th className="py-3 px-3 border-none text-center">
                                            ID
                                        </th>
                                        <th className="py-3 px-3 border-none text-center">
                                            Nama Ruang
                                        </th>
                                        <th className="py-3 px-3 border-none text-center">
                                            Gedung
                                        </th>
                                        <th className="py-3 px-3 border-none text-center">
                                            Kuota
                                        </th>
                                        <th className="py-3 px-3 border-none text-center">
                                            Program Studi
                                        </th>
                                        <th className="py-3 px-3 border-none text-center">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 border-none font-light">
                                    {ruangkelas.data.map((ruang) => (
                                        <tr
                                            key={ruang.id}
                                            className="border-b border-none hover:bg-gray-50"
                                        >
                                            <td className="py-2 px-2 border-none text-center">
                                                {ruang.id}
                                            </td>
                                            <td className="py-2 px-2 border-none text-center">
                                                {ruang.nama_ruang}
                                            </td>
                                            <td className="py-2 px-2 border-none text-center">
                                                {ruang.gedung}
                                            </td>
                                            <td className="py-2 px-2 border-none text-center">
                                                {ruang.kuota}
                                            </td>
                                            <td className="py-2 px-2 border-none text-center">
                                                {ruang.program_studi
                                                    ? ruang.program_studi
                                                          .nama_program_studi
                                                    : "Prodi Belum Ditetapkan"}
                                            </td>
                                            <td className="py-2 px-2 border-none text-center">
                                                <button
                                                    onClick={() =>
                                                        handleSetujui(ruang.id)
                                                    }
                                                    className={`rounded-full border w-fit p-2 px-4 text-white font-poppins font-semibold ${
                                                        statusRuang.find(
                                                            (status) =>
                                                                status.id ===
                                                                ruang.id
                                                        )?.status ===
                                                        "Disetujui"
                                                            ? "bg-cgreen-2"
                                                            : "bg-cred-1"
                                                    }`}
                                                >
                                                    {statusRuang.find(
                                                        (status) =>
                                                            status.id ===
                                                            ruang.id
                                                    )?.status === "Disetujui"
                                                        ? "Disetujui"
                                                        : "Belum Disetujui"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <PaginationLinks />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout1>
    );
}
