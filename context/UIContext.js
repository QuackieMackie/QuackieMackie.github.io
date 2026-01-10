import React, { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activityOpen, setActivityOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(min-width: 1024px)');

        const apply = (e) => {
            if (e.matches) {
                setActivityOpen(true);
                setSidebarOpen(true);
            } else {
                setActivityOpen(false);
                setSidebarOpen(false);
            }
        };

        apply(mq);

        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    const value = {
        sidebarOpen,
        setSidebarOpen,
        activityOpen,
        setActivityOpen,
        isToolsOpen,
        setIsToolsOpen,
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
}
