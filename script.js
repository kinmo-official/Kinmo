/**

Kinmo — High-End Animation & Particle Engine

Specialization: Luxury Micro-interactions & 60FPS Performance Optimization

Framework: Pure Vanilla JavaScript (No External Libraries)
*/


document.addEventListener('DOMContentLoaded', () => {
// Structural Initializers
initPreloaderAndHeroReveal();
initLuxuryNavbar();
initPremiumParticleSystem();
initLuxuryCursorEffects();
initScrollInteractions();
initProductCard3DTilt();
initMagneticButtons();
initContactIconsFloating();
});

/* ==========================================================================

1. PREMIUM REVEAL (LOGO, LETTER-BY-LETTER TITLE & HERO ELEMENTS)
========================================================================== */
function initPreloaderAndHeroReveal() {
const preloader = document.getElementById('preloader');
const heroTitle = document.querySelector('.hero-brand-title');
const heroTagline = document.querySelector('.hero-tagline');
const heroBtn = document.querySelector('.btn-premium');



if (!heroTitle) return;  

// Prepare Title for Letter-by-Letter Reveal  
const textStr = heroTitle.textContent.trim();  
heroTitle.innerHTML = '';  
heroTitle.style.opacity = '1';  
  
const letterSpans = [...textStr].map((char) => {  
    const span = document.createElement('span');  
    span.textContent = char;  
    span.style.display = 'inline-block';  
    span.style.opacity = '0';  
    span.style.transform = 'translateY(20px) scale(0.9)';  
    span.style.filter = 'blur(5px)';  
    span.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s cubic-bezier(0.25, 1, 0.5, 1)';  
    heroTitle.appendChild(span);  
    return span;  
});  

// Hold elements initially for structural sequence  
if (heroTagline) {  
    heroTagline.style.opacity = '0';  
    heroTagline.style.transform = 'translateY(25px)';  
    heroTagline.style.transition = 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';  
}  
if (heroBtn) {  
    heroBtn.style.opacity = '0';  
    heroBtn.style.transform = 'translateY(15px)';  
    heroBtn.style.transition = 'opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1)';  
}  

window.addEventListener('load', () => {  
    setTimeout(() => {  
        // Drop Preloader Screen  
        preloader.style.opacity = '0';  
        preloader.style.visibility = 'hidden';  
          
        // Staggered Letter Reveal Sequence  
        letterSpans.forEach((span, index) => {  
            setTimeout(() => {  
                span.style.opacity = '1';  
                span.style.transform = 'translateY(0) scale(1)';  
                span.style.filter = 'blur(0)';  
            }, index * 60);  
        });  

        // Reveal Tagline  
        setTimeout(() => {  
            if (heroTagline) {  
                heroTagline.style.opacity = '1';  
                heroTagline.style.transform = 'translateY(0)';  
            }  
        }, letterSpans.length * 60 + 200);  

        // Reveal Explore Button  
        setTimeout(() => {  
            if (heroBtn) {  
                heroBtn.style.opacity = '1';  
                heroBtn.style.transform = 'translateY(0)';  
            }  
        }, letterSpans.length * 60 + 600);  

    }, 2000); // Strict luxury loading delay constraint  
});

}

/* ==========================================================================
2. INTELLIGENT SMART NAVBAR (SHOW/HIDE ON SCROLL & GLASS BLUR)
========================================================================== */
function initLuxuryNavbar() {
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {  
    const currentScrollY = window.scrollY;  

    // Apply Glass Blur Effect when moving from top boundary  
    if (currentScrollY > 50) {  
        navbar.classList.add('scrolled');  
    } else {  
        navbar.classList.remove('scrolled');  
    }  

    // Hide on Scroll Down, Show on Scroll Up  

    
      
    lastScrollY = currentScrollY;  
}, { passive: true });

}

