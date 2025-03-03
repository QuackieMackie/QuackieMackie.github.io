document.addEventListener("DOMContentLoaded", async () => {
    const { basePath } = config;
    const postsContainer = document.getElementById('blog-posts');

    try {
        const response = await fetch(`${basePath}/_posts/posts.json`);
        const posts = await response.json();

        posts.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateB - dateA;
        });

        for (const post of posts) {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <section>
                    <h3>${post.title}</h3>
                    <p><strong>Date:</strong> ${post.date}</p>
                    <p>${post.description}</p>
                    <hr>
                    <button class="read-more">Read More</button>
                </section>
            `;

            postElement.querySelector(".read-more").addEventListener("click", () => {
                window.location.href = `${basePath}/_pages/post.html?post=${post.file}`;
            });

            postsContainer.appendChild(postElement);
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
        postsContainer.innerHTML = `<p>Failed to load blog posts. Please try again later.</p>`;
    }
});