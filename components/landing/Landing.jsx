import React from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import HeroOverlay from './HeroOverlay';

const DuckScene = dynamic(() => import('./DuckScene'), {
    ssr: false,
    loading: () => (
        <div className="landing-fallback">
            <div className="landing-fallback-duck" />
        </div>
    ),
});

function scrollToPortfolio() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Landing({ sentinelRef }) {
    const reducedMotion = useReducedMotion();

    return (
        <section className="landing" id="landing" aria-label="Introduction">
            <div className="landing-canvas">
                <DuckScene reducedMotion={!!reducedMotion} />
            </div>
            <HeroOverlay />
            <button
                type="button"
                className="scroll-cue"
                onClick={scrollToPortfolio}
                aria-label="Scroll to portfolio"
            >
                <FontAwesomeIcon icon={faChevronDown} />
                <span>Scroll</span>
            </button>
            <div ref={sentinelRef} className="landing-sentinel" aria-hidden="true" />
        </section>
    );
}
