body {
  font-family: Arial, sans-serif;
  background: #f8f9fa;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
}

#app-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  max-width: 1200px;
  margin: 30px auto;
}

#worker-section {
  min-width: 220px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  padding: 20px;
}

#worker-section h2 {
  margin-top: 0;
}

#worker-section input {
  padding: 6px;
  font-size: 15px;
  width: 70%;
}

#worker-section button {
  padding: 6px 10px;
  font-size: 15px;
  margin-left: 5px;
  cursor: pointer;
}

#worker-list {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}

#worker-list li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.worker-name {
  flex: 1;
}

.remove-worker-btn {
  background: #e74c3c;
  border: none;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

#calendar-section {
  flex: 1;
  min-width: 600px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  padding: 20px;
}

#calendar-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
}

#calendar-month {
  font-size: 20px;
  font-weight: bold;
}

#calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.calendar-day, .calendar-header {
  padding: 8px;
  text-align: center;
}

.calendar-header {
  font-weight: bold;
  background: #f3f3f3;
}

.calendar-day {
  min-height: 70px;
  background: #f7f7fa;
  border-radius: 4px;
  border: 1px solid #eee;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

.calendar-day.today {
  border: 2px solid #007bff;
  background: #e6f0ff;
}

.calendar-day.other-month {
  color: #bbb;
  background: #fafbfc;
  cursor: default;
}

.availability-badge {
  display: block;
  margin-top: 8px;
  background: #e0f7fa;
  color: #00796b;
  border-radius: 4px;
  padding: 2px 3px;
  font-size: 12px;
  white-space: nowrap;
}

.selected-worker {
  background: #e6f7ff !important;
}

#modal-background {
  position: fixed;
  z-index: 100;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.22);
  display: flex;
  align-items: center;
  justify-content: center;
}

#availability-modal {
  background: #fff;
  padding: 22px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.16);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

#modal-background.hidden {
  display: none;
}

#modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
