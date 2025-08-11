// DOM Elements
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(mobileMenuBtn);

const navList = document.querySelector('nav ul');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const musicSection = document.querySelector('.music-section');
const videoSection = document.querySelector('.video-section');
const giftSection = document.querySelector('.gift-section');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
    mobileMenuBtn.innerHTML = navList.classList.contains('show') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navList.classList.contains('show')) {
        navList.classList.remove('show');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navList.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Scroll-based Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('ipad-iphone-img')) {
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.ipad-iphone-img, .hero-section .container, .about-music, .gift-content').forEach(el => {
    observer.observe(el);
});

// Header Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Active Section Highlight
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav ul a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    nav ul a.active li {
        border-bottom: 2px solid white;
    }
`;
document.head.appendChild(style);

// Add Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
document.body.appendChild(backToTopBtn);

// Add styles for back to top button
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--purple300);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 99;
        border: none;
        transition: all 0.3s ease;
    }
    
    .back-to-top:hover {
        background: var(--purple500);
        transform: translateY(-3px);
    }
    
    .back-to-top.show {
        display: flex;
    }
`;
document.head.appendChild(backToTopStyle);

// Show/Hide Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Back to Top Functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect for buttons
document.querySelectorAll('.primary-btn, .secondary-btn').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);
