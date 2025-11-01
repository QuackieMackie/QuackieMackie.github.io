import React from 'react';

export default function ProjectCard({ title, description, link, image, category }) {
    const categoryClass = category === 'Core' ? 'core' : 'addon';
    return (
        <div className={`project-card ${categoryClass}`}>
            {image && <img src={image} alt={`${title} screenshot`} className="project-image" />}
            <div className="project-meta">
                {category && <span className={`project-badge ${categoryClass}`}>{category}</span>}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            {link && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    View Project
                </a>
            )}
        </div>
    );
}
