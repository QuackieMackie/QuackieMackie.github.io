import React from 'react';
import Image from 'next/image';
import FilterableProjects from './FilterableProjects';

export default function MainContent() {
    return (
        <main className="main">
            <section id="home" className="section">
                <h1>Welcome to my portfolio v2.0</h1>
                <p>
                    I wanted to revamp my portfolio, as it had not had any attention in months. This
                    is the end result, any issues please let me know{' '}
                    <a
                        href="https://github.com/QuackieMackie/QuackieMackie.github.io/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        on the GitHub issues page
                    </a>
                    .
                </p>
            </section>

            <section id="about" className="section">
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
            </section>

            <section id="tech" className="section">
                <h2>Tech Stack</h2>
                <p>
                    I work with a variety of programming languages, frameworks, databases, and
                    tools. Here are some of the ones I use:
                </p>
                <div className="tech-icons">
                    <a href="https://www.java.com" target="_blank" rel="noreferrer">
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
                            alt="Java"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a href="https://www.python.org" target="_blank" rel="noreferrer">
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
                            alt="Python"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg"
                            alt="Docker"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a
                        href="https://www.microsoft.com/en-us/sql-server"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image
                            src="https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg"
                            alt="MSSQL"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a href="https://www.sqlite.org/" target="_blank" rel="noreferrer">
                        <Image
                            src="https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg"
                            alt="SQLite"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a href="https://www.postgresql.org" target="_blank" rel="noreferrer">
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg"
                            alt="PostgreSQL"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a href="https://nodejs.org" target="_blank" rel="noreferrer">
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg"
                            alt="Node.js"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a
                        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
                            alt="JavaScript"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer">
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg"
                            alt="CSS3"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer">
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
                            alt="HTML5"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a
                        href="https://learn.microsoft.com/en-us/dotnet/csharp/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg"
                            alt="C#"
                            width={60}
                            height={60}
                        />
                    </a>
                    <a href="https://www.php.net/" target="_blank" rel="noreferrer">
                        <Image
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg"
                            alt="PHP"
                            width={60}
                            height={60}
                        />
                    </a>
                </div>
            </section>

            <section id="projects" className="section">
                <h2>Current Projects</h2>
                <FilterableProjects />
            </section>
        </main>
    );
}
