import React, { useEffect, useRef, useState } from 'react';
import Landing from './landing/Landing';
import Layout from './Layout';

export default function App() {
    const sentinelRef = useRef(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        let ticking = false;

        const checkReveal = () => {
            ticking = false;
            const node = sentinelRef.current;
            if (!node) return;
            setRevealed(node.getBoundingClientRect().top <= 0);
        };

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(checkReveal);
        };

        checkReveal();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <>
            <Landing sentinelRef={sentinelRef} />
            <Layout revealed={revealed} />
        </>
    );
}
