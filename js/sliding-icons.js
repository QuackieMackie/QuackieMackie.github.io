document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".icon-grid img");
    const container = document.querySelector(".icon-grid");

    const gap = 40;
    const iconWidth = icons[0].offsetWidth;

    container.addEventListener("dragstart", (e) => e.preventDefault());

    icons.forEach((icon, i) => {
        icon.style.position = "absolute";
        icon.style.left = `${i * (iconWidth + gap)}px`;
    });

    const slideIcons = () => {
        icons.forEach((icon) => {
            const currentLeft = parseFloat(icon.style.left);
            const newLeft = currentLeft - 0.25;

            if (newLeft + iconWidth < 0) {
                icon.style.left = `${Math.max(...Array.from(icons).map((i) => parseFloat(i.style.left))) + iconWidth + gap}px`;
            } else {
                icon.style.left = `${newLeft}px`;
            }
        });
        requestAnimationFrame(slideIcons);
    };
    slideIcons();
});