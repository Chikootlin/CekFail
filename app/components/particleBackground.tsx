"use client";

import { useEffect, useMemo, useState, memo } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function ParticleBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = useMemo(() => ({
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    area: 882,
                },
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0.5,
                    color: "#88c1d1",
                },
            },
            opacity: {
                value: 0.3
            },
            size: {
                value: 3,
                random: {
                    enable: true
                },
            },
            links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1.8,
                random: true,
                outModes: "out" as const,
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: false, mode: "repulse"
                },
                onClick: {
                    enable: false, mode: "push"
                },
                resize: {
                    enable: true
                },
            },
        },
        detectRetina: true,
    }), []);

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
}

export default memo(ParticleBackground);