/* ==========================================================================
3. HIGH-END MATHEMATICAL PARTICLE CANVAS SYSTEM (HERO ONLY)
========================================================================== */
function initPremiumParticleSystem() {
const hero = document.getElementById('home');
if (!hero) return;

// Build Native Canvas  
const canvas = document.createElement('canvas');  
canvas.style.position = 'absolute';  
canvas.style.top = '0';  
canvas.style.left = '0';  
canvas.style.width = '100%';  
canvas.style.height = '100%';  
canvas.style.zIndex = '1';  
canvas.style.pointerEvents = 'none';  
hero.appendChild(canvas);  

const ctx = canvas.getContext('2d');  
let particles = [];  
let animationFrameId;  
  
const mouse = { x: null, y: null, radius: 120 };  
const isMobile = window.innerWidth <= 768;  
const maxParticles = isMobile ? 35 : 80;  

function resizeCanvas() {  
    canvas.width = hero.offsetWidth;  
    canvas.height = hero.offsetHeight;  
    buildParticles();  
}  

class Particle {  
    constructor() {  
        this.x = Math.random() * canvas.width;  
        this.y = Math.random() * canvas.height;  
        this.baseX = this.x;  
        this.baseY = this.y;  
        this.size = Math.random() * (isMobile ? 1.2 : 2.0) + 0.4;  
        this.vx = (Math.random() - 0.5) * 0.25;  
        this.vy = (Math.random() - 0.5) * 0.25;  
          
        // Color Assignment: ~15% Champagne Gold, Remainder White  
        this.color = Math.random() > 0.85 ? '#D4AF37' : '#FFFFFF';  
        this.opacity = Math.random() * 0.5 + 0.2;  
        this.fadeDir = Math.random() > 0.5 ? 0.003 : -0.003;  
    }  

    update() {  
        // Drift Movement  
        this.x += this.vx;  
        this.y += this.vy;  

        // Fluid Boundary Wrapping  
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;  
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;  

        // Micro Opacity Fading Waves  
        this.opacity += this.fadeDir;  
        if (this.opacity > 0.7 || this.opacity < 0.1) this.fadeDir *= -1;  

        // Luxury Cursor Repulsion Physics  
        if (mouse.x !== null && mouse.y !== null) {  
            const dx = this.x - mouse.x;  
            const dy = this.y - mouse.y;  
            const distance = Math.hypot(dx, dy);  

            if (distance < mouse.radius) {  
                const force = (mouse.radius - distance) / mouse.radius;  
                const forceX = (dx / distance) * force * 1.5;  
                const forceY = (dy / distance) * force * 1.5;  
                  
                this.x += forceX;  
                this.y += forceY;  
            }  
        }  
    }  

    draw() {  
        ctx.beginPath();  
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);  
        ctx.fillStyle = this.color;  
        ctx.globalAlpha = this.opacity;  
        ctx.fill();  
    }  
}  

function buildParticles() {  
    particles = [];  
    for (let i = 0; i < maxParticles; i++) {  
        particles.push(new Particle());  
    }  
}  

function drawLines() {  
    const connectionDistance = isMobile ? 65 : 100;  
    for (let i = 0; i < particles.length; i++) {  
        for (let j = i + 1; j < particles.length; j++) {  
            const dx = particles[i].x - particles[j].x;  
            const dy = particles[i].y - particles[j].y;  
            const dist = Math.hypot(dx, dy);  

            if (dist < connectionDistance) {  
                const alpha = (1 - dist / connectionDistance) * 0.08;  
                ctx.beginPath();  
                ctx.moveTo(particles[i].x, particles[i].y);  
                ctx.lineTo(particles[j].x, particles[j].y);  
                ctx.strokeStyle = '#FFFFFF';  
                ctx.globalAlpha = alpha;  
                ctx.lineWidth = 0.5;  
                ctx.stroke();  
            }  
        }  
    }  
}  

function animate() {  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
      
    particles.forEach(p => {  
        p.update();  
        p.draw();  
    });  
      
    drawLines();  
    animationFrameId = requestAnimationFrame(animate);  
}  

// Event Triggers  
window.addEventListener('resize', resizeCanvas);  
hero.addEventListener('mousemove', (e) => {  
    const rect = hero.getBoundingClientRect();  
    mouse.x = e.clientX - rect.left;  
    mouse.y = e.clientY - rect.top;  
});  
hero.addEventListener('mouseleave', () => {  
    mouse.x = null;  
    mouse.y = null;  
});  

resizeCanvas();  
animate();

}

/* ==========================================================================
4. LUXURY MOUSE SPOTLIGHT (HERO HOVER OVERLAY EFFECT)
========================================================================= */
function initLuxuryCursorEffects() {
const hero = document.getElementById('home');
if (!hero || window.innerWidth <= 768) return;

const overlay = document.querySelector('.hero-overlay');  
  
hero.addEventListener('mousemove', (e) => {  
    const rect = hero.getBoundingClientRect();  
    const x = e.clientX - rect.left;  
    const y = e.clientY - rect.top;  
      
    // Elevate dark gradient with subtle architectural light pool tracking  
    overlay.style.background = `radial-gradient(circle 350px at ${x}px ${y}px, rgba(212, 175, 55, 0.02) 0%, rgba(0,0,0,0) 100%), radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)`;  
});  

hero.addEventListener('mouseleave', () => {  
    overlay.style.background = 'radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)';  
});

}

