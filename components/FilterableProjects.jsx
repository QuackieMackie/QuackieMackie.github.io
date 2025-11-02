import React, { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';

const FILTERS = {
    ALL: 'All',
    CORE: 'Core',
    ADDON: 'Add-on',
};

export default function FilterableProjects() {
    const [filter, setFilter] = useState(FILTERS.ALL);

    const projects = useMemo(
        () => [
            {
                title: 'Sylphian Forum',
                description:
                    'A safe, ad-free LGBTQ+ community forum I created and maintain, built using Xenforo.',
                link: 'https://sylphian.net',
                category: FILTERS.CORE,
            },
            {
                title: 'Sylphian/Library',
                description:
                    'A Xenforo library add-on of useful code used for my other add-ons for Sylphian.',
                link: 'https://github.com/Sylphian-Network/Sylphian-Library',
                category: FILTERS.ADDON,
            },
            {
                title: 'Sylphian/UserPets',
                description:
                    "A Xenforo add-on that gives users their own pets, allows for users to interact with their own pet, view other user's pets and duel pets.",
                link: 'https://github.com/Sylphian-Network/Sylphian-UserPets',
                category: FILTERS.ADDON,
            },
            {
                title: 'Sylphian/Leaderboard',
                description:
                    'A Xenforo add-on that acts as a framework for developers to create their own leaderboards.',
                link: 'https://github.com/Sylphian-Network/Sylphian-Leaderboard',
                category: FILTERS.ADDON,
            },
            {
                title: 'Sylphian/Map',
                description:
                    'A Xenforo add-on that lets users contribute to a map with their own markers. Markers can be linked with times and dates, as well as Xenforo threads.',
                link: 'https://github.com/Sylphian-Network/Sylphian-Map',
                category: FILTERS.ADDON,
            },
            {
                title: 'Sylphian/ToolTip',
                description:
                    "A Xenforo add-on that let's admins control who can see what groups can see profiles when hovering over a user.",
                link: 'https://github.com/Sylphian-Network/Sylphian-ToolTip',
                category: FILTERS.ADDON,
            },
            {
                title: 'QuestJournal',
                description:
                    "A Dalamud plugin that let's users see quest details that FFXIV doesn't always provide.",
                link: 'https://github.com/QuackieMackie/QuestJournal',
                category: FILTERS.CORE,
            },
        ],
        [],
    );

    const filtered = useMemo(() => {
        if (filter === FILTERS.ALL) return projects;
        return projects.filter((p) => p.category === filter);
    }, [filter, projects]);

    return (
        <div>
            <div className="project-filters" role="tablist" aria-label="Project filters">
                <button
                    type="button"
                    role="tab"
                    className={`filter-button ${filter === FILTERS.ALL ? 'active' : ''}`}
                    aria-selected={filter === FILTERS.ALL}
                    onClick={() => setFilter(FILTERS.ALL)}
                >
                    All Projects
                </button>
                <button
                    type="button"
                    role="tab"
                    className={`filter-button ${filter === FILTERS.CORE ? 'active' : ''}`}
                    aria-selected={filter === FILTERS.CORE}
                    onClick={() => setFilter(FILTERS.CORE)}
                >
                    Core Projects
                </button>
                <button
                    type="button"
                    role="tab"
                    className={`filter-button ${filter === FILTERS.ADDON ? 'active' : ''}`}
                    aria-selected={filter === FILTERS.ADDON}
                    onClick={() => setFilter(FILTERS.ADDON)}
                >
                    Add-ons
                </button>
            </div>

            <div className="projects-grid fade-in" key={filter}>
                {filtered.map((proj) => (
                    <ProjectCard
                        key={proj.title}
                        title={proj.title}
                        description={proj.description}
                        link={proj.link}
                        category={proj.category}
                    />
                ))}
            </div>
        </div>
    );
}
