import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const TAGS = { div: motion.div, section: motion.section, li: motion.li };

export default function Reveal({ children, as = 'div', delay = 0, ...rest }) {
    const reducedMotion = useReducedMotion();
    const Component = TAGS[as] || motion.div;

    return (
        <Component
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
            {...rest}
        >
            {children}
        </Component>
    );
}
