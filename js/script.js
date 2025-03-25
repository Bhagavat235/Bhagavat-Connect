// Main JavaScript for Bhagavat Connect Website

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('loaded');
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle menu button appearance
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset menu button appearance
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '20px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Counter Animation for Stats
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.closest('.stat-item').getAttribute('data-count'));
                        let count = 0;
                        
                        const updateCounter = () => {
                            if (count < target) {
                                count++;
                                counter.innerText = count;
                                setTimeout(updateCounter, 20);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        
                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Expertise Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Get tab ID
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(tabBtn => {
                    tabBtn.classList.remove('active');
                });
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                // Toggle active class
                item.classList.toggle('active');
                
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert(document.documentElement.lang === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all required fields');
                return;
            }
            
            // Success message
            alert(document.documentElement.lang === 'th' ? 'ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับโดยเร็วที่สุด' : 'Thank you for your message. We will contact you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Scroll Animation
    const scrollElements = document.querySelectorAll('.service-card, .about-img-wrapper, .about-text, .team-member, .contact-info, .contact-form');
    if (scrollElements.length > 0) {
        const elementInView = (el, offset = 100) => {
            const elementTop = el.getBoundingClientRect().top;
            return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset);
        };
        
        const displayScrollElement = (element) => {
            element.classList.add('scrolled');
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        };
        
        const hideScrollElement = (element) => {
            element.classList.remove('scrolled');
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
        };
        
        const handleScrollAnimation = () => {
            scrollElements.forEach(el => {
                if (elementInView(el, 100)) {
                    displayScrollElement(el);
                } else {
                    hideScrollElement(el);
                }
            });
        };
        
        // Initialize elements
        scrollElements.forEach(el => {
            hideScrollElement(el);
        });
        
        // Add scroll event
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
        
        // Run once to check initial state
        handleScrollAnimation();
    }

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's not a section link
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Calculate header height to offset scroll position
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add 'loaded' class to body when everything is loaded
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});
