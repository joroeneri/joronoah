const backToStartBtn = document.getElementById('backToStart');

function updateBackToTopVisibility() {
    if (!backToStartBtn) return;
    backToStartBtn.classList.toggle('show', window.scrollY > 280);
}

if (backToStartBtn) {
    window.addEventListener('scroll', updateBackToTopVisibility);
    backToStartBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    updateBackToTopVisibility();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href) return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

function updateActiveNavLink() {
    let current = 'home';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.id;
        }
    });

    document.querySelectorAll('nav a').forEach((link) => {
        const sectionId = (link.getAttribute('href') || '').replace('#', '');
        link.classList.toggle('active', sectionId === current);
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink();

function initRevealAnimation() {
    const revealTargets = document.querySelectorAll('.hero, .about, .cta-strip, .projects .section-title, .project-card, .contact, .footer-content');

    revealTargets.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`);
    });

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach((el) => el.classList.add('show'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16, rootMargin: '0px 0px -30px 0px' });

    revealTargets.forEach((el) => observer.observe(el));
}

initRevealAnimation();
