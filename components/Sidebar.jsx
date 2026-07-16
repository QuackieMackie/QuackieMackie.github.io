import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faHouse, faUser, faCode, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const SECTION_IDS = ['landing', 'about', 'tech', 'projects'];

const NAV_ITEMS = [
    { id: 'landing', href: '/#landing', label: 'Home', icon: faHouse },
    { id: 'about', href: '/#about', label: 'About Me', icon: faUser },
    { id: 'tech', href: '/#tech', label: 'Tech Stack', icon: faCode },
    { id: 'projects', href: '/#projects', label: 'Current Projects', icon: faBriefcase },
];

export default function Sidebar() {
    const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);

    useEffect(() => {
        const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
        if (sections.length === 0) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActiveSection(visible.target.id);
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <aside className="sidebar">
            <div className="profile">
                <img
                    src="/assets/avatar.webp"
                    alt="Profile image"
                    width={120}
                    height={120}
                    className="avatar"
                />
                <div className="username">QuackieMackie</div>
                <div className="role-subtitle">Developer</div>
                <div className="contacts" aria-label="Contact placeholders">
                    <a
                        href="https://github.com/QuackieMackie"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a
                        href="#"
                        aria-label="Discord Username"
                        title="Add me on Discord: quackiemackie"
                    >
                        <FontAwesomeIcon icon={faDiscord} />
                    </a>
                </div>
            </div>
            <nav className="nav">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={activeSection === item.id ? 'active' : ''}
                    >
                        <FontAwesomeIcon icon={item.icon} /> {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
