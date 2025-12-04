// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic (Desktop only)
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (!isMobile) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows immediately
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover class to body when hovering interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .menu-item, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }
} else {
    // Remove cursor elements on mobile
    document.body.style.cursor = 'auto';
}

// Text Reveal Animation
const splitTypes = document.querySelectorAll('.reveal-type');

if (splitTypes.length > 0 && typeof SplitType !== 'undefined') {
    splitTypes.forEach((char, i) => {
        const text = new SplitType(char, { types: 'chars, words' });

        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: char,
                start: 'top 80%',
                end: 'top 20%',
                scrub: true,
                markers: false
            },
            opacity: 0.2,
            stagger: 0.1
        });
    });
}

// Fade Up Animation
const fadeUpElements = document.querySelectorAll('.fade-up');
fadeUpElements.forEach(el => {
    gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            }
        }
    );
});

// Horizontal Scroll for Industries (if applicable, or just simple stagger)
const industryItems = document.querySelectorAll('#industries .group');
gsap.from(industryItems, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
        trigger: '#industries',
        start: 'top 75%',
    }
});

// Navbar Blur on Scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('bg-black/80', 'backdrop-blur-md', 'border-b', 'border-neutral-800');
        header.classList.remove('bg-transparent', 'border-transparent');
    } else {
        header.classList.remove('bg-black/80', 'backdrop-blur-md', 'border-b', 'border-neutral-800');
        header.classList.add('bg-transparent', 'border-transparent');
    }
});

// Horizontal Scroll Indicator for Services
const servicesContainer = document.querySelector('.services-scroll-container');
const scrollIndicators = document.querySelectorAll('#services .flex.justify-center div');

if (servicesContainer && scrollIndicators.length > 0) {
    servicesContainer.addEventListener('scroll', () => {
        const scrollPercentage = (servicesContainer.scrollLeft / (servicesContainer.scrollWidth - servicesContainer.clientWidth)) * 100;

        // Update indicators based on scroll position
        scrollIndicators.forEach((indicator, index) => {
            const threshold = (100 / (scrollIndicators.length - 1)) * index;
            if (scrollPercentage >= threshold - 10 && scrollPercentage <= threshold + 10) {
                indicator.classList.add('bg-yellow-400');
                indicator.classList.remove('bg-neutral-700');
            } else {
                indicator.classList.remove('bg-yellow-400');
                indicator.classList.add('bg-neutral-700');
            }
        });
    });
}
