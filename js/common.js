/**
 * Common JavaScript Functions
 * Shared functionality for the Haryana Chess Association website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load common elements
    loadCommonElements();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll effects
    initScrollEffects();
});

/**
 * Load common elements like header and footer
 */
function loadCommonElements() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = createHeader();
    }
    
    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = createFooter();
    }
    
    // After loading header, initialize active nav item
    setActiveNavItem();
}

/**
 * Create header HTML
 * @returns {string} Header HTML content
 */
function createHeader() {
    return `
    <header>
        <div class="header-container">
            <div class="logo">
                <a href="index.html">
                    <img src="logo.png" alt="Haryana Chess Association Logo">
                </a>
            </div>
            <nav>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="calendar.html">Tournament Calendar</a></li>
                    <li><a href="pairings-results.html">Pairings & Results</a></li>
                    <li><a href="rulebook.html">Rulebook</a></li>
                    <li><a href="registration.html">Registration</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li class="dropdown">
                        <a href="#">More <i class="fas fa-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="mission.html">Mission</a></li>
                            <li><a href="education.html">HCA in Education</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="players.html">Players</a></li>
                            <li><a href="news.html">News</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div class="nav-right">
                <div class="language-toggle">
                    <button class="lang-btn active">ENG</button>
                    <button class="lang-btn">हिंदी</button>
                </div>
                <div class="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
        </div>
    </header>
    `;
}

/**
 * Create footer HTML
 * @returns {string} Footer HTML content
 */
function createFooter() {
    const currentYear = new Date().getFullYear();
    
    return `
        <div class="footer-main">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-about">
                        <div class="footer-logo">
                            <img src="logo.png" alt="Haryana Chess Association Logo">
                            <div class="logo-text">
                                <span class="logo-title">Haryana Chess Association</span>
                                <span class="logo-subtitle">Affiliated to All India Chess Federation</span>
                            </div>
                        </div>
                        <p>Promoting chess excellence across Haryana through tournaments, training, and community engagement.</p>
                        <div class="footer-social">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div class="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="tournaments.html">Tournaments</a></li>
                            <li><a href="calendar.html">Event Calendar</a></li>
                            <li><a href="players.html">Players</a></li>
                            <li><a href="gallery.html">Photo Gallery</a></li>
                            <li><a href="news.html">News & Announcements</a></li>
                            <li><a href="resources.html">Resources</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h3>Resources</h3>
                        <ul>
                            <li><a href="resources.html#rules">Rules & Regulations</a></li>
                            <li><a href="resources.html#learning">Learning Materials</a></li>
                            <li><a href="resources.html#forms">Downloadable Forms</a></li>
                            <li><a href="resources.html#links">Useful Links</a></li>
                            <li><a href="resources.html#books">Recommended Books</a></li>
                        </ul>
                    </div>
                    <div class="footer-contact">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><i class="fas fa-map-marker-alt"></i> HCA Office, Sector 12, Panchkula, Haryana, India</li>
                            <li><i class="fas fa-phone"></i> <a href="tel:+911234567890">+91 123 456 7890</a></li>
                            <li><i class="fas fa-envelope"></i> <a href="mailto:info@haryanachess.org">info@haryanachess.org</a></li>
                            <li><i class="fas fa-clock"></i> Monday - Friday: 10:00 AM - 6:00 PM</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="copyright">
                    <p>&copy; ${currentYear} Haryana Chess Association. All Rights Reserved.</p>
                </div>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Sitemap</a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Set active navigation item based on current page
 */
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.parentElement.classList.add('active');
        }
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && navList.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    const header = document.querySelector('.header-main');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add sticky header on scroll
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Format date string
 * @param {Date|string} date - Date object or date string
 * @param {string} format - Format string (default: 'MMMM D, YYYY')
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'MMMM D, YYYY') {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const shortMonths = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ];
    
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return format
        .replace('YYYY', date.getFullYear())
        .replace('YY', date.getFullYear().toString().slice(-2))
        .replace('MMMM', months[date.getMonth()])
        .replace('MMM', shortMonths[date.getMonth()])
        .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace('M', date.getMonth() + 1)
        .replace('DDDD', days[date.getDay()])
        .replace('DDD', shortDays[date.getDay()])
        .replace('DD', date.getDate().toString().padStart(2, '0'))
        .replace('D', date.getDate())
        .replace('HH', date.getHours().toString().padStart(2, '0'))
        .replace('H', date.getHours())
        .replace('hh', (date.getHours() % 12 || 12).toString().padStart(2, '0'))
        .replace('h', date.getHours() % 12 || 12)
        .replace('mm', date.getMinutes().toString().padStart(2, '0'))
        .replace('m', date.getMinutes())
        .replace('ss', date.getSeconds().toString().padStart(2, '0'))
        .replace('s', date.getSeconds())
        .replace('a', date.getHours() < 12 ? 'am' : 'pm')
        .replace('A', date.getHours() < 12 ? 'AM' : 'PM');
}

/**
 * Create a placeholder image with initials
 * @param {string} name - Name to generate initials from
 * @param {string} bgColor - Background color (default: random color)
 * @param {string} textColor - Text color (default: white)
 * @returns {string} SVG image as a data URL
 */
function createInitialsPlaceholder(name, bgColor, textColor = '#ffffff') {
    // Generate initials from name
    const initials = name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    
    // Generate random color if not provided
    if (!bgColor) {
        const colors = [
            '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
            '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
            '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#f39c12',
            '#d35400', '#c0392b', '#7f8c8d'
        ];
        bgColor = colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Create SVG
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="${bgColor}"/>
            <text x="50" y="50" font-family="Arial, sans-serif" font-size="40" font-weight="bold" 
                  fill="${textColor}" text-anchor="middle" dominant-baseline="central">
                ${initials}
            </text>
        </svg>
    `;
    
    // Convert SVG to data URL
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
function isValidPhone(phone) {
    // Basic validation for Indian phone numbers
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

/**
 * Show a notification message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error, warning, info)
 * @param {number} duration - Duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon fas fa-${getIconForType(type)}"></i>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification to the DOM
    const notificationsContainer = document.querySelector('.notifications-container');
    if (!notificationsContainer) {
        const container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
        container.appendChild(notification);
    } else {
        notificationsContainer.appendChild(notification);
    }
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.classList.add('notification-hiding');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove notification after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('notification-hiding');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, duration);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('notification-show');
    }, 10);
}

/**
 * Get icon for notification type
 * @param {string} type - Notification type
 * @returns {string} Icon name
 */
function getIconForType(type) {
    switch (type) {
        case 'success':
            return 'check-circle';
        case 'error':
            return 'exclamation-circle';
        case 'warning':
            return 'exclamation-triangle';
        case 'info':
        default:
            return 'info-circle';
    }
}

/**
 * Add event listener with debounce
 * @param {Element} element - DOM element
 * @param {string} eventType - Event type
 * @param {Function} callback - Callback function
 * @param {number} delay - Debounce delay in milliseconds
 */
function addDebouncedEventListener(element, eventType, callback, delay = 300) {
    let timeout;
    
    element.addEventListener(eventType, function(event) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(event);
        }, delay);
    });
}

/**
 * Generate a random ID
 * @param {number} length - ID length
 * @returns {string} Random ID
 */
function generateRandomId(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
}