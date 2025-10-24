// =============================================
// LAW FIRM WEBSITE - MAIN JAVASCRIPT FILE
// =============================================
// This file handles all interactive functionality for the law firm website
// including navigation, sliders, forms, and accessibility features.

// =============================================
// MOBILE NAVIGATION SYSTEM
// =============================================
// Handles responsive hamburger menu for mobile devices

/**
 * Toggles mobile navigation menu visibility
 * Switches hamburger icon state and navigation menu display
 */
function toggleNav() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// =============================================
// HERO SLIDER SYSTEM
// =============================================
// Manages the main hero section image slider with auto-play and manual controls

/**
 * Global slider state variables
 * @type {number} currentSlideIndex - Current active slide (0-based)
 * @type {number|null} slideInterval - Auto-slide timer reference
 * @type {NodeList} slides - Collection of all slide elements
 * @type {NodeList} indicators - Collection of slide indicator buttons
 */
let currentSlideIndex = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

/**
 * Displays a specific slide and updates indicators
 * @param {number} index - Index of slide to show (0-based)
 */
function showSlide(index) {
    // Hide all slides and deactivate all indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Show current slide and activate corresponding indicator
    if (slides[index]) {
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
}

/**
 * Advances to next slide in sequence
 * Uses modulo arithmetic to cycle back to first slide after last
 */
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

/**
 * Goes back to previous slide in sequence
 * Uses modulo arithmetic to cycle to last slide from first
 */
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

/**
 * Jumps to specific slide (used by indicator buttons)
 * @param {number} index - 1-based slide number from indicator buttons
 */
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

/**
 * Starts automatic slide progression timer
 * Changes slide every 5 seconds (5000ms)
 */
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

/**
 * Stops automatic slide progression timer
 * Clears interval if it exists
 */
function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

/**
 * Restarts auto-slide timer (used after manual interaction)
 * Stops current timer and starts fresh countdown
 */
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

/**
 * Initializes the hero slider system
 * Sets up auto-play, hover pause functionality, and starts with first slide
 */
function initSlider() {
    if (slides.length > 0) {
        showSlide(0);           // Start with first slide
        startAutoSlide();       // Begin auto-rotation

        // Pause auto-slide on hover for better user experience
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoSlide);
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }
}

// =============================================
// GLOBAL FUNCTION EXPORTS
// =============================================
// Make functions available globally for HTML onclick handlers

/**
 * Global navigation function for slider arrow buttons
 * @param {number} direction - Direction to move (1 for next, -1 for previous)
 */
window.changeSlide = function(direction) {
    if (direction > 0) {
        nextSlide();
    } else {
        prevSlide();
    }
}

// Export currentSlide function for global access
window.currentSlide = currentSlide;

// =============================================
// CONTACT FORM SYSTEM
// =============================================
// Handles form validation and submission for the contact page

/**
 * EMAILJS CONFIGURATION
 * =======================================
 * To enable email sending, you need to:
 *
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an Email Service (Gmail, Outlook, etc.)
 * 3. Create an Email Template
 * 4. Replace the values below with your actual IDs
 * =======================================
 *
 * Find these values in your EmailJS Dashboard:
 * - Your Service ID (from Email Services)
 * - Your Template ID (from Email Templates)
 * - Your Public Key (from Account Settings)
 */

// REPLACE THESE VALUES WITH YOUR EMAILJS CONFIGURATION
const EMAILJS_SERVICE_ID = 'service_xxxxxxxxx';  // Replace with your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxxxx'; // Replace with your EmailJS Template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx';     // Replace with your EmailJS Public Key

/**
 * Validates and processes contact form submission with actual email sending
 * @param {Event} event - Form submit event
 * @returns {boolean} - Returns false to prevent default form submission
 */
