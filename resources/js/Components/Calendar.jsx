import React, { useState } from "react";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Format nama bulan dalam Bahasa Indonesia
    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    // Format nama hari dalam Bahasa Indonesia, dimulai dari Minggu
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    // Fungsi untuk mendapatkan hari dalam satu bulan
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = [];
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        // Mengisi array dengan tanggal kosong untuk hari-hari sebelum hari pertama bulan
        const firstDayOfWeek = firstDay.getDay(); // 0 for Sunday

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }

        // Mengisi array dengan tanggal-tanggal dalam bulan
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(i);
        }

        return days;
    };

    // Fungsi untuk bulan sebelumnya
    const previousMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        );
    };

    // Fungsi untuk bulan selanjutnya
    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        );
    };

    const days = getDaysInMonth(currentDate);

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 w-full max-w-md">
            {/* Header Kalender */}
            <div className="flex items-center justify-between mb-4">
                <button onClick={previousMonth} className="p-2">
                    <span className="text-gray-600">{"<"}</span>
                </button>
                <h2 className="text-lg font-semibold">
                    {monthNames[currentDate.getMonth()].toUpperCase()}
                </h2>
                <button onClick={nextMonth} className="p-2">
                    <span className="text-gray-600">{">"}</span>
                </button>
            </div>

            {/* Grid Hari */}
            <div className="grid grid-cols-7 gap-1">
                {/* Header hari */}
                {dayNames.map((day, index) => (
                    <div
                        key={index}
                        className="text-center text-sm text-gray-600 font-medium p-2"
                    >
                        {day}
                    </div>
                ))}

                {/* Tanggal */}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`
                            text-center p-2 text-sm
                            ${
                                day
                                    ? "hover:bg-gray-100 cursor-pointer rounded-full"
                                    : ""
                            }
                            ${
                                day === currentDate.getDate() &&
                                currentDate.getMonth() ===
                                    new Date().getMonth() &&
                                currentDate.getFullYear() ===
                                    new Date().getFullYear()
                                    ? "bg-blue-500 text-white rounded-full"
                                    : ""
                            }
                        `}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;