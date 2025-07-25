// Global variables
let currentSection = 0;
let slideshowInterval;
let isSlideShowPlaying = true;
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let messageAnimationComplete = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeConfetti();
    
    // Start letter animations for the name after initial animations
    setTimeout(() => {
        animateLetters();
    }, 1000);
});

// Particle system for background
function initializeParticles() {
    const particlesContainer = document.getElementById('particles-container');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 7000);
    }
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 200);
    }
    
    // Continue creating particles
    setInterval(createParticle, 500);
}

// Confetti system
function initializeConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
    
    // Create confetti burst after 3 seconds
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            setTimeout(createConfetti, i * 50);
        }
    }, 3000);
}

// Animate letters in the name
function animateLetters() {
    const letters = document.querySelectorAll('.letter-animate');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'rotateY(0deg)';
        }, index * 200);
    });
}

// Start the main experience
function startExperience() {
    // Try to play background music (may require user interaction)
    const audio = document.getElementById('backgroundMusic');
    if (audio && audio.src) {
        audio.play().catch(e => {
            console.log('Audio autoplay prevented by browser');
        });
    }
    
    // Move to slideshow
    switchSection(1);
    startSlideshow();
}

// Switch between sections
function switchSection(sectionIndex) {
    const sections = document.querySelectorAll('.section');
    
    // Remove active class from current section
    sections[currentSection].classList.remove('active');
    sections[currentSection].classList.add('prev');
    
    // Add active class to new section
    setTimeout(() => {
        sections[currentSection].classList.remove('prev');
        sections[sectionIndex].classList.add('active');
        currentSection = sectionIndex;
        
        // Trigger specific section animations
        if (sectionIndex === 2) { // Message section
            setTimeout(animateMessage, 500);
        } else if (sectionIndex === 3) { // Celebration section
            setTimeout(startCelebrationEffects, 500);
        }
    }, 200);
}

// Slideshow functionality
function startSlideshow() {
    showSlide(0);
    slideshowInterval = setInterval(() => {
        nextSlide();
    }, 4000); // Change slide every 4 seconds
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    slides[index].classList.add('active');
    
    // Update caption
    const caption = slides[index].getAttribute('data-caption');
    document.getElementById('caption-text').textContent = caption;
    
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    
    if (nextIndex === 0) {
        // When slideshow completes, move to message section
        clearInterval(slideshowInterval);
        setTimeout(() => {
            switchSection(2);
        }, 2000);
        return;
    }
    
    showSlide(nextIndex);
}

// Toggle slideshow play/pause
function toggleSlideshow() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (isSlideShowPlaying) {
        clearInterval(slideshowInterval);
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
        isSlideShowPlaying = false;
    } else {
        slideshowInterval = setInterval(nextSlide, 4000);
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        isSlideShowPlaying = true;
    }
}

// Animate birthday message letter by letter
function animateMessage() {
    if (messageAnimationComplete) return;
    
    const messageLines = document.querySelectorAll('.message-text p');
    let lineIndex = 0;
    
    function animateLine() {
        if (lineIndex >= messageLines.length) {
            messageAnimationComplete = true;
            // Move to celebration after message completes
            setTimeout(() => {
                switchSection(3);
            }, 2000);
            return;
        }
        
        const line = messageLines[lineIndex];
        const text = line.getAttribute('data-text');
        const messageSpan = line.querySelector('.message-line');
        
        // Show the line
        line.style.opacity = '1';
        
        // Animate text letter by letter
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            messageSpan.textContent = text.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex >= text.length) {
                clearInterval(typeInterval);
                lineIndex++;
                setTimeout(animateLine, 800); // Pause between lines
            }
        }, 50); // Speed of typing
    }
    
    animateLine();
}

