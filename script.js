document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    const loader = document.querySelector('.loader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('fade-out');
        }, 1000);
    });

    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Projects Slider
    const track = document.querySelector('.projects-track');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const projects = document.querySelectorAll('.project-card');
    
    if (track && prevBtn && nextBtn) {
        let currentPosition = 0;
        const projectWidth = projects[0].offsetWidth + 30; // width + gap
        
        nextBtn.addEventListener('click', function() {
            currentPosition -= projectWidth;
            if (currentPosition < - (projects.length - 3) * projectWidth) {
                currentPosition = 0;
            }
            track.style.transform = `translateX(${currentPosition}px)`;
        });
        
        prevBtn.addEventListener('click', function() {
            currentPosition += projectWidth;
            if (currentPosition > 0) {
                currentPosition = - (projects.length - 3) * projectWidth;
            }
            track.style.transform = `translateX(${currentPosition}px)`;
        });
    }
    
    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const animationClass = element.dataset.animation || 'animate__fadeInUp';
                element.classList.add(animationClass);
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    if (progressBars.length > 0) {
        const animateProgressBars = function() {
            progressBars.forEach(bar => {
                const width = bar.dataset.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        };
        
        // Run when progress bars are in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.progress-bars').forEach(section => {
            observer.observe(section);
        });
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    menuBtn.addEventListener('click', function() {
        navUl.classList.toggle('open');
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
    }
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Language Switcher (simple demo)
    const langSwitcher = document.getElementById('langSwitcher');
    const translations = {
        en: {
            home: "Home",
            about: "About",
            work: "Work",
            skills: "Skills",
            contact: "Contact",
            subtitle: "Your Profession/Tagline",
            aboutMe: "About Me",
            myWork: "My Work",
            mySkills: "My Skills",
            getInTouch: "Get In Touch",
            downloadResume: "Download Resume",
            sendMessage: "Send Message"
        },
        km: {
            home: "ទំព័រដើម",
            about: "អំពីខ្ញុំ",
            work: "ការងារ",
            skills: "ជំនាញ",
            contact: "ទំនាក់ទំនង",
            subtitle: "មុខរបរ/ពាក្យស្លោករបស់អ្នក",
            aboutMe: "អំពីខ្ញុំ",
            myWork: "ការងាររបស់ខ្ញុំ",
            mySkills: "ជំនាញរបស់ខ្ញុំ",
            getInTouch: "ទាក់ទងមកខ្ញុំ",
            downloadResume: "ទាញយកប្រវត្តិរូប",
            sendMessage: "ផ្ញើសារ"
        }
    };

    function setLanguage(lang) {
        document.querySelectorAll('nav ul li a')[0].textContent = translations[lang].home;
        document.querySelectorAll('nav ul li a')[1].textContent = translations[lang].about;
        document.querySelectorAll('nav ul li a')[2].textContent = translations[lang].work;
        document.querySelectorAll('nav ul li a')[3].textContent = translations[lang].skills;
        document.querySelectorAll('nav ul li a')[4].textContent = translations[lang].contact;
        document.querySelector('.subtitle').textContent = translations[lang].subtitle;
        document.querySelector('.about .section-title').textContent = translations[lang].aboutMe;
        document.querySelector('.work .section-title').textContent = translations[lang].myWork;
        document.querySelector('.skills .section-title').textContent = translations[lang].mySkills;
        document.querySelector('.contact .section-title').textContent = translations[lang].getInTouch;
        document.querySelector('.about-text .btn-primary').textContent = translations[lang].downloadResume;
        document.querySelector('.contact-form .btn-primary').textContent = translations[lang].sendMessage;
        // Footer links
        document.querySelectorAll('.footer-links a')[0].textContent = translations[lang].home;
        document.querySelectorAll('.footer-links a')[1].textContent = translations[lang].about;
        document.querySelectorAll('.footer-links a')[2].textContent = translations[lang].work;
        document.querySelectorAll('.footer-links a')[3].textContent = translations[lang].skills;
        document.querySelectorAll('.footer-links a')[4].textContent = translations[lang].contact;
    }

    langSwitcher.addEventListener('change', function() {
        setLanguage(this.value);
        localStorage.setItem('lang', this.value);
    });

    // On load, set language from localStorage or default
    const savedLang = localStorage.getItem('lang') || 'en';
    langSwitcher.value = savedLang;
    setLanguage(savedLang);
});