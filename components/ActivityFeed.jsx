import React, { useEffect, useMemo, useState } from 'react';

export default function ActivityFeed({ username = 'quackiemackie' }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            setError('');

            const res = await fetch(`https://api.github.com/users/${username}/events/public`, {
                headers: { Accept: 'application/vnd.github+json' },
            });

            if (!res.ok) {
                const text = await res.text();
                if (!cancelled) {
                    console.error(`GitHub API ${res.status}: ${text}`);
                    setError('Unable to load GitHub activity right now.');
                    setEvents([]);
                    setLoading(false);
                }
                return;
            }

            const data = await res.json();
            if (!cancelled) {
                setEvents(Array.isArray(data) ? data.slice(0, 10) : []);
                setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [username]);

    const items = useMemo(() => events.map(formatEvent).filter(Boolean), [events]);

    return (
        <aside className="activity" aria-live="polite">
            <div className="activity-inner">
                <header className="activity-header">
                    <h3 className="activity-title">Activity Feed</h3>
                    <a
                        className="activity-username"
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Open @${username} on GitHub`}
                    >
                        <i className="fa-brands fa-github" /> @{username}
                    </a>
                </header>

                {loading && (
                    <ul className="activity-list" aria-hidden>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <li key={i} className="activity-item skeleton">
                                <span className="activity-icon skeleton-avatar" />
                                <div className="activity-body">
                                    <div className="skeleton-line w-70" />
                                    <div className="skeleton-line w-40" />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {!loading && error && (
                    <div className="activity-error" role="alert">
                        <i className="fa-solid fa-triangle-exclamation" /> {error}
                    </div>
                )}

                {!loading && !error && items.length === 0 && (
                    <div className="activity-empty">
                        <i className="fa-regular fa-face-smile" /> No recent public activity.
                    </div>
                )}

                {!loading && !error && items.length > 0 && (
                    <ul className="activity-list">
                        {items.map((it) => (
                            <li key={it.id} className="activity-item">
                                <span className={`activity-icon ${it.icon}`} aria-hidden />
                                <div className="activity-body">
                                    <div className="activity-text">
                                        <a
                                            href={it.url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="activity-link"
                                        >
                                            {it.title}
                                        </a>
                                        {it.subtitle && (
                                            <div className="activity-subtitle">{it.subtitle}</div>
                                        )}
                                    </div>
                                    <div
                                        className="activity-meta"
                                        title={new Date(it.time).toLocaleString()}
                                    >
                                        {timeAgo(it.time)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </aside>
    );
}

function formatEvent(ev) {
    const base = {
        id: ev.id,
        time: ev.created_at,
        repo: ev.repo?.name,
        url: ev.repo ? `https://github.com/${ev.repo.name}` : undefined,
    };

    switch (ev.type) {
        case 'PushEvent': {
            const count = ev.payload?.commits?.length || 1;
            const ref = ev.payload?.ref?.replace('refs/heads/', '') || 'main';
            return {
                ...base,
                icon: 'fa-solid fa-code-commit',
                title: `Pushed ${count} commit${count > 1 ? 's' : ''} to ${ref}`,
                subtitle: base.repo,
            };
        }
        case 'PullRequestEvent': {
            const action = ev.payload?.action;
            const pr = ev.payload?.pull_request;
            return {
                ...base,
                icon: 'fa-solid fa-code-pull-request',
                title: `${capitalize(action)} PR #${pr?.number}: ${pr?.title || ''}`.trim(),
                subtitle: base.repo,
                url: pr?.html_url || base.url,
            };
        }
        case 'IssuesEvent': {
            const action = ev.payload?.action;
            const issue = ev.payload?.issue;
            return {
                ...base,
                icon: 'fa-regular fa-circle-dot',
                title: `${capitalize(action)} issue #${issue?.number}: ${issue?.title || ''}`.trim(),
                subtitle: base.repo,
                url: issue?.html_url || base.url,
            };
        }
        case 'IssueCommentEvent': {
            const issue = ev.payload?.issue;
            return {
                ...base,
                icon: 'fa-regular fa-comment',
                title: `Commented on #${issue?.number}: ${issue?.title || ''}`.trim(),
                subtitle: base.repo,
                url: ev.payload?.comment?.html_url || issue?.html_url || base.url,
            };
        }
        case 'CreateEvent': {
            const refType = ev.payload?.ref_type;
            const ref = ev.payload?.ref || '';
            return {
                ...base,
                icon: 'fa-solid fa-plus',
                title: `Created ${refType}${ref ? `: ${ref}` : ''}`,
                subtitle: base.repo,
            };
        }
        case 'DeleteEvent': {
            const refType = ev.payload?.ref_type;
            const ref = ev.payload?.ref || '';
            return {
                ...base,
                icon: 'fa-solid fa-trash',
                title: `Deleted ${refType}${ref ? `: ${ref}` : ''}`,
                subtitle: base.repo,
            };
        }
        case 'ForkEvent': {
            return {
                ...base,
                icon: 'fa-solid fa-code-fork',
                title: `Forked ${base.repo}`,
            };
        }
        case 'WatchEvent': {
            return {
                ...base,
                icon: 'fa-regular fa-star',
                title: `Starred ${base.repo}`,
            };
        }
        case 'ReleaseEvent': {
            const rel = ev.payload?.release;
            return {
                ...base,
                icon: 'fa-solid fa-tag',
                title: `Released ${rel?.tag_name || ''}`.trim(),
                subtitle: base.repo,
                url: rel?.html_url || base.url,
            };
        }
        case 'PullRequestReviewCommentEvent': {
            return {
                ...base,
                icon: 'fa-regular fa-comment-dots',
                title: 'Reviewed a pull request',
                subtitle: base.repo,
                url: ev.payload?.comment?.html_url || base.url,
            };
        }
        case 'PublicEvent': {
            return {
                ...base,
                icon: 'fa-solid fa-unlock',
                title: `Open-sourced ${base.repo}`,
            };
        }
        case 'GollumEvent': {
            const page = ev.payload?.pages?.[0];
            return {
                ...base,
                icon: 'fa-solid fa-book',
                title: `Edited wiki page: ${page?.page_name || 'Unknown'}`,
                subtitle: base.repo,
                url: page?.html_url || base.url,
            };
        }
        default: {
            return {
                ...base,
                icon: 'fa-regular fa-circle',
                title: ev.type.replace('Event', ''),
                subtitle: base.repo,
            };
        }
    }
}

function timeAgo(iso) {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - then);
    const units = [
        ['year', 365 * 24 * 60 * 60 * 1000],
        ['month', 30 * 24 * 60 * 60 * 1000],
        ['day', 24 * 60 * 60 * 1000],
        ['hour', 60 * 60 * 1000],
        ['minute', 60 * 1000],
        ['second', 1000],
    ];
    for (const [unit, ms] of units) {
        const amt = Math.floor(diff / ms);
        if (amt >= 1) return `${amt} ${unit}${amt > 1 ? 's' : ''} ago`;
    }
    return 'just now';
}

function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}
