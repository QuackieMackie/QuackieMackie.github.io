import React, { useMemo } from 'react';
import Image from 'next/image';
import FilterableProjects from './FilterableProjects';
import Reveal from './Reveal';

const TECH = [
    { name: 'Java', href: 'https://www.java.com', icon: 'java/java-original.svg' },
    { name: 'Python', href: 'https://www.python.org', icon: 'python/python-original.svg' },
    { name: 'Docker', href: 'https://www.docker.com/', icon: 'docker/docker-original.svg' },
    {
        name: 'MSSQL',
        href: 'https://www.microsoft.com/en-us/sql-server',
        src: 'https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg',
    },
    {
        name: 'SQLite',
        href: 'https://www.sqlite.org/',
        src: 'https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg',
    },
    {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org',
        icon: 'postgresql/postgresql-original.svg',
    },
    { name: 'Node.js', href: 'https://nodejs.org', icon: 'nodejs/nodejs-original.svg' },
    {
        name: 'JavaScript',
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        icon: 'javascript/javascript-original.svg',
    },
    { name: 'CSS3', href: 'https://www.w3schools.com/css/', icon: 'css3/css3-original.svg' },
    { name: 'HTML5', href: 'https://www.w3.org/html/', icon: 'html5/html5-original.svg' },
    {
        name: 'C#',
        href: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
        icon: 'csharp/csharp-original.svg',
    },
    { name: 'PHP', href: 'https://www.php.net/', icon: 'php/php-original.svg' },
];

const DEVICON_BASE = 'https://raw.githubusercontent.com/devicons/devicon/master/icons';

export default function MainContent() {
    const tech = useMemo(
        () => TECH.map((t) => ({ ...t, src: t.src || `${DEVICON_BASE}/${t.icon}` })),
        [],
    );

    return (
        <main className="main">
            <Reveal as="section" id="about" className="section">
                <span className="eyebrow">About</span>
                <h2>About Me</h2>
                <p>
                    I’m a 22-year-old developer who enjoys building bits and bobs. I usually go with
                    what piques my curiosity. I enjoy turning ideas into tangible projects, flushing
                    out ideas, and coming up with solutions to problems.
                </p>
                <p>
                    I also run an online forum called{' '}
                    <a href="https://sylphian.net" target="_blank" rel="noopener noreferrer">
                        Sylphian
                    </a>
                    , whose goal is to provide a safe, secure, and ad-free space for the UK LGBTQ+
                    community. We focus on inclusivity, where people can connect, share ideas, and
                    collaborate without the usual pressures of social media. Security and privacy
                    are key priorities, so members can feel comfortable expressing themselves
                    freely.
                </p>
            </Reveal>

            <Reveal as="section" id="tech" className="section">
                <span className="eyebrow">Stack</span>
                <h2>Tech Stack</h2>
                <p>
                    I work with a variety of programming languages, frameworks, databases, and
                    tools. Here are some of the ones I use:
                </p>
                <div className="tech-grid">
                    {tech.map((t, i) => (
                        <Reveal as="div" key={t.name} delay={i * 0.04}>
                            <a
                                href={t.href}
                                target="_blank"
                                rel="noreferrer"
                                className="tech-chip"
                                title={t.name}
                            >
                                <span className="tech-chip-icon">
                                    <Image src={t.src} alt={t.name} width={36} height={36} />
                                </span>
                                <span className="tech-chip-label">{t.name}</span>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </Reveal>

            <Reveal as="section" id="projects" className="section">
                <span className="eyebrow">Work</span>
                <h2>Current Projects</h2>
                <FilterableProjects />
            </Reveal>
        </main>
    );
}
