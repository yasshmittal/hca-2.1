document.addEventListener('DOMContentLoaded', function() {
    initRegistrationForm();
    initFaqToggle();
});

/**
 * Initialize the registration form functionality
 */
function initRegistrationForm() {
    const form = document.getElementById('tournament-registration-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission
            submitForm();
        }
    });
    
    // Tournament selection changes category options
    const tournamentSelect = document.getElementById('tournament-select');
    const categorySelect = document.getElementById('player-category');
    
    if (tournamentSelect && categorySelect) {
        tournamentSelect.addEventListener('change', function() {
            updateCategoryOptions(this.value);
        });
    }
}

/**
 * Validate the registration form
 * @returns {boolean} Whether the form is valid
 */
function validateForm() {
    const form = document.getElementById('tournament-registration-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Remove any existing error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
    
    // Check each required field
    requiredFields.forEach(field => {
        field.classList.remove('error');
        
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'This field is required';
            field.parentNode.appendChild(errorMessage);
        }
    });
    
    // Validate email format if email field exists and has a value
    const emailField = document.getElementById('player-email');
    if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Please enter a valid email address';
            emailField.parentNode.appendChild(errorMessage);
        }
    }
    
    // Validate phone number if phone field exists and has a value
    const phoneField = document.getElementById('player-phone');
    if (phoneField && phoneField.value.trim()) {
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phoneField.value.replace(/[\s-]/g, ''))) {
            isValid = false;
            phoneField.classList.add('error');
            
            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Please enter a valid 10-digit phone number';
            phoneField.parentNode.appendChild(errorMessage);
        }
    }
    
    return isValid;
}

/**
 * Update category options based on selected tournament
 * @param {string} tournamentValue - The selected tournament value
 */
function updateCategoryOptions(tournamentValue) {
    const categorySelect = document.getElementById('player-category');
    
    if (!categorySelect) return;
    
    // Clear current options except the first one
    while (categorySelect.options.length > 1) {
        categorySelect.remove(1);
    }
    
    // Add appropriate options based on tournament
    if (tournamentValue === 'haryana-state-championship-2023') {
        addOption(categorySelect, 'open', 'Open');
        addOption(categorySelect, 'women', 'Women');
        addOption(categorySelect, 'under-19', 'Under-19');
        addOption(categorySelect, 'under-15', 'Under-15');
        addOption(categorySelect, 'under-11', 'Under-11');
    } else if (tournamentValue === 'rohtak-district-championship') {
        addOption(categorySelect, 'open', 'Open');
        addOption(categorySelect, 'women', 'Women');
        addOption(categorySelect, 'under-15', 'Under-15');
        addOption(categorySelect, 'under-11', 'Under-11');
    } else if (tournamentValue === 'haryana-junior-chess-championship') {
        addOption(categorySelect, 'under-15', 'Under-15');
        addOption(categorySelect, 'under-11', 'Under-11');
        addOption(categorySelect, 'under-9', 'Under-9');
    } else {
        // Default options for any other tournament
        addOption(categorySelect, 'open', 'Open');
        addOption(categorySelect, 'women', 'Women');
        addOption(categorySelect, 'under-19', 'Under-19');
        addOption(categorySelect, 'under-15', 'Under-15');
        addOption(categorySelect, 'under-11', 'Under-11');
        addOption(categorySelect, 'under-9', 'Under-9');
    }
}

/**
 * Helper function to add an option to a select element
 * @param {HTMLSelectElement} selectElement - The select element to add the option to
 * @param {string} value - The option value
 * @param {string} text - The option text
 */
function addOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

/**
 * Submit the registration form
 */
function submitForm() {
    const form = document.getElementById('tournament-registration-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable the submit button and show loading state
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    }
    
    // Simulate API call with timeout
    setTimeout(function() {
        // Show success message
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Registration Successful!</h3>
                    <p>Thank you for registering for the tournament. We have sent a confirmation email to your registered email address with further instructions.</p>
                    <p>Please check your email (including spam folder) for payment instructions and next steps.</p>
                    <div class="success-actions">
                        <button class="btn primary-btn" onclick="window.location.reload()">Register Another Player</button>
                        <a href="calendar.html" class="btn secondary-btn">View Tournament Details</a>
                    </div>
                </div>
            `;
        }
    }, 2000);
}

/**
 * Initialize FAQ toggle functionality
 */
function initFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            question.addEventListener('click', function() {
                // Toggle active class
                item.classList.toggle('active');
                
                // Update icon
                const icon = toggle.querySelector('i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.className = 'fas fa-minus';
                    } else {
                        icon.className = 'fas fa-plus';
                    }
                }
                
                // Toggle answer visibility
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });
        }
    });
}