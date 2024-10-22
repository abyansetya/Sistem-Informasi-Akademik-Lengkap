import React, {useState} from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, Link, useForm } from "@inertiajs/react";
import { router } from '@inertiajs/react';

function AlokasiRuangan() {
  return (
    <AuthenticatedLayout role="Bagian Akademik">
        <Head title='Alokasi Ruangan' />

        <div className="container mx-auto p-6 max-w-7xl">
            <h1 className="text-2xl font-bold mb-4">Alokasi Ruangan</h1>
            <form onSubmit={" "}>
                <label>Pilih Program Studi</label>
                <select >
                    <option value="">Pilih Program Studi</option>
                </select>
            </form>
        </div>
    </AuthenticatedLayout>
  )
}

export default AlokasiRuangan