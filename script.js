
"use strict";

// Typing animation
const typingElement = document.getElementById("typing");

const roles = [
  "AI Enthusiast",
  "Software Developer",
  "Web Developer",
  "Technology Explorer"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeRole() {
  if (!typingElement) return;

  const currentRole = roles[roleIndex];

  typingElement.textContent = currentRole.substring(0, characterIndex);

  let delay = isDeleting ? 45 : 85;

  if (!isDeleting && characterIndex < currentRole.length) {
    characterIndex++;
  } else if (!isDeleting) {
    isDeleting = true;
    delay = 1400;
  } else if (characterIndex > 0) {
    characterIndex--;
  } else {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  window.setTimeout(typeRole, delay);
}

if (typingElement) {
  typeRole();
}

// Responsive mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.textContent = "☰";
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
}

// Reveal content when it enters the viewport
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("show");
  });
}

// Highlight the current navigation section
const pageSections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach(link => {
          const active =
            link.getAttribute("href") === `#${entry.target.id}`;

          link.classList.toggle("active", active);
        });
      });
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0
    }
  );

  pageSections.forEach(section => {
    navigationObserver.observe(section);
  });
}

// Back-to-top button
const backTop = document.getElementById("backTop");

function updateBackTop() {
  if (!backTop) return;

  backTop.classList.toggle("visible", window.scrollY > 400);
}

window.addEventListener("scroll", updateBackTop, {
  passive: true
});

updateBackTop();

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth"
    });
  });
}

// Copy email address
const copyEmailButton = document.getElementById("copyEmail");
const copyFeedback = document.getElementById("copyFeedback");

if (copyEmailButton && copyFeedback) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;

    if (!email || email === "YOUR_EMAIL@example.com") {
      copyFeedback.textContent =
        "Add your actual email address in index.html first.";
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      copyFeedback.textContent = "Email address copied successfully.";
    } catch (error) {
      copyFeedback.textContent =
        "Copy unavailable. Please use the Send me an email link.";
    }
  });
}

// Automatic copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
