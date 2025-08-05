document.addEventListener('DOMContentLoaded', function() {
    initPlayerSearch();
    initCategoryTabs();
    initProfileModal();
    initProfileTabs();
    initCharts();
});

/**
 * Initialize the player search functionality
 */
function initPlayerSearch() {
    const searchBtn = document.getElementById('search-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Get search parameters
            const nameInput = document.getElementById('search-name');
            const districtSelect = document.getElementById('filter-district');
            const categorySelect = document.getElementById('filter-category');
            const ratingInput = document.getElementById('filter-rating');
            
            // Simulate search with loading state
            const playersTable = document.querySelector('.players-table-container');
            if (playersTable) {
                playersTable.innerHTML = `
                    <div class="loading-indicator">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Searching players...</p>
                    </div>
                `;
                
                // Simulate API call delay
                setTimeout(function() {
                    // For demo purposes, just reload the original table
                    playersTable.innerHTML = `
                        <table class="players-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>District</th>
                                    <th>Rating</th>
                                    <th>HCA ID</th>
                                    <th>FIDE ID</th>
                                    <th>Profile</th>
                                </tr>
                            </thead>
                            <tbody id="players-list">
                                <!-- Filtered results would go here -->
                                <tr>
                                    <td>1</td>
                                    <td>Vikas Sharma</td>
                                    <td>Gurugram</td>
                                    <td>2245</td>
                                    <td>HCA-1234</td>
                                    <td>5678901</td>
                                    <td><a href="#" class="view-profile">View</a></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Rajesh Kumar</td>
                                    <td>Panchkula</td>
                                    <td>2198</td>
                                    <td>HCA-2345</td>
                                    <td>5678902</td>
                                    <td><a href="#" class="view-profile">View</a></td>
                                </tr>
                                <!-- More filtered results -->
                            </tbody>
                        </table>
                    `;
                    
                    // Reinitialize profile view buttons
                    initProfileModal();
                }, 1500);
            }
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Reset all form fields
            const nameInput = document.getElementById('search-name');
            const districtSelect = document.getElementById('filter-district');
            const categorySelect = document.getElementById('filter-category');
            const ratingInput = document.getElementById('filter-rating');
            
            if (nameInput) nameInput.value = '';
            if (districtSelect) districtSelect.value = '';
            if (categorySelect) categorySelect.value = '';
            if (ratingInput) ratingInput.value = '';
        });
    }
}

/**
 * Initialize the category tabs for top players
 */
function initCategoryTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category');
            
            // Simulate loading data for the selected category
            const playersTable = document.querySelector('.players-table-container');
            if (playersTable) {
                playersTable.innerHTML = `
                    <div class="loading-indicator">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Loading ${category} category players...</p>
                    </div>
                `;
                
                // Simulate API call delay
                setTimeout(function() {
                    // For demo purposes, just reload a modified table
                    playersTable.innerHTML = `
                        <table class="players-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>District</th>
                                    <th>Rating</th>
                                    <th>HCA ID</th>
                                    <th>FIDE ID</th>
                                    <th>Profile</th>
                                </tr>
                            </thead>
                            <tbody id="players-list">
                                <!-- Sample data for the selected category -->
                                <tr>
                                    <td>1</td>
                                    <td>${category === 'women' ? 'Priya Sharma' : 'Vikas Sharma'}</td>
                                    <td>Gurugram</td>
                                    <td>${category === 'open' ? '2245' : (category === 'women' ? '2156' : '1987')}</td>
                                    <td>HCA-1234</td>
                                    <td>5678901</td>
                                    <td><a href="#" class="view-profile">View</a></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>${category === 'women' ? 'Neha Gupta' : 'Rajesh Kumar'}</td>
                                    <td>Panchkula</td>
                                    <td>${category === 'open' ? '2198' : (category === 'women' ? '2132' : '1965')}</td>
                                    <td>HCA-2345</td>
                                    <td>5678902</td>
                                    <td><a href="#" class="view-profile">View</a></td>
                                </tr>
                                <!-- More category-specific data -->
                            </tbody>
                        </table>
                    `;
                    
                    // Reinitialize profile view buttons
                    initProfileModal();
                }, 1000);
            }
        });
    });
}

/**
 * Initialize the player profile modal
 */
function initProfileModal() {
    const modal = document.getElementById('player-profile-modal');
    const closeBtn = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-profile');
    
    if (!modal) return;
    
    // Open modal when view profile is clicked
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // In a real application, you would fetch player data here
            // For demo, we're using the static content in the HTML
        });
    });
    
    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
}

/**
 * Initialize the profile tabs in the modal
 */
function initProfileTabs() {
    const tabButtons = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.profile-tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabName = this.getAttribute('data-tab');
            const tabContent = document.getElementById(`${tabName}-content`);
            if (tabContent) {
                tabContent.classList.add('active');
            }
            
            // If rating history tab is active, initialize/update the chart
            if (tabName === 'history' && window.ratingHistoryChart) {
                window.ratingHistoryChart.update();
            }
        });
    });
}

/**
 * Initialize all charts
 */
function initCharts() {
    // Only initialize if Chart.js is loaded
    if (typeof Chart === 'undefined') return;
    
    // District distribution chart
    initDistrictChart();
    
    // Rating distribution chart
    initRatingDistributionChart();
    
    // Age group distribution chart
    initAgeGroupChart();
    
    // Gender distribution chart
    initGenderChart();
    
    // Rating history chart (in profile modal)
    initRatingHistoryChart();
}

/**
 * Initialize district distribution chart
 */
function initDistrictChart() {
    const ctx = document.getElementById('district-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gurugram', 'Faridabad', 'Panchkula', 'Rohtak', 'Ambala', 'Others'],
            datasets: [{
                label: 'Number of Players',
                data: [120, 95, 85, 70, 65, 210],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * Initialize rating distribution chart
 */
function initRatingDistributionChart() {
    const ctx = document.getElementById('rating-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['<1200', '1200-1400', '1400-1600', '1600-1800', '1800-2000', '2000-2200', '>2200'],
            datasets: [{
                label: 'Number of Players',
                data: [150, 210, 180, 120, 80, 40, 15],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * Initialize age group distribution chart
 */
function initAgeGroupChart() {
    const ctx = document.getElementById('age-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Under 10', '10-15', '16-20', '21-30', '31-50', 'Above 50'],
            datasets: [{
                label: 'Number of Players',
                data: [120, 180, 150, 90, 60, 30],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/**
 * Initialize gender distribution chart
 */
function initGenderChart() {
    const ctx = document.getElementById('gender-chart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Male', 'Female'],
            datasets: [{
                label: 'Number of Players',
                data: [580, 220],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

/**
 * Initialize rating history chart in player profile
 */
function initRatingHistoryChart() {
    const ctx = document.getElementById('rating-history-chart');
    if (!ctx) return;
    
    window.ratingHistoryChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sep 2022', 'Nov 2022', 'Jan 2023', 'Mar 2023', 'May 2023'],
            datasets: [{
                label: 'Rating',
                data: [2205, 2225, 2215, 2230, 2245],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 2,
                tension: 0.1,
                pointBackgroundColor: 'rgba(255, 206, 86, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 2180, // Set minimum value slightly below the lowest rating
                    max: 2260  // Set maximum value slightly above the highest rating
                }
            }
        }
    });
}