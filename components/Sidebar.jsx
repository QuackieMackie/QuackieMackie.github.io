import React from 'react';
import { useUI } from '../context/UIContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import {
    faHouse,
    faUser,
    faCode,
    faBriefcase,
    faWrench,
    faChevronDown,
    faChevronRight,
    faFileCode,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Sidebar() {
    const { isToolsOpen, setIsToolsOpen } = useUI();

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
                <Link href="/#home">
                    <FontAwesomeIcon icon={faHouse} /> Home
                </Link>
                <Link href="/#about">
                    <FontAwesomeIcon icon={faUser} /> About Me
                </Link>
                <Link href="/#tech">
                    <FontAwesomeIcon icon={faCode} /> Tech Stack
                </Link>
                <Link href="/#projects">
                    <FontAwesomeIcon icon={faBriefcase} /> Current Projects
                </Link>
            </nav>

            <div className="nav-section-title">Extras</div>
            <nav className="nav">
                <div className="dropdown">
                    <button
                        className="dropdown-toggle"
                        onClick={() => setIsToolsOpen(!isToolsOpen)}
                        aria-expanded={isToolsOpen}
                    >
                        <div className="dropdown-label">
                            <FontAwesomeIcon icon={faWrench} /> Tools
                        </div>
                        <FontAwesomeIcon
                            icon={isToolsOpen ? faChevronDown : faChevronRight}
                            size="sm"
                        />
                    </button>
                    {isToolsOpen && (
                        <div className="dropdown-content">
                            <Link href="/tools/git-diff">
                                <FontAwesomeIcon icon={faFileCode} /> Git Diff Viewer
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
}
