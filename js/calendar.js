// calendar.js
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "YOUR_GOOGLE_CALENDAR_API_KEY";
    const calendarId = "YOUR_CALENDAR_ID";
    const eventsContainer = document.getElementById("calendar-events");
  
    function fetchCalendarEvents() {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const events = data.items;
          if (events.length > 0) {
            events.forEach((event) => {
              const eventElement = document.createElement("div");
              eventElement.className = "event";
              eventElement.innerHTML = `
                <h3>${event.summary}</h3>
                <p>${event.start.dateTime || event.start.date}</p>
              `;
              eventsContainer.appendChild(eventElement);
            });
          } else {
            eventsContainer.innerHTML = "<p>No upcoming events found.</p>";
          }
        })
        .catch((error) => {
          console.error("Error fetching calendar events:", error);
          eventsContainer.innerHTML = "<p>Failed to load events.</p>";
        });
    }
  
    fetchCalendarEvents();
  });