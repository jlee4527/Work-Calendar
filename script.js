// --- CONFIGURATION ---
const START_YEAR = 2025;
const START_MONTH = 7; // 0-indexed, so 7 = August
const END_YEAR = 2026;
const END_MONTH = 7; // 0-indexed, so 7 = August

// --- STATE ---
let users = JSON.parse(localStorage.getItem("users") || "[]");
let avail = JSON.parse(localStorage.getItem("availability") || "{}");
let selectedUser = users.length ? users[0] : null;

let viewYear = START_YEAR;
let viewMonth = START_MONTH;

// --- DOM ELEMENTS ---
const nameInput = document.getElementById("name-input");
const addNameBtn = document.getElementById("add-name-btn");
const userSelect = document.getElementById("user-select");
const removeNameBtn = document.getElementById("remove-name-btn");
const monthLabel = document.getElementById("month-label");
const prevMonthBtn = document.getElementById("prev-month-btn");
const nextMonthBtn = document.getElementById("next-month-btn");
const calendarDiv = document.getElementById("calendar");

// --- FUNCTIONS ---

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
  removeNameBtn.style.display = users.length ? "" : "none";
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
    // Fill in blanks for days before the 1st
    for (let i = 0; i < prevMonthDays; i++) {
      const blank = document.createElement("div");
      blank.className = "calendar-day other";
      grid.appendChild(blank);
    }
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day";
    dayDiv.textContent = d;

    if (!selectedUser) {
      dayDiv.style.opacity = 0.5;
      dayDiv.title = "Select or add your name to mark availability";
      grid.appendChild(dayDiv);
      continue;
    }

    // Key is yyyy-mm-dd|username
    const key = `${viewYear}-${(viewMonth+1).toString().padStart(2,"0")}-${d.toString().padStart(2,"0")}|${selectedUser}`;
    if (avail[key]) {
      const circle = document.createElement("span");
      circle.className = "circle";
      dayDiv.appendChild(circle);
    }

    // Toggle availability on click
    dayDiv.onclick = () => {
      avail[key] = !avail[key];
      saveState();
      renderCalendar();
    };

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

// --- EVENT LISTENERS ---

addNameBtn.onclick = () => {
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

userSelect.onchange = () => {
  selectedUser = userSelect.value;
  renderCalendar();
};

removeNameBtn.onclick = () => {
  if (!selectedUser) return;
  if (!confirm(`Remove "${selectedUser}" and all their availability?`)) return;
  // Remove user
  users = users.filter(u => u !== selectedUser);
  // Remove all availability for this user
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

prevMonthBtn.onclick = () => {
  let m = viewMonth - 1, y = viewYear;
  if (m < 0) { m = 11; y--; }
  if (monthYearInRange(y, m)) {
    viewMonth = m; viewYear = y;
    renderCalendar();
  }
};

nextMonthBtn.onclick = () => {
  let m = viewMonth + 1, y = viewYear;
  if (m > 11) { m = 0; y++; }
  if (monthYearInRange(y, m)) {
    viewMonth = m; viewYear = y;
    renderCalendar();
  }
};

// --- INIT ---
renderUserSelect();
renderCalendar();
