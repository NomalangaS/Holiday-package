// Respect reduced-motion preferences for the hero video
const heroVideo = document.querySelector(".hero-video-media");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

function syncHeroVideoMotion() {
    if (motionPreference.matches) {
        heroVideo.pause();
        return;
    }

    heroVideo.play().catch((error) => {
        console.error("The hero background video could not be played.", error);
    });
}

syncHeroVideoMotion();
motionPreference.addEventListener("change", syncHeroVideoMotion);

// Set up the theme switch, animated reveals, and mobile navigation behavior
const themeToggle = document.querySelector("#theme-toggle");
const navbarMenu = document.querySelector("#navbarSupportedContent");

themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-bs-theme") !== "dark";
    document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
});

navbarMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 991.98px)").matches && navbarMenu.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navbarMenu).hide();
        }
    });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!reduceMotion.matches && "IntersectionObserver" in window) {
    document.body.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}