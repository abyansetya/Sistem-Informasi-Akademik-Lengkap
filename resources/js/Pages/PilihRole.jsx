import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

function PilihRole({ roles }) {
    // Function to determine the route based on role
    const getRoleRoute = (role) => {
        switch (role) {
            case "Mahasiswa":
                return route("mhs.index"); // Route ke halaman Mahasiswa
            case "Dekan":
                return route("dekan.index"); // Route ke halaman Dekan
            case "Ketua Prodi":
                return route("kaprodi.index"); // Route ke halaman Ketua Prodi
            case "Pembimbing Akademik":
                return route("doswal.index"); // Route ke halaman Pembimbing Akademik
            case "Bagian Akademik":
                return route("bagianakademik.index"); // Route ke halaman Bagian Akademik
            default:
                return "#"; // Jika tidak ada route yang sesuai
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Pilih Role Anda</h2>
                {roles.length > 0 ? (
                    roles.map((role, index) => (
                        <div key={index} className="mb-2">
                            <Link
                                href={getRoleRoute(role)} // Mengarahkan ke route sesuai dengan role
                                className="text-blue-500 hover:underline"
                            >
                                {role}
                            </Link>
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
