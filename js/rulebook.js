document.addEventListener('DOMContentLoaded', function() {
    // Initialize the rules accordion
    initRulesAccordion();
    
    // Initialize back to top button
    initBackToTop();
});

/**
 * Initializes the accordion functionality for the rules section
 */
function initRulesAccordion() {
    const ruleHeaders = document.querySelectorAll('.rule-header');
    
    ruleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the clicked header
            this.classList.toggle('active');
            
            // Toggle the icon
            const icon = this.querySelector('.toggle-icon i');
            if (icon.classList.contains('fa-plus')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
            
            // Toggle the content visibility
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
    
    // Open the first rule by default
    if (ruleHeaders.length > 0) {
        ruleHeaders[0].click();
    }
}

/**
 * Initializes the back to top button functionality
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Adds smooth scrolling to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just a # or if it's a dropdown toggle
        if (targetId === '#' || this.parentElement.classList.contains('dropdown')) {
            return;
        }
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 100; // Adjust based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});