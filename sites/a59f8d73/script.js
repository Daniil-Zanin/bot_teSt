document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const ctaForm = document.querySelector('.cta-form');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = ctaForm.querySelector('input').value;
        if (email) {
            alert('Спасибо! Мы свяжемся с вами скоро.');
            ctaForm.querySelector('input').value = '';
        }
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Gallery item clicked');
        });
    });
});