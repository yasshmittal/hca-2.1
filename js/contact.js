/**
 * Contact Page JavaScript for Haryana Chess Association Website
 * Handles contact form validation and FAQ accordion functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact page functionality
    initContactPage();
});

/**
 * Initialize all contact page functionality
 */
function initContactPage() {
    // Initialize contact form validation
    initContactForm();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Create map placeholder
    createMapPlaceholder();
}

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm(contactForm)) {
                // Simulate form submission
                simulateFormSubmission(contactForm);
            }
        });
        
        // Add input validation on blur
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(input);
            });
        });
    }
}

/**
 * Validate the entire form
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
    
    requiredInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    // Validate email format if email field exists and has a value
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim() !== '') {
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Validate a single input field
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
    // Check if the input is required and empty
    if (input.hasAttribute('required') && input.value.trim() === '') {
        showError(input, 'This field is required');
        return false;
    }
    
    // Validate email format if it's an email input
    if (input.type === 'email' && input.value.trim() !== '') {
        if (!validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
    }
    
    // If we get here, the input is valid
    clearError(input);
    return true;
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Show error message for an input
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input with an error
 * @param {string} message - The error message to display
 */
function showError(input, message) {
    // Clear any existing error
    clearError(input);
    
    // Add error class to input
    input.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Insert error message after input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    
    // Add CSS for error styling if not already in stylesheet
    if (!document.getElementById('form-error-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'form-error-styles';
        styleSheet.textContent = `
            .error {
                border-color: #e74c3c !important;
                box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
            }
            
            .error-message {
                color: #e74c3c;
                font-size: 0.85rem;
                margin-top: 5px;
            }
            
            .success-message {
                background-color: rgba(46, 204, 113, 0.1);
                border: 1px solid #2ecc71;
                color: #2ecc71;
                padding: 15px;
                border-radius: 4px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .success-message i {
                font-size: 1.5rem;
                margin-right: 10px;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

/**
 * Clear error message for an input
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input to clear errors for
 */
function clearError(input) {
    // Remove error class
    input.classList.remove('error');
    
    // Remove any existing error message
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

/**
 * Simulate form submission (in a real application, this would send data to a server)
 * @param {HTMLFormElement} form - The form to submit
 */
function simulateFormSubmission(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate server request with timeout
    setTimeout(() => {
        // Hide form
        form.style.display = 'none';
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div>
                <i class="fas fa-check-circle"></i>
            </div>
            <div>
                <h3>Thank you for your message!</h3>
                <p>We have received your inquiry and will respond to you as soon as possible.</p>
            </div>
        `;
        
        form.parentNode.insertBefore(successMessage, form);
        
        // Reset form (though it's hidden)
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 1500);
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqAnswer.style.display = 'none';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
                
                // Smooth height animation
                answer.style.height = '0';
                const height = answer.scrollHeight;
                answer.style.transition = 'height 0.3s ease';
                answer.style.height = height + 'px';
                
                // Remove fixed height after animation completes
                setTimeout(() => {
                    answer.style.height = 'auto';
                }, 300);
            }
        });
    });
    
    // Open the first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        firstAnswer.style.display = 'block';
    }
}

/**
 * Create a placeholder for the map
 * This would be replaced with an actual Google Maps embed in production
 */
function createMapPlaceholder() {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    
    if (mapPlaceholder) {
        // Add chess piece markers to the map
        for (let i = 0; i < 10; i++) {
            const marker = document.createElement('div');
            marker.className = 'map-marker';
            marker.style.position = 'absolute';
            marker.style.width = '20px';
            marker.style.height = '20px';
            
            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            marker.style.left = `${left}%`;
            marker.style.top = `${top}%`;
            
            // Random chess piece
            const pieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
            const piece = pieces[Math.floor(Math.random() * pieces.length)];
            marker.textContent = piece;
            marker.style.color = 'rgba(212, 175, 55, 0.5)';
            marker.style.fontSize = '20px';
            marker.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
            
            mapPlaceholder.appendChild(marker);
        }
        
        // Add a pulsing marker for the HCA office location
        const officeMarker = document.createElement('div');
        officeMarker.className = 'office-marker';
        officeMarker.style.position = 'absolute';
        officeMarker.style.left = '50%';
        officeMarker.style.top = '50%';
        officeMarker.style.transform = 'translate(-50%, -50%)';
        officeMarker.style.zIndex = '10';
        
        // Create marker with pulse effect
        officeMarker.innerHTML = `
            <div style="position: relative;">
                <div class="pulse"></div>
                <div class="marker">♚</div>
            </div>
        `;
        
        mapPlaceholder.appendChild(officeMarker);
        
        // Add CSS for the pulsing effect
        if (!document.getElementById('map-marker-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'map-marker-styles';
            styleSheet.textContent = `
                .pulse {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(212, 175, 55, 0.3);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: pulse 2s infinite;
                }
                
                .marker {
                    position: relative;
                    color: var(--accent-gold);
                    font-size: 30px;
                    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    z-index: 2;
                }
                
                @keyframes pulse {
                    0% {
                        transform: translate(-50%, -50%) scale(0.5);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
}