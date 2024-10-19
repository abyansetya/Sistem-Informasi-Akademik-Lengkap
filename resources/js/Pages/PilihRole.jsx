import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

function PilihRole({ roles }) {
    // Menggunakan useForm dari Inertia untuk menangani form
    const { post, setData } = useForm({
        selected_role: "", // Field untuk menyimpan role yang dipilih
    });

    // Function untuk mengirim form ke server
    const submitRole = (role) => {
        setData("selected_role", role); // Set role yang dipilih
        post(route("pilihrole.choose")); // Kirim data ke route 'pilihrole.choose'
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Pilih Role Anda</h2>
                {roles.length > 0 ? (
                    roles.map((role, index) => (
                        <div key={index} className="mb-2">
                            <button
                                onClick={() => submitRole(role)} // Panggil submitRole saat role dipilih
                                className="text-blue-500 hover:underline"
                            >
                                {role}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Tidak ada role yang tersedia.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

export default PilihRole;
