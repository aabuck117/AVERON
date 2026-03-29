document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only run cursor logic on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add slight delay to outline for smooth effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .magnetic');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hovering');
            });
        });
    }

    // 2. Magnetic Buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const position = el.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            
            // If it has text/icon inside, move them slightly more for parallax
            const children = el.children;
            for(let i=0; i<children.length; i++) {
                children[i].style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
            const children = el.children;
            for(let i=0; i<children.length; i++) {
                children[i].style.transform = 'translate(0px, 0px)';
            }
        });
    });

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});
