import React from 'react';

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
            {isOpen ? <i className="fa-solid fa-xmark" /> : <i className="fa-solid fa-bars" />}
        </button>
    );
}
