import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="font-poppins flex min-h-screen">
            {/* Section Kiri */}
            <div className="flex-1 flex items-center justify-center bg-cpurple-0 px-6">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center ">
                        <img src="LogoUndip.png" alt="" className="w-[130px]" />
                        <h1 className="text-[48px] tracking-[10px] font-semibold ">
                            SIAL
                        </h1>
                        <p className="font-medium -mt-3 mb-3 text-[20px] ">
                            Universitas Diponegoro
                        </p>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-lg">
                        {children}
                    </div>
                </div>
            </div>

            {/* Section Kanan */}
            <div className="flex-1 flex items-center justify-center bg-gray-200">
                <h2>Section Kanan</h2>
                <p>Konten untuk section kanan.</p>
            </div>
        </div>
    );
}
