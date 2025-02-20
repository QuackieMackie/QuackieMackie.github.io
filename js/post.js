document.addEventListener("DOMContentLoaded", async () => {
    const postContent = document.getElementById("post-content");

    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get("post");

    if (!postFile) {
        postContent.innerHTML = `<p>Error: No post specified!</p>`;
        return;
    }

    try {
        const response = await fetch(`../posts/${postFile}`);
        const markdownContent = await response.text();

        postContent.innerHTML = marked.parse(markdownContent);
    } catch (error) {
        console.error("Error loading post:", error);
        postContent.innerHTML = `<p>Failed to load the post. Please try again later.</p>`;
    }
});