import { useState, useEffect } from "react";
import React from "react";
import '../../style.scss';

const Clock = () => {
    // Mendapatkan tanggal saat ini
    const now = new Date();

    // Membuat array dengan nama-nama bulan
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Membuat string dengan format "dd Bulan yyyy"
    const formattedDate = `${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const [currentTime, setCurrentTime] = useState(now.toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(formattedDate);

    const updateTime = () => {
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }

    useEffect(() => {
        setInterval(updateTime, 1000);

        // Hapus interval saat komponen di-unmount
        return () => clearInterval(updateTime);
    }, []); // Menerapkan efek hanya setelah komponen dipasang

    return (
        <div className="realTime">
            <div className="clock">
                <h1>{currentTime}</h1>
                <h6><b>{currentDate}</b></h6>
            </div>
        </div>
    )
}

export default Clock;
