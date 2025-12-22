document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (!hamburger || !navMenu) {
        console.error("Hamburger or nav menu not found");
        return;
    }

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
});
