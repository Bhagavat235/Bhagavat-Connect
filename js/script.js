// script.js - Main JavaScript file for Bhagavat Connect Website

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

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(filterBtn => {
                    filterBtn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
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

    // Language Switcher
    const langButtons = document.querySelectorAll('.language-btn');
    
    if (langButtons.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
                
                // Update active button
                langButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Save selected language to localStorage
                localStorage.setItem('selectedLanguage', lang);
            });
        });
        
        // Check for saved language preference
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            switchLanguage(savedLanguage);
            
            // Update active button
            langButtons.forEach(btn => {
                if (btn.getAttribute('data-lang') === savedLanguage) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }

    // Function to switch language
    function switchLanguage(lang) {
        document.documentElement.lang = lang;
        
        // Hide all language elements
        document.querySelectorAll('[lang]').forEach(el => {
            el.style.display = 'none';
        });
        
        // Show elements for the selected language
        document.querySelectorAll(`[lang="${lang}"]`).forEach(el => {
            el.style.display = 'block';
            
            // Special handling for inline elements
            if (el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'BUTTON') {
                el.style.display = 'inline-block';
            }
            
            // Special handling for list items
            if (el.tagName === 'LI') {
                el.style.display = 'list-item';
            }
        });
    }

    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelector('.testimonial-dots');
    
    if (testimonialItems.length > 0 && testimonialDots) {
        // Create dots
        testimonialItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('testimonial-dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.setAttribute('data-index', index);
            testimonialDots.appendChild(dot);
        });
        
        // Handle dot clicks
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });
        
        // Function to show testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonialItems.forEach(item => {
                item.style.display = 'none';
            });
            
            // Show selected testimonial
            testimonialItems[index].style.display = 'block';
            
            // Update dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            dots[index].classList.add('active');
        }
        
        // Show first testimonial initially
        showTestimonial(0);
        
        // Auto slide testimonials
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        }, 5000);
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
            
            // Here you would normally send the form data to a server
            // For this demo, we'll just show a success message
            alert(document.documentElement.lang === 'th' ? 'ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับโดยเร็วที่สุด' : 'Thank you for your message. We will contact you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = this.querySelector('.newsletter-input').value;
            
            // Simple validation
            if (!email) {
                alert(document.documentElement.lang === 'th' ? 'กรุณากรอกอีเมลของคุณ' : 'Please enter your email');
                return;
            }
            
            // Here you would normally send the email to a server
            // For this demo, we'll just show a success message
            alert(document.documentElement.lang === 'th' ? 'ขอบคุณสำหรับการสมัคร! คุณจะได้รับข่าวสารจากเราเร็วๆ นี้' : 'Thank you for subscribing! You will receive our news soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Scroll Animation
    const scrollElements = document.querySelectorAll('.service-card, .portfolio-item, .about-img-wrapper, .about-text, .team-member, .testimonial-item, .contact-info, .contact-form');
    
    if (scrollElements.length > 0) {
        const elementInView = (el, offset = 100) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
            );
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
            scrollElements.forEach((el) => {
                if (elementInView(el, 100)) {
                    displayScrollElement(el);
                } else {
                    hideScrollElement(el);
                }
            });
        };

        // Initialize elements
        scrollElements.forEach((el) => {
            hideScrollElement(el);
        });

        // Add scroll event
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });

        // Run once to check initial state
        handleScrollAnimation
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

    // Add active class to current section in navigation
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavItem);
    
    // Run once to set initial active section
    setActiveNavItem();

    // Handle Portfolio Item Clicks for Lightbox Effect
    const portfolioZoomBtns = document.querySelectorAll('.portfolio-zoom');
    if (portfolioZoomBtns.length > 0) {
        portfolioZoomBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the portfolio image
                const portfolioItem = this.closest('.portfolio-item');
                const portfolioImg = portfolioItem.querySelector('img').src;
                const portfolioTitle = portfolioItem.querySelector('h3').innerText;
                const portfolioDesc = portfolioItem.querySelector('p').innerText;
                
                // Create lightbox elements
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${portfolioImg}" alt="${portfolioTitle}">
                        <div class="lightbox-caption">
                            <h3>${portfolioTitle}</h3>
                            <p>${portfolioDesc}</p>
                        </div>
                    </div>
                `;
                
                // Add lightbox to body
                document.body.appendChild(lightbox);
                
                // Prevent body scrolling
                document.body.style.overflow = 'hidden';
                
                // Show lightbox with animation
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
                
                // Close lightbox when clicking on close button or outside the content
                const closeBtn = lightbox.querySelector('.lightbox-close');
                closeBtn.addEventListener('click', closeLightbox);
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeLightbox();
                    }
                });
                
                function closeLightbox() {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
    }

    // Add Lightbox CSS to head
    const lightboxCSS = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            margin: auto;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            margin: 0 auto;
            border: 5px solid #fff;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 30px;
            color: #fff;
            cursor: pointer;
        }
        
        .lightbox-caption {
            color: #fff;
            text-align: center;
            padding: 20px;
        }
        
        .lightbox-caption h3 {
            margin-bottom: 10px;
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = lightboxCSS;
    document.head.appendChild(styleElement);

    // Add Preloader HTML if not present in the markup
    if (!document.querySelector('.preloader')) {
        const preloaderHTML = `
            <div class="preloader">
                <div class="loader"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
    }
});
