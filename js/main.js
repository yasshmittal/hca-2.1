/**
 * Main JavaScript file for Haryana Chess Association Website
 * Contains common functionality used across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all common components
    initMobileMenu();
    initLanguageToggle();
    initScrollEffects();
    initDropdownMenus();
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    mobileMenu.innerHTML = navLinks.innerHTML;
    document.body.appendChild(mobileMenu);
    
    // Add close button to mobile menu
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('mobile-menu-close');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    mobileMenu.prepend(closeBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
    });
    
    // Close mobile menu
    closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Handle mobile dropdown menus
    const mobileDropdowns = mobileMenu.querySelectorAll('.dropdown');
    
    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Create a new link element without the event
        const newLink = document.createElement('span');
        newLink.innerHTML = link.innerHTML;
        newLink.classList.add('dropdown-toggle');
        
        // Replace the original link with the new one
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.toggle('active');
            newLink.classList.toggle('active');
        });
    });
}

/**
 * Language Toggle Functionality
 */
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    if (!langButtons.length) return;
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically implement language switching logic
            const language = this.textContent.trim();
            console.log(`Switching to ${language}`);
            
            // For demonstration purposes only
            // In a real implementation, you would load language-specific content
            // or redirect to a language-specific version of the page
        });
    });
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    const header = document.querySelector('header');
    
    if (!header) return;
    
    // Shrink header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initial check for page load in the middle of the content
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Dropdown Menus
 */
function initDropdownMenus() {
    // This is mainly handled by CSS, but we add keyboard accessibility here
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!link || !menu) return;
        
        // Add keyboard accessibility
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menu.classList.add('active');
                
                // Focus the first link in the dropdown
                const firstLink = menu.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });
        
        // Close dropdown when tabbing out of the last item
        const menuLinks = menu.querySelectorAll('a');
        const lastLink = menuLinks[menuLinks.length - 1];
        
        if (lastLink) {
            lastLink.addEventListener('keydown', function(e) {
                if (e.key === 'Tab' && !e.shiftKey) {
                    menu.classList.remove('active');
                }
            });
        }
        
        // Close dropdown when pressing Escape
        menu.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                menu.classList.remove('active');
                link.focus();
            }
        });
    });
}

/**
 * Utility Functions
 */

// Debounce function to limit how often a function can be called
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Format date to readable string
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Add animation class when element is in viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Initialize animation on scroll
window.addEventListener('scroll', debounce(animateOnScroll, 10));

// Call once on page load
document.addEventListener('DOMContentLoaded', animateOnScroll);