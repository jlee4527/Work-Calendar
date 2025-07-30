// Admin credentials
const ADMIN_USERNAME = "adminsurah456";
const ADMIN_PASSWORD = "@MtAiry38146";

// Elements
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginForm = document.getElementById("login-form");
const adminUsernameSpan = document.getElementById("admin-username");

// Utility functions
function isAdminLoggedIn() {
  return localStorage.getItem("isAdmin") === "true";
}

function setAdminLoginState(state) {
  localStorage.setItem("isAdmin", state ? "true" : "false");
  updateLoginUI();
  updateEditPermissions();
}

// Update UI based on login state
function updateLoginUI() {
  if (isAdminLoggedIn()) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    adminUsernameSpan.style.display = "inline";
    adminUsernameSpan.textContent = ADMIN_USERNAME;
    loginForm.style.display = "none";
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    adminUsernameSpan.style.display = "none";
    loginForm.style.display = "none";
  }
}

// Show or hide editing options
function updateEditPermissions() {
  const editableElements = document.querySelectorAll(".admin-only");
  editableElements.forEach(el => {
    el.style.display = isAdminLoggedIn() ? "" : "none";
  });
  // Or disable fields/buttons if you prefer
  // editableElements.forEach(el => el.disabled = !isAdminLoggedIn());
}

// Event listeners
loginBtn.addEventListener("click", () => {
  loginForm.style.display = loginForm.style.display === "block" ? "none" : "block";
});
logoutBtn.addEventListener("click", () => {
  setAdminLoginState(false);
  alert("Logged out.");
});
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    setAdminLoginState(true);
    alert("Logged in as admin.");
    loginForm.reset();
  } else {
    alert("Invalid credentials.");
  }
});

// On page load
updateLoginUI();
updateEditPermissions();

// Make sure all editing/add/remove elements in your HTML have class="admin-only"
