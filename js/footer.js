document.addEventListener("DOMContentLoaded", () => {
    const { pages, basePath } = config;
    const currentPath = window.location.pathname;

    const isActive = (path) => currentPath.endsWith(path) ? 'active' : '';

    const footerHTML = `
        <footer>
            <p>&copy; 2025 QuackieMackie. Built with ❤ and curiosity.</p>
            <nav>
                <a href="${basePath}${pages.home}" class="${isActive(pages.home)}">Home</a> |
                <a href="${basePath}${pages.blog}" class="${isActive(pages.blog)}">Blog</a> |
                <a href="${pages.github}" target="_blank">GitHub</a>
            </nav>
        </footer>
    `;

    document.getElementById("footer-container").innerHTML = footerHTML;
});