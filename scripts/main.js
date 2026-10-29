/* ============================================
   DEEZ ENTERTAINMENT - MAIN JAVASCRIPT
   Interactive Features & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1800);
    }

    // ============================================
    // PARTICLE SYSTEM
    // ============================================
    function createParticles() {
        const container = document.querySelector('.particles-container');
        if (!container) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random properties
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.5 + 0.3;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                opacity: ${opacity};
            `;

            container.appendChild(particle);
        }
    }
    createParticles();

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // MOBILE HAMBURGER MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll(
        '.card, .about-section, .event-card, .contact-card, .image-event'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // LIGHTBOX FOR GALLERY IMAGES
    // ============================================
    const galleryImages = document.querySelectorAll('.image-event');

    if (galleryImages.length > 0) {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <img src="" alt="Gallery Image">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ============================================
    // PARALLAX EFFECT ON BACKGROUND
    // ============================================
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.hero, .about-section');

                parallaxElements.forEach(el => {
                    const speed = 0.3;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================
    // TEXT SCRAMBLE EFFECT FOR HERO TITLE
    // ============================================
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let iteration = 0;
        let interval = null;

        function scrambleText() {
            clearInterval(interval);
            iteration = 0;

            interval = setInterval(() => {
                heroTitle.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        if (char === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                    heroTitle.textContent = originalText;
                }

                iteration += 1/3;
            }, 30);
        }

        // Trigger on page load after loading screen
        setTimeout(scrambleText, 2000);

        // Trigger on hover
        heroTitle.addEventListener('mouseenter', scrambleText);
    }

    // ============================================
    // MOUSE GLOW EFFECT
    // ============================================
    const cards = document.querySelectorAll('.card, .event-card, .about-section, .contact-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Add radial glow following cursor
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(57, 255, 20, 0.1) 0%, var(--bg-card) 50%)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.background = 'var(--bg-card)';
        });
    });

    // ============================================
    // COUNTDOWN TIMER FOR UPCOMING EVENTS
    // ============================================
    const upcomingEvents = document.querySelectorAll('.event-card:first-child ul li');

    upcomingEvents.forEach(event => {
        const text = event.textContent;
        const dateMatch = text.match(/—\s*(.+)$/);

        if (dateMatch) {
            const eventDate = new Date(dateMatch[1] + ', 2025');
            const now = new Date();

            if (eventDate > now) {
                const diffTime = eventDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                const countdownBadge = document.createElement('span');
                countdownBadge.className = 'event-date';
                countdownBadge.textContent = `${diffDays} days left`;
                countdownBadge.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
                event.appendChild(countdownBadge);
            }
        }
    });

    // ============================================
    // TYPING EFFECT FOR CONTACT INFO
    // ============================================
    const contactItems = document.querySelectorAll('.contact-list li');

    if (contactItems.length > 0) {
        contactItems.forEach((item, index) => {
            const originalHTML = item.innerHTML;
            const textContent = item.textContent;
            item.innerHTML = '';

            // Add icon
            const iconSpan = document.createElement('span');
            iconSpan.className = 'contact-icon';
            if (textContent.includes('Email')) iconSpan.textContent = '📧';
            else if (textContent.includes('Phone')) iconSpan.textContent = '📞';
            else if (textContent.includes('Address')) iconSpan.textContent = '📍';
            item.appendChild(iconSpan);

            const textSpan = document.createElement('span');
            textSpan.innerHTML = originalHTML;
            textSpan.style.opacity = '0';
            item.appendChild(textSpan);

            setTimeout(() => {
                textSpan.style.transition = 'opacity 0.5s ease';
                textSpan.style.opacity = '1';
            }, 500 + (index * 300));
        });
    }

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c🎵 DEEZ ENTERTAINMENT 🎵', 'color: #39ff14; font-size: 24px; font-weight: bold;');
    console.log('%cDEEZ FOR THE GEEZ — STRICTLY FOR THE GEEZ', 'color: #ffd700; font-size: 14px;');
    console.log('%cBuilt with ❤️ for Sierra Leone', 'color: #39ff14; font-size: 12px;');

});