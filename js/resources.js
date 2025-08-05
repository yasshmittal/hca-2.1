/**
 * Resources JavaScript for Haryana Chess Association Website
 * Handles tab functionality for learning materials and book slider
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize learning tabs
    initLearningTabs();
    
    // Initialize book slider (placeholder for future implementation)
    initBookSlider();
});

/**
 * Initialize tab functionality for learning materials
 */
function initLearningTabs() {
    const tabButtons = document.querySelectorAll('.learning-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.learning-content .tab-content');
    
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
    
    // Ensure first tab is active by default
    if (!document.querySelector('.learning-tabs .tab-btn.active')) {
        tabButtons[0].click();
    }
}

/**
 * Initialize book slider functionality
 * This is a placeholder for future implementation of a proper slider
 */
function initBookSlider() {
    const booksSlider = document.querySelector('.books-slider');
    if (!booksSlider) return;
    
    // Add hover effect to book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation or effect
            const icon = this.querySelector('.book-placeholder i');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset animation or effect
            const icon = this.querySelector('.book-placeholder i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // In a future implementation, this could be replaced with a proper carousel/slider
    // For now, we'll just add some basic interactivity
    
    // Make book cards focusable for accessibility
    bookCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Trigger click or hover effect
                const icon = this.querySelector('.book-placeholder i');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        icon.style.transform = '';
                    }, 300);
                }
            }
        });
    });
}

/**
 * Create a book details modal (placeholder for future implementation)
 * This would show more details about a book when clicked
 */
function showBookDetails(bookTitle) {
    // This is a placeholder function for future implementation
    console.log(`Showing details for book: ${bookTitle}`);
    
    // In a real implementation, this would create and show a modal with book details
    // For now, we'll just log to console
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
 * Add external link handling
 * Opens external links in a new tab and adds appropriate attributes for security
 */
document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Only if the link doesn't already have these attributes
    if (!link.hasAttribute('target') && !link.hasAttribute('rel')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});