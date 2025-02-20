document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById('blog-posts');

    try {
        const response = await fetch('../posts/posts.json');
        const posts = await response.json();

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
                window.location.href = `../pages/post.html?post=${post.file}`;
            });


            postsContainer.appendChild(postElement);
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
        postsContainer.innerHTML = `<p>Failed to load blog posts. Please try again later.</p>`;
    }
});