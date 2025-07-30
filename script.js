// Helper: Get current month/year
function getCurrentMonthYear() {
  const now = new Date();
  return { month: now.getMonth(), year: now.getFullYear() };
}

// Helper: Get days in a month
function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Data handling with localStorage
function loadWorkers() {
  const data = localStorage.getItem('workers');
  return data ? JSON.parse(data) : [];
}

function saveWorkers(workers) {
  localStorage.setItem('workers', JSON.stringify(workers));
}

// Render the calendar
function renderCalendar() {
  const { month, year } = getCurrentMonthYear();
  const daysInMonth = getDaysInMonth(month, year);
  const workers = loadWorkers();

  let html = '<table class="calendar"><thead><tr><th>Worker</th>';
  for (let d = 1; d <= daysInMonth; d++) {
    html += `<th>${d}</th>`;
  }
  html += '<th>Edit Name</th></tr></thead><tbody>';

  workers.forEach((worker, wi) => {
    html += `<tr class="worker-row"><td><span class="worker-name" data-index="${wi}">${worker.name}</span></td>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const value = worker.availability && worker.availability[d] ? worker.availability[d] : '';
      html += `<td><input class="availability-input" type="text" data-worker="${wi}" data-day="${d}" value="${value}" /></td>`;
    }
    html += `<td><button class="edit-btn" data-edit-index="${wi}">Edit</button></td></tr>`;
  });

  html += '</tbody></table>';
  document.getElementById('calendar-container').innerHTML = html;
}

// Add a worker
document.getElementById('add-worker-btn').addEventListener('click', function() {
  const input = document.getElementById('worker-name-input');
  const name = input.value.trim();
  if (!name) return;
  const workers = loadWorkers();
  workers.push({ name, availability: {} });
  saveWorkers(workers);
  input.value = '';
  renderCalendar();
});

// Edit worker name
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('edit-btn')) {
    const index = e.target.getAttribute('data-edit-index');
    const workers = loadWorkers();
    const currentName = workers[index].name;
    const newName = prompt("Edit worker's name:", currentName);
    if (newName && newName.trim()) {
      workers[index].name = newName.trim();
      saveWorkers(workers);
      renderCalendar();
    }
  }
});

// Edit availability
document.addEventListener('input', function(e) {
  if (e.target.classList.contains('availability-input')) {
    const wi = e.target.getAttribute('data-worker');
    const day = e.target.getAttribute('data-day');
    const value = e.target.value;
    const workers = loadWorkers();
    if (!workers[wi].availability) workers[wi].availability = {};
    workers[wi].availability[day] = value;
    saveWorkers(workers);
  }
});

// Initial render
renderCalendar();
