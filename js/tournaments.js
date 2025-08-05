/**
 * Tournaments JavaScript for Haryana Chess Association Website
 * Handles tournament filtering, tab functionality, and modal interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tournament filters
    initTournamentFilters();
    
    // Initialize results tabs
    initResultsTabs();
    
    // Initialize tournament details modal
    initTournamentModal();
    
    // Add tournament card click handlers
    addTournamentCardHandlers();
});

/**
 * Initialize tournament filters functionality
 */
function initTournamentFilters() {
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (!applyFiltersBtn) return;
    
    applyFiltersBtn.addEventListener('click', function() {
        const categoryFilter = document.getElementById('category-filter').value;
        const locationFilter = document.getElementById('location-filter').value;
        const typeFilter = document.getElementById('type-filter').value;
        
        filterTournaments(categoryFilter, locationFilter, typeFilter);
    });
}

/**
 * Filter tournaments based on selected criteria
 */
function filterTournaments(category, location, type) {
    const tournamentCards = document.querySelectorAll('#upcoming-tournaments-grid .tournament-card');
    const noResultsElement = document.getElementById('no-upcoming-tournaments');
    
    let visibleCount = 0;
    
    tournamentCards.forEach(card => {
        const cardCategory = card.querySelector('.tournament-meta span:nth-child(3)').textContent.toLowerCase();
        const cardLocation = card.querySelector('.tournament-meta span:nth-child(1)').textContent.toLowerCase();
        const cardType = card.querySelector('.tournament-meta span:nth-child(2)').textContent.toLowerCase();
        
        const categoryMatch = category === 'all' || cardCategory.includes(category.toLowerCase());
        const locationMatch = location === 'all' || cardLocation.includes(location.toLowerCase());
        const typeMatch = type === 'all' || cardType.includes(type.toLowerCase());
        
        if (categoryMatch && locationMatch && typeMatch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show or hide no results message
    if (visibleCount === 0) {
        noResultsElement.style.display = 'block';
    } else {
        noResultsElement.style.display = 'none';
    }
}

/**
 * Initialize tabs functionality for results section
 */
function initResultsTabs() {
    const tabButtons = document.querySelectorAll('.results-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.results-section .tab-content');
    
    if (tabButtons.length === 0 || tabContents.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

/**
 * Initialize tournament details modal functionality
 */
function initTournamentModal() {
    const modal = document.getElementById('tournament-details-modal');
    if (!modal) return;
    
    // Close modal when clicking the X button
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking the close button in footer
    const closeModalBtn = modal.querySelector('.close-modal-btn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Initialize modal tabs
    initModalTabs();
}

/**
 * Initialize tabs within the tournament details modal
 */
function initModalTabs() {
    const modalTabs = document.querySelectorAll('.modal-tab');
    const modalTabContents = document.querySelectorAll('.modal-tab-content');
    
    if (modalTabs.length === 0 || modalTabContents.length === 0) return;
    
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            modalTabs.forEach(t => t.classList.remove('active'));
            modalTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

/**
 * Add click handlers to tournament cards to open the details modal
 */
function addTournamentCardHandlers() {
    const tournamentCards = document.querySelectorAll('.tournament-card');
    const detailsButtons = document.querySelectorAll('.tournament-card .btn-secondary');
    const modal = document.getElementById('tournament-details-modal');
    
    if (!modal) return;
    
    // Add click handler to the Details buttons
    detailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.tournament-card');
            if (card) {
                showTournamentDetails(card);
            }
        });
    });
}

/**
 * Show tournament details in the modal
 */
function showTournamentDetails(card) {
    const modal = document.getElementById('tournament-details-modal');
    if (!modal) return;
    
    // Get tournament data from the card
    const title = card.querySelector('h3').textContent;
    const date = card.querySelector('.tournament-date .day').textContent + ' ' + 
                card.querySelector('.tournament-date .month').textContent + ' ' + 
                card.querySelector('.tournament-date .year').textContent;
    const location = card.querySelector('.tournament-meta span:nth-child(1)').textContent.replace('\n', '').trim();
    const type = card.querySelector('.tournament-meta span:nth-child(2)').textContent.replace('\n', '').trim();
    const description = card.querySelector('.tournament-description').textContent;
    const entryFee = card.querySelector('.info-item:nth-child(1) .value').textContent;
    const prizeFund = card.querySelector('.info-item:nth-child(2) .value').textContent;
    const timeControl = card.querySelector('.info-item:nth-child(3) .value').textContent;
    const rounds = card.querySelector('.info-item:nth-child(4) .value').textContent;
    
    // Update modal content with tournament data
    modal.querySelector('#modal-tournament-title').textContent = title;
    modal.querySelector('#modal-tournament-date').textContent = date;
    modal.querySelector('#modal-tournament-location').textContent = location.replace('\n', '').trim();
    modal.querySelector('#modal-tournament-type').textContent = type.replace('\n', '').trim();
    modal.querySelector('#modal-tournament-description').innerHTML = `<p>${description}</p>`;
    modal.querySelector('#modal-entry-fee').textContent = entryFee;
    modal.querySelector('#modal-prize-fund').textContent = prizeFund;
    modal.querySelector('#modal-time-control').textContent = timeControl;
    modal.querySelector('#modal-rounds').textContent = rounds;
    
    // Reset to first tab
    const firstTab = modal.querySelector('.modal-tab');
    if (firstTab) {
        firstTab.click();
    }
    
    // Show the modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

/**
 * Generate tournament cards dynamically (for future implementation)
 * This would replace the static HTML with dynamically generated content
 */
function generateTournamentCards(tournaments) {
    // This is a placeholder function for future implementation
    // It would take an array of tournament objects and generate HTML for each
    
    const tournamentGrid = document.getElementById('upcoming-tournaments-grid');
    if (!tournamentGrid) return;
    
    // Clear existing content
    tournamentGrid.innerHTML = '';
    
    // Example of how this would work with real data
    tournaments.forEach(tournament => {
        const card = document.createElement('div');
        card.className = 'tournament-card';
        
        // Build card HTML structure based on tournament data
        card.innerHTML = `
            <div class="tournament-date">
                <span class="day">${tournament.day}</span>
                <span class="month">${tournament.month}</span>
                <span class="year">${tournament.year}</span>
            </div>
            <div class="tournament-details">
                <h3>${tournament.title}</h3>
                <div class="tournament-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${tournament.location}</span>
                    <span><i class="fas fa-chess-knight"></i> ${tournament.type}</span>
                    <span><i class="fas fa-users"></i> ${tournament.category}</span>
                </div>
                <p class="tournament-description">${tournament.description}</p>
                <div class="tournament-info">
                    <div class="info-item">
                        <span class="label">Entry Fee:</span>
                        <span class="value">${tournament.entryFee}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Prize Fund:</span>
                        <span class="value">${tournament.prizeFund}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Time Control:</span>
                        <span class="value">${tournament.timeControl}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">Rounds:</span>
                        <span class="value">${tournament.rounds}</span>
                    </div>
                </div>
                <div class="tournament-actions">
                    <a href="#" class="btn btn-primary">Register Now</a>
                    <a href="#" class="btn btn-secondary">Details</a>
                </div>
            </div>
            <div class="tournament-status">
                <span class="status-badge ${tournament.statusClass}">${tournament.status}</span>
            </div>
        `;
        
        tournamentGrid.appendChild(card);
    });
    
    // Re-add event listeners to the new cards
    addTournamentCardHandlers();
}

/**
 * Generate tournament results dynamically (for future implementation)
 */
function generateTournamentResults(results) {
    // This is a placeholder function for future implementation
    // It would take an array of result objects and generate HTML for each
    
    const resultsList = document.querySelector('.results-list');
    if (!resultsList) return;
    
    // Clear existing content
    resultsList.innerHTML = '';
    
    // Example of how this would work with real data
    results.forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        
        // Build result card HTML structure based on result data
        resultCard.innerHTML = `
            <div class="result-header">
                <h3>${result.title}</h3>
                <span class="result-date">${result.date}</span>
            </div>
            <div class="result-details">
                <div class="result-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${result.location}</span>
                    <span><i class="fas fa-chess-knight"></i> ${result.type}</span>
                    <span><i class="fas fa-users"></i> ${result.players} Players</span>
                </div>
                <div class="winners-podium">
                    <div class="winner second-place">
                        <div class="position">2</div>
                        <div class="player-avatar">
                            <div class="avatar-placeholder"><i class="fas fa-user"></i></div>
                        </div>
                        <div class="player-name">${result.secondPlace}</div>
                    </div>
                    <div class="winner first-place">
                        <div class="position">1</div>
                        <div class="player-avatar">
                            <div class="avatar-placeholder"><i class="fas fa-user"></i></div>
                        </div>
                        <div class="player-name">${result.firstPlace}</div>
                    </div>
                    <div class="winner third-place">
                        <div class="position">3</div>
                        <div class="player-avatar">
                            <div class="avatar-placeholder"><i class="fas fa-user"></i></div>
                        </div>
                        <div class="player-name">${result.thirdPlace}</div>
                    </div>
                </div>
                <div class="result-actions">
                    <a href="#" class="btn btn-outline">Full Results</a>
                    <a href="#" class="btn btn-outline">Tournament Report</a>
                    <a href="#" class="btn btn-outline">Photo Gallery</a>
                </div>
            </div>
        `;
        
        resultsList.appendChild(resultCard);
    });
}

/**
 * Add smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if it's just a # link
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/**
 * Add keyboard accessibility to interactive elements
 */
function enhanceAccessibility() {
    // Make tournament cards keyboard accessible
    const tournamentCards = document.querySelectorAll('.tournament-card');
    tournamentCards.forEach(card => {
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Find and click the details button when Enter or Space is pressed
                const detailsBtn = this.querySelector('.btn-secondary');
                if (detailsBtn) {
                    e.preventDefault();
                    detailsBtn.click();
                }
            }
        });
    });
    
    // Add keyboard support for modal
    const modal = document.getElementById('tournament-details-modal');
    if (modal) {
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Call accessibility enhancements after DOM is loaded
document.addEventListener('DOMContentLoaded', enhanceAccessibility);