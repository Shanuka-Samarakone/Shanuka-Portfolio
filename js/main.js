// ================================
// main.js — theme toggle + scrollspy + mobile nav + video autopause
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


// === SCROLLSPY + MOBILE NAV + VIDEO AUTOPAUSE ===

document.addEventListener("DOMContentLoaded", () => {
  // ----- SCROLLSPY -----
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

  // ----- MOBILE NAV TOGGLE -----
  const navToggleBtn = document.getElementById("navToggle");
  const mobileNav = document.getElementById("primaryNavMobile");
  const iconHamburger = document.getElementById("iconHamburger");
  const iconClose = document.getElementById("iconClose");

  function setMobileNav(open) {
    if (!mobileNav || !navToggleBtn) return;
    mobileNav.classList.toggle("hidden", !open);
    navToggleBtn.setAttribute("aria-expanded", String(open));
    if (iconHamburger) iconHamburger.classList.toggle("hidden", open);
    if (iconClose) iconClose.classList.toggle("hidden", !open);
    document.body.classList.toggle("overflow-hidden", open); // lock scroll when open
  }

  if (navToggleBtn) {
    navToggleBtn.addEventListener("click", () => {
      const willOpen = mobileNav?.classList.contains("hidden");
      setMobileNav(!!willOpen);
    });
  }

  // Close menu when a mobile nav link is tapped
  if (mobileNav) {
    mobileNav.querySelectorAll("a[data-nav-link]").forEach((a) => {
      a.addEventListener("click", () => setMobileNav(false));
    });
  }

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMobileNav(false);
  });

  // Close if resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setMobileNav(false);
  });

  // ----- VIDEO AUTO-PAUSE -----
  // When one video plays, pause all others.
  const videos = Array.from(document.querySelectorAll("video"));
  if (videos.length) {
    videos.forEach((vid) => {
      vid.addEventListener("play", () => {
        videos.forEach((other) => {
          if (other !== vid && !other.paused) {
            try { other.pause(); } catch {}
          }
        });
      });
      // If a video enters PiP, pause the others
      vid.addEventListener?.("enterpictureinpicture", () => {
        videos.forEach((other) => {
          if (other !== vid && !other.paused) {
            try { other.pause(); } catch {}
          }
        });
      });
    });
  }
});