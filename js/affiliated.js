document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initPage();
});

function initPage() {
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Initialize district association filters if they exist
    if (document.querySelector('.district-filter')) {
        initDistrictFilters();
    }
    
    // Initialize club filters if they exist
    if (document.querySelector('.club-filter')) {
        initClubFilters();
    }
    
    // Add animation for process steps
    animateProcessSteps();
}

function addSmoothScrolling() {
    // Get all links with hash
    const links = document.querySelectorAll('a[href*="#"]');
    
    // Add click event to each link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the hash is not empty and points to an existing element
            const hash = this.hash;
            if (hash !== '' && document.querySelector(hash)) {
                e.preventDefault();
                
                // Get the target element
                const target = document.querySelector(hash);
                
                // Calculate the distance to scroll
                const headerOffset = 100; // Adjust based on your fixed header height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initDistrictFilters() {
    const filterButtons = document.querySelectorAll('.district-filter button');
    const searchInput = document.querySelector('.district-search input');
    const associationCards = document.querySelectorAll('.association-card');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter associations
            filterAssociations(filter, searchInput.value.toLowerCase());
        });
    });
    
    // Add input event to search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Get active filter
            const activeFilter = document.querySelector('.district-filter button.active');
            const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            
            // Filter associations
            filterAssociations(filter, this.value.toLowerCase());
        });
    }
    
    // Function to filter associations
    function filterAssociations(filter, searchTerm) {
        associationCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('h3').textContent.toLowerCase();
            const location = card.querySelector('.association-info p:first-child').textContent.toLowerCase();
            
            // Check if card matches filter and search term
            const matchesFilter = filter === 'all' || category === filter;
            const matchesSearch = title.includes(searchTerm) || location.includes(searchTerm);
            
            // Show or hide card
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

function initClubFilters() {
    const filterButtons = document.querySelectorAll('.club-filter button');
    const searchInput = document.querySelector('.club-search input');
    const clubCards = document.querySelectorAll('.club-card');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter clubs
            filterClubs(filter, searchInput.value.toLowerCase());
        });
    });
    
    // Add input event to search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // Get active filter
            const activeFilter = document.querySelector('.club-filter button.active');
            const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            
            // Filter clubs
            filterClubs(filter, this.value.toLowerCase());
        });
    }
    
    // Function to filter clubs
    function filterClubs(filter, searchTerm) {
        clubCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('h3').textContent.toLowerCase();
            const location = card.querySelector('.club-location').textContent.toLowerCase();
            
            // Check if card matches filter and search term
            const matchesFilter = filter === 'all' || category === filter;
            const matchesSearch = title.includes(searchTerm) || location.includes(searchTerm);
            
            // Show or hide card
            if (matchesFilter && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

function animateProcessSteps() {
    // Get all process steps
    const steps = document.querySelectorAll('.step');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each step
    steps.forEach(step => {
        observer.observe(step);
    });
}

// Add CSS animation for steps
document.head.insertAdjacentHTML('beforeend', `
<style>
.step {
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.step.animated {
    opacity: 1;
    transform: translateX(0);
}

.step:nth-child(1) { transition-delay: 0.1s; }
.step:nth-child(2) { transition-delay: 0.2s; }
.step:nth-child(3) { transition-delay: 0.3s; }
.step:nth-child(4) { transition-delay: 0.4s; }
.step:nth-child(5) { transition-delay: 0.5s; }
</style>
`);