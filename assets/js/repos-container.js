// Color mapping for programming languages
const LANGUAGE_COLORS = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Go: "#00ADD8",
    TypeScript: "#3178c6",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Rust: "#dea584",
    HTML: "#e34c26",
    CSS: "#563d7c",
    SCSS: "#c6538c",
    SASS: "#a53b70",
    Shell: "#89e051",
    Lua: "#000080",
    R: "#198CE7",
    Dart: "#00B4AB",
    Perl: "#0298c3",
    Haskell: "#5e5086",
    Scala: "#c22d40",
    "Objective-C": "#438eff",
    MATLAB: "#e16737",
    Julia: "#a270ba",
    Elixir: "#6e4a7e",
    JSON: "#292929",
    YAML: "#cb171e",
    Dockerfile: "#384d54",
    Makefile: "#427819",
    PowerShell: "#012456",
    Other: "#ededed" // Default color
};

// Fetch all repositories for the given user
async function fetchRepositories(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (response.status === 403 && response.headers.get("X-RateLimit-Remaining") === "0") console.error("Rate limit exceeded. Please try again later or authenticate.");
    if (!response.ok) throw new Error("Failed to fetch repositories");
    return response.json();
}

// Fetch languages for a specific repository
async function fetchLanguages(username, repoName) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    if (!response.ok) throw new Error(`Failed to fetch languages for repo: ${repoName}`);
    return response.json();
}

// Calculate language percentages from raw language byte data
function calculateLanguagePercentages(languages) {
    const totalBytes = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0);
    return Object.entries(languages).map(([language, bytes]) => ({
        language,
        percentage: ((bytes / totalBytes) * 100).toFixed(1),
    }));
}

// Generate the language bar HTML
function generateLanguageBar(languagePercentages) {
    return languagePercentages
        .map(
            (lang) =>
                `<div 
                    style="width: ${lang.percentage}%; 
                           background-color: ${LANGUAGE_COLORS[lang.language] || LANGUAGE_COLORS.Other}; 
                           height: 100%; 
                           float: left;"
                    title="${lang.language}: ${lang.percentage}%">
                 </div>`
        )
        .join("");
}

// Generate the language info HTML with percentages included
function generateLanguageInfo(languagePercentages) {
    return languagePercentages
        .map(
            (lang) =>
                `<span style="color: ${LANGUAGE_COLORS[lang.language] || LANGUAGE_COLORS.Other};">
                    ${lang.language}: ${lang.percentage}%
                </span>`
        )
        .join(" ");
}

// Populate the UI with repository details
function createRepoBox(repo, languageBar, languageInfo) {
    const repoBox = document.createElement("div");
    repoBox.className = "repo-box";
    repoBox.innerHTML = `
        <h4>${repo.name}</h4>
        <p>${repo.description || "No description provided."}</p>
        <div class="language-bar">${languageBar}</div>
        <p class="language-info">${languageInfo}</p>
        <a href="${repo.html_url}" target="_blank">View Repository</a>
    `;
    return repoBox;
}

// Main function to handle rendering repositories on the page
async function renderRepositories() {
    const reposContainer = document.getElementById("repos-container");
    const username = "QuackieMackie";

    try {
        // Fetch and sort repositories
        const repos = await fetchRepositories(username);
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        for (const repo of repos) {
            try {
                // Fetch repository languages
                const languages = await fetchLanguages(username, repo.name);

                // Calculate percentages and generate HTML
                const languagePercentages = calculateLanguagePercentages(languages);
                const languageBar = generateLanguageBar(languagePercentages);
                const languageInfo = generateLanguageInfo(languagePercentages);

                // Create and append repository element
                const repoBox = createRepoBox(repo, languageBar, languageInfo);
                reposContainer.appendChild(repoBox);
            } catch (error) {
                console.error(`Error processing repository: ${repo.name}`, error);
            }
        }
    } catch (error) {
        console.error("Failed to fetch repository data:", error);
        reposContainer.innerHTML = `<p>Unable to load repositories. Please try again later.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", renderRepositories);