// Cruise Compass Booking Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const bookingForm = document.getElementById('cruise-booking-form');
    
    // Form validation and submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate the form
            if (validateForm()) {
                // If validation passes, process form submission
                submitForm();
            }
        });
    }
    
    // Set minimum date for departure to today
    const departureDateInput = document.getElementById('departure-date');
    if (departureDateInput) {
        const today = new Date();
        const formattedDate = formatDate(today);
        departureDateInput.setAttribute('min', formattedDate);
    }
    
    // Update pricing calculation when form inputs change
    const pricingInputs = document.querySelectorAll('#cruise-duration, #adults, #children, input[name="cabin-type"], input[name="additional-services"]');
    pricingInputs.forEach(input => {
        input.addEventListener('change', calculateEstimatedPrice);
    });
    
    // Setup cruise destination change event
    const destinationSelect = document.getElementById('cruise-destination');
    if (destinationSelect) {
        destinationSelect.addEventListener('change', updateDepartureDates);
    }
    
    // Initialize the price calculation
    createPriceSummary();
    calculateEstimatedPrice();
});

// Format date as YYYY-MM-DD for input[type="date"]
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Validate the booking form
function validateForm() {
    let isValid = true;
    
    // Basic required field validation
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            markInvalid(field, 'This field is required');
            isValid = false;
        } else {
            markValid(field);
        }
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
            markInvalid(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Phone validation
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneField.value.trim()) {
        const phonePattern = /^\+?[\d\s\-()]{10,20}$/;
        if (!phonePattern.test(phoneField.value)) {
            markInvalid(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    // Date validation
    const dateField = document.getElementById('departure-date');
    if (dateField && dateField.value) {
        const selectedDate = new Date(dateField.value);
        const today = new Date();
        
        if (selectedDate < today) {
            markInvalid(dateField, 'Please select a future date');
            isValid = false;
        }
    }
    
    // Check terms agreement
    const termsCheckbox = document.getElementById('terms-agreement');
    if (termsCheckbox && !termsCheckbox.checked) {
        markInvalid(termsCheckbox, 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}

// Mark field as invalid with error message
function markInvalid(field, message) {
    // Remove any existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Add error class and message
    field.classList.add('invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    field.parentNode.appendChild(errorDiv);
    
    // Add event listener to clear error on input
    field.addEventListener('input', function() {
        markValid(field);
    }, { once: true });
}

// Mark field as valid (remove error)
function markValid(field) {
    field.classList.remove('invalid');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
}

// Submit form using AJAX
function submitForm() {
    // Get form data
    const formData = new FormData(document.getElementById('cruise-booking-form'));
    const formDataObj = {};
    formData.forEach((value, key) => {
        // Handle checkboxes (multiple values)
        if (formDataObj[key]) {
            if (!Array.isArray(formDataObj[key])) {
                formDataObj[key] = [formDataObj[key]];
            }
            formDataObj[key].push(value);
        } else {
            formDataObj[key] = value;
        }
    });
    
    // Show loading state
    const submitButton = document.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    // Simulate AJAX request (in a real scenario, this would be an actual fetch or XMLHttpRequest)
    setTimeout(() => {
        // Create booking confirmation screen
        showBookingConfirmation(formDataObj);
        
        // Reset form
        document.getElementById('cruise-booking-form').reset();
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }, 1500);
}

// Create and display booking confirmation
function showBookingConfirmation(formData) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'booking-confirmation-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background-color: white;
        border-radius: 8px;
        padding: 30px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    
    // Get cabin type and price
    const cabinType = document.querySelector('input[name="cabin-type"]:checked').value;
    const cabinPrices = {
        'interior': 499,
        'ocean-view': 699,
        'balcony': 899,
        'suite': 1299
    };
    
    // Get additional services
    const additionalServices = [];
    const serviceElements = document.querySelectorAll('input[name="additional-services"]:checked');
    serviceElements.forEach(service => {
        additionalServices.push(service.id);
    });
    
    // Build confirmation content
    modalContent.innerHTML = `
        <h2 style="color: #0078c8; margin-bottom: 20px;">Booking Confirmation</h2>
        <p style="margin-bottom: 20px;">Thank you, ${formData['first-name']} ${formData['last-name']}! Your cruise booking request has been received.</p>
        
        <div style="background-color: #f9f9f9; border-left: 4px solid #0078c8; padding: 15px; margin-bottom: 20px;">
            <p>A confirmation email has been sent to <strong>${formData.email}</strong>.</p>
            <p>Our team will contact you within 24 hours to confirm your reservation.</p>
        </div>
        
        <h3 style="color: #333; margin-bottom: 10px;">Booking Details:</h3>
        <ul style="margin-bottom: 20px; padding-left: 20px;">
            <li><strong>Destination:</strong> ${getDestinationName(formData['cruise-destination'])}</li>
            <li><strong>Departure Date:</strong> ${new Date(formData['departure-date']).toLocaleDateString()}</li>
            <li><strong>Duration:</strong> ${getDurationText(formData['cruise-duration'])}</li>
            <li><strong>Passengers:</strong> ${formData.adults} Adult(s)${formData.children > 0 ? ', ' + formData.children + ' Child(ren)' : ''}</li>
            <li><strong>Cabin Type:</strong> ${cabinType.charAt(0).toUpperCase() + cabinType.slice(1)}</li>
            ${additionalServices.length > 0 ? '<li><strong>Additional Services:</strong> ' + getServicesText(additionalServices) + '</li>' : ''}
        </ul>
        
        <div style="margin-top: 20px; text-align: right;">
            <p>Your booking reference: <strong>CC-${generateBookingReference()}</strong></p>
            <button id="close-modal" style="
                background-color: #0078c8;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
                font-weight: 600;
            ">Close</button>
        </div>
    `;
    
    // Add modal to document
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Handle close button
    document.getElementById('close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}

// Helper function to get destination full name
function getDestinationName(destinationCode) {
    const destinations = {
        'eastern-caribbean': 'Eastern Caribbean',
        'western-caribbean': 'Western Caribbean',
        'southern-caribbean': 'Southern Caribbean',
        'bahamas': 'Bahamas'
    };
    return destinations[destinationCode] || destinationCode;
}

// Helper function to get duration text
function getDurationText(durationCode) {
    const durations = {
        '3-4': '3-4 nights',
        '5-6': '5-6 nights',
        '7-9': '7-9 nights',
        '10+': '10+ nights'
    };
    return durations[durationCode] || durationCode;
}

// Helper function to get services text
function getServicesText(services) {
    const serviceNames = {
        'dining-package': 'Premium Dining Package',
        'beverage-package': 'Beverage Package',
        'wifi-package': 'WiFi Package',
        'travel-insurance': 'Travel Insurance'
    };
    
    return services.map(service => serviceNames[service] || service).join(', ');
}

// Generate a random booking reference
function generateBookingReference() {
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${timestamp}${random}`;
}

// Update available departure dates based on destination
function updateDepartureDates() {
    const destination = document.getElementById('cruise-destination').value;
    const departureDateInput = document.getElementById('departure-date');
    
    if (!destination || !departureDateInput) return;
    
    // In a real application, this would fetch available dates from a server
    // For demo purposes, we'll set different minimum dates based on destination
    const today = new Date();
    let minDate = new Date(today);
    
    switch (destination) {
        case 'eastern-caribbean':
            // Next available in 2 weeks
            minDate.setDate(today.getDate() + 14);
            break;
        case 'western-caribbean':
            // Next available in 1 week
            minDate.setDate(today.getDate() + 7);
            break;
        case 'southern-caribbean':
            // Next available in 3 weeks
            minDate.setDate(today.getDate() + 21);
            break;
        case 'bahamas':
            // Next available in 3 days
            minDate.setDate(today.getDate() + 3);
            break;
        default:
            // No specific destination, use today
            break;
    }
    
    departureDateInput.setAttribute('min', formatDate(minDate));
    
    // If the currently selected date is before the new minimum date, update it
    if (new Date(departureDateInput.value) < minDate) {
        departureDateInput.value = formatDate(minDate);
    }
}

// Create price summary element
function createPriceSummary() {
    // Check if price summary already exists
    if (document.getElementById('price-summary')) return;
    
    // Create price summary container
    const priceSummary = document.createElement('div');
    priceSummary.id = 'price-summary';
    priceSummary.style.cssText = `
        margin-top: 30px;
        padding: 20px;
        background-color: #f0f8ff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    `;
    
    priceSummary.innerHTML = `
        <h3 style="margin-top: 0; color: #0078c8;">Estimated Price</h3>
        <div id="price-breakdown"></div>
        <div id="total-price" style="font-size: 1.2rem; font-weight: bold; margin-top: 15px; text-align: right;"></div>
        <p style="font-size: 0.8rem; color: #666; margin-top: 10px;">
            * Final pricing may vary based on promotions, availability, and specific cabin selection.
        </p>
    `;
    
    // Insert after form actions
    const formActions = document.querySelector('.form-actions');
    formActions.parentNode.insertBefore(priceSummary, formActions.nextSibling);
}

// Calculate and update estimated price
function calculateEstimatedPrice() {
    // Get selected values
    const duration = document.getElementById('cruise-duration').value;
    const adults = parseInt(document.getElementById('adults').value) || 0;
    const children = parseInt(document.getElementById('children').value) || 0;
    const cabinType = document.querySelector('input[name="cabin-type"]:checked').value;
    
    // Base prices per person
    const basePrices = {
        'interior': 499,
        'ocean-view': 699,
        'balcony': 899,
        'suite': 1299
    };
    
    // Duration multipliers
    const durationMultipliers = {
        '3-4': 1,
        '5-6': 1.5,
        '7-9': 2,
        '10+': 3
    };
    
    // Additional services prices
    const servicePrices = {
        'dining-package': 199,
        'beverage-package': 299,
        'wifi-package': 99,
        'travel-insurance': 149
    };
    
    // Calculate base cabin price
    const basePrice = basePrices[cabinType] || 0;
    const durationMultiplier = durationMultipliers[duration] || 1;
    const cabinPrice = basePrice * durationMultiplier;
    
    // Calculate passenger total
    const adultTotal = adults * cabinPrice;
    const childTotal = children * (cabinPrice * 0.7); // 30% discount for children
    
    // Calculate additional services
    let additionalServicesTotal = 0;
    const selectedServices = [];
    
    Object.keys(servicePrices).forEach(service => {
        const checkbox = document.getElementById(service);
        if (checkbox && checkbox.checked) {
            const servicePrice = servicePrices[service];
            additionalServicesTotal += servicePrice;
            selectedServices.push({
                name: getServiceDisplayName(service),
                price: servicePrice
            });
        }
    });
    
    // Calculate grand total
    const grandTotal = adultTotal + childTotal + additionalServicesTotal;
    
    // Update price breakdown
    updatePriceBreakdown(cabinType, cabinPrice, adults, children, selectedServices, grandTotal);
}

// Update price breakdown display
function updatePriceBreakdown(cabinType, cabinPrice, adults, children, selectedServices, grandTotal) {
    const priceBreakdownEl = document.getElementById('price-breakdown');
    const totalPriceEl = document.getElementById('total-price');
    
    if (!priceBreakdownEl || !totalPriceEl) return;
    
    // Format cabin type for display
    const cabinDisplay = cabinType.charAt(0).toUpperCase() + cabinType.slice(1).replace('-', ' ');
    
    // Create HTML for breakdown
    let breakdownHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>${cabinDisplay} Cabin (per person):</span>
            <span>$${cabinPrice.toLocaleString()}</span>
        </div>
    `;
    
    if (adults > 0) {
        breakdownHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span>Adults (${adults}):</span>
                <span>$${(adults * cabinPrice).toLocaleString()}</span>
            </div>
        `;
    }
    
    if (children > 0) {
        const childPrice = cabinPrice * 0.7;
        breakdownHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span>Children (${children}):</span>
                <span>$${(children * childPrice).toLocaleString()}</span>
            </div>
        `;
    }
    
    if (selectedServices.length > 0) {
        breakdownHTML += `<hr style="margin: 10px 0; border: none; border-top: 1px dashed #ddd;">`;
        
        selectedServices.forEach(service => {
            breakdownHTML += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>${service.name}:</span>
                    <span>$${service.price.toLocaleString()}</span>
                </div>
            `;
        });
    }
    
    // Update elements
    priceBreakdownEl.innerHTML = breakdownHTML;
    totalPriceEl.innerHTML = `Total Estimated Price: $${grandTotal.toLocaleString()}`;
}

// Get service display name
function getServiceDisplayName(serviceId) {
    const displayNames = {
        'dining-package': 'Premium Dining Package',
        'beverage-package': 'Beverage Package',
        'wifi-package': 'WiFi Package',
        'travel-insurance': 'Travel Insurance'
    };
    
    return displayNames[serviceId] || serviceId;
}

// Add server-side validation and processing (this would be in a separate server file)
/**
 * Sample Server-side Processing (Node.js with Express)
 * 
 * const express = require('express');
 * const bodyParser = require('body-parser');
 * const app = express();
 * 
 * app.use(bodyParser.json());
 * app.use(bodyParser.urlencoded({ extended: true }));
 * 
 * app.post('/api/bookings', (req, res) => {
 *   // Validate form data
 *   const { 
 *     'first-name': firstName, 
 *     'last-name': lastName,
 *     'email': email,
 *     'phone': phone,
 *     'cruise-destination': destination,
 *     'departure-date': departureDate,
 *     'cruise-duration': duration
 *   } = req.body;
 *   
 *   // Check required fields
 *   if (!firstName || !lastName || !email || !phone || !destination || !departureDate || !duration) {
 *     return res.status(400).json({ error: 'All required fields must be filled' });
 *   }
 *   
 *   // Email validation
 *   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 *   if (!emailRegex.test(email)) {
 *     return res.status(400).json({ error: 'Invalid email address' });
 *   }
 *   
 *   // Process booking (in production, this would save to a database)
 *   const bookingRef = generateBookingReference();
 *   
 *   // Send confirmation email (using a service like Nodemailer)
 *   sendConfirmationEmail(email, firstName, bookingRef, req.body);
 *   
 *   // Return success response
 *   res.status(200).json({
 *     success: true,
 *     message: 'Booking request received successfully',
 *     bookingRef: bookingRef
 *   });
 * });
 * 
 * function generateBookingReference() {
 *   const timestamp = new Date().getTime().toString().slice(-6);
 *   const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
 *   return `CC-${timestamp}${random}`;
 * }
 * 
 * function sendConfirmationEmail(email, name, bookingRef, bookingDetails) {
 *   // Implementation would use a service like Nodemailer to send email
 *   console.log(`Sending confirmation email to ${email} for booking ${bookingRef}`);
 * }
 * 
 * app.listen(3000, () => {
 *   console.log('Server running on port 3000');
 * });
 */
