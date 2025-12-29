// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scroll-top');
const preloader = document.getElementById('preloader');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contact-form');
const statNumbers = document.querySelectorAll('.stat-number');

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        animateStats();
    }, 1500);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link on scroll
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Show/hide scroll top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll to top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Tab Functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        // Remove active from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active to clicked button and corresponding panel
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        dots[i].classList.remove('active');
    });
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto slide testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}, 5000);

// Animate Stats Counter
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target.toLocaleString() + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const test = document.getElementById('test').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    const whatsappMessage = `Hello, I would like to book an appointment.%0A%0AName: ${name}%0APhone: ${phone}%0ATest: ${test || 'Not specified'}%0AMessage: ${message || 'N/A'}`;

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/917387331826?text=${whatsappMessage}`, '_blank');

    // Show success message
    alert('Redirecting to WhatsApp to complete your booking!');
    contactForm.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all service cards, feature items, and gallery items
document.querySelectorAll('.service-card, .feature-item, .gallery-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animate class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Gallery Auto Scroll
const galleryScroll = document.querySelector('.gallery-scroll');
let galleryScrollAmount = 0;
let galleryDirection = 1; // 1 = right, -1 = left
let galleryAutoScroll;

function startGalleryAutoScroll() {
    galleryAutoScroll = setInterval(() => {
        if (galleryScroll) {
            const maxScroll = galleryScroll.scrollWidth - galleryScroll.clientWidth;
            galleryScrollAmount += 320 * galleryDirection; // Scroll by one image width

            // Reverse direction at edges
            if (galleryScrollAmount >= maxScroll) {
                galleryDirection = -1;
            } else if (galleryScrollAmount <= 0) {
                galleryDirection = 1;
            }

            galleryScroll.scrollTo({
                left: galleryScrollAmount,
                behavior: 'smooth'
            });
        }
    }, 3000); // Auto scroll every 3 seconds
}

// Start auto scroll
startGalleryAutoScroll();

// Pause on hover
if (galleryScroll) {
    galleryScroll.addEventListener('mouseenter', () => {
        clearInterval(galleryAutoScroll);
    });

    galleryScroll.addEventListener('mouseleave', () => {
        startGalleryAutoScroll();
    });

    // Update scroll position when user manually scrolls
    galleryScroll.addEventListener('scroll', () => {
        galleryScrollAmount = galleryScroll.scrollLeft;
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (scrolled < hero.offsetHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Add stagger delay to animated elements
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.feature-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.05}s`;
});

// Typing effect for subtitle (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Create floating particles in hero
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(231, 76, 60, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 5 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// Ripple effect on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Magnetic effect on social icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
    });

    icon.addEventListener('mouseleave', function () {
        this.style.transform = 'translate(0, 0) scale(1)';
    });
});

console.log('Om Clinical Laboratory Website Loaded Successfully!');
