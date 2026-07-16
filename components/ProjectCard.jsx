import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function ProjectCard({ title, description, link, image, category }) {
    const categoryClass = category === 'Core' ? 'core' : 'addon';
    const reducedMotion = useReducedMotion();

    const ref = useRef(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

    const handleMove = (e) => {
        if (reducedMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * 10);
        rotateX.set(py * -10);
    };

    const handleLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`project-card ${categoryClass}`}
            style={{ rotateX: springRotateX, rotateY: springRotateY }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            {image && <img src={image} alt={`${title} screenshot`} className="project-image" />}
            <div className="project-meta">
                {category && <span className={`project-badge ${categoryClass}`}>{category}</span>}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            {link && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    View Project
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="link-arrow" />
                </a>
            )}
        </motion.div>
    );
}
