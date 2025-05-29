// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Initialize London Map
    initializeMap();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize contact form
    initializeContactForm();
});

// London Map Initialization
function initializeMap() {
    // Check if Leaflet is available and map container exists
    if (typeof L !== 'undefined' && document.getElementById('london-map')) {
        // Initialize the map centered on London
        const map = L.map('london-map', {
            center: [51.5074, -0.1278], // London coordinates
            zoom: 11,
            zoomControl: true,
            scrollWheelZoom: false
        });

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Custom marker icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.3);"><i class="fas fa-camera" style="font-size: 14px;"></i></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        // Add service areas with circles
        const serviceAreas = [
            {
                name: 'Central London',
                coords: [51.5074, -0.1278],
                radius: 3000,
                color: '#667eea'
            },
            {
                name: 'Canary Wharf',
                coords: [51.5054, -0.0235],
                radius: 2000,
                color: '#fa709a'
            },
            {
                name: 'Camden',
                coords: [51.5290, -0.1255],
                radius: 2000,
                color: '#4facfe'
            },
            {
                name: 'Shoreditch',
                coords: [51.5252, -0.0785],
                radius: 2000,
                color: '#fee140'
            },
            {
                name: 'Borough Market',
                coords: [51.5052, -0.0911],
                radius: 2000,
                color: '#4ecdc4'
            },
            {
                name: 'Notting Hill',
                coords: [51.5152, -0.2056],
                radius: 2000,
                color: '#f093fb'
            }
        ];

        serviceAreas.forEach(area => {
            // Add circle for service area
            const circle = L.circle(area.coords, {
                color: area.color,
                fillColor: area.color,
                fillOpacity: 0.2,
                radius: area.radius,
                weight: 2
            }).addTo(map);

            // Add marker for area
            const marker = L.marker(area.coords, { icon: customIcon }).addTo(map);
            
            // Add popup
            marker.bindPopup(`
                <div style="text-align: center; padding: 10px;">
                    <h4 style="margin: 0 0 5px 0; color: #667eea;">${area.name}</h4>
                    <p style="margin: 0; color: #666;">Professional food photography<br>& social media services</p>
                    <a href="#contact" style="color: #fa709a; text-decoration: none; font-weight: bold;">Get Quote →</a>
                </div>
            `);
        });

        // Add main business location marker
        const mainMarker = L.marker([51.5074, -0.1278], {
            icon: L.divIcon({
                className: 'main-marker',
                html: '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 6px 20px rgba(0,0,0,0.3); border: 3px solid white;"><i class="fas fa-utensils" style="font-size: 16px;"></i></div>',
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            })
        }).addTo(map);

        mainMarker.bindPopup(`
            <div style="text-align: center; padding: 15px; min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #667eea;">Vision Marketing</h3>
                <p style="margin: 0 0 10px 0; color: #666;">London's Premier Restaurant<br>Photography & Marketing Specialist</p>
                <div style="margin: 10px 0;">
                    <strong style="color: #fa709a;">📞 +44 20 7123 FOOD</strong><br>
                    <strong style="color: #4facfe;">✉️ hello@visionmarketing.london</strong>
                </div>
                <a href="#contact" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 5px;">Contact Now</a>
            </div>
        `);

        // Fit map to show all service areas
        const group = new L.featureGroup(serviceAreas.map(area => L.marker(area.coords)));
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Animation Initialization
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .feature, .contact-card, .location-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter Animation
function animateCounter(element) {
    const target = element.textContent;
    let current = 0;
    const increment = target.includes('%') ? 5 : 1;
    const speed = target.includes('%') ? 50 : 100;
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
            current = numericTarget;
            clearInterval(timer);
        }
        
        if (target.includes('+')) {
            element.textContent = current + '+';
        } else if (target.includes('%')) {
            element.textContent = current + '%';
        } else {
            element.textContent = current;
        }
    }, speed);
}

// Contact Form
function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Clear form labels
                const labels = form.querySelectorAll('label');
                labels.forEach(label => {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'rgba(255, 255, 255, 0.7)';
                });
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading Animation
window.addEventListener('load', function() {
    // Add loaded class to body for any load animations
    document.body.classList.add('loaded');
    
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});

// Service Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add scale effect to icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// Portfolio Lightbox Effect
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            
            // Create lightbox (simple version)
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                cursor: pointer;
            `;
            
            lightbox.innerHTML = `
                <img src="${img.src}" alt="${title}" style="max-width: 90%; max-height: 70%; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
                <h3 style="color: white; margin-top: 2rem; font-size: 2rem;">${title}</h3>
                <p style="color: rgba(255,255,255,0.8); margin-top: 1rem; max-width: 600px; text-align: center;">${description}</p>
                <p style="color: rgba(255,255,255,0.6); margin-top: 2rem;">Click anywhere to close</p>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });
});