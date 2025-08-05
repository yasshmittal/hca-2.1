/**
 * Players JavaScript for Haryana Chess Association Website
 * Handles player filtering, view toggling, and profile modal functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize player filters
    initFilters();
    
    // Initialize view toggles
    initViewToggles();
    
    // Initialize player cards
    initPlayerCards();
    
    // Initialize featured players
    initFeaturedPlayers();
    
    // Initialize player stats counters
    initStatsCounters();
    
    // Initialize player profile modal
    initProfileModal();
});

/**
 * Initialize filter functionality
 */
function initFilters() {
    const searchInput = document.getElementById('player-search');
    const categorySelect = document.getElementById('category-filter');
    const districtSelect = document.getElementById('district-filter');
    const ratingSelect = document.getElementById('rating-filter');
    const titleSelect = document.getElementById('title-filter');
    
    // Add event listeners to all filter inputs
    [searchInput, categorySelect, districtSelect, ratingSelect, titleSelect].forEach(element => {
        if (element) {
            element.addEventListener('change', applyFilters);
        }
    });
    
    // Add event listener for search input with debounce
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
    
    // Initialize filter values
    populateFilterOptions();
}

/**
 * Populate filter dropdowns with options
 */
function populateFilterOptions() {
    // This would typically fetch data from an API
    // For now, we'll use mock data
    
    // Categories
    const categories = ['All Categories', 'Under 7', 'Under 9', 'Under 11', 'Under 13', 'Under 15', 'Under 17', 'Under 19', 'Open', 'Women', 'Senior'];
    populateSelect('category-filter', categories);
    
    // Districts
    const districts = ['All Districts', 'Ambala', 'Bhiwani', 'Faridabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Karnal', 'Kurukshetra', 'Panchkula', 'Panipat', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'];
    populateSelect('district-filter', districts);
    
    // Rating ranges
    const ratings = ['All Ratings', 'Unrated', '1000-1200', '1201-1400', '1401-1600', '1601-1800', '1801-2000', '2001-2200', '2201+'];
    populateSelect('rating-filter', ratings);
    
    // Titles
    const titles = ['All Titles', 'None', 'CM', 'FM', 'IM', 'GM', 'WCM', 'WFM', 'WIM', 'WGM'];
    populateSelect('title-filter', titles);
}

/**
 * Populate a select element with options
 */
function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    options.forEach((option, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = index === 0 ? '' : option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

/**
 * Apply filters to player cards
 */
function applyFilters() {
    const searchInput = document.getElementById('player-search');
    const categorySelect = document.getElementById('category-filter');
    const districtSelect = document.getElementById('district-filter');
    const ratingSelect = document.getElementById('rating-filter');
    const titleSelect = document.getElementById('title-filter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categorySelect ? categorySelect.value : '';
    const district = districtSelect ? districtSelect.value : '';
    const rating = ratingSelect ? ratingSelect.value : '';
    const title = titleSelect ? titleSelect.value : '';
    
    const playerCards = document.querySelectorAll('.player-card');
    let visibleCount = 0;
    
    playerCards.forEach(card => {
        // In a real implementation, these would be data attributes on the card
        // For now, we'll use the text content for demonstration
        const playerName = card.querySelector('.player-name').textContent.toLowerCase();
        const playerCategory = card.getAttribute('data-category') || '';
        const playerDistrict = card.getAttribute('data-district') || '';
        const playerRating = card.getAttribute('data-rating') || '';
        const playerTitle = card.getAttribute('data-title') || '';
        
        // Check if the card matches all filters
        const matchesSearch = !searchTerm || playerName.includes(searchTerm);
        const matchesCategory = !category || playerCategory === category;
        const matchesDistrict = !district || playerDistrict === district;
        const matchesRating = !rating || playerRating === rating;
        const matchesTitle = !title || playerTitle === title;
        
        // Show or hide the card based on filter matches
        if (matchesSearch && matchesCategory && matchesDistrict && matchesRating && matchesTitle) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Check if no results are found
    checkNoResults(visibleCount);
}

/**
 * Check if no results are found and display a message
 */
function checkNoResults(visibleCount) {
    const playersContainer = document.querySelector('.players-container');
    let noResultsMessage = document.querySelector('.no-results-message');
    
    if (visibleCount === 0) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message';
            noResultsMessage.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--accent-gold); margin-bottom: 20px;"></i>
                    <h3>No Players Found</h3>
                    <p>Try adjusting your filters or search criteria.</p>
                    <button class="btn btn-primary" onclick="resetFilters()">Reset Filters</button>
                </div>
            `;
            playersContainer.appendChild(noResultsMessage);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

/**
 * Reset all filters to their default values
 */
function resetFilters() {
    const searchInput = document.getElementById('player-search');
    const categorySelect = document.getElementById('category-filter');
    const districtSelect = document.getElementById('district-filter');
    const ratingSelect = document.getElementById('rating-filter');
    const titleSelect = document.getElementById('title-filter');
    
    if (searchInput) searchInput.value = '';
    if (categorySelect) categorySelect.value = '';
    if (districtSelect) districtSelect.value = '';
    if (ratingSelect) ratingSelect.value = '';
    if (titleSelect) titleSelect.value = '';
    
    applyFilters();
}

/**
 * Initialize view toggle functionality
 */
function initViewToggles() {
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const playersContainer = document.querySelector('.players-container');
    
    if (gridViewBtn && listViewBtn && playersContainer) {
        gridViewBtn.addEventListener('click', function() {
            playersContainer.classList.remove('list-view');
            playersContainer.classList.add('grid-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            localStorage.setItem('playersViewPreference', 'grid');
        });
        
        listViewBtn.addEventListener('click', function() {
            playersContainer.classList.remove('grid-view');
            playersContainer.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            localStorage.setItem('playersViewPreference', 'list');
        });
        
        // Load saved preference or default to grid view
        const savedView = localStorage.getItem('playersViewPreference') || 'grid';
        if (savedView === 'list') {
            listViewBtn.click();
        } else {
            gridViewBtn.click();
        }
    }
}

/**
 * Initialize player cards with mock data
 */
function initPlayerCards() {
    const playersContainer = document.querySelector('.players-container');
    if (!playersContainer) return;
    
    // Clear existing content
    playersContainer.innerHTML = '';
    
    // Generate mock player data
    const players = generateMockPlayers(20);
    
    // Create player cards
    players.forEach(player => {
        const playerCard = createPlayerCard(player);
        playersContainer.appendChild(playerCard);
    });
    
    // Initialize pagination
    initPagination();
}

/**
 * Generate mock player data
 */
function generateMockPlayers(count) {
    const titles = ['', '', '', 'CM', 'FM', 'IM', 'GM', 'WCM', 'WFM', 'WIM', 'WGM'];
    const districts = ['Ambala', 'Bhiwani', 'Faridabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Karnal', 'Kurukshetra', 'Panchkula', 'Panipat', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'];
    const categories = ['Under 7', 'Under 9', 'Under 11', 'Under 13', 'Under 15', 'Under 17', 'Under 19', 'Open', 'Women', 'Senior'];
    const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Reyansh', 'Ayaan', 'Divyanshu', 'Krish', 'Atharv', 'Ishaan', 'Shaurya', 'Advait', 'Dhruv', 'Kabir', 'Ananya', 'Diya', 'Aditi', 'Avni', 'Anika', 'Ishanvi', 'Aadhya', 'Saanvi', 'Pari', 'Myra'];
    const lastNames = ['Sharma', 'Singh', 'Kumar', 'Verma', 'Yadav', 'Chauhan', 'Patel', 'Gupta', 'Jain', 'Malik', 'Choudhary', 'Nair', 'Reddy', 'Mehta', 'Khanna'];
    
    const players = [];
    
    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const title = titles[Math.floor(Math.random() * titles.length)];
        const district = districts[Math.floor(Math.random() * districts.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const rating = Math.floor(Math.random() * 1500) + 1000;
        const tournaments = Math.floor(Math.random() * 30) + 1;
        const wins = Math.floor(Math.random() * tournaments);
        
        players.push({
            id: i + 1,
            name: `${firstName} ${lastName}`,
            title: title,
            rating: rating,
            district: district,
            category: category,
            tournaments: tournaments,
            wins: wins
        });
    }
    
    return players;
}

/**
 * Create a player card element
 */
function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.setAttribute('data-id', player.id);
    card.setAttribute('data-category', player.category);
    card.setAttribute('data-district', player.district);
    card.setAttribute('data-rating', player.rating < 1200 ? 'Unrated' : 
                                    player.rating <= 1400 ? '1000-1200' :
                                    player.rating <= 1600 ? '1201-1400' :
                                    player.rating <= 1800 ? '1401-1600' :
                                    player.rating <= 2000 ? '1601-1800' :
                                    player.rating <= 2200 ? '1801-2000' :
                                    player.rating <= 2400 ? '2001-2200' : '2201+');
    card.setAttribute('data-title', player.title || 'None');
    
    card.innerHTML = `
        <div class="player-header">
            <div class="player-placeholder">
                <i class="fas fa-chess-king"></i>
            </div>
            ${player.title ? `<div class="player-title-badge">${player.title}</div>` : ''}
        </div>
        <div class="player-body">
            <h3 class="player-name">${player.name}</h3>
            <div class="player-meta">
                <div class="player-rating">
                    <span class="label">Rating:</span>
                    <span class="value">${player.rating}</span>
                </div>
                <div class="player-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${player.district}
                </div>
            </div>
            <div class="player-achievements">
                <div class="achievement">
                    <i class="fas fa-trophy"></i>
                    ${player.tournaments} Tournaments
                </div>
                <div class="achievement">
                    <i class="fas fa-medal"></i>
                    ${player.wins} Wins
                </div>
            </div>
        </div>
        <div class="player-footer">
            <button class="btn btn-outline" onclick="openPlayerProfile(${player.id})">View Profile</button>
        </div>
    `;
    
    return card;
}

/**
 * Initialize pagination functionality
 */
function initPagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    // Clear existing pagination
    pagination.innerHTML = '';
    
    // Create pagination elements
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.disabled = true; // Disabled on first page
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    const paginationNumbers = document.createElement('div');
    paginationNumbers.className = 'pagination-numbers';
    
    // Add page numbers (for demonstration)
    for (let i = 1; i <= 5; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-number' + (i === 1 ? ' active' : '');
        pageBtn.textContent = i;
        paginationNumbers.appendChild(pageBtn);
    }
    
    // Add ellipsis
    const ellipsis = document.createElement('span');
    ellipsis.className = 'pagination-ellipsis';
    ellipsis.textContent = '...';
    
    // Add last page
    const lastPage = document.createElement('button');
    lastPage.className = 'pagination-number';
    lastPage.textContent = '10';
    
    // Assemble pagination
    pagination.appendChild(prevBtn);
    pagination.appendChild(paginationNumbers);
    pagination.appendChild(ellipsis);
    pagination.appendChild(lastPage);
    pagination.appendChild(nextBtn);
    
    // Add event listeners
    const pageButtons = document.querySelectorAll('.pagination-number');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Enable/disable prev/next buttons based on current page
            prevBtn.disabled = this.textContent === '1';
            nextBtn.disabled = this.textContent === '10';
            
            // In a real implementation, this would fetch the next page of results
            // For now, we'll just scroll to the top of the players section
            document.querySelector('.players-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Add event listeners for prev/next buttons
    prevBtn.addEventListener('click', function() {
        const activePage = document.querySelector('.pagination-number.active');
        const prevPage = activePage.previousElementSibling;
        if (prevPage && prevPage.classList.contains('pagination-number')) {
            prevPage.click();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        const activePage = document.querySelector('.pagination-number.active');
        const nextPage = activePage.nextElementSibling;
        if (nextPage && nextPage.classList.contains('pagination-number')) {
            nextPage.click();
        }
    });
}

/**
 * Initialize featured players
 */
function initFeaturedPlayers() {
    const featuredPlayersSlider = document.querySelector('.featured-players-slider');
    if (!featuredPlayersSlider) return;
    
    // Clear existing content
    featuredPlayersSlider.innerHTML = '';
    
    // Generate mock featured players
    const featuredPlayers = [
        {
            name: 'Viswanathan Anand',
            title: 'GM',
            rating: 2756,
            district: 'Chennai',
            achievements: 'World Champion',
            tournaments: 450,
            wins: 320
        },
        {
            name: 'Koneru Humpy',
            title: 'GM',
            rating: 2586,
            district: 'Vijayawada',
            achievements: 'Women\'s World Rapid Champion',
            tournaments: 380,
            wins: 260
        },
        {
            name: 'Pentala Harikrishna',
            title: 'GM',
            rating: 2732,
            district: 'Guntur',
            achievements: 'World Junior Champion',
            tournaments: 420,
            wins: 290
        }
    ];
    
    // Create featured player cards
    featuredPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'featured-player-card';
        
        card.innerHTML = `
            <div class="player-image">
                <div class="player-placeholder">
                    <i class="fas fa-chess-king"></i>
                </div>
                <div class="player-title">${player.title}</div>
            </div>
            <div class="player-info">
                <h3>${player.name}</h3>
                <div class="player-rating">${player.rating}</div>
                <div class="player-details">
                    <span><i class="fas fa-map-marker-alt"></i> ${player.district}</span>
                    <span><i class="fas fa-trophy"></i> ${player.achievements}</span>
                    <span><i class="fas fa-chess-board"></i> ${player.tournaments} Tournaments</span>
                    <span><i class="fas fa-medal"></i> ${player.wins} Wins</span>
                </div>
                <button class="btn btn-primary" onclick="openPlayerProfile(1)">View Profile</button>
            </div>
        `;
        
        featuredPlayersSlider.appendChild(card);
    });
}

/**
 * Initialize stats counters with animation
 */
function initStatsCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    // Set up intersection observer to trigger counter animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-value'));
                animateCounter(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each stat value element
    statValues.forEach(value => {
        // Store the final value as a data attribute
        const currentValue = value.textContent;
        value.setAttribute('data-value', currentValue);
        value.textContent = '0';
        observer.observe(value);
    });
}

/**
 * Animate a counter from start to end value
 */
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Initialize player profile modal
 */
function initProfileModal() {
    // Close modal when clicking outside or on close button
    const modal = document.getElementById('player-profile-modal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePlayerProfile);
    }
    
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closePlayerProfile();
        }
    });
    
    // Initialize tabs
    const tabButtons = modal.querySelectorAll('.tab-btn');
    const tabPanes = modal.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(event) {
        if (modal.classList.contains('active')) {
            if (event.key === 'Escape') {
                closePlayerProfile();
            }
        }
    });
}

/**
 * Open player profile modal
 */
function openPlayerProfile(playerId) {
    const modal = document.getElementById('player-profile-modal');
    if (!modal) return;
    
    // In a real implementation, this would fetch player data from an API
    // For now, we'll use mock data
    const player = {
        id: playerId,
        name: 'Arjun Erigaisi',
        title: 'GM',
        rating: 2689,
        district: 'Warangal',
        age: 20,
        category: 'Open',
        federation: 'India',
        tournaments: 120,
        wins: 85,
        draws: 25,
        losses: 10,
        bio: 'Arjun Erigaisi is an Indian chess grandmaster. He achieved his final grandmaster norm at the age of 14 years, 11 months and 13 days, making him one of the youngest grandmasters in the world. He has represented India in multiple international tournaments and has shown remarkable progress in recent years, climbing rapidly in the world rankings.',
        achievements: [
            { year: 2023, title: 'Tata Steel Chess Tournament', description: 'Finished 3rd place in Masters section' },
            { year: 2022, title: 'World Rapid Championship', description: 'Silver medal' },
            { year: 2021, title: 'Indian National Championship', description: 'Gold medal' },
            { year: 2019, title: 'World Junior Championship', description: 'Top 5 finish' }
        ],
        tournaments: [
            { date: '2023-12-10', name: 'Tata Steel Chess India', result: '1st Place', performance: 2750 },
            { date: '2023-09-05', name: 'Chess Olympiad', result: 'Team Silver', performance: 2720 },
            { date: '2023-06-20', name: 'Norway Chess Open', result: '3rd Place', performance: 2705 },
            { date: '2023-03-15', name: 'Delhi International Open', result: '1st Place', performance: 2735 },
            { date: '2023-01-25', name: 'Wijk aan Zee Challengers', result: '2nd Place', performance: 2710 }
        ]
    };
    
    // Populate modal with player data
    const profileImage = modal.querySelector('.profile-image');
    const profileName = modal.querySelector('.profile-name');
    const profileTitleBadge = modal.querySelector('.profile-title-badge');
    const profileMeta = modal.querySelector('.profile-meta');
    const profileStats = modal.querySelector('.profile-stats');
    const bioPane = document.getElementById('bio-tab');
    const achievementsPane = document.getElementById('achievements-tab');
    const tournamentsPane = document.getElementById('tournaments-tab');
    
    if (profileImage) {
        profileImage.innerHTML = '<div class="player-placeholder"><i class="fas fa-chess-king"></i></div>';
    }
    
    if (profileName) {
        profileName.textContent = player.name;
    }
    
    if (profileTitleBadge) {
        profileTitleBadge.textContent = player.title;
        profileTitleBadge.style.display = player.title ? 'block' : 'none';
    }
    
    if (profileMeta) {
        profileMeta.innerHTML = `
            <span><i class="fas fa-chess"></i> Rating: ${player.rating}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${player.district}</span>
            <span><i class="fas fa-user"></i> Age: ${player.age}</span>
            <span><i class="fas fa-flag"></i> ${player.federation}</span>
        `;
    }
    
    if (profileStats) {
        profileStats.innerHTML = `
            <div class="stat">
                <div class="stat-label">Tournaments</div>
                <div class="stat-value" data-value="${player.tournaments}">${player.tournaments}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Wins</div>
                <div class="stat-value" data-value="${player.wins}">${player.wins}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Draws</div>
                <div class="stat-value" data-value="${player.draws}">${player.draws}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Losses</div>
                <div class="stat-value" data-value="${player.losses}">${player.losses}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Win Rate</div>
                <div class="stat-value" data-value="${Math.round((player.wins / player.tournaments) * 100)}">${Math.round((player.wins / player.tournaments) * 100)}%</div>
            </div>
        `;
    }
    
    if (bioPane) {
        bioPane.innerHTML = `<p>${player.bio}</p>`;
    }
    
    if (achievementsPane) {
        let achievementsHtml = '<ul class="achievements-list">';
        player.achievements.forEach(achievement => {
            achievementsHtml += `
                <li>
                    <div class="achievement-year">${achievement.year}</div>
                    <div class="achievement-content">
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                    </div>
                </li>
            `;
        });
        achievementsHtml += '</ul>';
        achievementsPane.innerHTML = achievementsHtml;
    }
    
    if (tournamentsPane) {
        let tournamentsHtml = '<div class="tournaments-table-wrapper"><table class="tournaments-table"><thead><tr><th>Date</th><th>Tournament</th><th>Result</th><th>Performance</th></tr></thead><tbody>';
        player.tournaments.forEach(tournament => {
            const date = new Date(tournament.date);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            tournamentsHtml += `
                <tr>
                    <td>${formattedDate}</td>
                    <td>${tournament.name}</td>
                    <td>${tournament.result}</td>
                    <td>${tournament.performance}</td>
                </tr>
            `;
        });
        tournamentsHtml += '</tbody></table></div>';
        tournamentsPane.innerHTML = tournamentsHtml;
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Reset to first tab
    const firstTabBtn = modal.querySelector('.tab-btn');
    if (firstTabBtn) {
        firstTabBtn.click();
    }
    
    // Initialize stats counters in modal
    initStatsCounters();
}

/**
 * Close player profile modal
 */
function closePlayerProfile() {
    const modal = document.getElementById('player-profile-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}