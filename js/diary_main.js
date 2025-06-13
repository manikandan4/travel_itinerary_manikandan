// MADK's Travel Diary - Main Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add interactive hover effects for destination cards
    const destinationCards = document.querySelectorAll('.destination-card:not(.coming-soon)');
    
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect for featured destination
    const featuredCard = document.querySelector('.destination-card.featured');
    if (featuredCard) {
        featuredCard.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 100);
        });
    }

    // Add loading animation for coming soon cards
    const comingSoonCards = document.querySelectorAll('.destination-card.coming-soon');
    
    comingSoonCards.forEach(card => {
        card.addEventListener('click', function() {
            const status = this.querySelector('.status');
            const originalText = status.textContent;
            
            status.textContent = 'Planning...';
            status.style.background = 'rgba(116, 185, 255, 0.9)';
            status.style.color = 'white';
            
            setTimeout(() => {
                status.textContent = originalText;
                status.style.background = 'rgba(255, 193, 7, 0.9)';
                status.style.color = '#856404';
            }, 1500);
        });
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.destinations-section, .about-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Add dynamic travel stats counter (for future enhancement)
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target) {
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target.toString().includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (target.toString().includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    // Initialize stats animation when about section is visible
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const number = parseInt(text.replace(/\D/g, ''));
                        if (number > 0) {
                            stat.textContent = '0';
                            animateCounter(stat, number);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statsObserver.observe(aboutSection);
    }

    console.log('🌍 MADK\'s Travel Diary loaded successfully!');
});
