const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');

const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        const brightness = Math.random();
        if (brightness > 0.9) {
            ctx.fillStyle = '#ffffff';
        } else if (brightness > 0.7) {
            ctx.fillStyle = '#00ff41';
        } else {
            ctx.fillStyle = 'rgba(0, 255, 65, 0.5)';
        }
        
        ctx.fillText(text, x, y);
        
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            document.querySelector('.nav-list').classList.remove('active');
            document.querySelector('.nav-toggle').classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const mobileOverlay = document.getElementById('mobileOverlay');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navList.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
});

mobileOverlay.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navList.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

document.querySelectorAll('#navList a').forEach(anchor => {
    anchor.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 255, 65, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Отправка...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'Отправлено ✓';
        btn.style.background = '#00d4ff';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .service-card, .gallery-item, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
        }
    }
    .skill-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    .skill-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navList.classList.remove('active');
        navToggle.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

const commands = [
    'nmap -sV target.com',
    'sudo ./exploit.py',
    'access_granted >> /root/keys',
    'hydra -l admin -p pass.txt ssh://target.com',
    'sqlmap -u "https://target.com/?id=1" --dbs',
    'john --wordlist=rockyou.txt hash.txt',
    'msfconsole -q -x "use exploit/multi/handler"',
    'nikto -h https://target.com',
    'dirb http://target.com /usr/share/wordlists/dirb/common.txt',
    'tcpdump -i eth0 -w capture.pcap',
    'wireshark capture.pcap',
    'chmod +x shell.elf && ./shell.elf'
];

const commandText = document.getElementById('commandText');
const terminalBody = document.getElementById('terminalBody');
let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeCommand() {
    const currentCommand = commands[commandIndex];
    
    if (!isDeleting) {
        commandText.textContent = currentCommand.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentCommand.length) {
            isDeleting = true;
            typingSpeed = 1500;
            
            setTimeout(() => {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
                charIndex = 0;
                typingSpeed = 80;
                typeCommand();
            }, 1500);
            return;
        }
    } else {
        commandText.textContent = currentCommand.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
        }
    }
    
    setTimeout(typeCommand, typingSpeed);
}

setTimeout(typeCommand, 1000);

const heroName = document.getElementById('heroName');
heroName.addEventListener('mouseenter', () => {
    heroName.style.animation = 'none';
    heroName.style.textShadow = `
        -2px 0 #ff0080,
        2px 0 #00d4ff,
        0 0 20px rgba(0, 255, 65, 0.8),
        0 0 40px rgba(0, 255, 65, 0.5),
        0 0 80px rgba(0, 255, 65, 0.3)
    `;
});

heroName.addEventListener('mouseleave', () => {
    heroName.style.animation = '';
});

const particleChars = '01アイウエオカキクケコサシスセソハヒフヘホマミムメモヤユヨラリルレロワヲン$_<>{}[]/*-';

function createParticle(container, x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 150;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    const size = 8 + Math.random() * 12;
    const char = particleChars[Math.floor(Math.random() * particleChars.length)];
    const colors = ['#00ff41', '#ff0080', '#00d4ff', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'JetBrains Mono', monospace;
        font-size: ${size * 0.7}px;
        color: ${color};
        text-shadow: 0 0 10px ${color};
        pointer-events: none;
        --tx: ${tx}px;
        --ty: ${ty}px;
        animation: particleFade 0.8s ease-out forwards;
    `;
    particle.textContent = char;
    container.appendChild(particle);
    
    setTimeout(() => particle.remove(), 800);
}

function createMatrixRain(container, skillIcon) {
    const rect = skillIcon.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createParticle(container, x, y), i * 20);
    }
}

document.querySelectorAll('.skill-item').forEach(item => {
    const icon = item.querySelector('.skill-icon');
    const container = item.querySelector('.particle-container');
    
    item.addEventListener('mouseenter', () => {
        createMatrixRain(container, icon);
    });
    
    item.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.7) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createParticle(container, x, y);
        }
    });
});

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCounter();
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.skills-stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

const terminalForm = document.getElementById('terminalForm');
if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = terminalForm.querySelector('.btn-glitch-submit');
        const originalText = btn.querySelector('.btn-text').textContent;
        
        btn.querySelector('.btn-text').textContent = '> transmitting...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.querySelector('.btn-text').textContent = '> success: message sent';
            btn.style.borderColor = '#00ff41';
            btn.style.color = '#00ff41';
            
            const output = terminalForm.querySelector('.terminal-output');
            if (output) {
                output.innerHTML = '<span class="prompt-small">$</span><span class="output-text" style="color: #00ff41;">[+] Connection established. Message delivered successfully.</span>';
            }
            
            setTimeout(() => {
                btn.querySelector('.btn-text').textContent = originalText;
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.style.opacity = '';
                btn.disabled = false;
                terminalForm.reset();
                
                if (output) {
                    output.innerHTML = '<span class="prompt-small">$</span><span class="output-text">submit --force</span>';
                }
            }, 2500);
        }, 1500);
    });
}