function validateForm(event) {
    event.preventDefault();

    // Get form field values with null safety
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const service = document.getElementById('service')?.value;
    const message = document.getElementById('message')?.value.trim();

    // Validate required fields
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return false;
    }

    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }

    // Show loading state
    showLoading(true);

    // Prepare email data for EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone || 'Not provided',
        service_type: service || 'Not specified',
        message: message,
        to_name: 'Law Firm Team', // This will be sent to your configured email
        reply_to: email
    };

    // Send email using EmailJS
    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
    )
    .then(function() {
        showLoading(false);
        showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');

        // Reset form after successful submission
        event.target.reset();

        console.log('Email sent successfully:', {
            name, email, phone, service, message
        });
    })
    .catch(function(error) {
        showLoading(false);
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        console.error('EmailJS error:', error);

        if (EMAILJS_SERVICE_ID === 'service_xxxxxxxxx') {
            showFormMessage('Email service not configured. Please set up EmailJS credentials or contact us directly.', 'error');
        }
    });

    return false;
}

/**
 * Shows loading spinner on submit button
 * @param {boolean} show - Whether to show or hide loading state
 */
function showLoading(show) {
    const submitText = document.getElementById('submit-text');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (show) {
        submitText.textContent = 'Sending...';
        loadingSpinner.style.display = 'block';
    } else {
        submitText.textContent = 'Submit';
        loadingSpinner.style.display = 'none';
    }
}

/**
 * Shows success or error messages to user
 * @param {string} message - Message text to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showFormMessage(message, type) {
    const messageElement = document.getElementById('form-message');

    messageElement.textContent = message;
    messageElement.className = type === 'success' ? 'form-success' : 'form-error';
    messageElement.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

/**
 * Validates and processes newsletter form submission with actual email sending
 * @param {Event} event - Newsletter form submit event
 * @returns {boolean} - Returns false to prevent default form submission
 */
function validateNewsletter(event) {
    event.preventDefault();

    // Get newsletter email value with null safety
    const email = document.getElementById('newsletter-email')?.value.trim();

    // Validate required email field
    if (!email) {
        showFormMessage('Please enter your email address.', 'error');
        return false;
    }

    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }

    // Show loading state
    const submitText = document.getElementById('newsletter-submit-text');
    if (submitText) {
        submitText.textContent = 'Subscribing...';
    }

    // Prepare newsletter email data for EmailJS
    const newsletterParams = {
        subscriber_email: email,
        newsletter_signup: true,
        subscription_date: new Date().toLocaleDateString(),
        to_name: 'Law Firm Team',
        newsletter_message: 'New newsletter subscription received for email: ' + email
    };

    // Send newsletter subscription email using EmailJS
    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        newsletterParams,
        EMAILJS_PUBLIC_KEY
    )
    .then(function() {
        showLoading(false);
        showFormMessage('Thank you for subscribing to our newsletter! You will receive updates soon.', 'success');

        // Reset form after successful submission
        event.target.reset();

        console.log('Newsletter subscription:', { email });
    })
    .catch(function(error) {
        showLoading(false);
        showFormMessage('Sorry, there was an error processing your subscription. Please try again.', 'error');
        console.error('Newsletter EmailJS error:', error);

        if (EMAILJS_SERVICE_ID === 'service_xxxxxxxxx') {
            showFormMessage('Email service not configured. Please set up EmailJS credentials.', 'error');
        }
    });

    // Hide loading spinner if still showing
    const loadingSpinner = document.getElementById('newsletter-loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }

    return false;
}

// =============================================
// DYNAMIC COMPONENT LOADER
// =============================================
// Loads shared HTML components (header/footer) dynamically using fetch API

/**
 * Asynchronously loads HTML content into specified element
 * @param {string} id - ID of target HTML element
 * @param {string} filename - Name of HTML file to load
 */
async function includeHTML(id, filename) {
    const element = document.getElementById(id);
    if (element) {
        // Adjust path for subdirectories (pages folder vs root)
        const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
        const fullFilename = pathPrefix + filename;

        try {
            const response = await fetch(fullFilename);
            if (response.ok) {
                const text = await response.text();
                element.innerHTML = text;

                // Re-attach hamburger event after loading header
                if (id === 'header-placeholder') {
                    const hamburger = document.querySelector('.hamburger');
                    if (hamburger) {
                        hamburger.addEventListener('click', toggleNav);
                    }
                    // Adjust navigation links for subdirectories
                    adjustNavLinks();
                }
            }
        } catch (error) {
            console.error('Error loading ' + filename);
        }
    }
}

