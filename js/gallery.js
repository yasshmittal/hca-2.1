/**
 * Gallery JavaScript for Haryana Chess Association Website
 * Handles gallery filtering, view toggling, photo loading, and lightbox functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery functionality
    initGallery();
});

/**
 * Initialize all gallery functionality
 */
function initGallery() {
    // Initialize filters
    initFilters();
    
    // Initialize view toggles
    initViewToggles();
    
    // Generate photo placeholders
    generatePhotoPlaceholders();
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize load more button
    initLoadMore();
}

/**
 * Initialize gallery filters
 */
function initFilters() {
    const yearFilter = document.getElementById('year-filter');
    const eventFilter = document.getElementById('event-filter');
    const locationFilter = document.getElementById('location-filter');
    
    // Combine all filters into an array for easier handling
    const filters = [yearFilter, eventFilter, locationFilter];
    
    // Add event listeners to all filters
    filters.forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
}

/**
 * Apply filters to albums and photos
 */
function applyFilters() {
    const yearFilter = document.getElementById('year-filter').value;
    const eventFilter = document.getElementById('event-filter').value;
    const locationFilter = document.getElementById('location-filter').value;
    
    // Filter albums
    filterItems('.album-card', yearFilter, eventFilter, locationFilter);
    
    // Filter photos
    filterItems('.photo-item', yearFilter, eventFilter, locationFilter);
    
    // Show message if no results
    checkNoResults('.albums-grid', '.album-card');
    checkNoResults('#photos-container', '.photo-item');
}

/**
 * Filter items based on selected filters
 * @param {string} itemSelector - CSS selector for items to filter
 * @param {string} yearFilter - Selected year filter value
 * @param {string} eventFilter - Selected event filter value
 * @param {string} locationFilter - Selected location filter value
 */
