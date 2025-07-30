body {
  font-family: Arial, sans-serif;
  background: #f8f9fa;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 16px;
}

#controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}

#calendar-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
}

#calendar {
  max-width: 420px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  padding: 16px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.calendar-header {
  text-align: center;
  font-weight: bold;
  background: #f2f2f2;
  padding: 7px 0;
  border-radius: 4px;
}

.calendar-day {
  height: 56px;
  text-align: center;
  vertical-align: middle;
  background: #f8f8fd;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
}

.calendar-day.other {
  background: #f7f7f7;
  color: #bbb;
  cursor: default;
}

.calendar-day.selected {
  border: 2px solid #007bff;
}

.circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #49c36c;
  margin: 7px auto 0 auto;
  display: inline-block;
}

#user-select {
  font-size: 15px;
  padding: 4px 8px;
  border-radius: 4px;
}

#add-name-btn {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
}
