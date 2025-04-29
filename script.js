// Smooth scroll for navbar links
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = this.getAttribute('href');
    if (target.startsWith('#')) {
      document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Click handlers for Compass Navigation options
document.querySelectorAll('.nav-option').forEach(option => {
  option.addEventListener('click', function () {
    const optionText = this.innerText.trim();

    switch (optionText) {
      case 'Booking':
        window.location.href = '#booking'; // Change as needed
        break;
      case 'Find Restaurants':
        window.location.href = '#restaurants'; // Change as needed
        break;
      case 'Explore Places':
        window.location.href = '#places'; // Change as needed
        break;
      case 'Short Trip Plan':
        window.location.href = '#short-trip'; // Change as needed
        break;
      case 'Long Trip Plan':
        window.location.href = '#long-trip'; // Change as needed
        break;
      default:
        alert('Feature coming soon!');
    }
  });
});

// Optional: Navbar active state on scroll (highlight current link)
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.navbar ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('class');
    }
  });

  navLi.forEach(li => {
    li.classList.remove('active');
    if (li.getAttribute('href').includes(current)) {
      li.classList.add('active');
    }
  });
});