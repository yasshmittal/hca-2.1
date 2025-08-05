/**
 * Calendar Page JavaScript for Haryana Chess Association Website
 * Handles tournament calendar functionality, filtering, and view switching
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar functionality
    initCalendarPage();
});

/**
 * Initialize all calendar page functionality
 */
function initCalendarPage() {
    // Initialize view toggling
    initViewToggle();
    
    // Initialize filters
    initFilters();
    
    // Initialize calendar navigation
    initCalendarNavigation();
    
    // Generate calendar view
    generateCalendarView();
    
    // Populate tournament data
    populateTournamentData();
}

/**
 * Initialize view toggle between list and calendar views
 */
function initViewToggle() {
    const listViewBtn = document.getElementById('list-view-btn');
    const calendarViewBtn = document.getElementById('calendar-view-btn');
    const tournamentList = document.querySelector('.tournament-list');
    const tournamentCalendar = document.querySelector('.tournament-calendar');
    
    if (listViewBtn && calendarViewBtn) {
        listViewBtn.addEventListener('click', function() {
            // Update active button
            listViewBtn.classList.add('active');
            calendarViewBtn.classList.remove('active');
            
            // Show list view, hide calendar view
            tournamentList.classList.add('view-active');
            tournamentCalendar.classList.remove('view-active');
            
            // Save preference in local storage
            localStorage.setItem('hca-calendar-view', 'list');
        });
        
        calendarViewBtn.addEventListener('click', function() {
            // Update active button
            calendarViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            
            // Show calendar view, hide list view
            tournamentCalendar.classList.add('view-active');
            tournamentList.classList.remove('view-active');
            
            // Save preference in local storage
            localStorage.setItem('hca-calendar-view', 'calendar');
        });
        
        // Check for saved preference
        const savedView = localStorage.getItem('hca-calendar-view');
        if (savedView === 'calendar') {
            calendarViewBtn.click();
        } else {
            listViewBtn.click();
        }
    }
}

/**
 * Initialize filter functionality
 */
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyFilters();
        });
    });
}

/**
 * Apply filters to tournament list and calendar
 */
function applyFilters() {
    const yearFilter = document.getElementById('year-filter').value;
    const monthFilter = document.getElementById('month-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const locationFilter = document.getElementById('location-filter').value;
    
    // Get all tournament cards
    const tournamentCards = document.querySelectorAll('.tournament-card');
    
    tournamentCards.forEach(card => {
        let showCard = true;
        
        // Apply year filter
        if (yearFilter !== 'all') {
            const cardYear = card.getAttribute('data-year');
            if (cardYear !== yearFilter) {
                showCard = false;
            }
        }
        
        // Apply month filter
        if (monthFilter !== 'all') {
            const cardMonth = card.getAttribute('data-month');
            if (cardMonth !== monthFilter) {
                showCard = false;
            }
        }
        
        // Apply category filter
        if (categoryFilter !== 'all') {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory !== categoryFilter) {
                showCard = false;
            }
        }
        
        // Apply location filter
        if (locationFilter !== 'all') {
            const cardLocation = card.getAttribute('data-location');
            if (cardLocation !== locationFilter) {
                showCard = false;
            }
        }
        
        // Show or hide card based on filters
        if (showCard) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Also update calendar view with filters
    updateCalendarWithFilters();
}

/**
 * Update calendar view based on applied filters
 */
function updateCalendarWithFilters() {
    // This would be implemented to filter events in the calendar view
    // based on the same filters applied to the list view
    console.log('Calendar view updated with filters');
    
    // For now, we'll just re-generate the calendar view
    generateCalendarView();
}

/**
 * Initialize calendar navigation (prev/next month)
 */
function initCalendarNavigation() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthEl = document.querySelector('.current-month');
    
    // Set current date in state
    window.calendarState = {
        currentDate: new Date(),
        displayDate: new Date()
    };
    
    // Update month display
    updateMonthDisplay();
    
    // Add event listeners for navigation
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            // Go to previous month
            const currentMonth = window.calendarState.displayDate.getMonth();
            window.calendarState.displayDate.setMonth(currentMonth - 1);
            
            // Update calendar
            updateMonthDisplay();
            generateCalendarView();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            // Go to next month
            const currentMonth = window.calendarState.displayDate.getMonth();
            window.calendarState.displayDate.setMonth(currentMonth + 1);
            
            // Update calendar
            updateMonthDisplay();
            generateCalendarView();
        });
    }
}

