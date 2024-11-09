import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head } from "@inertiajs/react";

function verifikasiIRS({ user, roles }) {
    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Verifikasi IRS" />
            <div className="py-12 px-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 font-poppins">
                    <div className="flex-col border border-gray-300 rounded-[10px] shadow-lg shadow-gray-100/50 mt-5 bg-white w-full h-full p-6">
                        <div className="border-b-2 border-black w-[85%] mx-auto">
                            <p className="text-[24px] md:text-[22px] font-bold ">
                                Verifikasi IRS
                            </p>
                        </div>
                        {/* Table verifikasiIRS */}
                        <div className="overflow-x-auto pr-[90px] pl-[90px] pt-[20px]">
                            <div className="overflow-hidden rounded-lg shadow-lg flex justify-center">
                                <table className="min-w-full table-auto bg-white rounded-lg border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                ANGKATAN
                                            </th>
                                            <th className="px-4 py-2 font-normal text-[15px]">
                                                STATUS
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default verifikasiIRS;
