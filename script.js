// --- ADMIN LOGIN LOGIC ---
const ADMIN_USERNAME = "adminsurah456";
const ADMIN_PASSWORD = "@MtAiry38146";

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginForm = document.getElementById("login-form");
const adminUsernameSpan = document.getElementById("admin-username");

function isAdminLoggedIn() {
  return localStorage.getItem("isAdmin") === "true";
}

function setAdminLoginState(state) {
  localStorage.setItem("isAdmin", state ? "true" : "false");
  updateLoginUI();
  updateEditPermissions();
  renderCalendar();
  renderUserSelect();
}

function updateLoginUI() {
  if (isAdminLoggedIn()) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "";
    adminUsernameSpan.style.display = "";
    adminUsernameSpan.textContent = ADMIN_USERNAME;
    loginForm.style.display = "none";
  } else {
    loginBtn.style.display = "";
    logoutBtn.style.display = "none";
    adminUsernameSpan.style.display = "none";
    loginForm.style.display = "none";
  }
}

function updateEditPermissions() {
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = isAdminLoggedIn() ? "" : "none";
  });
}

// --- LOGIN EVENT LISTENERS ---
loginBtn.addEventListener("click", () => {
  loginForm.style.display = loginForm.style.display === "block" ? "none" : "block";
});
logoutBtn.addEventListener("click", () => {
  setAdminLoginState(false);
});
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    setAdminLoginState(true);
    loginForm.reset();
  } else {
    alert("Invalid credentials.");
  }
});

// --- CALENDAR LOGIC ---
const START_YEAR = 2025;
const START_MONTH = 7; // August
const END_YEAR = 2026;
const END_MONTH = 7;

let users = JSON.parse(localStorage.getItem("users") || "[]");
let avail = JSON.parse(localStorage.getItem("availability") || "{}");
let selectedUser = users.length ? users[0] : null;
let viewYear = START_YEAR;
let viewMonth = START_MONTH;

// DOM Elements
const nameInput = document.getElementById("name-input");
const addNameBtn = document.getElementById("add-name-btn");
const userSelect = document.getElementById("user-select");
const removeNameBtn = document.getElementById("remove-name-btn");
const monthLabel = document.getElementById("month-label");
const prevMonthBtn = document.getElementById("prev-month-btn");
const nextMonthBtn = document.getElementById("next-month-btn");
const calendarDiv = document.getElementById("calendar");

function monthYearInRange(year, month) {
  if (year < START_YEAR || year > END_YEAR) return false;
  if (year === START_YEAR && month < START_MONTH) return false;
  if (year === END_YEAR && month > END_MONTH) return false;
  return true;
}

function saveState() {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("availability", JSON.stringify(avail));
}

function renderUserSelect() {
  userSelect.innerHTML = "";
  users.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    userSelect.appendChild(opt);
  });
  userSelect.value = selectedUser || "";
  userSelect.style.display = users.length ? "" : "none";
  // Remove button is only shown for admin in updateEditPermissions
}

function renderCalendar() {
  calendarDiv.innerHTML = "";

  // Month/Year label
  const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
  monthLabel.textContent = monthName;

  // Calendar grid
  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  // Headers
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(d => {
    const head = document.createElement("div");
    head.className = "calendar-header";
    head.textContent = d;
    grid.appendChild(head);
  });

  // Days
  const firstDate = new Date(viewYear, viewMonth, 1);
  const firstDay = firstDate.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Previous month's trailing days
  let prevMonthDays = firstDay;
  if (prevMonthDays > 0) {
    for (let i = 0; i < prevMonthDays; i++) {
      const blank = document.createElement("div");
      blank.className = "calendar-day other";
      grid.appendChild(blank);
    }
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day";
    dayDiv.textContent = d;

    if (!selectedUser) {
      dayDiv.style.opacity = 0.5;
      dayDiv.title = "Select a name to view availability";
      grid.appendChild(dayDiv);
      continue;
    }

    const key = `${viewYear}-${(viewMonth+1).toString().padStart(2,"0")}-${d.toString().padStart(2,"0")}|${selectedUser}`;
    if (avail[key]) {
      const circle = document.createElement("span");
      circle.className = "circle";
      dayDiv.appendChild(circle);
    }

    // Only admin can toggle availability
    if (isAdminLoggedIn()) {
      dayDiv.style.cursor = "pointer";
      dayDiv.onclick = () => {
        avail[key] = !avail[key];
        saveState();
        renderCalendar();
      };
    } else {
      dayDiv.style.cursor = "not-allowed";
      dayDiv.onclick = null;
    }

    grid.appendChild(dayDiv);
  }

  // Trailing blanks for next month
  let totalCells = firstDay + daysInMonth;
  let nextBlanks = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < nextBlanks; i++) {
    const blank = document.createElement("div");
    blank.className = "calendar-day other";
    grid.appendChild(blank);
  }

  calendarDiv.appendChild(grid);
}

// --- CALENDAR EVENT LISTENERS ---
if (addNameBtn) {
  addNameBtn.onclick = () => {
    if (!isAdminLoggedIn()) return;
    const name = nameInput.value.trim();
    if (!name) return;
    if (users.includes(name)) {
      alert("Name already exists.");
      return;
    }
    users.push(name);
    selectedUser = name;
    saveState();
    renderUserSelect();
    renderCalendar();
    nameInput.value = "";
  };
}

if (userSelect) {
  userSelect.onchange = () => {
    selectedUser = userSelect.value;
    renderCalendar();
  };
}

if (removeNameBtn) {
  removeNameBtn.onclick = () => {
    if (!isAdminLoggedIn()) return;
    if (!selectedUser) return;
    if (!confirm(`Remove "${selectedUser}" and all their availability?`)) return;
    users = users.filter(u => u !== selectedUser);
    Object.keys(avail).forEach(key => {
      if (key.endsWith(`|${selectedUser}`)) {
        delete avail[key];
      }
    });
    selectedUser = users.length ? users[0] : null;
    saveState();
    renderUserSelect();
    renderCalendar();
  };
}

if (prevMonthBtn) {
  prevMonthBtn.onclick = () => {
    let m = viewMonth - 1, y = viewYear;
    if (m < 0) { m = 11; y--; }
    if (monthYearInRange(y, m)) {
      viewMonth = m; viewYear = y;
      renderCalendar();
    }
  };
}

if (nextMonthBtn) {
  nextMonthBtn.onclick = () => {
    let m = viewMonth + 1, y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (monthYearInRange(y, m)) {
      viewMonth = m; viewYear = y;
      renderCalendar();
    }
  };
}

// --- INIT ---
updateLoginUI();
updateEditPermissions();
renderUserSelect();
renderCalendar();

// Listen for login/logout updates (in case of multiple tabs)
window.addEventListener('storage', function(e) {
  if (e.key === "isAdmin") {
    updateLoginUI();
    updateEditPermissions();
    renderCalendar();
    renderUserSelect();
  }
});
