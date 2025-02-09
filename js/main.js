// Age Verification
document.addEventListener('DOMContentLoaded', function() {
    const ageVerified = localStorage.getItem('ageVerified');
    const modal = document.getElementById('ageVerificationModal');
    
    if (!ageVerified) {
        modal.classList.add('active');
    }

    document.getElementById('confirmAge').addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        modal.classList.remove('active');
    });

    document.getElementById('rejectAge').addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const body = document.body;

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        body.classList.toggle('no-scroll');
        burger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            body.classList.remove('no-scroll');
            burger.classList.remove('active');
        }
    });

    // Handle dropdown menus on mobile
    const dropdowns = document.querySelectorAll('.header__dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.header__link');
        const submenu = dropdown.querySelector('.header__submenu');

        if (window.innerWidth <= 768) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            });
        }
    });
});

// Smooth scroll for anchor links
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

// Add header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// Initialize game cards slider if needed
const initGameSlider = () => {
    const slider = document.querySelector('.games__slider');
    if (!slider) return;

    // Add touch scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
};

// Initialize testimonial cards slider if needed
const initTestimonialSlider = () => {
    const slider = document.querySelector('.testimonials__grid');
    if (!slider) return;

    // Add touch scroll functionality similar to game slider
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
};

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    initGameSlider();
    initTestimonialSlider();
});

// Blog Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Category Filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('category-btn--active'));
            // Add active class to clicked button
            button.classList.add('category-btn--active');

            const category = button.textContent.toLowerCase();

            // Show all posts if "All" category is selected
            if (category === 'all') {
                blogCards.forEach(card => {
                    card.style.display = 'block';
                    // Add animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                });
                return;
            }

            // Filter posts by category
            blogCards.forEach(card => {
                const cardCategory = card.querySelector('.blog-card__category').textContent.toLowerCase();
                if (cardCategory === category) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter__form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                // Here you would typically send the email to your server
                // For now, we'll just show a success message
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Pagination
    const paginationNumbers = document.querySelectorAll('.pagination__number');
    const prevButton = document.querySelector('.pagination__btn--prev');
    const nextButton = document.querySelector('.pagination__btn--next');

    if (paginationNumbers.length) {
        paginationNumbers.forEach(number => {
            number.addEventListener('click', () => {
                // Remove active class from all numbers
                paginationNumbers.forEach(num => num.classList.remove('pagination__number--active'));
                // Add active class to clicked number
                number.classList.add('pagination__number--active');

                // Enable/disable prev/next buttons based on current page
                const currentPage = parseInt(number.textContent);
                prevButton.disabled = currentPage === 1;
                nextButton.disabled = currentPage === paginationNumbers[paginationNumbers.length - 1].textContent;

                // Here you would typically fetch and display the next page of posts
                // For now, we'll just scroll to top
                window.scrollTo({
                    top: document.querySelector('.blog-posts').offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });

        // Prev/Next button functionality
        prevButton.addEventListener('click', () => {
            const activeNumber = document.querySelector('.pagination__number--active');
            const prevNumber = activeNumber.previousElementSibling;
            if (prevNumber && prevNumber.classList.contains('pagination__number')) {
                prevNumber.click();
            }
        });

        nextButton.addEventListener('click', () => {
            const activeNumber = document.querySelector('.pagination__number--active');
            const nextNumber = activeNumber.nextElementSibling;
            if (nextNumber && nextNumber.classList.contains('pagination__number')) {
                nextNumber.click();
            }
        });
    }
});

// Helper function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Helper function to show notifications
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Add visible class after a small delay to trigger animation
    setTimeout(() => {
        notification.classList.add('notification--visible');
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('notification--visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }

    .notification--visible {
        transform: translateX(0);
    }

    .notification--success {
        background-color: #4CAF50;
    }

    .notification--error {
        background-color: #f44336;
    }
`;
document.head.appendChild(style); 

document.addEventListener('DOMContentLoaded', () => {
	initTournamentProgress();
	initGameStats();
});

// Game Stats Counter Animation
function initGameStats() {
    const stats = document.querySelectorAll('.game-stat__number');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const end = parseInt(target.dataset.end);
                animateValue(target, 0, end, 2000);
                observer.unobserve(target);
            }
        });
    }, options);

    stats.forEach(stat => observer.observe(stat));
}

// Tournament Progress Bars
function initTournamentProgress() {
	const progressBars = document.querySelectorAll('.progress-bar__fill');
	
	progressBars.forEach(bar => {
			const progress = parseInt(bar.dataset.progress);
			bar.style.width = `${progress}%`;
	});
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}