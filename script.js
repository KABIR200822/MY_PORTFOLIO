const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") root.dataset.theme = "light";
function updateThemeButton() {
  const isLight = root.dataset.theme === "light";
  themeIcon.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
}
updateThemeButton();
themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  if (nextTheme === "dark") delete root.dataset.theme;
  else root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeButton();
});

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
document.querySelectorAll(".nav-link, .brand, .back-top").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      const active = link.getAttribute("href") === "#" + entry.target.id;
      link.classList.toggle("active", active);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

const form = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");
form.addEventListener("submit", event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 2) {
    showFormMessage("Please enter a name with at least 2 characters.", "error");
    form.elements.name.focus();
    return;
  }
  if (!emailIsValid) {
    showFormMessage("Please enter a valid email address.", "error");
    form.elements.email.focus();
    return;
  }
  if (message.length < 10) {
    showFormMessage("Please enter a message with at least 10 characters.", "error");
    form.elements.message.focus();
    return;
  }
  showFormMessage("Your details passed validation. This demo does not send the message.", "success");
});
function showFormMessage(message, type) {
  formNote.textContent = message;
  formNote.className = "form-note " + type;
}
document.getElementById("year").textContent = new Date().getFullYear();