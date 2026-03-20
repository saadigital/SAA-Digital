document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();

    try {
        const response = await fetch('content.json');
        const data = await response.json();
        renderServices(data.services);
        renderPillars(data.pillars);
        renderTestimonials(data.testimonials);
    } catch (err) {
        console.error('Error loading content:', err);
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.reveal-text', {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power4.out'
    });

    gsap.from('.reveal-fade', {
        opacity: 0,
        delay: 0.6,
        duration: 1,
        stagger: 0.3
    });


    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i % 4 * 0.1
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Sending...";
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = "Sent Successfully!";
                btn.classList.replace('bg-violet-600', 'bg-green-600');
                contactForm.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.classList.replace('bg-green-600', 'bg-violet-600');
                }, 3000);
            }, 1500);
        });
    }
});

function renderServices(services) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = services.map(s => `
        <div class="service-card group p-6 rounded-2xl flex flex-col h-full">
            <div class="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center text-violet-500 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                <i data-lucide="${s.icon}" class="w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-montserrat font-bold mb-3">${s.title}</h3>
            <p class="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">${s.desc}</p>
            <div class="mb-6 space-y-2">
                ${s.benefits.map(b => `
                    <div class="flex items-center gap-2 text-xs font-semibold text-violet-300">
                        <i data-lucide="check" class="w-3 h-3"></i>
                        <span>${b}</span>
                    </div>
                `).join('')}
            </div>
            <a href="#contact" class="text-sm font-bold text-violet-400 hover:text-violet-200 flex items-center gap-2 transition-colors">
                Request a Quote <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function renderPillars(pillars) {
    const container = document.getElementById('pillars-container');
    if (!container) return;

    container.innerHTML = pillars.map((p, i) => `
        <div class="pillar-item flex gap-6 p-4 rounded-2xl hover:bg-navy-dark/50 transition-colors">
            <div class="text-violet-500 font-montserrat font-extrabold text-3xl opacity-20">0${i+1}</div>
            <div>
                <h4 class="text-xl font-bold mb-2">${p.title}</h4>
                <p class="text-gray-400 text-sm">${p.desc}</p>
            </div>
        </div>
    `).join('');
}

function renderTestimonials(testimonials) {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;

    grid.innerHTML = testimonials.map(t => `
        <div class="p-8 bg-navy-light border border-violet-500/10 rounded-2xl">
            <div class="text-violet-400 mb-4 flex gap-1">
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            </div>
            <p class="text-gray-300 italic mb-6">"${t.text}"</p>
            <div>
                <p class="font-bold text-lg">${t.name}</p>
                <p class="text-violet-500 text-sm">${t.role}</p>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}
