// ================================
// main.js — theme toggle + scrollspy
// ================================

// === THEME TOGGLE ===

const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

// Apply a theme and persist it
function setMode(mode) {
  if (mode === "dark") {
    root.classList.add("dark");
    if (toggle) toggle.checked = true;
  } else {
    root.classList.remove("dark");
    if (toggle) toggle.checked = false;
  }
  try {
    localStorage.theme = mode;
  } catch {}
}

// On load, set theme based on saved or default to dark
(() => {
  let saved = null;
  try {
    saved = localStorage.theme;
  } catch {}
  if (saved === "light" || saved === "dark") {
    setMode(saved);
  } else {
    setMode("dark"); // default
  }
})();

// Handle user toggle click
if (toggle) {
  toggle.addEventListener("change", () => {
    setMode(toggle.checked ? "dark" : "light");
  });
}

// Footer year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();


// === SCROLLSPY ===

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  function activateLink(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("text-[color:var(--brand)]", href === `#${id}`);
    });
  }

  function onScroll() {
    const scrollY = window.scrollY;
    const buffer = window.innerHeight / 3;

    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop - buffer;
      const bottom = section.offsetTop + section.offsetHeight - buffer;

      if (scrollY >= top && scrollY < bottom) {
        current = section.id;
      }
    });

    // If at the very bottom of the page, switch to "contact"
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 5) {
      current = "contact";
    }

    activateLink(current);
  }

  window.addEventListener("scroll", onScroll);
});