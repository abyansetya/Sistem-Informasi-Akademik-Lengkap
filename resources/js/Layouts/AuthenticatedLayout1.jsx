import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import LeftNavbar from "./LeftNavbar";

function AuthenticatedLayout1({ header, children, role }) {
    const user = usePage().props.auth.user;
    const roles = role;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Fungsi untuk menentukan route dashboard berdasarkan prioritas role
    const getDashboardRoute = () => {
        if (roles.includes("Dekan")) {
            return route("dekan.index");
        } else if (roles.includes("Mahasiswa")) {
            return route("mhs.index");
        } else if (roles.includes("Bagian Akademik")) {
            return route("bagianakademik.index");
        } else if (roles.includes("Pembimbing Akademik")) {
            return route("doswal.index");
        } else if (roles.includes("Ketua Prodi")) {
            return route("kaprodi.index");
        }
        return route("dashboard"); // Default route jika tidak ada role yang sesuai
    };

    // Menentukan menu berdasarkan role
    const renderNavItemsByRole = () => {
        if (roles.includes("Dekan")) {
            return (
                <>
                    <NavLink
                        href={route("dekan.index")}
                        active={route().current("dekan.index")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                    // href={route("kelolaRuang.index")}
                    // active={route().current("kelolaRuang.index")}
                    >
                        Ruang Kuliah
                    </NavLink>
                    <NavLink
                    // href={route("kelolaRuang.index")}
                    // active={route().current("kelolaRuang.index")}
                    >
                        Jadwal Kuliah
                    </NavLink>
                </>
            );
        } else if (roles.includes("Mahasiswa")) {
            return (
                <>
                    <NavLink
                    // href={route("mhs.index")}
                    // active={route().current("mhs.index")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                    // href={route("irs.index")}
                    // active={route().current("irs.index")}
                    >
                        IRS
                    </NavLink>
                    <NavLink
                    // href={route("irs.index")}
                    // active={route().current("irs.index")}
                    >
                        KHS
                    </NavLink>
                </>
            );
        } else if (roles.includes("Bagian Akademik")) {
            return (
                <>
                    <NavLink
                        href={route("bagianakademik.index")}
                        active={route().current("bagianakademik.index")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route("bagianakademik.KelolaRuang")}
                        active={route().current("bagianakademik.KelolaRuang")}
                    >
                        Kelola Ruangan
                    </NavLink>
                </>
            );
        } else if (roles.includes("Pembimbing Akademik")) {
            return (
                <>
                    <NavLink
                    // href={route("doswal.index")}
                    // active={route().current("doswal.index")}
                    >
                        Dashboard Pembimbing Akademik
                    </NavLink>
                </>
            );
        } else if (roles.includes("Ketua Prodi")) {
            return (
                <>
                    <NavLink href={route("kaprodi.dashboard")} active={route().current("kaprodi.dashboard")}>
                        Dashboard
                    </NavLink>
                    <NavLink href={route("kaprodi.jadwalKuliah")} active={route().current("kaprodi.jadwalKuliah")}>
                        Jadwal Kuliah
                    </NavLink>
                    <NavLink href={route("kaprodi.mahasiswa")} active={route().current("kaprodi.mahasiswa")}>
                        Mahasiswa
                    </NavLink>
                    <NavLink href={route("kaprodi.monitoringMataKuliah")} active={route().current("kaprodi.monitoringMataKuliah")}>
                        Monitoring Mata Kuliah
                    </NavLink>
                </>
            );
        } else {
            return (
                <>
                    <NavLink
                    // href={route("dashboard")}
                    // active={route().current("dashboard")}
                    >
                        Dashboard
                    </NavLink>
                </>
            );
        }
    };

    return (
        <div className="ontainer mx-auto p-6">
            <nav className="border-b border-gray-100 bg-white font-poppins ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between">
                        <div className="flex shrink-0 items-center ">
                            <Link href={getDashboardRoute()}>
                                <img
                                    src="../LogoLeftBar.svg"
                                    alt=""
                                    className="w-[200px]"
                                />
                            </Link>
                        </div>

                        {/* Tampilkan item menu berdasarkan role */}
                        <div className="flex shrink-0 items-center gap-10">
                            {renderNavItemsByRole()}
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-black transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none "
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="">{children}</main>
        </div>
    );
}

export default AuthenticatedLayout1;
