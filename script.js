document.addEventListener('DOMContentLoaded', () => {
    // --- Fail-safe: Ensure visibility even if JS fails later ---
    const revealAll = () => {
        document.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
    };

    // Initialize Lucide Icons with safety
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (e) { console.error("Lucide failed:", e); }

    // --- Scroll Animations (AOS) - Move to top for priority ---
    const observerOptions = {
        threshold: 0, // Trigger as soon as 1px is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // --- Theme Management with Safety ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        let savedTheme = 'light-mode';
        try {
            savedTheme = localStorage.getItem('theme') || 'light-mode';
        } catch (e) { console.warn("LocalStorage blocked"); }
        
        body.className = savedTheme;
        if (themeIcon) updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = body.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
            body.className = newTheme;
            try {
                localStorage.setItem('theme', newTheme);
            } catch (e) {}
            if (themeIcon) updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            const iconName = theme === 'light-mode' ? 'moon' : 'sun';
            themeIcon.setAttribute('data-lucide', iconName);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    // --- Language Management ---
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'pt';

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            langToggle.textContent = currentLang.toUpperCase();
            updateLanguage(currentLang);
        });
    }

    function updateLanguage(lang) {
        document.querySelectorAll('[data-pt]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                if (el.children.length === 0) {
                    el.textContent = text;
                }
            }
        });
        document.title = lang === 'pt' ? 'Judeus Verdadeiros | Início' : 'True Jews | Home';
    }

    // --- Special Effect: Mouse Follow Glow ---
    const glow = document.querySelector('.glow-sphere');
    if (glow) {
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
                glow.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 0';
                navbar.style.boxShadow = 'var(--card-shadow)';
            } else {
                navbar.style.padding = '1rem 0';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // --- Mobile Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.classList.add('glass');
                navLinks.style.padding = '2rem';
            }
        });
    }
    
    // Set timeout to reveal everything if observer fails for some reason
    setTimeout(revealAll, 2000);
});
