document.addEventListener("DOMContentLoaded", () => {
    const { pages, basePath } = config;
    const currentPath = window.location.pathname;

    const isActive = (path) => currentPath.endsWith(path) ? 'active' : '';

    document.getElementById("footer-container").innerHTML = `
        <footer>
            <p>&copy; 2025 QuackieMackie. Built with ❤ and curiosity.</p>
            <nav>
                <a href="${basePath}${pages.home}" class="${isActive(pages.home)}">Home</a>
                <a href="${basePath}${pages.blog}" class="${isActive(pages.blog)}">Blog</a>
                <a href="${pages.github}" target="_blank">GitHub</a>
            </nav>
        </footer>
    `;
});