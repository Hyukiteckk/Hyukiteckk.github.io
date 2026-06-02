// textos do efeito de digitação no hero
const typingTexts = [
    'Python',
    'JavaScript',
    'Java',
    'Banco de Dados',
];

const TYPING_SPEED   = 120;
const DELETING_SPEED = 60;
const PAUSE_TIME     = 2000;

const typingEl = document.getElementById('typing-text');
let typingIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

function typeEffect() {
    const current = typingTexts[typingIndex];

    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
        delay = PAUSE_TIME;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingTexts.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();

// navbar — adiciona fundo ao rolar e destaca link da seção ativa
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// menu mobile
const hamburger         = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
});

navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// botão voltar ao topo
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// anima as barras de skill quando entram na tela
function animateSkills() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
    });
}

// contadores numéricos da seção sobre
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    document.querySelectorAll('.stat-number').forEach(counter => {
        const target   = parseInt(counter.dataset.target);
        const duration = 1500;
        const step     = target / (duration / 16);
        let current    = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// intersection observer — revela elementos ao entrar na viewport
const observerOptions = {
    threshold:  0.15,
    rootMargin: '0px 0px -50px 0px',
};

let skillsAnimated = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');

        if (entry.target.closest('.skills') && !skillsAnimated) {
            skillsAnimated = true;
            setTimeout(animateSkills, 300);
        }

        if (entry.target.closest('.sobre')) {
            animateCounters();
        }

        observer.unobserve(entry.target);
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// delay escalonado nos cards para entrada em cascata
document.querySelectorAll('.skill-card, .project-card, .stat-card, .contact-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
    el.classList.add('reveal');
    observer.observe(el);
});

// partículas flutuantes no fundo do hero
function createParticles() {
    const container = document.getElementById('particles');
    const count = 30;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left             = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 10 + 8) + 's';
        p.style.animationDelay   = (Math.random() * 10) + 's';
        const size               = (Math.random() * 3 + 1) + 'px';
        p.style.width            = size;
        p.style.height           = size;
        container.appendChild(p);
    }
}

createParticles();

// formulário de contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn      = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML        = '<i class="bi bi-check-circle"></i> Mensagem Enviada!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.disabled         = true;

    setTimeout(() => {
        btn.innerHTML        = original;
        btn.style.background = '';
        btn.disabled         = false;
        contactForm.reset();
    }, 3000);
});
