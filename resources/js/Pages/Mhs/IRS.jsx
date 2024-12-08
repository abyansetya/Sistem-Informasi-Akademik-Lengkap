import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout1";
import { Head, useForm, router } from "@inertiajs/react"; // Add visit to imports
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function IRS({
    user,
    roles,
    mahasiswa,
    doswal,
    tahun_ajaran,
    rekapAll,
    rekapsmt,
    matakuliah,
    jadwal,
    irs,
}) {
    // Ubah inisialisasi state selectedCourses
    const [selectedCourses, setSelectedCourses] = useState(() => {
        const savedCourses = localStorage.getItem("selectedCourses");
        return savedCourses ? JSON.parse(savedCourses) : [];
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSchedules, setSelectedSchedules] = useState(() => {
        const savedSchedules = localStorage.getItem("selectedSchedules");
        return savedSchedules ? JSON.parse(savedSchedules) : [];
    });
    // Tambahkan state untuk menyimpan jadwal yang konflik
    const [conflictingSchedules, setConflictingSchedules] = useState([]);
    const [sksInfo, setSksInfo] = useState({
        total_sks: 0,
        max_sks: 0,
        remaining_sks: 0,
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("schedule");
    const [openSemester, setOpenSemester] = useState(null);
    const [periodStatus, setPeriodStatus] = useState("modification"); // 'modification', 'deletion', 'closed'
    const [daysLeftModification, setDaysLeftModification] = useState(0);
    const [daysLeftDeletion, setDaysLeftDeletion] = useState(0);

    // Define the important dates
    const enrollmentStartDate = new Date(tahun_ajaran.tanggal_mulai); // Convert to Date object

    // Add 2 weeks (14 days) to the enrollment start date
    const modificationEndDate = new Date(enrollmentStartDate);
    modificationEndDate.setDate(enrollmentStartDate.getDate() + 14);

    // Optionally, define deletionEndDate as 4 weeks (28 days) from the start date
    const deletionEndDate = new Date(enrollmentStartDate);
    deletionEndDate.setDate(enrollmentStartDate.getDate() + 28);
    // Add useEffect to check periods
    useEffect(() => {
        const checkPeriods = () => {
            const now = new Date();

            if (now <= modificationEndDate) {
                setPeriodStatus("modification");
            } else if (now <= deletionEndDate) {
                setPeriodStatus("deletion");
            } else {
                setPeriodStatus("closed");
            }

            // Calculate days left for modification
            const daysToModEnd = Math.ceil(
                (modificationEndDate - now) / (1000 * 60 * 60 * 24)
            );
            setDaysLeftModification(Math.max(0, daysToModEnd));

            // Calculate days left for deletion
            const daysToDeletionEnd = Math.ceil(
                (deletionEndDate - now) / (1000 * 60 * 60 * 24)
            );
            setDaysLeftDeletion(Math.max(0, daysToDeletionEnd));
        };

        checkPeriods();
        const interval = setInterval(checkPeriods, 3600000); // Update every hour
        return () => clearInterval(interval);
    }, []);

    const PeriodNotification = () => {
        const getNotificationContent = () => {
            switch (periodStatus) {
                case "modification":
                    return {
                        title: "Periode Pengisian dan Perubahan IRS",
                        message: `Anda dapat mengisi dan mengubah IRS. Sisa waktu: ${daysLeftModification} hari`,
                        color: "bg-green-100 border-green-500 text-green-700",
                    };
                case "deletion":
                    return {
                        title: "Periode Penghapusan IRS",
                        message:
                            "Anda hanya dapat menghapus mata kuliah dari IRS. Pengisian dan perubahan IRS sudah tidak diperbolehkan.",
                        color: "bg-yellow-100 border-yellow-500 text-yellow-700",
                    };
                case "closed":
                    return {
                        title: "Periode IRS Telah Berakhir",
                        message:
                            "Pengisian, perubahan, dan penghapusan IRS sudah tidak diperbolehkan.",
                        color: "bg-red-100 border-red-500 text-red-700",
                    };
                default:
                    return {};
            }
        };

        const content = getNotificationContent();
        return (
            <div className="mx-auto max-w-7xl flex gap-4 sm:px-6 lg:px-8">
                <div className={`border-l-4 p-4 mb-6 ${content.color}`}>
                    <h3 className="font-bold">{content.title}</h3>
                    <p>{content.message}</p>
                </div>
            </div>
        );
    };

    // Fungsi untuk mengupdate informasi SKS
    const updateSKSInfo = async () => {
        try {
            // Pastikan nilai yang dikirim sesuai
            const tahunAjaran = tahun_ajaran.tahun; // Hardcode sesuai semester aktif
            const keterangan = tahun_ajaran.keterangan; // Hardcode sesuai semester aktif

            console.log("Fetching SKS info with params:", {
                NIM: mahasiswa.NIM,
                Tahun_Ajaran: tahunAjaran,
                keterangan: keterangan,
            });

            const response = await axios.get(route("mhs.getCurrentSKS"), {
                params: {
                    NIM: mahasiswa.NIM,
                    Tahun_Ajaran: tahunAjaran,
                    keterangan: keterangan,
                },
            });

            console.log("SKS info response:", response.data);
            setSksInfo(response.data);
        } catch (error) {
            console.error("Error fetching SKS info:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
        }
    };

    // Ubah useEffect untuk mengupdate SKS setiap kali irs berubah
    useEffect(() => {
        updateSKSInfo();
    }, [irs]); // Tambahkan irs sebagai dependency

    // Effect untuk menyimpan ke localStorage setiap kali selectedSchedules berubah
    // useEffect(() => {
    //     localStorage.setItem(
    //         "selectedSchedules",
    //         JSON.stringify(selectedSchedules)
    //     );
    // }, [selectedSchedules]);

    // Tambahkan useEffect untuk selectedCourses
    useEffect(() => {
        localStorage.setItem(
            "selectedCourses",
            JSON.stringify(selectedCourses)
        );
    }, [selectedCourses]);

    // Tambahkan useEffect untuk mengecek konflik setiap kali selectedSchedules berubah
    useEffect(() => {
        // Fungsi untuk mengecek konflik untuk semua jadwal
        const checkAllConflicts = () => {
            const conflicts = selectedCourses
                .flatMap((course) =>
                    jadwal.filter((schedule) => {
                        // Jika jadwal ini sudah dipilih, skip pengecekan
                        if (selectedSchedules.includes(schedule.jadwal_id)) {
                            return false;
                        }

                        // Cek konflik dengan jadwal yang sudah dipilih
                        const hasConflict = selectedSchedules.some(
                            (selectedId) => {
                                const selectedSchedule = jadwal.find(
                                    (j) => j.jadwal_id === selectedId
                                );
                                if (
                                    !selectedSchedule ||
                                    selectedSchedule.hari !== schedule.hari
                                ) {
                                    return false;
                                }

                                const scheduleStart = new Date(
                                    `2024-01-01T${schedule.jam_mulai}`
                                );
                                const scheduleEnd = new Date(
                                    `2024-01-01T${schedule.jam_selesai}`
                                );
                                const selectedStart = new Date(
                                    `2024-01-01T${selectedSchedule.jam_mulai}`
                                );
                                const selectedEnd = new Date(
                                    `2024-01-01T${selectedSchedule.jam_selesai}`
                                );

                                return (
                                    scheduleStart < selectedEnd &&
                                    scheduleEnd > selectedStart
                                );
                            }
                        );

                        return hasConflict;
                    })
                )
                .map((schedule) => schedule.jadwal_id);

            setConflictingSchedules(conflicts);
        };

        checkAllConflicts();
    }, [selectedSchedules, selectedCourses]);

    // State untuk menyimpan jadwal yang sudah ada di IRS
    const [existingIRSSchedules, setExistingIRSSchedules] = useState([]);

    // Fungsi untuk mengecek apakah jadwal sudah dipilih
    const isScheduleSelected = (jadwalId) => {
        return selectedSchedules.includes(jadwalId);
    };

    // Fungsi untuk mengecek apakah jadwal sudah ada di IRS
    const isScheduleInIRS = (kodeMk, irsData) => {
        return irsData.some((irsItem) => {
            const jadwalItem = jadwal.find(
                (j) => j.jadwal_id === irsItem.jadwal_id
            );
            return jadwalItem && jadwalItem.kode_mk === kodeMk;
        });
    };

    // Fungsi untuk mengecek apakah jadwal sudah ada di IRS
    const isScheduleInIRS1 = (jadwalId, irsData) => {
        return irsData.some((irsItem) => irsItem.jadwal_id === jadwalId);
    };

    // const { data, setData, post, errors, reset } = useForm({
    //     jadwal_id: "",
    //     NIM: mahasiswa.NIM, // Pastikan NIM diisi dengan benar
    //     status: "pending",
    //     Tahun_Ajaran: "2025/2026",
    //     keterangan: "Ganjil",
    // });

    // Fungsi untuk mengecek konflik jadwal
    const checkScheduleConflict = (schedule, existingSchedules) => {
        // Filter jadwal dari mata kuliah yang dipilih untuk hari yang sama
        const daySchedules = selectedCourses.flatMap((course) =>
            jadwal.filter(
                (item) =>
                    item.hari === schedule.hari &&
                    item.kode_mk === course.kode_mk &&
                    item.jadwal_id !== schedule.jadwal_id // Jangan bandingkan dengan dirinya sendiri
            )
        );

        return daySchedules.some((existing) => {
            const newStart = new Date(`2024-01-01T${schedule.jam_mulai}`);
            const newEnd = new Date(`2024-01-01T${schedule.jam_selesai}`);
            const existingStart = new Date(`2024-01-01T${existing.jam_mulai}`);
            const existingEnd = new Date(`2024-01-01T${existing.jam_selesai}`);

            return (
                (newStart < existingEnd && newEnd > existingStart) ||
                (existingStart < newEnd && existingEnd > newStart)
            );
        });
    };

    const checkConflictWithIRS = (newSchedule, irsData) => {
        return irsData.some((irsItem) => {
            const jadwalIRS = jadwal.find(
                (j) => j.jadwal_id === irsItem.jadwal_id
            );
            if (!jadwalIRS || jadwalIRS.hari !== newSchedule.hari) return false;

            const scheduleStart = new Date(
                `2024-01-01T${newSchedule.jam_mulai}`
            );
            const scheduleEnd = new Date(
                `2024-01-01T${newSchedule.jam_selesai}`
            );
            const irsStart = new Date(`2024-01-01T${jadwalIRS.jam_mulai}`);
            const irsEnd = new Date(`2024-01-01T${jadwalIRS.jam_selesai}`);

            return scheduleStart < irsEnd && scheduleEnd > irsStart;
        });
    };

    const getScheduleStatus = (schedule) => {
        // Cek apakah jadwal sudah ada di IRS
        if (isScheduleInIRS1(schedule.jadwal_id, irs)) {
            return "selected";
        }
        if (isScheduleInIRS(schedule.kode_mk, irs)) {
            return "in_irs";
        }

        // Cek apakah jadwal bentrok dengan jadwal yang ada di IRS
        if (checkConflictWithIRS(schedule, irs)) {
            return "conflict";
        }

        // Jika tidak ada di IRS dan tidak bentrok, maka jadwal tersedia
        return "available";
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    // Fungsi handleSelectCourse yang dimodifikasi (menghapus duplikasi localStorage)
    const handleSelectCourse = (e) => {
        const kodeMk = e.target.value;
        const selectedCourse = matakuliah.find((mk) => mk.kode_mk === kodeMk);

        if (
            selectedCourse &&
            !selectedCourses.some((course) => course.kode_mk === kodeMk)
        ) {
            setSelectedCourses([...selectedCourses, selectedCourse]);
        }
    };

    const handleAddToIrs = async (jadwalId) => {
        try {
            const scheduleToAdd = jadwal.find((j) => j.jadwal_id === jadwalId);
            if (!scheduleToAdd) return;

            if (isScheduleInIRS(scheduleToAdd.kode_mk, irs)) {
                await Swal.fire({
                    title: "Peringatan!",
                    text: "Mata kuliah ini sudah ada di IRS!",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                });
                return;
            }

            if (checkConflictWithIRS(scheduleToAdd, irs)) {
                await Swal.fire({
                    title: "Peringatan!",
                    text: "Terdapat jadwal yang bertabrakan!",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                });
                return;
            }

            const response = await axios.post(route("mhs.buatIRS"), {
                jadwal_id: jadwalId,
                NIM: mahasiswa.NIM,
                status: "pending",
                Tahun_Ajaran: tahun_ajaran.tahun,
                keterangan: tahun_ajaran.keterangan,
            });

            await Swal.fire({
                title: "Berhasil!",
                text: "Jadwal berhasil ditambahkan ke IRS!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });

            // Update SKS info setelah berhasil menambah IRS
            await updateSKSInfo();

            // Refresh the page after successful submission using router
            router.reload({
                preserveScroll: true,
                preserveState: false,
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                await Swal.fire({
                    title: "Error!",
                    text: error.response.data.errors.jadwal_id[0],
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                });
            } else {
                await Swal.fire({
                    title: "Error!",
                    text: "Gagal menambahkan jadwal: " + error.message,
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                });
            }
        }
    };

    // Fungsi handleRemoveCourse yang dimodifikasi (menghapus duplikasi localStorage)
    const handleRemoveCourse = (kodeMk) => {
        const newSelectedCourses = selectedCourses.filter(
            (course) => course.kode_mk !== kodeMk
        );
        setSelectedCourses(newSelectedCourses);
    };

    // Fungsi untuk membuat array jam (07:00 hingga 21:00)
    const generateTimeSlots = () => {
        const times = [];
        for (let i = 7; i <= 21; i++) {
            times.push(`${i.toString().padStart(2, "0")}:00`);
        }
        return times;
    };

    const roundTime = (time) => {
        const [hour] = time.split(":");
        const roundedHour = parseInt(hour);
        return `${roundedHour}:00`;
    };

    // New function to check for time conflicts
    const hasTimeConflict = (newSchedule) => {
        return selectedCourses.some((selectedCourse) => {
            const existingSchedules = jadwal.filter(
                (item) => item.kode_mk === selectedCourse.kode_mk
            );

            return existingSchedules.some((existingSchedule) => {
                // Check for conflicts on the same day
                if (existingSchedule.hari === newSchedule.hari) {
                    const existingStart = new Date(
                        `2024-01-01T${existingSchedule.jam_mulai}`
                    );
                    const existingEnd = new Date(
                        `2024-01-01T${existingSchedule.jam_selesai}`
                    );
                    const newStart = new Date(
                        `2024-01-01T${newSchedule.jam_mulai}`
                    );
                    const newEnd = new Date(
                        `2024-01-01T${newSchedule.jam_selesai}`
                    );

                    // Check if times overlap
                    return (
                        (newStart < existingEnd && newEnd > existingStart) ||
                        (existingStart < newEnd && existingEnd > newStart)
                    );
                }
                return false;
            });
        });
    };

    // Modifikasi komponen mapScheduleToTable
    const mapScheduleToTable = (day, time) => {
        const roundedTime = roundTime(time);
        const matchingSchedules = selectedCourses.flatMap((course) =>
            jadwal.filter(
                (item) =>
                    item.hari === day &&
                    item.kode_mk === course.kode_mk &&
                    roundTime(item.jam_mulai.slice(0, 5)) === roundedTime
            )
        );

        return (
            <div className="flex flex-col gap-2">
                {matchingSchedules.map((item) => {
                    const status = getScheduleStatus(item);
                    const statusColors = {
                        selected: "bg-cgreen-1",
                        in_irs: "bg-red-400 text-white hover:bg-red-600 cursor-not-allowed", // Merah untuk jadwal yang sudah ada di IRS
                        conflict:
                            "bg-yellow-100 hover:bg-yellow-200 cursor-not-allowed", // Kuning untuk jadwal yang bentrok
                        available:
                            "bg-cgrey-1 hover:bg-green-200 cursor-pointer", // Hijau untuk jadwal yang tersedia
                    };

                    const textColor =
                        status === "in_irs" ? "text-white" : "text-gray-600";

                    const handleClick = async () => {
                        if (status === "in_irs") {
                            await Swal.fire({
                                title: "Peringatan!",
                                text: "Mata kuliah ini sudah ada di IRS!",
                                icon: "warning",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "Ok",
                            });
                            return;
                        }
                        if (status === "conflict") {
                            await Swal.fire({
                                title: "Peringatan!",
                                text: "Jadwal ini bentrok dengan jadwal yang sudah ada di IRS!",
                                icon: "warning",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "Ok",
                            });
                            return;
                        }
                        handleAddToIrs(item.jadwal_id);
                    };

                    return (
                        <div
                            key={`${item.kode_mk}-${item.kelas}`}
                            className={`shadow-md rounded-lg p-4 transition-colors duration-200 ${statusColors[status]}`}
                            onClick={
                                status === "available" ? handleClick : undefined
                            }
                        >
                            <h3 className="font-bold text-lg">
                                {item.mata_kuliah_name}
                            </h3>
                            <p className={`text-sm ${textColor}`}>
                                {item.hari}
                            </p>
                            <p className={`text-sm ${textColor}`}>
                                {item.jam_mulai} - {item.jam_selesai}
                            </p>
                            <p className={`text-sm ${textColor}`}>
                                Kelas: {item.kelas}
                            </p>
                        </div>
                    );
                })}
            </div>
        );
    };

    const handleDeleteIRS = async (irsId) => {
        const result = await Swal.fire({
            title: "Apakah anda yakin?",
            text: "Anda akan menghapus mata kuliah ini dari IRS",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(route("mhs.deleteIRS", { id: irsId }));
                await updateSKSInfo();

                await Swal.fire({
                    title: "Berhasil!",
                    text: "Mata kuliah berhasil dihapus dari IRS",
                    icon: "success",
                });

                router.reload({ preserveScroll: true });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Gagal menghapus IRS: " + error.message,
                    icon: "error",
                });
            }
        }
    };

    // Effect untuk mengambil data IRS yang sudah ada
    useEffect(() => {
        const fetchExistingIRS = async () => {
            try {
                const response = await axios.get(route("mhs.IRS")); // Sesuaikan dengan route yang sesuai
                setExistingIRSSchedules(response.data);
            } catch (error) {
                console.error("Error fetching existing IRS:", error);
            }
        };

        fetchExistingIRS();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && event.target.closest(".relative") === null) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const timeSlots = generateTimeSlots();

    const updateAllIRSStatus = async () => {
        try {
            await axios.post(
                route("mhs.updateAllStatus", {
                    nim: mahasiswa.NIM,
                    tahunAjaran: tahun_ajaran.tahun,
                    keterangan: tahun_ajaran.keterangan,
                })
            );

            await Swal.fire({
                title: "Berhasil!",
                text: "IRS berhasil diajukan",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });

            router.reload({ preserveScroll: true });
        } catch (error) {
            await Swal.fire({
                title: "Error!",
                text: "Gagal mengajukan IRS: " + error.message,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
        }
    };

    const handleDownloadIRS = async (semester) => {
        try {
            // Tampilkan loading state
            Swal.fire({
                title: "Memproses...",
                text: "Sedang menyiapkan dokumen IRS",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await axios.get(
                route("mhs.downloadIRS", {
                    semester,
                    NIM: mahasiswa.NIM,
                    Tahun_Ajaran: encodeURIComponent(tahun_ajaran.tahun),
                    keterangan: tahun_ajaran.keterangan,
                }),
                { responseType: "blob" }
            );

            if (!response.data) {
                throw new Error("No data received");
            }

            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `IRS_${mahasiswa.NIM}_Semester_${semester}.pdf`;
            link.click();

            // Tutup loading state dan tampilkan pesan sukses
            await Swal.fire({
                title: "Berhasil!",
                text: "File IRS berhasil diunduh",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
        } catch (error) {
            console.error("Download error:", error);
            await Swal.fire({
                title: "Gagal!",
                text: `Gagal mengunduh IRS: ${
                    error.response?.data?.message || error.message
                }`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
        }
    };

    return (
        <AuthenticatedLayout role={roles}>
            <Head title="Dashboard" />
            <div className="py-12 font-poppins">
                <div className="mx-auto max-w-7xl flex gap-4 sm:px-6 lg:px-8">
                    <div className="w-full flex justify-center gap-10 flex-col">
                        <div className=" w-full flex justify-center">
                            <button
                                className={`w-[50%] px-4 py-2 rounded-t-lg border-b-4 ${
                                    activeTab === "schedule"
                                        ? "border-cpurple-1 "
                                        : "border-cgrey-1 "
                                }`}
                                onClick={() => setActiveTab("schedule")}
                            >
                                <p className="font-bold text-xl">Buat IRS</p>
                            </button>
                            <button
                                className={`w-[50%] px-4 py-2 rounded-t-lg border-b-4 ${
                                    activeTab === "irs"
                                        ? "border-cpurple-1"
                                        : "border-cgrey-1 "
                                }`}
                                onClick={() => setActiveTab("irs")}
                            >
                                <p className="font-bold text-xl">IRS</p>
                            </button>
                        </div>
                        <div className="border h-[2px] bg-cgrey-2 w-full" />
                    </div>
                </div>

                {activeTab === "schedule" && (
                    <>
                        <PeriodNotification />
                        {periodStatus === "modification" ? (
                            <div className="mx-auto max-w-7xl flex gap-4 sm:px-6 lg:px-8">
                                {/* Kolom Kiri */}
                                <div className="w-[30%] flex mt-6 flex-col gap-[20px]">
                                    {/* Informasi Mahasiswa */}
                                    <div className="border rounded-[15px] shadow-lg shadow-gray-500/50 p-6">
                                        <div className="flex mb-2 text-[15px]  ">
                                            <p className=" w-[80px] ">Nama</p>
                                            <p className="w-[10px]">:</p>
                                            <p className="font-bold">
                                                {mahasiswa.Name ||
                                                    "Nama Mahasiswa"}
                                            </p>
                                        </div>
                                        <div className="flex mb-2 text-[15px]">
                                            <p className=" w-[80px]">NIM</p>
                                            <p className="w-[10px]">:</p>
                                            <p className="font-bold">
                                                {mahasiswa.NIM ||
                                                    "NIM Mahasiswa"}
                                            </p>
                                        </div>
                                        <div className="h-[2px] bg-cgrey-2" />
                                        <div className="flex mb-2 items-center mt-2 text-[15px]">
                                            <p className=" w-[150px]">
                                                TH Ajaran
                                            </p>
                                            <p className="w-[10px]">:</p>
                                            <p className="font-bold">
                                                {tahun_ajaran.tahun}
                                            </p>
                                        </div>
                                        <div className="flex mb-2 items-center text-[15px]">
                                            <p className=" w-[150px]">
                                                Ganjil/Genap
                                            </p>
                                            <p className="w-[10px]">:</p>
                                            <p className="font-bold">
                                                {tahun_ajaran.keterangan}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-[15px]">
                                            <p className=" w-[150px]">
                                                Mata Kuliah Ditawarkan
                                            </p>
                                            <p className="w-[10px]">:</p>
                                            <p className="font-bold">
                                                SMT{" "}
                                                {rekapsmt[0]?.Semester || "1"}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-[15px]">
                                            <p className=" w-[150px]">Status</p>
                                            <p className="w-[10px]">:</p>
                                            <p className="font-bold">
                                                {irs && irs.length > 0 ? (
                                                    irs[0].status ===
                                                    "pending" ? (
                                                        <span className="text-red-500">
                                                            Belum Diajukan
                                                        </span>
                                                    ) : irs[0].status ===
                                                          "onprocess" ||
                                                      irs[0].status ===
                                                          "approved" ||
                                                      irs[0].status ===
                                                          "rejected" ? (
                                                        <span className="text-green-500">
                                                            Sudah Diajukan
                                                        </span>
                                                    ) : (
                                                        irs[0].status
                                                    )
                                                ) : (
                                                    <span className="text-red-500">
                                                        Belum Diajukan
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dropdown Pilihan Mata Kuliah */}
                                    <div className="border rounded-[15px] shadow-lg shadow-gray-500/50 p-6 items-center">
                                        <p>Pilih Mata Kuliah</p>
                                        <div className="relative">
                                            {/* Tombol Pilihan */}
                                            <div
                                                className="z-[999] w-full p-2 border rounded cursor-pointer mt-2"
                                                onClick={() =>
                                                    setIsDropdownOpen(
                                                        (prev) => !prev
                                                    )
                                                }
                                            >
                                                Pilih Mata Kuliah
                                            </div>

                                            {/* Custom Dropdown */}
                                            {isDropdownOpen && (
                                                <div className="absolute bg-white border rounded shadow-lg mt-1 w-full">
                                                    <div className="p-2 border-b">
                                                        <input
                                                            type="text"
                                                            placeholder="Cari mata kuliah..."
                                                            className="w-full p-2 border rounded"
                                                            onChange={(e) =>
                                                                setSearchTerm(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="max-h-60 overflow-y-auto">
                                                        {matakuliah
                                                            .filter((mk) =>
                                                                mk.Name.toLowerCase().includes(
                                                                    searchTerm.toLowerCase()
                                                                )
                                                            )
                                                            .map(
                                                                (mk, index) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex flex-col px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                                        onClick={() => {
                                                                            handleSelectCourse(
                                                                                {
                                                                                    target: {
                                                                                        value: mk.kode_mk,
                                                                                    },
                                                                                }
                                                                            );
                                                                            setIsDropdownOpen(
                                                                                false
                                                                            );
                                                                        }}
                                                                    >
                                                                        <p>
                                                                            {
                                                                                mk.Name
                                                                            }{" "}
                                                                            (SMT{" "}
                                                                            {
                                                                                mk.semester
                                                                            }
                                                                            ) (
                                                                            {
                                                                                mk.sks
                                                                            }{" "}
                                                                            SKS)
                                                                        </p>
                                                                    </div>
                                                                )
                                                            )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Daftar Mata Kuliah yang Dipilih */}
                                    <div className="border rounded-[15px] shadow-lg shadow-gray-500/50 p-6 items-center">
                                        <p className="mb-2">
                                            Mata Kuliah yang Dipilih:
                                        </p>
                                        <ul>
                                            {selectedCourses.map(
                                                (course, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex justify-between mb-2 border items-center p-4"
                                                    >
                                                        {/* {JSON.stringify(course)} */}
                                                        <div className="flex flex-col">
                                                            <p className="font-bold">
                                                                {course.Name}
                                                            </p>
                                                            <div className="flex text-[15px]">
                                                                <p className="text-cgrey-2">
                                                                    (SMT{" "}
                                                                    {
                                                                        course.semester
                                                                    }
                                                                    )
                                                                </p>
                                                                <p className="text-cgrey-2">
                                                                    (
                                                                    {course.sks}{" "}
                                                                    SKS)
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="bg-red-500  text-white px-2 py-1 rounded"
                                                            onClick={() =>
                                                                handleRemoveCourse(
                                                                    course.kode_mk
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </button>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                {/* Kolom Kanan: Tabel Jadwal */}
                                <div className="w-[70%] flex mt-6 flex-col gap-[20px]">
                                    <div className="border rounded-[15px] shadow-lg shadow-gray-500/50 p-6 items-center">
                                        {/* Tabel Jadwal */}
                                        <div className="overflow-x-auto">
                                            <table className="w-full min-w-[800px] border-collapse border border-gray-300 text-center">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="border border-gray-300 p-4 min-w-[150px]">
                                                            Jam / Hari
                                                        </th>
                                                        <th className="border border-gray-300 p-4 min-w-[150px]">
                                                            Senin
                                                        </th>
                                                        <th className="border border-gray-300 p-4 min-w-[150px]">
                                                            Selasa
                                                        </th>
                                                        <th className="border border-gray-300 p-4 min-w-[150px]">
                                                            Rabu
                                                        </th>
                                                        <th className="border border-gray-300 p-4 min-w-[150px]">
                                                            Kamis
                                                        </th>
                                                        <th className="border border-gray-300 p-4 min-w-[150px]">
                                                            Jumat
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {timeSlots.map(
                                                        (time, index) => (
                                                            <tr key={index}>
                                                                <td className="border border-gray-300 p-4 min-w-[150px]">
                                                                    {time}
                                                                </td>
                                                                <td className="border border-gray-300 p-4 min-w-[150px]">
                                                                    {mapScheduleToTable(
                                                                        "Senin",
                                                                        time
                                                                    )}
                                                                </td>
                                                                <td className="border border-gray-300 p-4 min-w-[150px]">
                                                                    {mapScheduleToTable(
                                                                        "Selasa",
                                                                        time
                                                                    )}
                                                                </td>
                                                                <td className="border border-gray-300 p-4 min-w-[150px]">
                                                                    {mapScheduleToTable(
                                                                        "Rabu",
                                                                        time
                                                                    )}
                                                                </td>
                                                                <td className="border border-gray-300 p-4 min-w-[150px]">
                                                                    {mapScheduleToTable(
                                                                        "Kamis",
                                                                        time
                                                                    )}
                                                                </td>
                                                                <td className="border border-gray-300 p-4 min-w-[150px]">
                                                                    {mapScheduleToTable(
                                                                        "Jumat",
                                                                        time
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`z-[2] fixed right-0 ${
                                        isOpen
                                            ? "w-[400px] h-[100vh] top-0"
                                            : "w-[100px] h-[50px] top-[50%]"
                                    } bg-cpurple-1 rounded-l-xl flex items-center justify-center transition-all duration-300`}
                                >
                                    {isOpen ? (
                                        <div className="flex w-full flex-col items-start px-4 py-4 text-white h-full overflow-y-auto transition-all duration-1500">
                                            <div className=" flex justify-between  w-full items-center mb-4 top-0 py-4 absolute">
                                                <p className="font-poppins font-semibold text-lg">
                                                    Daftar IRS
                                                </p>
                                                <button
                                                    className="px-2 z-[99] py-1 bg-white -translate-x-8 mr-2 text-cpurple-1 font-semibold rounded-md hover:bg-gray-200"
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                >
                                                    Close
                                                </button>
                                            </div>

                                            <div className="w-full space-y-4 mt-16">
                                                <div className="flex justify-between items-center">
                                                    <p>
                                                        Total SKS:{" "}
                                                        {sksInfo.total_sks}/
                                                        {sksInfo.max_sks}
                                                    </p>
                                                    <div className="w-32 bg-white/20 h-2 rounded-full">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-300 ${
                                                                sksInfo.remaining_sks <=
                                                                0
                                                                    ? "bg-red-400"
                                                                    : "bg-green-400"
                                                            }`}
                                                            style={{
                                                                width: `${
                                                                    (sksInfo.total_sks /
                                                                        sksInfo.max_sks) *
                                                                    100
                                                                }%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    {irs.map((item, index) => {
                                                        const jadwalItem =
                                                            jadwal.find(
                                                                (j) =>
                                                                    j.jadwal_id ===
                                                                    item.jadwal_id
                                                            );
                                                        const matakuliahItem =
                                                            matakuliah.find(
                                                                (mk) =>
                                                                    mk.kode_mk ===
                                                                    jadwalItem?.kode_mk
                                                            );

                                                        return (
                                                            <div
                                                                key={index}
                                                                className="bg-white/10 p-3 rounded-lg"
                                                            >
                                                                <div className="flex w-full justify-between items-center">
                                                                    <p className="font-semibold">
                                                                        {
                                                                            matakuliahItem?.Name
                                                                        }
                                                                    </p>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDeleteIRS(
                                                                                item.irs_id
                                                                            )
                                                                        }
                                                                        className="bg-red-500 hover:bg-red-600 max-h-[120px] text-white px-2 py-1 text-sm rounded"
                                                                    >
                                                                        Hapus
                                                                    </button>
                                                                </div>
                                                                <div className="text-sm opacity-80">
                                                                    <p>
                                                                        Hari:{" "}
                                                                        {
                                                                            jadwalItem?.hari
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Jam:{" "}
                                                                        {
                                                                            jadwalItem?.jam_mulai
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            jadwalItem?.jam_selesai
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Kelas:{" "}
                                                                        {
                                                                            jadwalItem?.kelas
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        SKS:{" "}
                                                                        {
                                                                            matakuliahItem?.sks
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <button
                                                    className={`w-full flex justify-center ${
                                                        irs.length === 0
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                    onClick={updateAllIRSStatus}
                                                    disabled={irs.length === 0}
                                                >
                                                    <p
                                                        className={` p-2 px-4 rounded ${
                                                            irs.length === 0
                                                                ? "bg-opacity-50 bg-cgrey-2"
                                                                : "bg-cgreen-2 hover:bg-green-600 transition-colors"
                                                        }`}
                                                    >
                                                        {irs.length === 0
                                                            ? "Pilih Mata Kuliah Terlebih Dahulu"
                                                            : "Ajukan IRS"}
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center cursor-pointer"
                                            onClick={toggleOpen}
                                        >
                                            <p className="font-poppins font-semibold text-white">
                                                {sksInfo.total_sks}/
                                                {sksInfo.max_sks} SKS
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : periodStatus === "deletion" ? (
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
                                    <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                        <svg
                                            className="w-8 h-8 text-yellow-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Periode Perubahan IRS Telah Berakhir
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Anda hanya dapat melakukan penghapusan
                                        mata kuliah dari IRS. Pengisian dan
                                        perubahan IRS sudah tidak diperbolehkan.
                                    </p>
                                    <div className="bg-yellow-50 rounded-lg p-4 inline-block">
                                        <p className="text-yellow-800">
                                            Sisa waktu untuk penghapusan:{" "}
                                            <span className="font-bold">
                                                {daysLeftDeletion} hari
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Tabel IRS */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-bold mb-6">
                                        IRS Terdaftar
                                    </h3>
                                    <div className="space-y-4">
                                        {irs.map((item, index) => {
                                            const jadwalItem = jadwal.find(
                                                (j) =>
                                                    j.jadwal_id ===
                                                    item.jadwal_id
                                            );
                                            const matakuliahItem =
                                                matakuliah.find(
                                                    (mk) =>
                                                        mk.kode_mk ===
                                                        jadwalItem?.kode_mk
                                                );

                                            return (
                                                <div
                                                    key={index}
                                                    className="bg-gray-50 p-4 rounded-lg flex justify-between items-start"
                                                >
                                                    <div>
                                                        <h4 className="font-bold text-lg">
                                                            {
                                                                jadwalItem?.mata_kuliah_name
                                                            }
                                                        </h4>
                                                        <div className="text-sm text-gray-600 mt-1">
                                                            <p>
                                                                Kode MK:{" "}
                                                                {
                                                                    jadwalItem?.kode_mk
                                                                }
                                                            </p>
                                                            <p>
                                                                SKS:{" "}
                                                                {
                                                                    jadwalItem?.sks
                                                                }
                                                            </p>
                                                            <p>
                                                                Jadwal:{" "}
                                                                {
                                                                    jadwalItem?.hari
                                                                }
                                                                ,{" "}
                                                                {
                                                                    jadwalItem?.jam_mulai
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    jadwalItem?.jam_selesai
                                                                }
                                                            </p>
                                                            <p>
                                                                Kelas:{" "}
                                                                {
                                                                    jadwalItem?.kelas
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteIRS(
                                                                item.irs_id
                                                            )
                                                        }
                                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        <button
                                            className="w-full flex justify-center "
                                            onClick={updateAllIRSStatus}
                                        >
                                            <p className="bg-cgreen-1 p-2 px-4 rounded ">
                                                Ajukan IRS
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                        <svg
                                            className="w-8 h-8 text-red-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Periode IRS Telah Berakhir
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Pengisian, perubahan, dan penghapusan
                                        IRS sudah tidak diperbolehkan.
                                    </p>
                                    <div className="bg-red-50 rounded-lg p-4 inline-block">
                                        <p className="text-red-800">
                                            Silakan hubungi akademik jika ada
                                            keperluan mendesak.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {activeTab === "irs" && (
                    <div className="mx-auto max-w-7xl flex gap-4 sm:px-6 lg:px-8">
                        <div className="w-full">
                            <h2 className="text-2xl font-bold mb-4">IRS</h2>
                            <div className="space-y-2">
                                {Array.from(
                                    { length: rekapsmt[0].Semester },
                                    (_, i) => i + 1
                                ).map((semester) => {
                                    const semesterIRS = irs.filter((item) => {
                                        const jadwalItem = jadwal.find(
                                            (j) =>
                                                j.jadwal_id === item.jadwal_id
                                        );
                                        return (
                                            jadwalItem &&
                                            semester === rekapsmt[0].Semester
                                        );
                                    });

                                    return (
                                        <div
                                            key={semester}
                                            className="border rounded-lg shadow-md"
                                        >
                                            <div
                                                className="bg-gray-100 py-2 px-4 flex justify-between items-center cursor-pointer"
                                                onClick={() =>
                                                    setOpenSemester(
                                                        openSemester ===
                                                            semester
                                                            ? null
                                                            : semester
                                                    )
                                                }
                                            >
                                                <h3 className="font-bold">
                                                    Semester {semester}
                                                </h3>
                                                <span className="text-2xl font-bold">
                                                    {openSemester === semester
                                                        ? "-"
                                                        : "+"}
                                                </span>
                                            </div>
                                            {openSemester === semester && (
                                                <div className="p-4 transition-all duration-1500">
                                                    {semesterIRS.length > 0 ? (
                                                        <div className="w-full">
                                                            <div className="w-full flex justify-center mb-2">
                                                                <h1 className="text-xl">
                                                                    IRS
                                                                    MAHASISWA (
                                                                    {irs[0]
                                                                        .status ===
                                                                        "pending" ||
                                                                    irs[0]
                                                                        .status ===
                                                                        "onprocess"
                                                                        ? "BELUM DISETUJUI DOSEN WALI"
                                                                        : irs[0]
                                                                              .status ===
                                                                          "approved"
                                                                        ? "DISETUJUI DOSEN WALI"
                                                                        : irs[0]
                                                                              .status ===
                                                                          "rejected"
                                                                        ? "TIDAK DISETUJUI DOSEN WALI"
                                                                        : irs[0]
                                                                              .status}
                                                                    )
                                                                </h1>
                                                            </div>

                                                            <table className="w-full min-w-[800px] border-collapse border border-gray-300  transition-all duration-1500">
                                                                <thead>
                                                                    <tr className="bg-gray-100">
                                                                        <th className="border border-gray-300 p-4">
                                                                            No
                                                                        </th>
                                                                        <th className="border border-gray-300 p-4">
                                                                            Kode
                                                                            MK
                                                                        </th>
                                                                        <th className="border border-gray-300 p-4">
                                                                            Mata
                                                                            Kuliah
                                                                        </th>
                                                                        <th className="border border-gray-300 p-4">
                                                                            Hari
                                                                        </th>
                                                                        <th className="border border-gray-300 p-4">
                                                                            Jam
                                                                        </th>
                                                                        <th className="border border-gray-300 p-4">
                                                                            Ruang
                                                                        </th>
                                                                        <th className="border border-gray-300 p-4">
                                                                            Status
                                                                        </th>
                                                                        <th className="border border-gray-300 p-4">
                                                                            Kelas
                                                                        </th>
                                                                        <th className="border border-gray-300 p-4">
                                                                            SKS
                                                                        </th>
                                                                        <th className="border border-gray-300 p-4">
                                                                            Nama
                                                                            Dosen
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {semesterIRS.map(
                                                                        (
                                                                            item,
                                                                            index
                                                                        ) => {
                                                                            const jadwalItem =
                                                                                jadwal.find(
                                                                                    (
                                                                                        j
                                                                                    ) =>
                                                                                        j.jadwal_id ===
                                                                                        item.jadwal_id
                                                                                );
                                                                            const matakuliahItem =
                                                                                matakuliah.find(
                                                                                    (
                                                                                        mk
                                                                                    ) =>
                                                                                        mk.kode_mk ===
                                                                                        jadwalItem?.kode_mk
                                                                                );

                                                                            return (
                                                                                <tr
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="hover:bg-gray-100 transition-colors duration-200"
                                                                                >
                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {index +
                                                                                            1}
                                                                                    </td>

                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {
                                                                                            jadwalItem?.kode_mk
                                                                                        }
                                                                                    </td>
                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {
                                                                                            jadwalItem?.mata_kuliah_name
                                                                                        }
                                                                                    </td>
                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {
                                                                                            jadwalItem?.hari
                                                                                        }
                                                                                    </td>
                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {
                                                                                            jadwalItem?.jam_mulai
                                                                                        }{" "}
                                                                                        -{" "}
                                                                                        {
                                                                                            jadwalItem?.jam_selesai
                                                                                        }
                                                                                    </td>
                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {
                                                                                            jadwalItem.nama_ruang
                                                                                        }
                                                                                    </td>
                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {
                                                                                            jadwalItem.status_pengambilan
                                                                                        }
                                                                                    </td>
                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {
                                                                                            jadwalItem?.kelas
                                                                                        }
                                                                                    </td>
                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {
                                                                                            jadwalItem?.sks
                                                                                        }
                                                                                    </td>
                                                                                    <td className="border border-gray-300 p-4">
                                                                                        {jadwalItem?.dosen_names ? ( // Periksa apakah dosen_names tersedia
                                                                                            <ul>
                                                                                                {jadwalItem.dosen_names
                                                                                                    .split(
                                                                                                        ", "
                                                                                                    ) // Pisahkan string berdasarkan koma dan spasi
                                                                                                    .map(
                                                                                                        (
                                                                                                            dosen,
                                                                                                            idx
                                                                                                        ) => (
                                                                                                            <li
                                                                                                                key={
                                                                                                                    idx
                                                                                                                }
                                                                                                            >
                                                                                                                -{" "}
                                                                                                                {
                                                                                                                    dosen
                                                                                                                }
                                                                                                            </li>
                                                                                                        )
                                                                                                    )}
                                                                                            </ul>
                                                                                        ) : (
                                                                                            "Belum ada dosen"
                                                                                        )}
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        }
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                            <button
                                                                onClick={() =>
                                                                    handleDownloadIRS(
                                                                        semester
                                                                    )
                                                                }
                                                                className="mb-4 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                            >
                                                                Download IRS PDF
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center text-gray-500 py-8">
                                                            Data Kosong
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