// =============================================
// NAVIGATION PATH ADJUSTER
// =============================================
// Fixes relative paths for navigation and assets based on current page location

/**
 * Adjusts navigation links, footer links, and images based on current page location
 * Fixes relative paths when pages are in subdirectories vs root level
 */
function adjustNavLinks() {
    // Check if current page is in pages subdirectory
    const isInPages = window.location.pathname.includes('/pages/');
    const linkPrefix = isInPages ? '../' : ''; // Go up one level if in pages folder

    // Update all navigation links to correct relative paths
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('index.html') || href.startsWith('pages/')) {
            link.setAttribute('href', linkPrefix + href);
        }
    });

    // Update footer links as well
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('pages/') || href.startsWith('/')) {
            link.setAttribute('href', linkPrefix + href);
        }
    });

    // Adjust logo image src for correct relative path
    const logoImg = document.querySelector('.logo img');
    if (logoImg) {
        logoImg.setAttribute('src', linkPrefix + 'images/logo.jpg');
    }

    // Add active states to navigation menu
    const currentPathname = window.location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // For index.html active state
        if (currentPathname === '/' || currentPathname.endsWith('/index.html')) {
            if (href.endsWith('index.html') || href === 'index.html') {
                link.classList.add('active');
            }
            return; // Don't process other checks
        }

        // For pages in /pages/ directory
        if (currentPathname.includes('/pages/')) {
            const pageName = currentPathname.split('/pages/')[1];
            if (pageName && href.includes(`pages/${pageName}`)) {
                link.classList.add('active');
            }
        }
    });
}

// =============================================
// DOM INITIALIZATION & EVENT LISTENERS
// =============================================
// Sets up all website functionality when DOM is fully loaded

/**
 * Main initialization function - runs when DOM is ready
 * Sets up all interactive features and loads shared components
 */
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // SHARED COMPONENT LOADING
    // =============================================
    // Load header and footer components dynamically
    includeHTML('header-placeholder', 'header.html');
    includeHTML('footer-placeholder', 'footer.html');

    // =============================================
    // SLIDER INITIALIZATION
    // =============================================
    // Set up hero slider with auto-play and controls
    initSlider();

    // =============================================
    // FORM HANDLING
    // =============================================
    // Attach form validation to contact and newsletter forms
    const contactForm = document.querySelector('form[action="#"]');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }

    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', validateNewsletter);
    }

    // =============================================
    // ATTORNEY BIO TOGGLE
    // =============================================
    // Handle expandable attorney biographies on attorneys page
    document.querySelectorAll('.bio-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const attorney = button.getAttribute('data-attorney');
            const bio = document.getElementById(attorney + '-bio');
            bio.classList.toggle('hidden');
            button.textContent = bio.classList.contains('hidden') ? 'View Bio' : 'Hide Bio';
        });
    });

    // =============================================
    // SMOOTH SCROLLING
    // =============================================
    // Enable smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // KEYBOARD NAVIGATION
    // =============================================
    // Enable arrow key navigation for hero slider
    document.addEventListener('keydown', function(e) {
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer && getComputedStyle(sliderContainer).display !== 'none') {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });
});

// =============================================
// ACCESSIBILITY FEATURES
// =============================================
// Enhances website accessibility for keyboard users and screen readers

/**
 * Keyboard navigation detection and focus management
 * Adds CSS class for keyboard users to enable enhanced focus indicators
 */
document.addEventListener('keydown', function(e) {
    // Tab navigation support for keyboard users
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

/**
 * Mouse usage detection to disable enhanced keyboard focus indicators
 * Removes keyboard-navigation class when mouse is used
 */
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});