// Celebration effects (sparkles)
function startCelebrationEffects() {
    const sparklesContainer = document.getElementById('sparkles-container');
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        
        // Random colors for sparkles
        const colors = ['#FF6B9D', '#8B5CF6', '#F59E0B', '#C44CAD'];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
    
    // Create sparkles continuously
    for (let i = 0; i < 20; i++) {
        setTimeout(createSparkle, i * 100);
    }
    
    // Continue creating sparkles
    const sparkleInterval = setInterval(createSparkle, 300);
    
    // Stop after 10 seconds
    setTimeout(() => {
        clearInterval(sparkleInterval);
    }, 10000);
}

// Restart the entire experience
function restartExperience() {
    // Reset all variables
    currentSection = 0;
    currentSlide = 0;
    isSlideShowPlaying = true;
    messageAnimationComplete = false;
    
    // Clear intervals
    clearInterval(slideshowInterval);
    
    // Reset sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.classList.remove('active', 'prev');
        if (index === 0) {
            section.classList.add('active');
        }
    });
    
    // Reset slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Reset message text
    const messageLines = document.querySelectorAll('.message-text p .message-line');
    messageLines.forEach(line => {
        line.textContent = '';
    });
    
    const messageParagraphs = document.querySelectorAll('.message-text p');
    messageParagraphs.forEach(p => {
        p.style.opacity = '0';
    });
    
    // Reset slideshow controls
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    
    // Clear sparkles
    const sparklesContainer = document.getElementById('sparkles-container');
    sparklesContainer.innerHTML = '';
    
    // Restart confetti
    setTimeout(() => {
        initializeConfetti();
    }, 3000);
    
    // Restart background music
    const audio = document.getElementById('backgroundMusic');
    if (audio && audio.src) {
        audio.currentTime = 0;
        audio.play().catch(e => {
            console.log('Audio autoplay prevented by browser');
        });
    }
}

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Adjust particle count based on screen size
    const particles = document.querySelectorAll('.particle');
    if (window.innerWidth < 768 && particles.length > 10) {
        for (let i = 10; i < particles.length; i++) {
            particles[i].remove();
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            if (currentSection === 1 && isSlideShowPlaying) {
                nextSlide();
            }
            break;
        case 'ArrowLeft':
            if (currentSection === 1) {
                const prevIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
                showSlide(prevIndex);
            }
            break;
        case 'p':
        case 'P':
            if (currentSection === 1) {
                toggleSlideshow();
            }
            break;
        case 'r':
        case 'R':
            restartExperience();
            break;
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (currentSection !== 1) return; // Only handle swipes in slideshow
    
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - previous slide
            const prevIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            showSlide(prevIndex);
        } else {
            // Swipe left - next slide
            nextSlide();
        }
    }
}

/*
CUSTOMIZATION INSTRUCTIONS:
=========================

1. PHOTOS:
   - Replace the image URLs in index.html with your own photos
   - Update the data-caption attributes with your personal messages
   - Images should be at least 800px wide for best quality

2. PERSONAL MESSAGE:
   - In the message section, update the data-text attributes with your heartfelt message
   - Each <p> element represents one line that will animate

3. NAME:
   - Replace "Sarah" in the homepage section with your friend's name
   - Update the page title in the <head> section

4. SIGNATURE:
   - Update "Your Best Friend" with your actual name

5. BACKGROUND MUSIC:
   - Add a music file (MP3) to your project folder
   - Uncomment and update the <source> tag in the audio element
   - Note: Most browsers require user interaction before playing audio

6. COLORS:
   - The CSS uses CSS custom properties for easy color customization
   - Main colors are defined at the top of the CSS file

7. TIMING:
   - Adjust slideshow timing by changing the interval in startSlideshow()
   - Modify animation delays throughout the CSS for different pacing

CONTROLS:
=========
- Space bar or right arrow: Next slide (during slideshow)
- Left arrow: Previous slide (during slideshow)  
- 'P': Pause/play slideshow
- 'R': Restart entire experience
- Swipe left/right on mobile for slide navigation

Enjoy creating memories! 🎉
*/