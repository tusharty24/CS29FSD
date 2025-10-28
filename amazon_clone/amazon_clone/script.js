// Amazon Clone JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeCarousel();
    initializeCart();
    initializeSearch();
    initializeProductInteractions();
});

// Hero Carousel Functionality
function initializeCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    // Auto-rotate carousel every 5 seconds
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// Cart Functionality
function initializeCart() {
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Add visual feedback
            button.style.backgroundColor = '#28a745';
            button.textContent = 'Added!';
            
            setTimeout(() => {
                button.style.backgroundColor = '#FF9900';
                button.textContent = 'Add to Cart';
            }, 1500);
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // In a real application, this would redirect to search results
            alert(`Searching for: "${searchTerm}"`);
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Search suggestions (placeholder functionality)
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        if (value.length > 2) {
            // In a real application, this would show search suggestions
            console.log(`Showing suggestions for: ${value}`);
        }
    });
}

// Product Interactions
function initializeProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    const dealCards = document.querySelectorAll('.deal-card');
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Product card click handlers
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            // In a real application, this would navigate to product page
            alert(`Viewing product: ${productName}`);
        });
    });
    
    // Deal card click handlers
    dealCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            alert(`Viewing deal: ${productName}`);
        });
    });
    
    // Category card click handlers
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            alert(`Browsing category: ${categoryName}`);
        });
    });
}

// Navigation Menu Toggle (for mobile)
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('mobile-open');
}

// Delivery Location Change
function changeDeliveryLocation() {
    const newLocation = prompt('Enter your ZIP code:');
    if (newLocation) {
        document.querySelector('.location').textContent = newLocation;
    }
}

// Account Menu Toggle
function toggleAccountMenu() {
    // In a real application, this would show/hide account dropdown
    alert('Account menu would open here');
}

// Language Selection
function changeLanguage() {
    // In a real application, this would show language options
    alert('Language selection would open here');
}

// Deal Timer Countdown
function initializeDealTimers() {
    const dealTimers = document.querySelectorAll('.deal-timer');
    
    dealTimers.forEach(timer => {
        const timeText = timer.textContent;
        const timeMatch = timeText.match(/(\d+)h (\d+)m/);
        
        if (timeMatch) {
            let hours = parseInt(timeMatch[1]);
            let minutes = parseInt(timeMatch[2]);
            let totalMinutes = hours * 60 + minutes;
            
            const countdown = setInterval(() => {
                totalMinutes--;
                
                if (totalMinutes <= 0) {
                    timer.textContent = 'Deal Expired';
                    timer.style.color = '#999';
                    clearInterval(countdown);
                } else {
                    const h = Math.floor(totalMinutes / 60);
                    const m = totalMinutes % 60;
                    timer.textContent = `Ends in: ${h}h ${m}m`;
                }
            }, 60000); // Update every minute
        }
    });
}

// Initialize deal timers
initializeDealTimers();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add event listeners for interactive elements
document.addEventListener('click', function(e) {
    if (e.target.closest('.delivery-location')) {
        changeDeliveryLocation();
    }
    
    if (e.target.closest('.account')) {
        toggleAccountMenu();
    }
    
    if (e.target.closest('.language')) {
        changeLanguage();
    }
    
    if (e.target.closest('.all-menu')) {
        toggleMobileMenu();
    }
});

// Lazy loading for images (performance optimization)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    initializeLazyLoading();
}

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Error handling for failed image loads
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/300x200/CCCCCC/666666?text=Image+Not+Found';
    });
});

// Console log for debugging
console.log('Amazon Clone JavaScript loaded successfully!');

