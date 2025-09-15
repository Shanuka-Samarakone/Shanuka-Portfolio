// Cache elements
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

// Apply a theme and persist it
function setMode(mode) {
  if (mode === "dark") {
    root.classList.add("dark");
    if (toggle) toggle.checked = true; // knob right
  } else {
    root.classList.remove("dark");
    if (toggle) toggle.checked = false; // knob left
  }
  localStorage.theme = mode;
}

// Decide initial theme:
// 1) Use saved preference if it exists
// 2) Otherwise, follow OS preference (prefers-color-scheme)
// 3) Default to light
(() => {
  const saved = localStorage.theme;
  if (saved === "dark" || saved === "light") {
    setMode(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setMode("dark");
  } else {
    setMode("light");
  }
})();

// Toggle on click
if (toggle) {
  toggle.addEventListener("change", () => {
    setMode(toggle.checked ? "dark" : "light");
  });
}

// Footer year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
