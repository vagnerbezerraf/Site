document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll para os links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de scroll para o header
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Animação dos cards de serviço
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });

    // Manipulação do formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value;

            const servicoLabel = {
                ia: 'IA e Automação',
                marketing: 'Marketing Digital',
                software: 'Fábrica de Software'
            }[servico] || servico;

            const texto = `Olá, meu nome é ${nome}%0AEmail: ${email}%0AServiço: ${servicoLabel}%0AMensagem: ${mensagem}`;
            const telefone = '5511997931193';
            const url = `https://wa.me/${telefone}?text=${texto}`;
            window.open(url, '_blank');
        });
    }

    // Carrossel de imagens da seção hero
    (function() {
        const imgs = document.querySelectorAll('.hero-img');
        let idx = 0;
        setInterval(() => {
            imgs[idx].classList.remove('active');
            idx = (idx + 1) % imgs.length;
            imgs[idx].classList.add('active');
        }, 4000);
    })();
}); 