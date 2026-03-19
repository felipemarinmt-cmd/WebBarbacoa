document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const body = document.body;
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            body.classList.toggle('mobile-menu-open');
            // Change icon based on state
            const icon = navToggle.querySelector('i');
            if (body.classList.contains('mobile-menu-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('mobile-menu-open')) {
                body.classList.remove('mobile-menu-open');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true }); // passive: true improves scroll performance
    
    // Active Link on Scroll using IntersectionObserver (Better for fluidity)
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Digital Menu Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.menu-tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active to clicked button
            btn.classList.add('active');

            // Show target pane
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // 4. Reveal "Habla en Whatsapp" Text after a few seconds
    setTimeout(() => {
        const floatText = document.querySelector('.whatsapp-float-text');
        if(floatText) {
            floatText.style.opacity = '1';
            floatText.style.visibility = 'visible';
            
            // Hide it again after 5 seconds
            setTimeout(() => {
                floatText.style.opacity = '';
                floatText.style.visibility = '';
            }, 5000);
        }
    }, 2000);

});
