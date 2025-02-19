document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById('blog-posts');

    try {
        const response = await fetch('../posts/posts.json');
        const posts = await response.json();

        for (const post of posts) {
            const postResponse = await fetch(`../posts/${post.file}`);
            const postContent = await postResponse.text();

            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p><strong>Date:</strong> ${post.date}</p>
                <p>${post.description}</p>
                <hr>
                <div>${marked.parse(postContent)}</div>
            `;

            postsContainer.appendChild(postElement);
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
        postsContainer.innerHTML = `<p>Failed to load blog posts. Please try again later.</p>`;
    }
});