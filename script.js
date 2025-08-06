// Assembly and Construction Effects
function initiateAssemblySequence() {
  const ctaButton = document.getElementById('ctaButton');
  
  ctaButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add assembly effect to button
    this.classList.add('assembling');
    this.textContent = '// מרכיב מערכת...';
    
    // Start page assembly sequence
    setTimeout(() => {
      document.body.classList.add('page-assembling');
      assemblePageComponents();
    }, 500);
    
    // Navigate after assembly
    setTimeout(() => {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      this.classList.remove('assembling');
      this.textContent = '// פרויקט במעבד...';
    }, 2000);
    
    // Reset button
    setTimeout(() => {
      this.textContent = '// התחל פרויקט חדש';
    }, 4000);
  });
}

// Assemble page components with technical drawing effect
function assemblePageComponents() {
  const components = document.querySelectorAll('.service-card, .spec-item, .stat-item');
  
  components.forEach((component, index) => {
    setTimeout(() => {
      // Add technical drawing lines before component appears
      addTechnicalLines(component);
      
      setTimeout(() => {
        component.classList.add('assembled');
      }, 300);
    }, index * 200);
  });
}

// Add technical drawing lines around components
function addTechnicalLines(element) {
  const rect = element.getBoundingClientRect();
  const container = document.createElement('div');
  container.className = 'technical-lines';
  container.style.cssText = `
    position: absolute;
    top: ${rect.top + window.scrollY - 20}px;
    left: ${rect.left - 20}px;
    width: ${rect.width + 40}px;
    height: ${rect.height + 40}px;
    pointer-events: none;
    z-index: 1000;
  `;
  
  // Create corner lines
  for (let i = 0; i < 4; i++) {
    const line = document.createElement('div');
    line.style.cssText = `
      position: absolute;
      background: rgba(0, 212, 255, 0.6);
      animation: drawTechnicalLine 0.5s ease-out forwards;
    `;
    
    switch(i) {
      case 0: // Top-left
        line.style.cssText += `
          top: 0; left: 0;
          width: 30px; height: 2px;
          transform-origin: left;
        `;
        break;
      case 1: // Top-right
        line.style.cssText += `
          top: 0; right: 0;
          width: 30px; height: 2px;
          transform-origin: right;
        `;
        break;
      case 2: // Bottom-left
        line.style.cssText += `
          bottom: 0; left: 0;
          width: 30px; height: 2px;
          transform-origin: left;
        `;
        break;
      case 3: // Bottom-right
        line.style.cssText += `
          bottom: 0; right: 0;
          width: 30px; height: 2px;
          transform-origin: right;
        `;
        break;
    }
    
    container.appendChild(line);
  }
  
  document.body.appendChild(container);
  
  // Remove technical lines after animation
  setTimeout(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }, 2000);
}

// Add CSS for technical lines animation
function addTechnicalLineStyles() {
  if (!document.querySelector('#technicalLineStyles')) {
    const style = document.createElement('style');
    style.id = 'technicalLineStyles';
    style.textContent = `
      @keyframes drawTechnicalLine {
        from {
          transform: scaleX(0);
          opacity: 0;
        }
        to {
          transform: scaleX(1);
          opacity: 1;
        }
      }
      
      .technical-lines {
        animation: fadeOut 0.5s ease-out 1.5s forwards;
      }
      
      @keyframes fadeOut {
        to {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Industrial blueprint reveal effect
function blueprintRevealEffect() {
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        section.style.opacity = '0';
        section.style.transform = 'perspective(1000px) rotateX(45deg) translateY(100px)';
        
        setTimeout(() => {
          section.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          section.style.opacity = '1';
          section.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
        }, 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Enhanced form assembly effect
function enhanceFormAssembly() {
  const form = document.getElementById('contactForm');
  const formGroups = form.querySelectorAll('.form-group');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Disassemble form components
    formGroups.forEach((group, index) => {
      setTimeout(() => {
        group.style.transform = 'perspective(500px) rotateY(45deg) translateX(100px)';
        group.style.opacity = '0.3';
      }, index * 100);
    });
    
    // Show assembly process
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    let assemblyStates = [
      '// מתחיל התרכבות...',
      '// מרכיב רכיבים...',
      '// מחבר מודולים...',
      '// מבצע בדיקות...',
      '// משלים הרכבה...',
      '// מוכן!'
    ];
    
    let currentState = 0;
    submitBtn.disabled = true;
    
    const assemblyInterval = setInterval(() => {
      submitBtn.textContent = assemblyStates[currentState];
      currentState++;
      
      if (currentState >= assemblyStates.length) {
        clearInterval(assemblyInterval);
        
        // Reassemble form with success
        setTimeout(() => {
          formGroups.forEach((group, index) => {
            setTimeout(() => {
              group.style.transform = 'perspective(500px) rotateY(0deg) translateX(0)';
              group.style.opacity = '1';
            }, index * 100);
          });
          
          // Show success message
          const successMessage = document.getElementById('successMessage');
          successMessage.style.display = 'block';
          successMessage.style.transform = 'perspective(500px) rotateX(45deg) scale(0.8)';
          
          setTimeout(() => {
            successMessage.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            successMessage.style.transform = 'perspective(500px) rotateX(0deg) scale(1)';
          }, 100);
          
          // Reset form
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000);
          
        }, 500);
      }
    }, 400);
  });
}

// Create industrial particle assembly system
function createAssemblyParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'assembly-particles';
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;
  document.body.appendChild(particlesContainer);
  
  // Create assembly particles
  for (let i = 0; i < 30; i++) {
    createAssemblyParticle(particlesContainer);
  }
}

function createAssemblyParticle(container) {
  const particle = document.createElement('div');
  const size = Math.random() * 4 + 2;
  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight + 50;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 5;
  
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(0, 212, 255, 0.8);
    left: ${x}px;
    top: ${y}px;
    animation: assemblyFloat ${duration}s linear ${delay}s infinite;
    clip-path: polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%);
    box-shadow: 0 0 ${size * 3}px rgba(0, 212, 255, 0.6);
  `;
  
  container.appendChild(particle);
}

// Add assembly particle animation
function addAssemblyParticleStyles() {
  if (!document.querySelector('#assemblyParticleStyles')) {
    const style = document.createElement('style');
    style.id = 'assemblyParticleStyles';
    style.textContent = `
      @keyframes assemblyFloat {
        from {
          transform: translateY(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        to {
          transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Page loader management
function managePageLoader() {
  const loader = document.getElementById('pageLoader');
  
  // Hide loader after assembly animation
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 1000);
  }, 4000);
}

// Check if device is mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Show/hide mobile navigation
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  if (isMobile()) {
    mobileNav.classList.add('show');
  } else {
    mobileNav.classList.remove('show');
  }
}

// Smooth scrolling with assembly effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.id === 'ctaButton') return; // Handle separately
    
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active navigation link
      document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// Initialize everything when page loads
window.addEventListener('load', () => {
  managePageLoader();
  addTechnicalLineStyles();
  addAssemblyParticleStyles();
  createAssemblyParticles();
  
  setTimeout(() => {
    initiateAssemblySequence();
    blueprintRevealEffect();
    enhanceFormAssembly();
    toggleMobileNav();
  }, 4500);
  
  // Add touch feedback for mobile
  if (isMobile()) {
    document.body.style.cursor = 'default';
    
    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  toggleMobileNav();
});
