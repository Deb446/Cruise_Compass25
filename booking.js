// Booking page functionality

document.addEventListener('DOMContentLoaded', function() {
  // Form elements
  const bookingForm = document.getElementById('booking-form');
  const destinationSelect = document.getElementById('destination');
  const departureDate = document.getElementById('departure-date');
  const durationSelect = document.getElementById('duration');
  const adultsInput = document.getElementById('adults');
  const childrenInput = document.getElementById('children');
  const cabinOptions = document.querySelectorAll('input[name="cabin-type"]');
  const summaryContent = document.getElementById('summary-content');
  
  // Set minimum date to today
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const todayString = yyyy + '-' + mm + '-' + dd;
  departureDate.min = todayString;
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle) {
      menuToggle.addEventListener('click', function() {
          navMenu.classList.toggle('active');
      });
  }
  
  // Update booking summary as form is filled
  function updateSummary() {
      let summaryHTML = '';
      
      // Check if destination is selected
      if (destinationSelect.value) {
          const destinationText = destinationSelect.options[destinationSelect.selectedIndex].text;
          summaryHTML += `<div class="summary-item">
                            <span>Destination:</span>
                            <span>${destinationText}</span>
                          </div>`;
      }
      
      // Check if date is selected
      if (departureDate.value) {
          const formattedDate = new Date(departureDate.value).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
          });
          
          summaryHTML += `<div class="summary-item">
                            <span>Departure:</span>
                            <span>${formattedDate}</span>
                          </div>`;
      }
      
      // Check if duration is selected
      if (durationSelect.value) {
          const durationText = durationSelect.options[durationSelect.selectedIndex].text;
          summaryHTML += `<div class="summary-item">
                            <span>Duration:</span>
                            <span>${durationText}</span>
                          </div>`;
      }
      
      // Passengers
      if (adultsInput.value || childrenInput.value) {
          const totalPassengers = parseInt(adultsInput.value || 0) + parseInt(childrenInput.value || 0);
          summaryHTML += `<div class="summary-item">
                            <span>Passengers:</span>
                            <span>${totalPassengers} (${adultsInput.value} adults, ${childrenInput.value} children)</span>
                          </div>`;
      }
      
      // Cabin type
      let selectedCabin = '';
      cabinOptions.forEach(option => {
          if (option.checked) {
              selectedCabin = option.nextElementSibling.querySelector('.cabin-name').textContent;
          }
      });
      
      if (selectedCabin) {
          summaryHTML += `<div class="summary-item">
                            <span>Cabin:</span>
                            <span>${selectedCabin}</span>
                          </div>`;
      }
      
      // Estimated price (simplified calculation)
      if (destinationSelect.value && durationSelect.value && adultsInput.value) {
          // Base prices per day by destination
          const basePrices = {
              'caribbean': 150,
              'mediterranean': 180,
              'alaska': 200,
              'scandinavia': 220,
              'australia': 250
          };
          
          // Cabin multipliers
          const cabinMultipliers = {
              'interior': 1,
              'oceanview': 1.3,
              'balcony': 1.7,
              'suite': 2.5
          };
          
          let selectedCabinValue = 'interior'; // Default
          cabinOptions.forEach(option => {
              if (option.checked) {
                  selectedCabinValue = option.value;
              }
          });
          
          const basePrice = basePrices[destinationSelect.value] || 150;
          const cabinMultiplier = cabinMultipliers[selectedCabinValue];
          const duration = parseInt(durationSelect.value) || 7;
          const adults = parseInt(adultsInput.value) || 1;
          const children = parseInt(childrenInput.value) || 0;
          
          // Children pay 70% of adult price
          const totalPrice = basePrice * cabinMultiplier * duration * (adults + children * 0.7);
          
          summaryHTML += `<div class="summary-item price">
                            <span>Estimated Total:</span>
                            <span>$${totalPrice.toFixed(2)}</span>
                          </div>`;
      }
      
      // Update the summary or show default text
      if (summaryHTML) {
          summaryContent.innerHTML = summaryHTML;
      } else {
          summaryContent.innerHTML = `<p>Complete the form to see your booking summary</p>`;
      }
  }
  
  // Add event listeners to form elements
  const formElements = [
      destinationSelect, departureDate, durationSelect, 
      adultsInput, childrenInput
  ];
  
  formElements.forEach(element => {
      element.addEventListener('change', updateSummary);
  });
  
  cabinOptions.forEach(option => {
      option.addEventListener('change', updateSummary);
  });
  
  // Form submission
  bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real application, you would send the form data to a server here
      alert('Thank you for your booking! A confirmation email will be sent shortly.');
      
      // For demo purposes, you might want to redirect to a confirmation page
      // window.location.href = 'confirmation.html';
  });
  
  // Save for later button
  const saveButton = document.querySelector('.btn-secondary');
  if (saveButton) {
      saveButton.addEventListener('click', function() {
          alert('Your booking information has been saved. You can complete it later.');
      });
  }
});