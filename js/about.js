/**
 * About Page JavaScript for Haryana Chess Association Website
 * Handles animations and interactive elements on the about page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize about page functionality
    initAboutPage();
});

/**
 * Initialize all about page functionality
 */
function initAboutPage() {
    // Initialize timeline animation
    initTimelineAnimation();
    
    // Initialize leadership card hover effects
    initLeadershipCards();
    
    // Initialize achievement counters
    initAchievementCounters();
}

/**
 * Initialize timeline animation with scroll reveal
 */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        // Create intersection observer for timeline items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Add animation class and observe each timeline item
        timelineItems.forEach((item, index) => {
            // Add animation class based on even/odd
            item.classList.add(index % 2 === 0 ? 'from-left' : 'from-right');
            
            // Observe the item
            observer.observe(item);
        });
        
        // Add CSS for animations if not already in stylesheet
        if (!document.getElementById('timeline-animations')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'timeline-animations';
            styleSheet.textContent = `
                .timeline-item {
                    opacity: 0;
                    transition: all 0.8s ease;
                }
                
                .timeline-item.from-left {
                    transform: translateX(-50px);
                }
                
                .timeline-item.from-right {
                    transform: translateX(50px);
                }
                
                .timeline-item.animate {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                @media (max-width: 992px) {
                    .timeline-item.from-left,
                    .timeline-item.from-right {
                        transform: translateX(-50px);
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
}

/**
 * Initialize leadership card hover effects and animations
 */
function initLeadershipCards() {
    const leaderCards = document.querySelectorAll('.leader-card');
    
    if (leaderCards.length > 0) {
        // Create intersection observer for leader cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation with delay based on index
                    const index = Array.from(leaderCards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        // Add animation class and observe each leader card
        leaderCards.forEach(card => {
            card.classList.add('fade-up');
            observer.observe(card);
        });
        
        // Add CSS for animations if not already in stylesheet
        if (!document.getElementById('leader-animations')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'leader-animations';
            styleSheet.textContent = `
                .leader-card.fade-up {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }
                
                .leader-card.animate {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
}

/**
 * Initialize achievement counters with animation
 */
function initAchievementCounters() {
    // This would normally animate number counters in the achievements section
    // For this implementation, we'll just add a simple animation to the achievement cards
    
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    if (achievementCards.length > 0) {
        // Create intersection observer for achievement cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation with delay based on index
                    const index = Array.from(achievementCards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        // Add animation class and observe each achievement card
        achievementCards.forEach(card => {
            card.classList.add('fade-in');
            observer.observe(card);
        });
        
        // Add CSS for animations if not already in stylesheet
        if (!document.getElementById('achievement-animations')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'achievement-animations';
            styleSheet.textContent = `
                .achievement-card.fade-in {
                    opacity: 0;
                    transform: scale(0.95);
                    transition: all 0.6s ease;
                }
                
                .achievement-card.animate {
                    opacity: 1;
                    transform: scale(1);
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
}

/**
 * Create SVG placeholder for person images
 * This function creates SVG placeholders for team members if images are not available
 */
function createPersonPlaceholder() {
    const placeholders = document.querySelectorAll('img[src="assets/placeholder-person.svg"]');
    
    placeholders.forEach(placeholder => {
        // Create a canvas element to generate the SVG
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = 250;
        const height = 250;
        
        canvas.width = width;
        canvas.height = height;
        
        // Fill background
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, width, height);
        
        // Draw a simple silhouette
        ctx.fillStyle = '#d4af37';
        
        // Head
        ctx.beginPath();
        ctx.arc(width/2, height/3, width/6, 0, Math.PI * 2);
        ctx.fill();
        
        // Body
        ctx.beginPath();
        ctx.moveTo(width/3, height/2);
        ctx.lineTo(width*2/3, height/2);
        ctx.lineTo(width*3/4, height);
        ctx.lineTo(width/4, height);
        ctx.closePath();
        ctx.fill();
        
        // Convert to data URL and set as src
        placeholder.src = canvas.toDataURL();
    });
}

/**
 * Create SVG placeholder for logo images
 * This function creates SVG placeholders for affiliation logos if images are not available
 */
function createLogoPlaceholder() {
    const placeholders = document.querySelectorAll('img[src="assets/placeholder-logo.svg"]');
    
    placeholders.forEach(placeholder => {
        // Create SVG placeholder
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "150");
        svg.setAttribute("height", "100");
        svg.setAttribute("viewBox", "0 0 150 100");
        
        // Background rectangle
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("width", "150");
        rect.setAttribute("height", "100");
        rect.setAttribute("fill", "#2a2a2a");
        svg.appendChild(rect);
        
        // Circle
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "75");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "30");
        circle.setAttribute("stroke", "#d4af37");
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("fill", "none");
        svg.appendChild(circle);
        
        // Text
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", "75");
        text.setAttribute("y", "55");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "#d4af37");
        text.setAttribute("font-size", "12");
        text.textContent = "LOGO";
        svg.appendChild(text);
        
        // Convert to data URL
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
        const svgUrl = URL.createObjectURL(svgBlob);
        
        placeholder.src = svgUrl;
    });
}

// Call placeholder creation functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createPersonPlaceholder();
    createLogoPlaceholder();
});