// Rankings & News Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initTabs();
    
    // Initialize rankings filters and search
    initRankingsFilters();
    
    // Initialize news filters and search
    initNewsFilters();
    
    // Initialize pagination
    initPagination();
    
    // Initialize newsletter form
    initNewsletterForm();
});

// Tabs functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Rankings filters functionality
function initRankingsFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.querySelector('.rankings-search input');
    const searchButton = document.querySelector('.rankings-search button');
    
    // Sample rankings data (would be fetched from server in production)
    const rankingsData = [
        { id: 1, name: 'Viswanathan Anand', rating: 2756, category: 'open', district: 'Chennai', change: 12, rank: 1 },
        { id: 2, name: 'Koneru Humpy', rating: 2586, category: 'women', district: 'Vijayawada', change: 5, rank: 2 },
        { id: 3, name: 'Pentala Harikrishna', rating: 2732, category: 'open', district: 'Guntur', change: -3, rank: 3 },
        { id: 4, name: 'Dronavalli Harika', rating: 2515, category: 'women', district: 'Hyderabad', change: 7, rank: 4 },
        { id: 5, name: 'Vidit Gujrathi', rating: 2726, category: 'open', district: 'Nashik', change: 9, rank: 5 },
        { id: 6, name: 'Nihal Sarin', rating: 2620, category: 'junior', district: 'Thrissur', change: 15, rank: 6 },
        { id: 7, name: 'R Praggnanandhaa', rating: 2608, category: 'junior', district: 'Chennai', change: 22, rank: 7 },
        { id: 8, name: 'Tania Sachdev', rating: 2392, category: 'women', district: 'Delhi', change: -2, rank: 8 },
        { id: 9, name: 'Aravindh Chithambaram', rating: 2614, category: 'open', district: 'Chennai', change: 4, rank: 9 },
        { id: 10, name: 'D Gukesh', rating: 2578, category: 'junior', district: 'Chennai', change: 18, rank: 10 }
    ];
    
    // Filter by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            filterRankings(category, searchInput.value);
        });
    });
    
    // Search functionality
    searchButton.addEventListener('click', () => {
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        filterRankings(activeCategory, searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
            filterRankings(activeCategory, searchInput.value);
        }
    });
    
    // Initial load
    filterRankings('all', '');
    
    function filterRankings(category, searchTerm) {
        let filteredData = rankingsData;
        
        // Filter by category
        if (category !== 'all') {
            filteredData = filteredData.filter(player => player.category === category);
        }
        
        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredData = filteredData.filter(player => 
                player.name.toLowerCase().includes(term) || 
                player.district.toLowerCase().includes(term)
            );
        }
        
        // Update table
        updateRankingsTable(filteredData);
    }
    
    function updateRankingsTable(data) {
        const tableBody = document.querySelector('.rankings-table tbody');
        
        // Clear table
        tableBody.innerHTML = '';
        
        if (data.length === 0) {
            // No results
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="6" style="text-align: center;">No players found matching your criteria</td>`;
            tableBody.appendChild(row);
            return;
        }
        
        // Add rows
        data.forEach(player => {
            const row = document.createElement('tr');
            
            // Format change indicator
            let changeHTML = '';
            if (player.change > 0) {
                changeHTML = `<span class="positive">+${player.change} ↑</span>`;
            } else if (player.change < 0) {
                changeHTML = `<span class="negative">${player.change} ↓</span>`;
            } else {
                changeHTML = `<span>0</span>`;
            }
            
            row.innerHTML = `
                <td>${player.rank}</td>
                <td>
                    <div class="player-info">
                        <div class="player-avatar">
                            <img src="../images/players/player${player.id}.jpg" alt="${player.name}" onerror="this.src='../images/player-placeholder.svg'">
                        </div>
                        <div class="player-name">
                            <a href="players.html?id=${player.id}">${player.name}</a>
                        </div>
                    </div>
                </td>
                <td>${player.rating}</td>
                <td>${player.district}</td>
                <td>${changeHTML}</td>
                <td>
                    <a href="players.html?id=${player.id}" class="btn-view">View Profile</a>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }
}

