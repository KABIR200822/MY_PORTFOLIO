const themeButton = document.getElementById("theme-button");
const menuButton = document.getElementById("menu-button");
const navigation = document.getElementById("navigation");
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// Change between light and dark mode.
themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeButton.textContent = "Light mode";
  } else {
    themeButton.textContent = "Dark mode";
  }
});

// Show or hide the navigation menu on small screens.
menuButton.addEventListener("click", function () {
  navigation.classList.toggle("open");
});

// Highlight the navigation link when it is clicked.
document.querySelectorAll("nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelectorAll("nav a").forEach(function (item) {
      item.classList.remove("active");
    });

    link.classList.add("active");
    navigation.classList.remove("open");
  });
});

// Check the contact form. This does not send the message.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (form.checkValidity()) {
    formMessage.textContent = "Your form entries are valid. This demo does not send the message.";
  } else {
    formMessage.textContent = "Please fill in all fields with valid information.";
    form.reportValidity();
  }
});

// Show the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();