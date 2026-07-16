import React, { useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';

function MagneticButton({ children, className, href, external, reducedMotion }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
    const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

    const handleMove = (e) => {
        if (reducedMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={`magnetic ${className}`}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            {children}
        </motion.a>
    );
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroOverlay() {
    const reducedMotion = useReducedMotion();

    return (
        <motion.div
            className="landing-content"
            variants={containerVariants}
            initial={reducedMotion ? 'visible' : 'hidden'}
            animate="visible"
        >
            <motion.h1 className="hero-name gradient-text" variants={itemVariants}>
                QuackieMackie
            </motion.h1>
            <motion.p className="hero-tagline" variants={itemVariants}>
                I build bits and bobs in my free time.
            </motion.p>
            <motion.div className="cta-row" variants={itemVariants}>
                <MagneticButton
                    className="btn-cta primary"
                    href="#about"
                    reducedMotion={reducedMotion}
                >
                    View work
                </MagneticButton>
                <MagneticButton
                    className="btn-cta ghost"
                    href="https://github.com/QuackieMackie"
                    external
                    reducedMotion={reducedMotion}
                >
                    GitHub
                </MagneticButton>
            </motion.div>
        </motion.div>
    );
}
