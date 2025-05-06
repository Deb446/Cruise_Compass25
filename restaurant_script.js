// Restaurant Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Restaurant data
    const restaurants = [
        {
            id: 'seafire-grill',
            name: 'Seafire Grill',
            image: 'images/seafire-grill.jpg',
            badge: 'fine-dining',
            badgeText: 'Fine Dining',
            cuisine: 'steakhouse',
            mealPeriod: 'dinner',
            price: 'premium',
            description: 'A sophisticated steakhouse featuring premium cuts of beef and fresh seafood prepared to perfection. Enjoy an elegant dining experience with outstanding service.',
            features: ['Wine Pairing', 'Reservation Required'],
            featureIcons: ['wine-glass-alt', 'concierge-bell'],
            dietary: ['gluten-free'],
            experience: 'fine-dining',
            rating: 4.8
        },
        {
            id: 'azure-buffet',
            name: 'Azure Buffet',
            image: 'images/azure-buffet.jpg',
            badge: 'buffet',
            badgeText: 'Buffet',
            cuisine: 'international',
            mealPeriod: 'all',
            price: 'included',
            description: 'Our signature buffet offers global cuisine with live cooking stations, fresh salads, international favorites, and decadent desserts. Perfect for families and flexible dining times.',
            features: ['Vegetarian Options', 'Accessible'],
            featureIcons: ['leaf', 'wheelchair'],
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            experience: 'buffet',
            rating: 4.5
        },
        {
            id: 'toscana',
            name: 'Toscana',
            image: 'images/toscana.jpg',
            badge: 'specialty',
            badgeText: 'Specialty',
            cuisine: 'italian',
            mealPeriod: 'dinner',
            price: 'premium',
            description: 'Transport yourself to Italy with authentic pasta dishes, wood-fired pizzas, and regional specialties prepared with traditional recipes and the finest imported ingredients.',
            features: ['Italian Wines', 'Reservation Required'],
            featureIcons: ['wine-glass-alt', 'concierge-bell'],
            dietary: ['vegetarian'],
            experience: 'specialty',
            rating: 4.7
        },
        {
            id: 'jade-palace',
            name: 'Jade Palace',
            image: 'images/jade-palace.jpg',
            badge: 'specialty',
            badgeText: 'Specialty',
            cuisine: 'asian',
            mealPeriod: 'lunch-dinner',
            price: 'premium',
            description: 'Experience the flavors of the Far East with dishes from Japan, China, Thailand, and beyond. Featuring sushi, teppanyaki, and signature Asian-inspired cocktails.',
            features: ['Live Cooking', 'Vegan Options'],
            featureIcons: ['fire', 'seedling'],
            dietary: ['vegetarian', 'vegan'],
            experience: 'specialty',
            rating: 4.6
        },
        {
            id: 'ocean-view-cafe',
            name: 'Ocean View Café',
            image: 'images/ocean-view-cafe.jpg',
            badge: 'casual',
            badgeText: 'Casual',
            cuisine: 'american',
            mealPeriod: 'all',
            price: 'included',
            description: 'Casual dining with spectacular sea views. Enjoy fresh salads, sandwiches, burgers, and daily specials in a relaxed atmosphere perfect for a quick bite between activities.',
            features: ['Accessible', 'Kid-Friendly'],
            featureIcons: ['wheelchair', 'child'],
            dietary: ['vegetarian', 'gluten-free'],
            experience: 'casual',
            rating: 4.3
        },
        {
            id: 'sol-y-luna',
            name: 'Sol y Luna',
            image: 'images/sol-y-luna.jpg',
            badge: 'specialty',
            badgeText: 'Specialty',
            cuisine: 'mexican',
            mealPeriod: 'dinner',
            price: 'premium',
            description: 'Vibrant Mexican restaurant serving authentic regional specialties from coastal ceviche to hearty enchiladas. Featuring a premium tequila bar and tableside guacamole.',
            features: ['Spice Customizable', 'Live Mariachi'],
            featureIcons: ['pepper-hot', 'music'],
            dietary: ['vegetarian'],
            experience: 'specialty',
            rating: 4.5
        },
        {
            id: 'bistro-mediterraneo',
            name: 'Bistro Mediterraneo',
            image: 'images/bistro-mediterraneo.jpg',
            badge: 'specialty',
            badgeText: 'Specialty',
            cuisine: 'mediterranean',
            mealPeriod: 'lunch-dinner',
            price: 'premium',
            description: 'Savor the flavors of the Mediterranean with dishes inspired by Greece, Spain, Morocco, and Lebanon. Fresh seafood, mezze platters, and wood-fired specialties.',
            features: ['Wine Pairing', 'Stunning Views'],
            featureIcons: ['wine-glass-alt', 'mountain'],
            dietary: ['vegetarian', 'gluten-free'],
            experience: 'specialty',
            rating: 4.6
        },
        {
            id: 'island-grill',
            name: 'Island Grill',
            image: 'images/island-grill.jpg',
            badge: 'casual',
            badgeText: 'Casual',
            cuisine: 'caribbean',
            mealPeriod: 'lunch-dinner',
            price: 'included',
            description: 'Poolside tropical paradise offering Caribbean-inspired dishes, fresh grilled seafood, and fruity cocktails. Perfect for a casual lunch or sunset dinner by the water.',
            features: ['Outdoor Seating', 'Live Music'],
            featureIcons: ['umbrella-beach', 'guitar'],
            dietary: ['gluten-free'],
            experience: 'casual',
            rating: 4.4
        },
        {
            id: 'prime-cut',
            name: 'Prime Cut',
            image: 'images/prime-cut.jpg',
            badge: 'fine-dining',
            badgeText: 'Fine Dining',
            cuisine: 'steakhouse',
            mealPeriod: 'dinner',
            price: 'premium',
            description: 'Modern steakhouse serving premium dry-aged beef, fresh seafood, and an extensive wine list. The elegant atmosphere and impeccable service create an unforgettable dining experience.',
            features: ['Wine Cellar', 'Chef\'s Table Available'],
            featureIcons: ['wine-bottle', 'crown'],
            dietary: ['gluten-free'],
            experience: 'fine-dining',
            rating: 4.9
        },
        {
            id: 'sushi-sake',
            name: 'Sushi & Sake',
            image: 'images/sushi-sake.jpg',
            badge: 'specialty',
            badgeText: 'Specialty',
            cuisine: 'asian',
            mealPeriod: 'dinner',
            price: 'premium',
            description: 'Authentic Japanese cuisine featuring master sushi chefs preparing fresh sashimi, signature rolls, and hot dishes. Complemented by an extensive sake selection.',
            features: ['Omakase Experience', 'Sake Tasting'],
            featureIcons: ['fish', 'glass-cheers'],
            dietary: ['gluten-free'],
            experience: 'specialty',
            rating: 4.8
        },
        {
            id: 'seaside-cafe',
            name: 'Seaside Café',
            image: 'images/seaside-cafe.jpg',
            badge: 'casual',
            badgeText: 'Casual',
            cuisine: 'international',
            mealPeriod: 'breakfast-lunch',
            price: 'included',
            description: 'Bright and airy café serving breakfast favorites, gourmet sandwiches, fresh salads, and homemade pastries. The perfect spot to start your day or enjoy a light lunch.',
            features: ['Barista Coffee', 'Fresh Bakery'],
            featureIcons: ['coffee', 'bread-slice'],
            dietary: ['vegetarian', 'vegan', 'gluten-free'],
            experience: 'casual',
            rating: 4.2
        },
        {
            id: 'creperie',
            name: 'La Crêperie',
            image: 'images/creperie.jpg',
            badge: 'casual',
            badgeText: 'Casual',
            cuisine: 'mediterranean',
            mealPeriod: 'all',
            price: 'included',
            description: 'Charming French-inspired café specializing in sweet and savory crêpes made to order. Also serving light sandwiches, salads, and artisanal ice cream.',
            features: ['Made to Order', 'All-Day Service'],
            featureIcons: ['utensils', 'clock'],
            dietary: ['vegetarian'],
            experience: 'casual',
            rating: 4.4
        }
    ];

    // Dining packages data
    const diningPackages = [
        {
            id: 'taste-of-luxury',
            name: 'Taste of Luxury',
            price: '$99 per person',
            image: 'images/dining-package-basic.jpg',
            description: 'Enjoy 3 dinners at our specialty restaurants throughout your cruise. Perfect for those who want to sample our premium dining options.',
            features: [
                '3 specialty restaurant dinners',
                '20% discount on wine pairings',
                'Priority reservations'
            ]
        },
        {
            id: 'ultimate-gourmet',
            name: 'Ultimate Gourmet Experience',
            price: '$199 per person',
            image: 'images/dining-package-premium.jpg',
            featured: true,
            description: 'Unlimited access to all specialty restaurants throughout your cruise, plus exclusive chef\'s table experience with wine pairings.',
            features: [
                'Unlimited specialty restaurant dining',
                'One Chef\'s Table experience',
                'Premium beverage package inclusion',
                'Priority seating at all venues'
            ]
        },
        {
            id: 'premium-beverage',
            name: 'Premium Beverage Package',
            price: '$79 per person/day',
            image: 'images/dining-package-beverage.jpg',
            description: 'Enjoy unlimited premium beverages throughout your cruise, including specialty coffees, fresh juices, bottled water, and alcoholic beverages.',
            features: [
                'Unlimited alcoholic beverages up to $15 per glass',
                'Specialty coffees and teas',
                'Fresh squeezed juices',
                'Premium bottled water'
            ]
        }
    ];

    // Initialize restaurant filtering functionality
    initializeRestaurantFilter();

    // Initialize package selection and modal
    initializePackages();

    // Initialize dynamic menu loading
    initializeMenuViewing();

    // Function to handle restaurant filtering
    function initializeRestaurantFilter() {
        const filterBtn = document.getElementById('search-restaurants');
        const cuisineSelect = document.getElementById('cuisine-type');
        const experienceSelect = document.getElementById('dining-experience');
        const mealPeriodSelect = document.getElementById('meal-period');
        const dietarySelect = document.getElementById('dietary');

        if (!filterBtn) return;

        filterBtn.addEventListener('click', function() {
            const selectedCuisine = cuisineSelect.value;
            const selectedExperience = experienceSelect.value;
            const selectedMealPeriod = mealPeriodSelect.value;
            const selectedDietary = dietarySelect.value;

            // Filter the restaurants based on selections
            const filteredRestaurants = restaurants.filter(restaurant => {
                // Check if restaurant matches all selected filters
                const cuisineMatch = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;
                const experienceMatch = selectedExperience === 'all' || restaurant.experience === selectedExperience;
                
                // Handle meal period matching
                let mealPeriodMatch = selectedMealPeriod === 'all';
                if (!mealPeriodMatch) {
                    if (restaurant.mealPeriod === 'all') {
                        mealPeriodMatch = true;
                    } else if (restaurant.mealPeriod === 'lunch-dinner') {
                        mealPeriodMatch = selectedMealPeriod === 'lunch' || selectedMealPeriod === 'dinner';
                    } else if (restaurant.mealPeriod === 'breakfast-lunch') {
                        mealPeriodMatch = selectedMealPeriod === 'breakfast' || selectedMealPeriod === 'lunch';
                    } else {
                        mealPeriodMatch = restaurant.mealPeriod === selectedMealPeriod;
                    }
                }
                
                // Check if restaurant has selected dietary option
                const dietaryMatch = selectedDietary === 'all' || 
                    (restaurant.dietary && restaurant.dietary.includes(selectedDietary));

                return cuisineMatch && experienceMatch && mealPeriodMatch && dietaryMatch;
            });

            // Update the display with filtered restaurants
            updateRestaurantDisplay(filteredRestaurants);
        });
        
        // Initial display of all restaurants
        updateRestaurantDisplay(restaurants);
    }

    // Update the restaurant display with filtered results
    function updateRestaurantDisplay(filteredRestaurants) {
        const restaurantGrid = document.querySelector('.restaurant-grid');
        if (!restaurantGrid) return;

        // Clear existing displayed restaurants
        restaurantGrid.innerHTML = '';

        if (filteredRestaurants.length === 0) {
            // Display message if no restaurants match filters
            restaurantGrid.innerHTML = `
                <div class="no-results">
                    <p>No restaurants match your selected criteria. Please try different filters.</p>
                </div>
            `;
            return;
        }

        // Create and append restaurant cards
        filteredRestaurants.forEach(restaurant => {
            const restaurantCard = createRestaurantCard(restaurant);
            restaurantGrid.appendChild(restaurantCard);
        });
    }

    // Create a restaurant card element
    function createRestaurantCard(restaurant) {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        
        // Create feature tags HTML
        let featuresHTML = '';
        if (restaurant.features && restaurant.features.length > 0) {
            featuresHTML = restaurant.features.map((feature, index) => {
                return `<span class="feature-tag"><i class="fas fa-${restaurant.featureIcons[index]}"></i> ${feature}</span>`;
            }).join('');
        }

        // Set meal period text based on value
        let mealPeriodText;
        switch(restaurant.mealPeriod) {
            case 'all': mealPeriodText = 'All Day'; break;
            case 'breakfast': mealPeriodText = 'Breakfast'; break;
            case 'lunch': mealPeriodText = 'Lunch'; break;
            case 'dinner': mealPeriodText = 'Dinner'; break;
            case 'breakfast-lunch': mealPeriodText = 'Breakfast & Lunch'; break;
            case 'lunch-dinner': mealPeriodText = 'Lunch & Dinner'; break;
            case 'late-night': mealPeriodText = 'Late Night'; break;
            default: mealPeriodText = restaurant.mealPeriod;
        }

        // Create price text
        let priceText;
        switch(restaurant.price) {
            case 'included': priceText = 'Included'; break;
            case 'premium': priceText = 'Premium'; break;
            default: priceText = restaurant.price;
        }

        // Set the HTML content
        card.innerHTML = `
            <div class="restaurant-image">
                <img src="${restaurant.image}" alt="${restaurant.name}">
                <div class="restaurant-badge ${restaurant.badge}">${restaurant.badgeText}</div>
            </div>
            <div class="restaurant-details">
                <h3>${restaurant.name}</h3>
                <div class="restaurant-meta">
                    <span><i class="fas fa-utensils"></i> ${capitalizeFirstLetter(restaurant.cuisine)}</span>
                    <span><i class="far fa-clock"></i> ${mealPeriodText}</span>
                    <span><i class="fas fa-dollar-sign"></i> ${priceText}</span>
                </div>
                <p>${restaurant.description}</p>
                <div class="restaurant-features">
                    ${featuresHTML}
                </div>
                <a href="restaurant-detail.html?id=${restaurant.id}" class="btn btn-secondary" data-restaurant-id="${restaurant.id}">View Menu</a>
            </div>
        `;

        return card;
    }

    // Function to initialize dining package functionality
    function initializePackages() {
        const packageLinks = document.querySelectorAll('[href^="booking.html?package="]');
        
        packageLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Extract package ID from URL
                const packageId = this.href.split('=')[1];
                const selectedPackage = diningPackages.find(pkg => pkg.id === packageId);
                
                if (selectedPackage) {
                    // Store selected package in session storage
                    sessionStorage.setItem('selectedDiningPackage', JSON.stringify(selectedPackage));
                    
                    // Redirect to booking page
                    window.location.href = `booking.html?package=${packageId}`;
                }
            });
        });
    }

    // Function to handle menu viewing
    function initializeMenuViewing() {
        const menuLinks = document.querySelectorAll('[href^="restaurant-detail.html"]');
        
        menuLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Extract restaurant ID from URL or data attribute
                const restaurantId = this.dataset.restaurantId || this.href.split('=')[1];
                const selectedRestaurant = restaurants.find(r => r.id === restaurantId);
                
                if (selectedRestaurant) {
                    // Store selected restaurant in session storage
                    sessionStorage.setItem('selectedRestaurant', JSON.stringify(selectedRestaurant));
                    
                    // Redirect to restaurant detail page
                    window.location.href = `restaurant-detail.html?id=${restaurantId}`;
                }
            });
        });
    }

    // Helper function to capitalize first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Add search functionality
    const searchField = document.querySelector('.search-container input');
    if (searchField) {
        searchField.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search field is empty, show all restaurants
                updateRestaurantDisplay(restaurants);
                return;
            }
            
            // Filter restaurants based on search term
            const searchResults = restaurants.filter(restaurant => {
                return restaurant.name.toLowerCase().includes(searchTerm) || 
                       restaurant.description.toLowerCase().includes(searchTerm) ||
                       restaurant.cuisine.toLowerCase().includes(searchTerm);
            });
            
            updateRestaurantDisplay(searchResults);
        });
    }

    // Add responsive navigation functionality
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('header');
    if (header) {
        const nav = header.querySelector('nav');
        header.insertBefore(navToggle, nav);
        
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Load Font Awesome if not already loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add ratings display functionality
    function displayRatings() {
        const restaurantCards = document.querySelectorAll('.restaurant-card');
        
        restaurantCards.forEach(card => {
            const restaurantName = card.querySelector('h3').textContent;
            const restaurant = restaurants.find(r => r.name === restaurantName);
            
            if (restaurant && restaurant.rating) {
                const metaDiv = card.querySelector('.restaurant-meta');
                const ratingSpan = document.createElement('span');
                ratingSpan.innerHTML = `<i class="fas fa-star"></i> ${restaurant.rating}/5`;
                ratingSpan.className = 'restaurant-rating';
                metaDiv.appendChild(ratingSpan);
            }
        });
    }
    
    // Call ratings display after a short delay to ensure DOM is fully rendered
    setTimeout(displayRatings, 100);
});
