import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function ToggleButton({
    side = 'right',
    isOpen,
    onToggle,
    labelOpen = 'Hide',
    labelClosed = 'Show',
}) {
    const ariaLabel = isOpen ? labelOpen : labelClosed;
    return (
        <button
            className={`toggle-button ${side}`}
            aria-pressed={isOpen}
            aria-label={ariaLabel}
            title={ariaLabel}
            onClick={onToggle}
        >
            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </button>
    );
}