/* ==========================================================================
5. ADVANCED HIGH-PERFORMANCE INTERSECTION OBSERVER & PARALLAX
========================================================================== */
function initScrollInteractions() {
const targets = document.querySelectorAll('.fade-up-trigger, .fade-left-trigger, .fade-right-trigger, .glass-card, .product-card');
const heroContent = document.querySelector('.hero-content');

// Advanced Observer Configuration for Smooth Scaling/Fades  
const observer = new IntersectionObserver((entries) => {  
    entries.forEach(entry => {  
        if (entry.isIntersecting) {  
            entry.target.classList.add('animate-in');  
            entry.target.style.transform = 'translateY(0) scale(1)';  
            entry.target.style.opacity = '1';  
            entry.target.style.filter = 'blur(0)';  
        }  
    });  
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });  

targets.forEach((target, index) => {  
    // Enforce basic initial styling limits safely without touching structural CSS sheets  
    target.style.opacity = '0';  
    target.style.filter = 'blur(3px)';  
    target.style.transition = `opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), filter 1.2s cubic-bezier(0.25, 1, 0.5, 1)`;  
    target.style.transitionDelay = `${(index % 3) * 0.1}s`; // Automatic Luxury Grid Staggering Loop  
      
    if (target.classList.contains('fade-left-trigger')) target.style.transform = 'translateX(40px)';  
    else if (target.classList.contains('fade-right-trigger')) target.style.transform = 'translateX(-40px)';  
    else target.style.transform = 'translateY(50px) scale(0.98)';  

    observer.observe(target);  
});  

// Highly Optimized Premium Parallax Frame Logic  
window.addEventListener('scroll', () => {  
    if (window.innerWidth > 768 && heroContent) {  
        const scrolled = window.scrollY;  
        heroContent.style.transform = `translateY(${scrolled * 0.35}px)`;  
        heroContent.style.opacity = `${1 - scrolled / 600}`;  
    }  
}, { passive: true });

}

/* ==========================================================================
6. PRODUCT CARD 3D TILT EFFECT WITH GOLD GLOW BORDERS
========================================================================== */
function initProductCard3DTilt() {
const cards = document.querySelectorAll('.product-card');
if (window.innerWidth <= 768) return; // Disable on touch screen to save performance pipelines

cards.forEach(card => {  
    card.style.transformStyle = 'preserve-3d';  
    const wrapper = card.querySelector('.product-img-wrapper');  
    if (wrapper) wrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';  

    card.addEventListener('mousemove', (e) => {  
        const rect = card.getBoundingClientRect();  
        const x = e.clientX - rect.left;  
        const y = e.clientY - rect.top;  

        // Calculate Angle Threshold Weights  
        const rotateX = ((rect.height / 2) - y) / 12;  
        const rotateY = (x - (rect.width / 2)) / 12;  

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;  
        card.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.85), 0 0 25px rgba(212, 175, 55, 0.15)';  
        card.style.borderColor = 'rgba(212, 175, 55, 0.4)';  
        if (wrapper) wrapper.style.transform = 'scale(1.04)';  
    });  

    card.addEventListener('mouseleave', () => {  
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';  
        card.style.boxShadow = '';  
        card.style.borderColor = '';  
        if (wrapper) wrapper.style.transform = 'scale(1)';  
    });  
});

}

/* ==========================================================================
7. LUXURY BUTTONS MAGNETIC HOVER INTERACTION
========================================================================== */
function initMagneticButtons() {
const magneticButtons = document.querySelectorAll('.btn-premium, .btn-view-details');
if (window.innerWidth <= 768) return;

magneticButtons.forEach(btn => {  
    btn.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';  
      
    btn.addEventListener('mousemove', (e) => {  
        const rect = btn.getBoundingClientRect();  
        const x = e.clientX - rect.left - (rect.width / 2);  
        const y = e.clientY - rect.top - (rect.height / 2);  
          
        // Move structural bounds slightly toward the mouse vector direction  
        btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;  
    });  

    btn.addEventListener('mouseleave', () => {  
        btn.style.transform = 'translate(0px, 0px)';  
    });  
});

}

/* ==========================================================================
8. CONTACT ICONS FLOATING & PREMIUM SOFT GLOW
========================================================================== */
function initContactIconsFloating() {
const icons = document.querySelectorAll('.contact-icon-circle');

icons.forEach((icon, index) => {  
    // Assign microscopic offset patterns natively via CSS Keyframes injection  
    const styleSheet = document.styleSheets[0];  
    const animationName = `luxuryFloat-${index}`;  
      
    const keyframes = `@keyframes ${animationName} {  
        0% { transform: translateY(0px); }  
        50% { transform: translateY(${-4 - (index % 2) * 3}px); }  
        100% { transform: translateY(0px); }  
    }`;  
      
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);  
      
    // Inject idle motion seamlessly  
    icon.style.animation = `${animationName} ${4 + (index * 0.5)}s ease-in-out infinite`;  

    // Accent Hover Overrides  
    icon.addEventListener('mouseenter', () => {  
        icon.style.animationPlayState = 'paused';  
        icon.style.transform = 'translateY(-8px) scale(1.05)';  
    });  

    icon.addEventListener('mouseleave', () => {  
        icon.style.animationPlayState = 'running';  
        icon.style.transform = '';  
    });  
});

}