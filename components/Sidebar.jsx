import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function Sidebar() {
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
                <a href="#home">Home</a>
                <a href="#about">About Me</a>
                <a href="#tech">Tech Stack</a>
                <a href="#projects">Current Projects</a>
            </nav>
        </aside>
    );
}