function filterItems(itemSelector, yearFilter, eventFilter, locationFilter) {
    const items = document.querySelectorAll(itemSelector);
    
    items.forEach(item => {
        const yearMatch = yearFilter === 'all' || item.dataset.year === yearFilter;
        const eventMatch = eventFilter === 'all' || item.dataset.event === eventFilter;
        const locationMatch = locationFilter === 'all' || item.dataset.location === locationFilter;
        
        // Show item only if it matches all selected filters
        if (yearMatch && eventMatch && locationMatch) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Check if there are no visible results after filtering and show a message
 * @param {string} containerSelector - CSS selector for the container
 * @param {string} itemSelector - CSS selector for items within the container
 */
function checkNoResults(containerSelector, itemSelector) {
    const container = document.querySelector(containerSelector);
    const visibleItems = container.querySelectorAll(`${itemSelector}:not([style*="display: none"])`);
    
    // Remove any existing no-results message
    const existingMessage = container.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // If no visible items, show a message
    if (visibleItems.length === 0) {
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <i class="fas fa-search"></i>
            <p>No items match your filter criteria</p>
            <button class="btn-reset-filters">Reset Filters</button>
        `;
        
        // Style the message
        message.style.textAlign = 'center';
        message.style.padding = '40px 20px';
        message.style.color = 'var(--text-muted)';
        
        // Add event listener to reset button
        const resetButton = message.querySelector('.btn-reset-filters');
        resetButton.addEventListener('click', resetFilters);
        
        // Style the reset button
        resetButton.style.backgroundColor = 'var(--accent-gold)';
        resetButton.style.color = 'var(--bg-dark)';
        resetButton.style.border = 'none';
        resetButton.style.borderRadius = '4px';
        resetButton.style.padding = '8px 15px';
        resetButton.style.marginTop = '15px';
        resetButton.style.cursor = 'pointer';
        
        container.appendChild(message);
    }
}

/**
 * Reset all filters to 'all'
 */
function resetFilters() {
    const filters = document.querySelectorAll('.filter-select');
    
    filters.forEach(filter => {
        filter.value = 'all';
    });
    
    // Apply the reset filters
    applyFilters();
}

/**
 * Initialize view toggles (grid/masonry)
 */
function initViewToggles() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const photosContainer = document.getElementById('photos-container');
    
    if (viewButtons.length && photosContainer) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the view type from data attribute
                const viewType = this.dataset.view;
                
                // Apply the view type to the container
                if (viewType === 'grid') {
                    photosContainer.classList.remove('masonry');
                } else if (viewType === 'masonry') {
                    photosContainer.classList.add('masonry');
                }
            });
        });
    }
}

/**
 * Generate photo placeholders for the gallery
 */
function generatePhotoPlaceholders() {
    const photosContainer = document.getElementById('photos-container');
    
    if (photosContainer) {
        // Clear existing content except the first placeholder
        const firstPlaceholder = photosContainer.querySelector('.photo-item');
        photosContainer.innerHTML = '';
        
        // Add the first placeholder back if it exists
        if (firstPlaceholder) {
            photosContainer.appendChild(firstPlaceholder);
        }
        
        // Generate additional placeholders
        const locations = ['panchkula', 'gurugram', 'hisar', 'faridabad', 'rohtak'];
        const events = ['tournament', 'training', 'ceremony', 'other'];
        const years = ['2023', '2022', '2021', '2020'];
        const pieces = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
        
        // Generate 20 random photo placeholders
        for (let i = 0; i < 20; i++) {
            const location = locations[Math.floor(Math.random() * locations.length)];
            const event = events[Math.floor(Math.random() * events.length)];
            const year = years[Math.floor(Math.random() * years.length)];
            const piece = pieces[Math.floor(Math.random() * pieces.length)];
            
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.dataset.year = year;
            photoItem.dataset.event = event;
            photoItem.dataset.location = location;
            
            photoItem.innerHTML = `
                <div class="photo-placeholder">
                    <i class="fas fa-chess-${piece}"></i>
                </div>
                <div class="photo-overlay">
                    <div class="photo-actions">
                        <button class="photo-action" aria-label="View full size">
                            <i class="fas fa-expand"></i>
                        </button>
                        <button class="photo-action" aria-label="Download photo">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                    <div class="photo-info">
                        <h4>Chess ${event.charAt(0).toUpperCase() + event.slice(1)} in ${location.charAt(0).toUpperCase() + location.slice(1)}</h4>
                        <p>${getRandomDate(year)}</p>
                    </div>
                </div>
            `;
            
            photosContainer.appendChild(photoItem);
        }
        
        // Add click event to all photo items for lightbox
        const photoItems = document.querySelectorAll('.photo-item');
        photoItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Don't open lightbox if clicking on action buttons
                if (e.target.closest('.photo-action')) {
                    return;
                }
                
                openLightbox(this);
            });
            
            // Add download button functionality
            const downloadBtn = item.querySelector('.photo-action:nth-child(2)');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent lightbox from opening
                    alert('Download functionality will be implemented in the production version.');
                });
            }
        });
    }
}

/**
 * Generate a random date within a given year
 * @param {string} year - The year for the random date
 * @returns {string} - Formatted date string
 */
function getRandomDate(year) {
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Avoid invalid dates
    
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/**
 * Initialize lightbox functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    // Close lightbox when clicking the close button
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Navigate to previous/next image
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
}

/**
 * Open the lightbox with the selected photo
 * @param {HTMLElement} photoItem - The photo item element to display in the lightbox
 */
function openLightbox(photoItem) {
    const lightbox = document.getElementById('gallery-lightbox');
    const imageContainer = lightbox.querySelector('.lightbox-image-container');
    const captionTitle = lightbox.querySelector('.lightbox-caption h3');
    const captionText = lightbox.querySelector('.lightbox-caption p');
    
    // Get photo info
    const photoInfo = photoItem.querySelector('.photo-info');
    const title = photoInfo.querySelector('h4').textContent;
    const date = photoInfo.querySelector('p').textContent;
    
    // Get placeholder icon
    const placeholderIcon = photoItem.querySelector('.photo-placeholder i').cloneNode(true);
    const lightboxPlaceholder = lightbox.querySelector('.lightbox-placeholder');
    lightboxPlaceholder.innerHTML = '';
    lightboxPlaceholder.appendChild(placeholderIcon);
    
    // Set caption
    captionTitle.textContent = title;
    captionText.textContent = date;
    
    // Store current photo index for navigation
    const allPhotos = Array.from(document.querySelectorAll('.photo-item'));
    const currentIndex = allPhotos.indexOf(photoItem);
    lightbox.dataset.currentIndex = currentIndex;
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

/**
 * Close the lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Show the previous image in the lightbox
 */
function showPrevImage() {
    navigateLightbox(-1);
}

/**
 * Show the next image in the lightbox
 */
function showNextImage() {
    navigateLightbox(1);
}

/**
 * Navigate to the previous or next image in the lightbox
 * @param {number} direction - Direction to navigate (-1 for previous, 1 for next)
 */
function navigateLightbox(direction) {
    const lightbox = document.getElementById('gallery-lightbox');
    const currentIndex = parseInt(lightbox.dataset.currentIndex);
    const allPhotos = Array.from(document.querySelectorAll('.photo-item'));
    
    // Calculate new index with wrapping
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = allPhotos.length - 1;
    if (newIndex >= allPhotos.length) newIndex = 0;
    
    // Open lightbox with the new photo
    openLightbox(allPhotos[newIndex]);
}

/**
 * Initialize load more button functionality
 */
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner"></i> Loading...';
            
            // Simulate loading delay
            setTimeout(() => {
                // Generate more photos
                generateMorePhotos();
                
                // Remove loading state
                this.classList.remove('loading');
                this.innerHTML = '<i class="fas fa-spinner"></i> Load More Photos';
            }, 1000);
        });
    }
}

/**
 * Generate more photos when load more is clicked
 */
function generateMorePhotos() {
    const photosContainer = document.getElementById('photos-container');
    const currentCount = photosContainer.querySelectorAll('.photo-item').length;
    
    // If we already have a lot of photos, hide the load more button
    if (currentCount >= 40) {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        loadMoreBtn.style.display = 'none';
        
        // Show a message that all photos are loaded
        const message = document.createElement('p');
        message.textContent = 'All photos loaded';
        message.style.textAlign = 'center';
        message.style.color = 'var(--text-muted)';
        message.style.marginTop = '20px';
        
        const paginationContainer = document.querySelector('.gallery-pagination');
        paginationContainer.appendChild(message);
        
        return;
    }
    
    // Generate 10 more photos
    const locations = ['panchkula', 'gurugram', 'hisar', 'faridabad', 'rohtak'];
    const events = ['tournament', 'training', 'ceremony', 'other'];
    const years = ['2023', '2022', '2021', '2020'];
    const pieces = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
    
    for (let i = 0; i < 10; i++) {
        const location = locations[Math.floor(Math.random() * locations.length)];
        const event = events[Math.floor(Math.random() * events.length)];
        const year = years[Math.floor(Math.random() * years.length)];
        const piece = pieces[Math.floor(Math.random() * pieces.length)];
        
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.dataset.year = year;
        photoItem.dataset.event = event;
        photoItem.dataset.location = location;
        
        photoItem.innerHTML = `
            <div class="photo-placeholder">
                <i class="fas fa-chess-${piece}"></i>
            </div>
            <div class="photo-overlay">
                <div class="photo-actions">
                    <button class="photo-action" aria-label="View full size">
                        <i class="fas fa-expand"></i>
                    </button>
                    <button class="photo-action" aria-label="Download photo">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
                <div class="photo-info">
                    <h4>Chess ${event.charAt(0).toUpperCase() + event.slice(1)} in ${location.charAt(0).toUpperCase() + location.slice(1)}</h4>
                    <p>${getRandomDate(year)}</p>
                </div>
            </div>
        `;
        
        photosContainer.appendChild(photoItem);
        
        // Add click event for lightbox
        photoItem.addEventListener('click', function(e) {
            // Don't open lightbox if clicking on action buttons
            if (e.target.closest('.photo-action')) {
                return;
            }
            
            openLightbox(this);
        });
        
        // Add download button functionality
        const downloadBtn = photoItem.querySelector('.photo-action:nth-child(2)');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent lightbox from opening
                alert('Download functionality will be implemented in the production version.');
            });
        }
    }
    
    // Apply current filters to new photos
    applyFilters();
}