// News filters functionality
function initNewsFilters() {
    const categorySelect = document.getElementById('news-category');
    const dateSelect = document.getElementById('news-date');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    // Sample news data (would be fetched from server in production)
    const newsData = [
        { 
            id: 1, 
            title: 'Haryana Chess Association Hosts National Championship', 
            excerpt: 'The Haryana Chess Association successfully hosted the National Chess Championship with over 500 participants from across the country.', 
            date: '2023-10-15', 
            category: 'tournaments',
            featured: true
        },
        { 
            id: 2, 
            title: 'Young Haryana Player Wins International Title', 
            excerpt: 'A 14-year-old chess prodigy from Haryana has secured an International Master norm at the Asian Youth Championship.', 
            date: '2023-09-28', 
            category: 'achievements',
            featured: false
        },
        { 
            id: 3, 
            title: 'Chess in Schools Program Expands to 50 New Schools', 
            excerpt: 'The HCA\'s Chess in Schools initiative has expanded to 50 additional schools across Haryana, reaching over 10,000 students.', 
            date: '2023-09-10', 
            category: 'education',
            featured: false
        },
        { 
            id: 4, 
            title: 'Haryana to Host International Chess Tournament in December', 
            excerpt: 'The state is preparing to host its first FIDE-rated international chess tournament with participants from over 15 countries.', 
            date: '2023-08-22', 
            category: 'tournaments',
            featured: false
        },
        { 
            id: 5, 
            title: 'New Rating System Implemented for State-Level Tournaments', 
            excerpt: 'HCA announces a new rating system for state-level tournaments to better track player progress and development.', 
            date: '2023-08-05', 
            category: 'announcements',
            featured: false
        },
        { 
            id: 6, 
            title: 'Chess Coaching Camps Scheduled for Summer Vacation', 
            excerpt: 'HCA will conduct chess coaching camps during summer vacation in various districts to nurture young talent.', 
            date: '2023-07-18', 
            category: 'training',
            featured: false
        }
    ];
    
    // Filter functionality
    function applyFilters() {
        const category = categorySelect.value;
        const dateFilter = dateSelect.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        let filteredNews = newsData;
        
        // Filter by category
        if (category !== 'all') {
            filteredNews = filteredNews.filter(news => news.category === category);
        }
        
        // Filter by date
        if (dateFilter !== 'all') {
            const now = new Date();
            const pastDate = new Date();
            
            switch(dateFilter) {
                case 'week':
                    pastDate.setDate(now.getDate() - 7);
                    break;
                case 'month':
                    pastDate.setMonth(now.getMonth() - 1);
                    break;
                case 'year':
                    pastDate.setFullYear(now.getFullYear() - 1);
                    break;
            }
            
            filteredNews = filteredNews.filter(news => {
                const newsDate = new Date(news.date);
                return newsDate >= pastDate;
            });
        }
        
        // Filter by search term
        if (searchTerm) {
            filteredNews = filteredNews.filter(news => 
                news.title.toLowerCase().includes(searchTerm) || 
                news.excerpt.toLowerCase().includes(searchTerm)
            );
        }
        
        // Update news display
        updateNewsDisplay(filteredNews);
    }
    
    // Event listeners
    categorySelect.addEventListener('change', applyFilters);
    dateSelect.addEventListener('change', applyFilters);
    searchButton.addEventListener('click', applyFilters);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
    
    // Update news display
    function updateNewsDisplay(newsItems) {
        // Update featured news
        const featuredNews = newsItems.find(news => news.featured) || newsItems[0];
        const featuredNewsContainer = document.querySelector('.featured-news');
        
        if (featuredNews && featuredNewsContainer) {
            featuredNewsContainer.innerHTML = `
                <div class="featured-news-card">
                    <div class="news-image">
                        <div class="image-placeholder">
                            <i class="fas fa-newspaper"></i>
                            <span>News Image</span>
                        </div>
                        <div class="news-category">${featuredNews.category}</div>
                    </div>
                    <div class="news-content">
                        <div class="news-date">${formatDate(featuredNews.date)}</div>
                        <h3>${featuredNews.title}</h3>
                        <p>${featuredNews.excerpt}</p>
                        <a href="news-detail.html?id=${featuredNews.id}" class="read-more">Read Full Article <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
        }
        
        // Update news grid
        const newsGrid = document.querySelector('.news-grid');
        
        if (newsGrid) {
            // Filter out featured news from grid
            const gridNews = featuredNews ? 
                newsItems.filter(news => news.id !== featuredNews.id) : 
                newsItems;
            
            if (gridNews.length === 0) {
                newsGrid.innerHTML = `<div class="no-results">No news articles found matching your criteria</div>`;
                return;
            }
            
            newsGrid.innerHTML = '';
            
            gridNews.forEach(news => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                newsCard.innerHTML = `
                    <div class="news-image">
                        <div class="image-placeholder">
                            <i class="fas fa-newspaper"></i>
                            <span>News Image</span>
                        </div>
                        <div class="news-category">${news.category}</div>
                    </div>
                    <div class="news-content">
                        <div class="news-date">${formatDate(news.date)}</div>
                        <h3>${news.title}</h3>
                        <p>${news.excerpt}</p>
                        <a href="news-detail.html?id=${news.id}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                newsGrid.appendChild(newsCard);
            });
        }
    }
    
    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // Initial load
    applyFilters();
}

// Pagination functionality
function initPagination() {
    const paginationContainer = document.querySelector('.pagination');
    
    if (!paginationContainer) return;
    
    // Sample pagination (would be dynamic in production)
    paginationContainer.innerHTML = `
        <button class="pagination-btn" disabled><i class="fas fa-chevron-left"></i></button>
        <button class="pagination-btn active">1</button>
        <button class="pagination-btn">2</button>
        <button class="pagination-btn">3</button>
        <div class="pagination-ellipsis">...</div>
        <button class="pagination-btn">10</button>
        <button class="pagination-btn"><i class="fas fa-chevron-right"></i></button>
    `;
    
    // Add click event to pagination buttons
    const paginationButtons = paginationContainer.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                if (!button.innerHTML.includes('fa-chevron')) {
                    button.classList.add('active');
                }
                
                // In a real application, this would fetch the corresponding page of data
                // For this demo, we'll just simulate a page change
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    });
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[name="email"]');
        const consentCheckbox = this.querySelector('input[name="consent"]');
        
        // Simple validation
        if (!nameInput.value.trim()) {
            alert('Please enter your name');
            nameInput.focus();
            return;
        }
        
        if (!emailInput.value.trim()) {
            alert('Please enter your email');
            emailInput.focus();
            return;
        }
        
        if (!consentCheckbox.checked) {
            alert('Please agree to the privacy policy');
            return;
        }
        
        // In a real application, this would submit the form data to a server
        // For this demo, we'll just show a success message
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = 'Subscribing...';
        
        setTimeout(() => {
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }, 1500);
    });
}