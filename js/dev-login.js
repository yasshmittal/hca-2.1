/**
 * Developer Login Page JavaScript
 * Handles login form functionality, OTP verification, GitHub authentication, and form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Developer credentials for testing
    const devCredentials = {
        email: 'developer@hca.org',
        password: 'Dev@123',
        github: 'hca-developer'
    };
    
    // Display developer credentials in console for testing
    console.log('Developer credentials for testing:');
    console.log('Email:', devCredentials.email);
    console.log('Password:', devCredentials.password);
    console.log('GitHub Username:', devCredentials.github);
    
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            loginForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}-form`).classList.add('active');
        });
    });
    
    // Password visibility toggle
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const icon = togglePasswordBtn.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    // OTP functionality
    const sendOtpBtn = document.getElementById('send-otp-btn');
    const verifyOtpBtn = document.getElementById('verify-otp-btn');
    const emailInput = document.getElementById('email');
    const otpGroup = document.querySelector('.otp-group');
    const otpInputs = document.querySelectorAll('.otp-input');
    const resendBtn = document.getElementById('resend-btn');
    const countdownEl = document.getElementById('countdown');
    
    if (sendOtpBtn && emailInput && otpGroup) {
        sendOtpBtn.addEventListener('click', () => {
            // Validate email
            const email = emailInput.value.trim();
            if (!isValidEmail(email)) {
                showError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            // Simulate OTP sending (in a real app, this would be an API call)
            sendOtpBtn.disabled = true;
            sendOtpBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                // Show OTP input fields
                otpGroup.style.display = 'block';
                sendOtpBtn.style.display = 'none';
                verifyOtpBtn.style.display = 'block';
                
                // Focus on first OTP input
                if (otpInputs.length > 0) {
                    otpInputs[0].focus();
                }
                
                // Start countdown for resend
                startCountdown(30);
                
                // Show success message
                showSuccess(emailInput, 'OTP sent successfully');
            }, 1500);
        });
    }
    
    // OTP input handling
    if (otpInputs.length > 0) {
        otpInputs.forEach((input, index) => {
            // Auto-focus next input when a digit is entered
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1) {
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                }
            });
            
            // Handle backspace to go to previous input
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && e.target.value.length === 0) {
                    if (index > 0) {
                        otpInputs[index - 1].focus();
                    }
                }
            });
        });
    }
    
    // Resend OTP functionality
    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            if (!resendBtn.disabled) {
                // Simulate resending OTP
                resendBtn.disabled = true;
                resendBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    resendBtn.textContent = 'Resend OTP';
                    startCountdown(30);
                    
                    // Clear OTP inputs
                    otpInputs.forEach(input => {
                        input.value = '';
                    });
                    
                    // Focus on first input
                    if (otpInputs.length > 0) {
                        otpInputs[0].focus();
                    }
                    
                    showSuccess(emailInput, 'OTP resent successfully');
                }, 1500);
            }
        });
    }
    
    // Verify OTP functionality
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get OTP value
            let otp = '';
            otpInputs.forEach(input => {
                otp += input.value;
            });
            
            // Validate OTP
            if (otp.length !== 6 || !/^\d+$/.test(otp)) {
                showError(otpInputs[0], 'Please enter a valid 6-digit OTP');
                return;
            }
            
            // Simulate OTP verification (in a real app, this would be an API call)
            verifyOtpBtn.disabled = true;
            verifyOtpBtn.textContent = 'Verifying...';
            
            setTimeout(() => {
                // For demo purposes, we'll simulate a successful login
                simulateSuccessfulLogin('developer');
            }, 1500);
        });
    }
    
    // Password login form submission
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Validate inputs
            let isValid = true;
            
            if (!isValidEmail(email)) {
                showError(document.getElementById('login-email'), 'Please enter a valid email address');
                isValid = false;
            }
            
            if (password.length < 6) {
                showError(document.getElementById('password'), 'Password must be at least 6 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate login (in a real app, this would be an API call)
                const submitBtn = passwordForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Logging in...';
                
                setTimeout(() => {
                    // For demo purposes, we'll simulate a successful login
                    simulateSuccessfulLogin('developer');
                }, 1500);
            }
        });
    }
    
    // GitHub login functionality
    const githubLoginBtn = document.getElementById('github-login-btn');
    if (githubLoginBtn) {
        githubLoginBtn.addEventListener('click', () => {
            // In a real app, this would redirect to GitHub OAuth flow
            githubLoginBtn.disabled = true;
            githubLoginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting to GitHub...';
            
            setTimeout(() => {
                // For demo purposes, we'll simulate a successful GitHub login
                simulateSuccessfulLogin('github');
            }, 2000);
        });
    }
    
    // Add GitHub button styles
    const style = document.createElement('style');
    style.textContent = `
        .btn-github {
            background-color: #24292e;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .btn-github:hover {
            background-color: #1a1e21;
        }
        
        .github-login-info {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .github-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #24292e;
        }
        
        .github-login-info h3 {
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .github-login-info p {
            color: #666;
        }
    `;
    document.head.appendChild(style);
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(inputElement, message) {
        // Remove any existing error message
        const parent = inputElement.closest('.form-group');
        const existingError = parent.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to input
        inputElement.classList.add('error');
        
        // Create and append error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        parent.appendChild(errorDiv);
        
        // Remove error after 3 seconds
        setTimeout(() => {
            inputElement.classList.remove('error');
            errorDiv.remove();
        }, 3000);
    }
    
    function showSuccess(inputElement, message) {
        // Remove any existing messages
        const parent = inputElement.closest('.form-group');
        const existingMessage = parent.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and append success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        parent.appendChild(successDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
    
    function startCountdown(seconds) {
        let remainingSeconds = seconds;
        countdownEl.textContent = remainingSeconds;
        
        const countdownInterval = setInterval(() => {
            remainingSeconds--;
            countdownEl.textContent = remainingSeconds;
            
            if (remainingSeconds <= 0) {
                clearInterval(countdownInterval);
                resendBtn.disabled = false;
                document.getElementById('timer').style.display = 'none';
            }
        }, 1000);
    }
    
    function simulateSuccessfulLogin(loginType) {
        // Create a success message container
        const successOverlay = document.createElement('div');
        successOverlay.className = 'success-overlay';
        
        const successContent = document.createElement('div');
        successContent.className = 'success-content';
        
        const successIcon = document.createElement('div');
        successIcon.className = 'success-icon';
        
        // Different icon based on login type
        if (loginType === 'github') {
            successIcon.innerHTML = '<i class="fab fa-github"></i>';
        } else {
            successIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        }
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<h2>Login Successful!</h2><p>Redirecting to developer dashboard...</p>';
        
        successContent.appendChild(successIcon);
        successContent.appendChild(successMessage);
        successOverlay.appendChild(successContent);
        document.body.appendChild(successOverlay);
        
        // Add styles for the success overlay
        const style = document.createElement('style');
        style.textContent = `
            .success-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            
            .success-content {
                background-color: #fff;
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
                max-width: 400px;
                width: 90%;
            }
            
            .success-icon {
                font-size: 4rem;
                color: ${loginType === 'github' ? '#24292e' : '#4CAF50'};
                margin-bottom: 1rem;
            }
            
            .success-message h2 {
                margin-bottom: 0.5rem;
                color: #333;
            }
            
            .success-message p {
                color: #666;
            }
        `;
        document.head.appendChild(style);
        
        // Redirect after a delay to the developer dashboard
        setTimeout(() => {
            window.location.href = 'dev-dashboard.html'; // Redirect to developer dashboard
        }, 3000);
    }
});