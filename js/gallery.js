/**
 * CAFE THRON - GALLERY & LIGHTBOX
 * Image gallery with lightbox functionality
 */

// ========== DOM ELEMENTS ==========
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

// ========== STATE ==========
let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return {
        src: img.src,
        alt: img.alt
    };
});

// ========== GALLERY CLICK HANDLERS ==========
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });

    // Add keyboard support
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View image ${index + 1}`);

    item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
        }
    });
});

// ========== LIGHTBOX FUNCTIONS ==========
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus management for accessibility
    lightboxClose.focus();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';

    // Return focus to gallery item
    galleryItems[currentImageIndex]?.focus();
}

function updateLightboxImage() {
    const currentImage = images[currentImageIndex];

    // Fade out
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        updateCounter();

        // Fade in
        lightboxImage.style.opacity = '1';
    }, 200);
}

function updateCounter() {
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

// ========== EVENT LISTENERS ==========
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Click outside image to close
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
    }
});

// ========== TOUCH SWIPE SUPPORT ==========
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            showNextImage();
        } else {
            // Swipe right - previous image
            showPrevImage();
        }
    }
}

// ========== IMAGE PRELOADING ==========
function preloadImages() {
    images.forEach(image => {
        const img = new Image();
        img.src = image.src;
    });
}

// Preload images when page loads
window.addEventListener('load', preloadImages);

// ========== LIGHTBOX IMAGE TRANSITIONS ==========
lightboxImage.style.transition = 'opacity 0.3s ease';

// ========== GALLERY ANIMATIONS ==========
function animateGalleryOnScroll() {
    galleryItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 50);
        }
    });
}

// Initial state for gallery items
galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px) scale(0.95)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateGalleryOnScroll);
window.addEventListener('load', animateGalleryOnScroll);

// ========== LAZY LOADING FOR GALLERY ==========
if ('IntersectionObserver' in window) {
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                galleryObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });

    galleryItems.forEach(item => galleryObserver.observe(item));
}

// ========== ACCESSIBILITY FEATURES ==========
// Add ARIA labels
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Image gallery lightbox');

lightboxClose.setAttribute('aria-label', 'Close lightbox');
lightboxPrev.setAttribute('aria-label', 'Previous image');
lightboxNext.setAttribute('aria-label', 'Next image');

// Trap focus within lightbox when open
const focusableElements = [lightboxClose, lightboxPrev, lightboxNext];
let currentFocusIndex = 0;

lightbox.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Tab') {
        e.preventDefault();
        currentFocusIndex = (currentFocusIndex + (e.shiftKey ? -1 : 1) + focusableElements.length) % focusableElements.length;
        focusableElements[currentFocusIndex].focus();
    }
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce gallery animations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedGalleryAnimation = debounce(animateGalleryOnScroll, 100);
window.removeEventListener('scroll', animateGalleryOnScroll);
window.addEventListener('scroll', debouncedGalleryAnimation);

// ========== CONSOLE LOG ==========
console.log(`📸 Gallery initialized with ${images.length} images`);
