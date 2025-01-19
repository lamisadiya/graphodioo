const monthYear = document.getElementById('monthYear');
const datesContainer = document.getElementById('dates');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');


const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();


const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


// Render the calendar
function renderCalendar(month, year) {
  monthYear.textContent = `${months[month]} ${year}`;
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();


  datesContainer.innerHTML = "";


  // Add blank spaces for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    datesContainer.innerHTML += `<span></span>`;
  }


  // Add dates of the month
  for (let date = 1; date <= lastDate; date++) {
    const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    datesContainer.innerHTML += `<span class="${isToday ? 'today' : ''}">${date}</span>`;
  }
}


// Event listeners for navigating between months
prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});


nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});


// Initialize Calendar
renderCalendar(currentMonth, currentYear);


// Add logic for timezone and date selection
document.addEventListener('DOMContentLoaded', () => {
  const dropdownButton = document.getElementById('dropdown-button');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const timezoneSearch = document.getElementById('timezone-search');
  const timezoneSelector = document.getElementById('timezone-selector');
  const selectedTimezoneDisplay = document.getElementById('selected-timezone');
  const selectedDateDisplay = document.getElementById('selected-date');
  const timeFormatSwitch = document.getElementById('time-format-switch');
  const timeFormatLabel = document.getElementById('time-format-label');


  let is24Hour = false; // Default time format (AM/PM)


  // Populate time zones
  const timeZones = Intl.supportedValuesOf('timeZone');


  const populateTimezones = (filter = '') => {
    timezoneSelector.innerHTML = ''; // Clear previous options
    const filteredZones = timeZones.filter((tz) =>
      tz.toLowerCase().includes(filter.toLowerCase())
    );


    filteredZones.forEach((tz) => {
      const option = document.createElement('option');
      option.value = tz;


      // Display time based on the selected format
      const formattedTime = new Date().toLocaleTimeString('en-US', {
        timeZone: tz,
        hour12: !is24Hour,
        hour: '2-digit',
        minute: '2-digit',
      });


      option.textContent = `${tz} (${formattedTime})`;
      timezoneSelector.appendChild(option);
    });
  };


  // Initial population of time zones
  populateTimezones();


  // Show or hide dropdown menu
  dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('active');
  });


  // Filter time zones as the user types in the search box
  timezoneSearch.addEventListener('input', (e) => {
    populateTimezones(e.target.value);
  });


  // Toggle between 24-hour and AM/PM formats
  timeFormatSwitch.addEventListener('change', () => {
    is24Hour = timeFormatSwitch.checked;
    timeFormatLabel.textContent = is24Hour ? '24-Hour' : 'AM/PM';
    populateTimezones(); // Re-populate time zones with the updated format
  });


  // Handle time zone selection
  timezoneSelector.addEventListener('change', () => {
    const selectedTimezone = timezoneSelector.value;
    selectedTimezoneDisplay.textContent = selectedTimezone;
    dropdownMenu.classList.remove('active'); // Close dropdown after selection
  });


  // Handle date selection
  datesContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN' && event.target.textContent) {
      const selectedDate = event.target.textContent;
      const selectedFullDate = new Date(currentYear, currentMonth, selectedDate);


      // Format the selected date for display
      const formattedDate = selectedFullDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });


      selectedDateDisplay.textContent = formattedDate;
    }
  });


  // Close dropdown if clicked outside
  document.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('active');
    }
  });

  // Modal Logic
const modal = document.getElementById("detailsModal");
const scheduleEventButton = document.getElementById("scheduleEvent");


datesContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN" && event.target.textContent) {
    const selectedDay = event.target.textContent;
    selectedDate = new Date(currentYear, currentMonth, selectedDay);
    checkModalTrigger();
  }
});


function checkModalTrigger() {
  if (selectedDate && selectedTimezone) {
    modal.classList.add("active");
  }
}


scheduleEventButton.addEventListener("click", (event) => {
  event.preventDefault();
  alert(`Event Scheduled!\nDate: ${selectedDate.toLocaleDateString()}\nTime Zone: ${selectedTimezone}`);
  modal.classList.remove("active");
});
})
