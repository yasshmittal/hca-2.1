/**
 * Pairings & Results Page JavaScript for Haryana Chess Association Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize pairings & results page specific components
    initTabs();
    initTournamentSelector();
    initCertificateSearch();
});

/**
 * Initialize Tabs Functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (!tabButtons.length || !tabPanes.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            const tabPane = document.getElementById(`${tabId}-tab`);
            if (tabPane) tabPane.classList.add('active');
        });
    });
}

/**
 * Initialize Tournament Selector
 */
function initTournamentSelector() {
    const tournamentSelect = document.getElementById('tournament-select');
    const roundSelect = document.getElementById('round-select');
    const viewButton = document.getElementById('view-btn');
    
    if (!tournamentSelect || !roundSelect || !viewButton) return;
    
    // Tournament data (in a real implementation, this would come from an API)
    const tournaments = {
        'haryana-state-championship-2023': {
            name: 'Haryana State Championship 2023',
            rounds: 5,
            date: 'June 15-18, 2023',
            venue: 'Gurugram'
        },
        'panipat-district-championship-2023': {
            name: 'Panipat District Championship 2023',
            rounds: 5,
            date: 'May 25-28, 2023',
            venue: 'Panipat'
        },
        'ambala-open-2023': {
            name: 'Ambala Open 2023',
            rounds: 7,
            date: 'May 10-15, 2023',
            venue: 'Ambala'
        },
        'karnal-junior-tournament-2023': {
            name: 'Karnal Junior Tournament 2023',
            rounds: 5,
            date: 'April 28-30, 2023',
            venue: 'Karnal'
        },
        'gurugram-rapid-chess-2023': {
            name: 'Gurugram Rapid Chess 2023',
            rounds: 7,
            date: 'April 15-16, 2023',
            venue: 'Gurugram'
        }
    };
    
    // Handle tournament selection
    tournamentSelect.addEventListener('change', function() {
        const tournamentId = this.value;
        
        // Clear round select
        roundSelect.innerHTML = '<option value="">-- Select Round --</option>';
        
        if (tournamentId) {
            // Enable round select
            roundSelect.disabled = false;
            
            // Populate rounds
            const tournament = tournaments[tournamentId];
            if (tournament) {
                for (let i = 1; i <= tournament.rounds; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = `Round ${i}`;
                    roundSelect.appendChild(option);
                }
                
                // Add final results option
                const finalOption = document.createElement('option');
                finalOption.value = 'final';
                finalOption.textContent = 'Final Results';
                roundSelect.appendChild(finalOption);
            }
        } else {
            // Disable round select
            roundSelect.disabled = true;
            viewButton.disabled = true;
        }
    });
    
    // Handle round selection
    roundSelect.addEventListener('change', function() {
        viewButton.disabled = !this.value;
    });
    
    // Handle view button click
    viewButton.addEventListener('click', function() {
        const tournamentId = tournamentSelect.value;
        const roundId = roundSelect.value;
        
        if (tournamentId && roundId) {
            // In a real implementation, this would load the data from an API
            // For now, we'll just update the headers
            const tournament = tournaments[tournamentId];
            
            if (tournament) {
                // Update pairings tab
                const pairingsHeader = document.querySelector('.pairings-header h3');
                const pairingsDate = document.querySelector('.pairings-date');
                
                if (pairingsHeader && pairingsDate) {
                    if (roundId === 'final') {
                        pairingsHeader.textContent = `Final Pairings - ${tournament.name}`;
                    } else {
                        pairingsHeader.textContent = `Round ${roundId} Pairings - ${tournament.name}`;
                    }
                    pairingsDate.textContent = tournament.date;
                }
                
                // Update results tab
                const resultsHeader = document.querySelector('.results-header h3');
                const resultsDate = document.querySelector('.results-date');
                
                if (resultsHeader && resultsDate) {
                    if (roundId === 'final') {
                        resultsHeader.textContent = `Final Results - ${tournament.name}`;
                    } else {
                        resultsHeader.textContent = `Round ${roundId} Results - ${tournament.name}`;
                    }
                    resultsDate.textContent = tournament.date;
                }
                
                // Show pairings tab
                const pairingsTabBtn = document.querySelector('.tab-btn[data-tab="pairings"]');
                if (pairingsTabBtn) pairingsTabBtn.click();
            }
        }
    });
}

/**
 * Initialize Certificate Search
 */
function initCertificateSearch() {
    const searchBtn = document.getElementById('certificate-search-btn');
    const searchInput = document.getElementById('certificate-name');
    const resultsContainer = document.getElementById('certificate-results');
    
    if (!searchBtn || !searchInput || !resultsContainer) return;
    
    // Sample certificate data (in a real implementation, this would come from an API)
    const certificates = [
        {
            id: 'HCA001',
            name: 'Rahul Sharma',
            tournament: 'Haryana State Championship 2023',
            position: '1st Place',
            date: 'June 18, 2023'
        },
        {
            id: 'HCA002',
            name: 'Priya Gupta',
            tournament: 'Haryana State Championship 2023',
            position: '2nd Place',
            date: 'June 18, 2023'
        },
        {
            id: 'HCA003',
            name: 'Amit Kumar',
            tournament: 'Haryana State Championship 2023',
            position: '3rd Place',
            date: 'June 18, 2023'
        },
        {
            id: 'HCA004',
            name: 'Rahul Sharma',
            tournament: 'Panipat District Championship 2023',
            position: 'Participation',
            date: 'May 28, 2023'
        }
    ];
    
    // Handle search button click
    searchBtn.addEventListener('click', function() {
        const searchValue = searchInput.value.trim().toLowerCase();
        
        if (!searchValue) {
            // Show error message
            resultsContainer.innerHTML = `
                <div class="no-results-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Please enter a name or HCA ID to search</p>
                </div>
            `;
            return;
        }
        
        // Filter certificates
        const filteredCertificates = certificates.filter(cert => 
            cert.name.toLowerCase().includes(searchValue) || 
            cert.id.toLowerCase().includes(searchValue)
        );
        
        if (filteredCertificates.length === 0) {
            // No results found
            resultsContainer.innerHTML = `
                <div class="no-results-message">
                    <i class="fas fa-search"></i>
                    <p>No certificates found for "${searchValue}"</p>
                </div>
            `;
        } else {
            // Display results
            let resultsHTML = '<div class="certificate-cards">';
            
            filteredCertificates.forEach(cert => {
                resultsHTML += `
                    <div class="certificate-card">
                        <div class="certificate-icon">
                            <i class="fas fa-certificate"></i>
                        </div>
                        <div class="certificate-details">
                            <h4>${cert.name}</h4>
                            <p><strong>Tournament:</strong> ${cert.tournament}</p>
                            <p><strong>Position:</strong> ${cert.position}</p>
                            <p><strong>Date:</strong> ${cert.date}</p>
                            <p><strong>ID:</strong> ${cert.id}</p>
                        </div>
                        <div class="certificate-actions">
                            <button class="btn primary-btn"><i class="fas fa-download"></i> Download</button>
                        </div>
                    </div>
                `;
            });
            
            resultsHTML += '</div>';
            resultsContainer.innerHTML = resultsHTML;
            
            // Add event listeners to download buttons
            const downloadButtons = resultsContainer.querySelectorAll('.certificate-actions .btn');
            downloadButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // In a real implementation, this would download the certificate
                    alert('Certificate download would start here.');
                });
            });
        }
    });
    
    // Handle enter key press in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}