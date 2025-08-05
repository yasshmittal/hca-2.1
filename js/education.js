document.addEventListener('DOMContentLoaded', function() {
    // Initialize the success stories slider
    initSuccessStoriesSlider();
    
    // Initialize the join program form
    initJoinForm();
    
    // Initialize education filters with correct IDs
    const districtFilter = document.getElementById('district-filter');
    const typeFilter = document.getElementById('type-filter');
    const institutionSearch = document.getElementById('institution-search');
    const searchBtn = document.getElementById('search-btn');
    
    // Add event listeners to the filters if they exist
    if (districtFilter) {
        districtFilter.addEventListener('change', filterInstitutions);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', filterInstitutions);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterInstitutions);
    }
    
    if (institutionSearch) {
        institutionSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterInstitutions();
            }
        });
    }
    
    // Initialize filters on page load
    filterInstitutions();
});

/**
 * Filter institutions based on selected criteria
 */
function filterInstitutions() {
    const districtFilter = document.getElementById('district-filter');
    const typeFilter = document.getElementById('type-filter');
    const searchInput = document.getElementById('institution-search');
    
    if (!districtFilter || !typeFilter || !searchInput) return;
    
    const selectedDistrict = districtFilter.value;
    const selectedType = typeFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    const institutionCards = document.querySelectorAll('.institution-card');
    
    institutionCards.forEach(card => {
        const district = card.getAttribute('data-district');
        const type = card.getAttribute('data-type');
        const institutionName = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.institution-description').textContent.toLowerCase();
        
        // Check if card matches all selected filters
        const matchesDistrict = selectedDistrict === 'all' || district === selectedDistrict;
        const matchesType = selectedType === 'all' || type === selectedType;
        const matchesSearch = !searchTerm || 
                             institutionName.includes(searchTerm) || 
                             description.includes(searchTerm);
        
        // Show or hide based on filter matches
        if (matchesDistrict && matchesType && matchesSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Initialize the join program form
 */
function initJoinForm() {
    const joinForm = document.getElementById('join-form');
    const successMessage = document.getElementById('form-success');
    
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            joinForm.classList.add('loading');
            
            setTimeout(() => {
                joinForm.classList.remove('loading');
                joinForm.style.display = 'none';
                successMessage.style.display = 'block';
            }, 1500);
        });
    }
}

/**
 * Initialize the success stories slider
 */
function initSuccessStoriesSlider() {
    const slider = document.querySelector('.stories-slider');
    const storyCards = document.querySelectorAll('.story-card');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const indicators = document.querySelector('.story-indicators');
    
    if (!slider || storyCards.length === 0) return;
    
    let currentIndex = 0;
    let autoplayInterval;
    
    // Create indicators
    for (let i = 0; i < storyCards.length; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            goToSlide(i);
        });
        
        indicators.appendChild(indicator);
    }
    
    // Show only the current slide
    function updateSlides() {
        storyCards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'block' : 'none';
        });
        
        // Update indicators
        const allIndicators = document.querySelectorAll('.indicator');
        allIndicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlides();
        resetAutoplay();
    }
    
    // Go to next slide
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % storyCards.length;
        updateSlides();
    }
    
    // Go to previous slide
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + storyCards.length) % storyCards.length;
        updateSlides();
    }
    
    // Reset autoplay
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(goToNextSlide, 5000);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToPrevSlide();
            resetAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToNextSlide();
            resetAutoplay();
        });
    }
    
    // Pause autoplay on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startAutoplay();
    });
    
    // Initialize
    updateSlides();
    startAutoplay();
}