/**
 * Update the month display in the calendar header
 */
function updateMonthDisplay() {
    const currentMonthEl = document.querySelector('.current-month');
    if (currentMonthEl) {
        const options = { month: 'long', year: 'numeric' };
        currentMonthEl.textContent = window.calendarState.displayDate.toLocaleDateString('en-US', options);
    }
}

/**
 * Generate the calendar view based on the current month
 */
function generateCalendarView() {
    const calendarDays = document.querySelector('.calendar-days');
    if (!calendarDays) return;
    
    // Clear existing calendar
    calendarDays.innerHTML = '';
    
    // Get current month and year
    const currentDate = window.calendarState.displayDate;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week for first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        // Add day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);
        
        // Check if this day has events
        const hasEvents = checkDayForEvents(year, month, day);
        if (hasEvents) {
            dayCell.classList.add('has-event');
            
            // Add event indicators
            hasEvents.forEach(event => {
                const eventIndicator = document.createElement('div');
                eventIndicator.className = `day-event ${event.category}`;
                eventIndicator.textContent = event.title;
                eventIndicator.setAttribute('data-event-id', event.id);
                
                // Add click event to show details
                eventIndicator.addEventListener('click', function() {
                    showEventDetails(event.id);
                });
                
                dayCell.appendChild(eventIndicator);
            });
        }
        
        // Add to calendar
        calendarDays.appendChild(dayCell);
    }
}

/**
 * Check if a specific day has any events
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @param {number} day - The day of the month
 * @returns {Array|false} - Array of events or false if no events
 */
function checkDayForEvents(year, month, day) {
    // This would normally fetch from an API or database
    // For now, we'll use mock data
    
    // Mock events data
    const mockEvents = [
        {
            id: 1,
            title: 'State Championship',
            category: 'state',
            date: new Date(2023, 5, 15) // June 15, 2023
        },
        {
            id: 2,
            title: 'District Tournament',
            category: 'district',
            date: new Date(2023, 5, 22) // June 22, 2023
        },
        {
            id: 3,
            title: 'Junior Championship',
            category: 'junior',
            date: new Date(2023, 5, 10) // June 10, 2023
        },
        {
            id: 4,
            title: "Women's Tournament",
            category: 'women',
            date: new Date(2023, 5, 28) // June 28, 2023
        }
    ];
    
    // Check if any events match this date
    const matchingEvents = mockEvents.filter(event => {
        const eventDate = event.date;
        return eventDate.getFullYear() === year && 
               eventDate.getMonth() === month && 
               eventDate.getDate() === day;
    });
    
    return matchingEvents.length > 0 ? matchingEvents : false;
}

/**
 * Show details for a specific event
 * @param {number} eventId - The event ID
 */
function showEventDetails(eventId) {
    // This would normally fetch event details from an API or database
    console.log(`Showing details for event ${eventId}`);
    
    // For now, we'll just alert
    alert(`Event details would be shown for event ID: ${eventId}`);
    
    // In a real implementation, this would populate the event details panel
    // or open a modal with the event information
}

/**
 * Populate tournament data in the list view
 */
function populateTournamentData() {
    // This would normally fetch from an API or database
    // For now, we'll use mock data and assume the HTML is already populated
    
    // In a real implementation, this would dynamically create tournament cards
    // based on data from the server
    console.log('Tournament data populated');
}

/**
 * Handle calendar download functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const format = this.getAttribute('data-format');
            downloadCalendar(format);
        });
    });
});

/**
 * Download calendar in specified format
 * @param {string} format - The format to download (ics, pdf, csv)
 */
function downloadCalendar(format) {
    // This would normally generate and download the calendar file
    console.log(`Downloading calendar in ${format} format`);
    
    // For now, we'll just alert
    alert(`Calendar would be downloaded in ${format} format`);
    
    // In a real implementation, this would make an API call to generate
    // and download the calendar file in the specified format
}