// Smooth scrolling for navigation links
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and platform cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .platform-card, .contact-item');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Copy email to clipboard
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showNotification('邮箱地址已复制到剪贴板！');
            }).catch(() => {
                // If clipboard API fails, continue with default mailto behavior
            });
        }
    });
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Track button clicks (for analytics)
const trackClick = (buttonName) => {
    console.log(`Button clicked: ${buttonName}`);
    // You can add analytics tracking here (e.g., Google Analytics)
};

// Add click tracking to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const buttonText = btn.textContent.trim();
        trackClick(buttonText);
    });
});

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header .container');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-dark);
            `;
            
            toggle.addEventListener('click', () => {
                nav.classList.toggle('mobile-open');
            });
            
            header.appendChild(toggle);
        }
    }
};

// Handle window resize
window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console message
console.log('%c快发了 kuaifale.com', 'color: #FF6B35; font-size: 24px; font-weight: bold;');
console.log('%c多平台视频一键发布工具', 'color: #004E89; font-size: 14px;');
console.log('%c联系我们: support@kuaifale.com', 'color: #666; font-size: 12px;');
