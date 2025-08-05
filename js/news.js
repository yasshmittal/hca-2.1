/**
 * News Page JavaScript
 * Functionality for the Haryana Chess Association news page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer
    loadHeaderFooter();
    
    // Initialize news filters
    initFilters();
    
    // Initialize news cards click events
    initNewsCards();
    
    // Initialize newsletter form
    initNewsletterForm();
});

/**
 * Load header and footer content
 */
function loadHeaderFooter() {
    // This function is defined in common.js
    if (typeof loadCommonElements === 'function') {
        loadCommonElements();
    }
}

/**
 * Initialize news filters functionality
 */
function initFilters() {
    const searchInput = document.getElementById('news-search');
    const categoryFilter = document.getElementById('category-filter');
    const yearFilter = document.getElementById('year-filter');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const searchBtn = document.getElementById('search-btn');
    
    // Apply filters when button is clicked
    applyFiltersBtn.addEventListener('click', function() {
        applyFilters();
    });
    
    // Apply filters when search button is clicked
    searchBtn.addEventListener('click', function() {
        applyFilters();
    });
    
    // Apply filters when Enter key is pressed in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
    
    // Populate year filter with dynamic years
    populateYearFilter();
}

/**
 * Populate year filter with dynamic years
 */
function populateYearFilter() {
    const yearFilter = document.getElementById('year-filter');
    const currentYear = new Date().getFullYear();
    
    // Clear existing options except 'All Years'
    while (yearFilter.options.length > 1) {
        yearFilter.remove(1);
    }
    
    // Add last 5 years
    for (let i = 0; i < 5; i++) {
        const year = currentYear - i;
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    }
}

/**
 * Apply filters to news grid
 */
function applyFilters() {
    const searchTerm = document.getElementById('news-search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const year = document.getElementById('year-filter').value;
    
    // Get all news cards
    const newsCards = document.querySelectorAll('#news-grid .news-card');
    let visibleCount = 0;
    
    // Filter news cards
    newsCards.forEach(card => {
        const cardCategory = card.querySelector('.news-category').textContent.toLowerCase();
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        const cardContent = card.querySelector('p').textContent.toLowerCase();
        const cardDate = card.querySelector('.news-date').textContent;
        const cardYear = cardDate.split(',')[1] ? cardDate.split(',')[1].trim() : '';
        
        // Check if card matches all filters
        const matchesSearch = searchTerm === '' || 
                             cardTitle.includes(searchTerm) || 
                             cardContent.includes(searchTerm);
        const matchesCategory = category === 'all' || 
                               cardCategory.toLowerCase() === category.toLowerCase();
        const matchesYear = year === 'all' || cardYear === year;
        
        // Show or hide card based on filter matches
        if (matchesSearch && matchesCategory && matchesYear) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show or hide no results message
    const noResultsElement = document.getElementById('no-news-results');
    if (visibleCount === 0) {
        noResultsElement.style.display = 'block';
    } else {
        noResultsElement.style.display = 'none';
    }
    
    // Reset pagination to first page
    updatePagination(1);
}

/**
 * Update pagination based on current page
 * @param {number} currentPage - The current page number
 */
function updatePagination(currentPage) {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    // Remove active class from all buttons
    paginationButtons.forEach(button => {
        if (button.textContent && !isNaN(button.textContent)) {
            button.classList.remove('active');
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            }
        }
    });
    
    // Enable/disable previous and next buttons
    const prevButton = document.querySelector('.pagination-btn:first-child');
    const nextButton = document.querySelector('.pagination-btn:last-child');
    
    prevButton.disabled = currentPage === 1;
    // Assuming 10 is the max page number for this example
    nextButton.disabled = currentPage === 10;
}

/**
 * Initialize news cards click events
 */
function initNewsCards() {
    // Get all news cards including featured ones
    const allNewsCards = document.querySelectorAll('.news-card');
    const modal = document.getElementById('news-article-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Add click event to each news card
    allNewsCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If clicking on the read more link, prevent default behavior
            if (e.target.classList.contains('read-more') || e.target.parentElement.classList.contains('read-more')) {
                e.preventDefault();
            }
            
            // Open modal with article details
            openArticleModal(card);
        });
    });
    
    // Close modal when clicking on close button
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Initialize related articles
    initRelatedArticles();
}

