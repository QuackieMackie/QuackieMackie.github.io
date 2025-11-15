import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function NotFoundPage() {
    const issuesUrl = 'https://github.com/QuackieMackie/QuackieMackie.github.io/issues';

    return (
        <div className="notfound-root">
            <Head>
                <title>404 | QuackieMackie</title>
                <meta name="robots" content="noindex" />
            </Head>

            <main className="notfound-card" role="main" aria-labelledby="notfound-heading">
                <p className="code" aria-hidden>
                    404
                </p>
                <h1 id="notfound-heading">Page not found</h1>
                <p className="message">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="actions">
                    <Link href="/" className="btn primary" aria-label="Go back to homepage">
                        <FontAwesomeIcon icon={faArrowLeft} className="icon" aria-hidden="true" />
                        <span>Home</span>
                    </Link>
                    <a
                        className="btn secondary"
                        href={issuesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Report an issue on GitHub"
                    >
                        <FontAwesomeIcon icon={faGithub} className="icon" aria-hidden="true" />
                        <span>Report issue</span>
                    </a>
                </div>
            </main>
        </div>
    );
}
