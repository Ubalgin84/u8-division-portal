"use client";

import { useEffect, useState } from "react";

export default function Countdown({
    raceDatetime,
}: {
    raceDatetime: string;
}) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const updateCountdown = () => {
            const rozdil =
                new Date(raceDatetime).getTime() -
                Date.now();

            if (rozdil <= 0) {
                setTimeLeft("🏁 START!");
                return;
            }

            const dny = Math.floor(
                rozdil / (1000 * 60 * 60 * 24)
            );

            const hodiny = Math.floor(
                (rozdil % (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

            const minuty = Math.floor(
                (rozdil % (1000 * 60 * 60)) /
                (1000 * 60)
            );

            const sekundy = Math.floor(
                (rozdil % (1000 * 60)) / 1000
            );

            setTimeLeft(
                `${dny}d ${hodiny}h ${minuty}m ${sekundy}s`
            );
        };

        updateCountdown();

        const interval = setInterval(
            updateCountdown,
            1000
        );

        return () => clearInterval(interval);
    }, [raceDatetime]);

    return (
        <p className="text-2xl font-black text-red-500">
            {timeLeft}
        </p>
    );
}