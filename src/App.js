import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import "./App.css";

import musicFile from "./music/izzat (mp3cut.net).m4a";

import play from "./img/circle-play-regular-full.svg";
import pause from "./img/circle-pause-regular-full.svg";

import restaurant from "./img/L_height.webp";
import ring from "./img/pngtree-elegant-wedding-jewelry-set-featuring-wedding-rings-on-a-white-textured-image_13613257.png";
import bride from "./img/pexels-photo-35234597.webp";
import married from "./img/Conditions-for-getting-married-in-Quebec.jpg";
import groom from "./img/cake-cutting-tradition-wedding-planning-yacht-charter-nyc.jpg";
import lock from "./img/lock-solid-full.svg"
import unlock from "./img/unlock-solid-full.svg"

function App() {
    const [timeLeft, setTimeLeft] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

    const weddingDate = useMemo(
        () => new Date(2026, 6, 31, 18, 0, 0).getTime(),
        []
    );

    // ⏱ TIMER
    useEffect(() => {
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance <= 0) {
                setTimeLeft("Boshlanmoqda 🎉");
                return;
            }

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const m = Math.floor((distance / (1000 * 60)) % 60);
            const s = Math.floor((distance / 1000) % 60);

            setTimeLeft(`${d} kun • ${h} soat • ${m} min • ${s} sek`);
        };

        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [weddingDate]);

    // 🎵 PLAY / PAUSE MUSIC
    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(() => {});
            setIsPlaying(true);
        }
    };

    return (
        <div className="app">

            {/* AUDIO */}
            <audio ref={audioRef} loop>
                <source src={musicFile} type="audio/mp3" />
            </audio>

            {/* HERO */}
            <motion.section className="hero">
                <motion.div className="hero_text">
                    <motion.h1>AKOBIRXON</motion.h1>
                    <motion.span>&</motion.span>
                    <motion.h1>BAXORA</motion.h1>
                </motion.div>
                <div className="hero_div"></div>
                <p className="date">31 Iyul 2026</p>




            </motion.section>

            {/* INFO */}
            <motion.section className="section sed">   <div className="music_btn" onClick={toggleMusic}>
                <img
                    src={isPlaying ? pause : play}
                    alt="music"
                    className="music_icon"
                />
            </div>
                <h2>TO‘Y TAKLIFNOMASI</h2>

                <p>
                    Assalomu alaykum! <br/>
                    Hurmatli mehmonimiz! <br/>
                    Sizni nikoh to'yimiz munosabati bilan 31.06.2026-yil
                    bo'lib o'tadigan <br/> "Visol oqshomi"ga
                    taklif etamiz.
                </p>

                <img className="marry" src={married} alt="" />

                <div className="timer">{timeLeft}</div>
            </motion.section>

            {/* CALENDAR */}
            <motion.section className="section seds">
                <h2 className="wed">WEDDING DATE</h2>

                <img className="cake" src={groom} alt="" />

                <div className="calendar">
                    <div className="cal-header">IYUL 2026</div>

                    <div className="cal-grid">
                        {["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Yak"].map(d => (
                            <div key={d}>{d}</div>
                        ))}

                        {[...Array(2)].map((_, i) => (
                            <div key={i}></div>
                        ))}

                        {Array.from({ length: 31 }, (_, i) => (
                            <div key={i} className={i + 1 === 31 ? "active" : ""}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* LOCATION */}
            <motion.section className="section sect">
                <h2>Versal to‘yxonasi</h2>

                <img src={restaurant} alt="" className="restaurant" />

                <h2>LOKATSIYA</h2>

                <iframe
                    className="maps"
                    title="map"
                    src="https://www.google.com/maps?q=Versal%20to'yxonasi%20Toshkent&output=embed"
                />

                <button
                    onClick={() =>
                        window.open("https://www.google.com/maps?q=Versal+to'yxonasi+Toshkent")
                    }
                >
                    Open Map
                </button>
            </motion.section>

            {/* TIMELINE */}
            <motion.section className="section sev">
                <h2>TO‘Y DASTURI</h2>

                <div className="timeline">
                    {[
                        ["17:00", "Mehmonlar kutib olish"],
                        ["18:00", "Boshlanish vaqti"],
                        ["19:00", "Nikoh marosimi"],
                        ["20:00", "Dastur davom etadi"],
                        ["22:00", "Tort kesish 🎂"]
                    ].map(([time, text], i) => (
                        <div key={i} className="timeline_item">
                            <div className="time_box">{time}</div>
                            <div className="text_box">{text}</div>
                        </div>
                    ))}
                </div>

                <img className="ring" src={ring} alt="" />
            </motion.section>

            {/* FOOTER */}
            <motion.section className="footer">
                <h1>
                    AKOBIRXON <br /> & <br /> BAXORA
                </h1>

                <img src={bride} className="bride" alt="" />

                <p>Hurmat va ehtirom  ila, <br/> A.Luqmonov hamda <br/> O.Axtamovlar  <br/> oilasi. ❤️</p>
            </motion.section>

        </div>
    );
}

export default App;