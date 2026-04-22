document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // --- Theme Management ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.className = savedTheme;
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
        body.className = newTheme;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const iconName = theme === 'light-mode' ? 'moon' : 'sun';
        themeIcon.setAttribute('data-lucide', iconName);
        lucide.createIcons(); // Refresh icons
    }

    // --- Language Management ---
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = 'pt'; // Default

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        langToggle.textContent = currentLang.toUpperCase();
        updateLanguage(currentLang);
    });

    function updateLanguage(lang) {
        document.querySelectorAll('[data-pt]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                // If it's a link or simple text, update textContent
                // If we need to preserve HTML structure, we might need more complex logic,
                // but for this MVP, textContent is safer.
                if (el.children.length === 0) {
                    el.textContent = text;
                } else {
                    // For elements with children (like headers with spans), we target text nodes
                    // or handle specifically. Here we'll just update elements that are intended to be translated.
                    el.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                            // This is a bit simplified; in a real app we'd use a translation map
                        }
                    });
                    // For now, let's keep it simple: only translate leaf nodes or specifically marked ones.
                    if (el.classList.contains('hero-title') || el.classList.contains('logo-text')) {
                        // Special handling for nested structures if needed
                    } else {
                        el.textContent = text;
                    }
                }
            }
        });
        
        // Update document title and description
        const title = lang === 'pt' ? 'Judeus Verdadeiros | Início' : 'True Jews | Home';
        document.title = title;
    }

    // --- Scroll Animations (AOS) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // --- Special Effect: Mouse Follow Glow ---
    const glow = document.querySelector('.glow-sphere');
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const x = e.clientX;
            const y = e.clientY;
            
            // Move the glow sphere slightly towards the mouse (parallax effect)
            const moveX = (x - window.innerWidth / 2) * 0.05;
            const moveY = (y - window.innerHeight / 2) * 0.05;
            
            glow.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = 'var(--card-shadow)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Mobile Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.classList.add('glass');
        navLinks.style.padding = '2rem';
    });
});
