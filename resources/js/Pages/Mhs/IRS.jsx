import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";
import React from "react";

export default function IRS({
    user,
    roles,
    mahasiswa,
    doswal,
    rekapAll,
    rekapsmt,
}) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Dashboard" />

            <div className="py-12 font-poppins">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">IRS</div>
            </div>
        </AuthenticatedLayout>
    );
}