/**
 * Open article modal with details from the clicked card
 * @param {HTMLElement} card - The news card element that was clicked
 */
function openArticleModal(card) {
    const modal = document.getElementById('news-article-modal');
    const modalCategory = document.getElementById('modal-article-category');
    const modalTitle = document.getElementById('modal-article-title');
    const modalDate = document.getElementById('modal-article-date');
    const modalAuthor = document.getElementById('modal-article-author');
    
    // Get data from the clicked card
    const category = card.querySelector('.news-category').textContent;
    const title = card.querySelector('h3').textContent;
    const date = card.querySelector('.news-date').textContent;
    
    // Set modal content
    modalCategory.textContent = category;
    modalTitle.textContent = title;
    modalDate.textContent = date;
    
    // For this demo, we'll use the same content for all articles
    // In a real implementation, you would fetch the full article content from a database
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
}

/**
 * Initialize related articles click events
 */
function initRelatedArticles() {
    const relatedArticles = document.querySelectorAll('.related-article');
    
    relatedArticles.forEach(article => {
        article.addEventListener('click', function() {
            // In a real implementation, you would open the related article
            // For this demo, we'll just close the current modal and open a new one
            const modal = document.getElementById('news-article-modal');
            modal.style.display = 'none';
            
            // Create a temporary news card with the related article data
            const tempCard = document.createElement('div');
            tempCard.className = 'news-card';
            
            const category = document.createElement('div');
            category.className = 'news-category';
            category.textContent = 'Related';
            
            const title = document.createElement('h3');
            title.textContent = article.querySelector('h4').textContent;
            
            const date = document.createElement('div');
            date.className = 'news-date';
            date.textContent = article.querySelector('.related-article-date').textContent;
            
            tempCard.appendChild(category);
            tempCard.appendChild(title);
            tempCard.appendChild(date);
            
            // Open modal with the temporary card
            setTimeout(() => {
                openArticleModal(tempCard);
            }, 100);
        });
    });
}

/**
 * Initialize newsletter form submission
 */
function initNewsletterForm() {
    const subscribeForm = document.getElementById('subscribe-form');
    const subscriptionSuccess = document.querySelector('.subscription-success');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('subscriber-name').value;
            const email = document.getElementById('subscriber-email').value;
            
            // Validate form data
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just show the success message
            
            // Hide form and show success message
            subscribeForm.style.display = 'none';
            subscriptionSuccess.style.display = 'block';
            
            // Reset form for future use
            subscribeForm.reset();
        });
    }
}

/**
 * Generate dynamic news cards (for future implementation)
 */
function generateNewsCards() {
    // This function would fetch news data from a server and generate news cards dynamically
    // For this demo, we're using static HTML for the news cards
    
    // Example implementation:
    /*
    const newsGrid = document.getElementById('news-grid');
    
    // Clear existing news cards
    newsGrid.innerHTML = '';
    
    // Fetch news data from server
    fetch('/api/news')
        .then(response => response.json())
        .then(newsData => {
            // Generate news cards for each news item
            newsData.forEach(item => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';
                
                // Create news card content
                newsCard.innerHTML = `
                    <div class="news-image">
                        <div class="image-placeholder">
                            <i class="fas fa-${item.icon || 'newspaper'}"></i>
                            <span>News Image</span>
                        </div>
                        <div class="news-category">${item.category}</div>
                    </div>
                    <div class="news-content">
                        <div class="news-date">${item.date}</div>
                        <h3>${item.title}</h3>
                        <p>${item.summary}</p>
                        <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                
                // Add click event to the news card
                newsCard.addEventListener('click', function(e) {
                    if (e.target.classList.contains('read-more') || e.target.parentElement.classList.contains('read-more')) {
                        e.preventDefault();
                    }
                    openArticleModal(newsCard);
                });
                
                // Add news card to the grid
                newsGrid.appendChild(newsCard);
            });
        })
        .catch(error => {
            console.error('Error fetching news data:', error);
        });
    */
}