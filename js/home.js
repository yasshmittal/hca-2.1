/**
 * Home Page Specific JavaScript for Haryana Chess Association Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize home page specific components
    initHeroAnimation();
    initAnnouncementsMarquee();
    initCertificateSearch();
    initStatsCounter();
});

/**
 * Hero Section Animation
 */
function initHeroAnimation() {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (!heroText || !heroImage) return;
    
    // Add animation classes
    heroText.classList.add('animate-on-scroll');
    heroImage.classList.add('animate-on-scroll');
    
    // Trigger animation immediately on home page
    setTimeout(() => {
        heroText.classList.add('animated');
        heroImage.classList.add('animated');
    }, 300);
}

/**
 * Announcements Marquee
 */
function initAnnouncementsMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    
    if (!marqueeContent) return;
    
    // Clone the content for seamless looping
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentNode.appendChild(clone);
    
    // Adjust animation based on content width
    const contentWidth = marqueeContent.offsetWidth;
    const animationDuration = contentWidth / 50; // Adjust speed as needed
    
    // Set animation duration dynamically
    document.documentElement.style.setProperty('--marquee-duration', `${animationDuration}s`);
    
    // Pause animation on hover
    const marqueeContainer = document.querySelector('.marquee-container');
    
    if (marqueeContainer) {
        marqueeContainer.addEventListener('mouseenter', function() {
            marqueeContent.style.animationPlayState = 'paused';
            clone.style.animationPlayState = 'paused';
        });
        
        marqueeContainer.addEventListener('mouseleave', function() {
            marqueeContent.style.animationPlayState = 'running';
            clone.style.animationPlayState = 'running';
        });
    }
}

/**
 * Certificate Search Functionality
 */
function initCertificateSearch() {
    const searchForm = document.querySelector('.certificate-search-form');
    const searchInput = document.querySelector('.certificate-input');
    
    if (!searchForm || !searchInput) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchValue = searchInput.value.trim();
        
        if (!searchValue) {
            // Show error message
            showMessage('Please enter a name or HCA ID', 'error');
            return;
        }
        
        // Simulate search (in a real implementation, this would be an API call)
        simulateCertificateSearch(searchValue);
    });
    
    // Submit on button click
    const searchButton = searchForm.querySelector('button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            searchForm.dispatchEvent(new Event('submit'));
        });
    }
}

/**
 * Simulate Certificate Search (for demonstration)
 */
function simulateCertificateSearch(searchValue) {
    // Show loading state
    const searchButton = document.querySelector('.certificate-search-form button');
    const originalText = searchButton.textContent;
    
    searchButton.textContent = 'Searching...';
    searchButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button state
        searchButton.textContent = originalText;
        searchButton.disabled = false;
        
        // For demonstration, show a message based on the search value
        if (searchValue.toLowerCase().includes('test')) {
            showMessage('Certificate found! Downloading...', 'success');
            
            // Simulate download delay
            setTimeout(() => {
                // In a real implementation, this would trigger a file download
                alert('In a real implementation, the certificate would be downloaded now.');
            }, 1500);
        } else {
            showMessage('No certificates found for the provided information.', 'error');
        }
    }, 2000);
}

/**
 * Show Message
 */
function showMessage(message, type = 'info') {
    // Check if a message container already exists
    let messageContainer = document.querySelector('.message-container');
    
    if (!messageContainer) {
        // Create message container
        messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');
        
        // Add to certificate search section
        const certificateSection = document.querySelector('.certificate-search-content');
        
        if (certificateSection) {
            certificateSection.appendChild(messageContainer);
        } else {
            document.body.appendChild(messageContainer);
        }
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `message-${type}`);
    messageElement.textContent = message;
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('message-close');
    closeButton.innerHTML = '&times;';
    messageElement.appendChild(closeButton);
    
    // Add to container
    messageContainer.appendChild(messageElement);
    
    // Add animation
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    const timeout = setTimeout(() => {
        removeMessage(messageElement);
    }, 5000);
    
    // Close button functionality
    closeButton.addEventListener('click', () => {
        clearTimeout(timeout);
        removeMessage(messageElement);
    });
}

/**
 * Remove Message
 */
function removeMessage(messageElement) {
    messageElement.classList.remove('show');
    
    // Wait for animation to complete before removing
    setTimeout(() => {
        messageElement.remove();
        
        // Remove container if empty
        const messageContainer = document.querySelector('.message-container');
        
        if (messageContainer && !messageContainer.children.length) {
            messageContainer.remove();
        }
    }, 300);
}

/**
 * Stats Counter Animation
 */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statNumbers.length) return;
    
    // Intersection Observer to trigger counter when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.textContent.replace(/\D/g, ''), 10);
                
                animateCounter(target, targetNumber);
                
                // Unobserve after triggering
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each stat number
    statNumbers.forEach(stat => {
        // Store the target number and reset display
        const targetNumber = stat.textContent;
        stat.textContent = '0';
        
        observer.observe(stat);
    });
}

/**
 * Animate Counter
 */
function animateCounter(element, targetNumber) {
    let currentNumber = 0;
    const duration = 2000; // 2 seconds
    const interval = 16; // ~60fps
    const steps = duration / interval;
    const increment = targetNumber / steps;
    
    const counter = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= targetNumber) {
            element.textContent = targetNumber.toLocaleString() + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentNumber).toLocaleString() + '+';
        }
    }, interval);
}