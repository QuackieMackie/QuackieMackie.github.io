import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ActivityFeed from './ActivityFeed';
import ToggleButton from './ToggleButton';

export default function Layout() {
    const [activityOpen, setActivityOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Keep desktop always open. mobile/tablet closed by default. Respond to viewport changes.
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

    const handleSidebarToggle = () => {
        if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
            // No toggle on desktop. sidebar remains visible
            return;
        }
        setSidebarOpen((o) => !o);
    };

    return (
        <div
            className={`layout ${activityOpen ? 'activity-open' : 'activity-closed'} ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        >
            {/* Left sidebar panel */}
            <Sidebar />

            {/* External left tab handle (moves with sidebar edge) */}
            <ToggleButton
                side="left"
                isOpen={!!sidebarOpen}
                onToggle={handleSidebarToggle}
                labelOpen="Hide sidebar"
                labelClosed="Show sidebar"
            />

            {/* Main content */}
            <MainContent />

            {/* Right activity panel (desktop only visible) */}
            <ActivityFeed />

            {/* External right tab handle (moves with activity edge) */}
            <ToggleButton
                side="right"
                isOpen={!!activityOpen}
                onToggle={() => setActivityOpen((o) => !o)}
                labelOpen="Hide activity feed"
                labelClosed="Show activity feed"
            />
        </div>
    );
}
