const titles = [
  "Backend Developer",
  "Flask Developer",
  "Python Developer",
  "AI Enthusiast",
  "SaaS Application Developer",
  "REST API Developer"
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const titleEl = document.querySelector("[data-title]");
let titleIndex = 0;

if (titleEl && !prefersReducedMotion) {
  setInterval(() => {
    titleEl.classList.add("swap");
    setTimeout(() => {
      titleIndex = (titleIndex + 1) % titles.length;
      titleEl.textContent = titles[titleIndex];
      titleEl.classList.remove("swap");
    }, 360);
  }, 2800);
}

const navbar = document.querySelector("[data-navbar]");
const menuButton = document.querySelector("[data-menu]");
const navLinks = [...document.querySelectorAll(".nav-links a")];

const syncNav = () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 16);
};
syncNav();
window.addEventListener("scroll", syncNav, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = navbar.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar?.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-42% 0px -50% 0px", threshold: 0.01 });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(el);
});

document.querySelectorAll(".skill-card, .service-card, .project-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--y", `${event.clientY - rect.top}px`);
  });
});

const spotlight = document.querySelector(".cursor-spotlight");
if (spotlight && !prefersReducedMotion && matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    spotlight.style.left = `${event.clientX}px`;
    spotlight.style.top = `${event.clientY}px`;
    spotlight.style.opacity = "1";
  }, { passive: true });
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();

document.querySelector("[data-contact-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`${data.get("type")} inquiry from ${data.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nType: ${data.get("type")}\n\nMessage:\n${data.get("message")}`
  );
  window.location.href = `mailto:jiteshdubey878@gmail.com?subject=${subject}&body=${body}`;
});
