import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function Dashboard({ user, roles }) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Mahasiswa
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
