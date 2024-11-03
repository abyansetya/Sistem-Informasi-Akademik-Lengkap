import AuthenticatedLayout1 from "@/Layouts/AuthenticatedLayout1";
import React from "react";

export default function JadwalKuliah({ user, roles }) {
    return (
        <AuthenticatedLayout1 role={roles}>JadwalKuliah</AuthenticatedLayout1>
    );
}
