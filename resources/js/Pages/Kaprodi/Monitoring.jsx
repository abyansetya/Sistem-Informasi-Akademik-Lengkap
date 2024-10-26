import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function Monitoring({user,roles}) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="JadwalKuliah" />




        </AuthenticatedLayout>
    );
}

export default Dashboard;
