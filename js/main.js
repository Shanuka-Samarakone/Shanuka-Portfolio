/* ================================
   main.js — theme + footer year
   ================================ */

const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

// Apply theme & persist
function setMode(mode) {
  if (mode === "dark") {
    root.classList.add("dark");
    if (toggle) toggle.checked = true;
  } else {
    root.classList.remove("dark");
    if (toggle) toggle.checked = false;
  }
  try {
    localStorage.setItem("theme", mode);
  } catch {}
}

// Sync toggle on load (default dark if nothing saved)
(() => {
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch {}
  if (toggle) toggle.checked = saved ? saved === "dark" : true;
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