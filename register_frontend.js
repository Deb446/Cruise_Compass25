// auth.js - Client-side authentication handling

document.addEventListener('DOMContentLoaded', () => {
    // Get form references
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    
    // Add form IDs to the HTML elements
    if (signupForm) signupForm.id = 'signup-form';
    if (signinForm) signinForm.id = 'signin-form';
    
    // Setup form submission handlers
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignin);
    }
    
    // Check if user is already logged in
    checkAuthStatus();
});

/**
 * Handle sign up form submission
 * @param {Event} e - Form submission event
 */
async function handleSignup(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        name: document.getElementById('signup-name').value.trim(),
        address: document.getElementById('signup-address').value.trim(),
        phone: document.getElementById('signup-phone').value.trim(),
        age: document.getElementById('signup-age').value.trim(),
        state: document.getElementById('signup-state').value.trim(),
        country: document.getElementById('signup-country').value.trim(),
        aadhaar: document.getElementById('signup-aadhaar').value.trim(),
        email: document.getElementById('signup-email').value.trim(),
        password: document.getElementById('signup-password').value
    };
    
    // Validate form data client-side
    if (!validateSignupForm(formData)) {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        return;
    }
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        
        // Registration successful
        showNotification('Account created successfully!', 'success');
        localStorage.setItem('authToken', data.token);
        
        // Redirect to user dashboard after short delay
        setTimeout(() => {
            window.location.href = '/dashboard.html';
        }, 1500);
        
    } catch (error) {
        showNotification(error.message, 'error');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
}

/**
 * Handle sign in form submission
 * @param {Event} e - Form submission event
 */
async function handleSignin(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        email: document.getElementById('signin-email').value.trim(),
        phone: document.getElementById('signin-phone').value.trim(),
        password: document.getElementById('signin-password').value
    };
    
    // Validate form data client-side
    if (!validateSigninForm(formData)) {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        return;
    }
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        // Login successful
        showNotification('Login successful!', 'success');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userName', data.user.name);
        
        // Redirect to user dashboard after short delay
        setTimeout(() => {
            window.location.href = '/dashboard.html';
        }, 1000);
        
    } catch (error) {
        showNotification(error.message, 'error');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
}

/**
 * Check if user is already authenticated
 */
function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');
    
    if (token && userName) {
        // Add user info to navbar if logged in
        const navUl = document.querySelector('nav ul');
        if (navUl) {
            const userLi = document.createElement('li');
            userLi.innerHTML = `<a href="/dashboard.html" class="user-profile">Hello, ${userName}</a>`;
            navUl.appendChild(userLi);
            
            // Replace "Register" with "Logout"
            const registerLi = Array.from(navUl.children).find(li => li.textContent.includes('Register'));
            if (registerLi) {
                registerLi.innerHTML = '<a href="#" id="logout-btn">Logout</a>';
                document.getElementById('logout-btn').addEventListener('click', handleLogout);
            }
        }
    }
}

/**
 * Handle user logout
 * @param {Event} e - Click event
 */
function handleLogout(e) {
    e.preventDefault();
    
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    
    // Show notification
    showNotification('Logged out successfully', 'success');
    
    // Redirect to home page after short delay
    setTimeout(() => {
        window.location.href = '/';
    }, 1000);
}

/**
 * Display notification to user
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success/error)
 */
function showNotification(message, type) {
    // Check if notification container exists
    let notificationContainer = document.getElementById('notification-container');
    
    // Create if it doesn't exist
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.padding = '12px 20px';
    notification.style.marginBottom = '10px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.minWidth = '200px';
    notification.style.animation = 'fadeIn 0.3s ease';
    
    // Set color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#2ecc71';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#e74c3c';
        notification.style.color = 'white';
    }
    
    notification.textContent = message;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 500);
    }, 3000);
}

/**
 * Add keypress animation to form fields
 */
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.transition = 'transform 0.2s ease';
        input.style.transform = 'scale(1.01)';
    });
    
    input.addEventListener('blur', () => {
        input.style.transform = 'scale(1)';
    });
});
