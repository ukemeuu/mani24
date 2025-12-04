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

// Enhanced Scroll Animations for New Sections

// Animate problem agitation cards with stagger
const problemCards = document.querySelectorAll('.animate-stagger-item');
if (problemCards.length \u003e 0) {
    gsap.from(problemCards, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: problemCards[0].parentElement,
            start: 'top 75%',
        }
    });
}

// Animate slide-up elements
const slideUpElements = document.querySelectorAll('.animate-slide-up');
slideUpElements.forEach(el => {
    gsap.from(el, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
        }
    });
});

// Animate scale-in elements
const scaleInElements = document.querySelectorAll('.animate-scale-in');
scaleInElements.forEach(el => {
    gsap.from(el, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
        }
    });
});

// Pin "Why Trust Us" section for emphasis
const trustSection = document.querySelector('.py-32.bg-gradient-to-b.from-neutral-950.to-black');
if (trustSection) {
    ScrollTrigger.create({
        trigger: trustSection,
        start: 'top top',
        end: '+=500',
        pin: false, // Set to true if you want pinning effect
        scrub: 1,
    });
}

// Parallax effect for hero section
const heroSection = document.querySelector('.min-h-screen.flex.items-center');
if (heroSection) {
    gsap.to(heroSection.querySelector('.relative.z-10'), {
        y: 100,
        opacity: 0.5,
        scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
        }
    });
}

// Animate RED FLAGS text with bounce
const redFlagsText = document.querySelector('.text-5xl.md\\:text-6xl.font-bold.text-red-500');
if (redFlagsText) {
    gsap.from(redFlagsText, {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: redFlagsText,
            start: 'top 85%',
        }
    });
}

// Smooth reveal for cost awareness section
const costSection = document.querySelector('.py-24.bg-black.border-y');
if (costSection) {
    gsap.from(costSection.querySelector('.p-12.rounded-3xl'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: costSection,
            start: 'top 75%',
        }
    });
}

