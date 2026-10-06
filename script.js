// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Dark / light mode toggle =====
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

function isDark() {
  if (root.dataset.theme) return root.dataset.theme === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateThemeIcon() {
  themeBtn.textContent = isDark() ? "☀️" : "🌙";
}

themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  updateThemeIcon();
});
updateThemeIcon();

// ===== Mobile menu =====
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-toggle");

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.textContent = open ? "✕" : "☰";
});

// Close the menu after picking a link
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
    menuBtn.textContent = "☰";
  });
});

// ===== Project filters =====
const filterButtons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projects.forEach((p) => {
      const tags = p.dataset.tags.split(" ");
      p.classList.toggle("hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

// ===== Reveal sections on scroll + highlight active nav link =====
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".menu a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    });
  },
  { threshold: 0.2 }
);

sections.forEach((s) => observer.observe(s));
