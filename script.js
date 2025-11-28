document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // 1. Navigation between pages logic
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show the corresponding page
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
            
            // Scroll to top when navigating
            window.scrollTo(0, 0);
        });
    });
    
    // 2. Interactive "What We Offer" blocks logic
    const offeringCards = document.querySelectorAll('.offering-card');
    const offeringDetails = document.querySelectorAll('.offering-details');
    
    offeringCards.forEach(card => {
        card.addEventListener('click', function() {
            const offerType = this.getAttribute('data-offer');
            
            // Remove active class from all cards and details
            offeringCards.forEach(c => c.classList.remove('active'));
            offeringDetails.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show corresponding details
            document.getElementById(`${offerType}-details`).classList.add('active');
        });
    });
    
    // 3. Create laser grid background (for the fixed background effect)
    const laserGrid = document.getElementById('laser-grid');
    const gridSize = 50;
    
    for (let i = 0; i < window.innerWidth / gridSize; i++) {
        for (let j = 0; j < window.innerHeight / gridSize; j++) {
            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.left = `${i * gridSize}px`;
            dot.style.top = `${j * gridSize}px`;
            dot.style.width = '1px';
            dot.style.height = '1px';
            dot.style.backgroundColor = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 50 + 100}, 255, ${Math.random() * 0.3})`;
            dot.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px rgba(191, 0, 255, 0.5)`;
            laserGrid.appendChild(dot);
        }
    }
    
    // 4. Laser Background Animation (for the welcome section canvas)
    const canvas = document.getElementById('laser-bg');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        // We check if the canvas element exists before trying to access its width/height property
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create laser beams class
    const lasers = [];
    const laserCount = 15;
    
    class Laser {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.length = Math.random() * 200 + 100;
            this.width = Math.random() * 3 + 1;
            this.speed = Math.random() * 2 + 1;
            this.angle = Math.random() * Math.PI * 2;
            this.color = `hsl(${Math.random() * 60 + 270}, 100%, 70%)`;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            
            // Boundary check with wrap-around
            if (this.x > canvas.width + this.length) this.x = -this.length;
            else if (this.x < -this.length) this.x = canvas.width + this.length;
            
            if (this.y > canvas.height + this.length) this.y = -this.length;
            else if (this.y < -this.length) this.y = canvas.height + this.length;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            
            const gradient = ctx.createLinearGradient(0, 0, this.length, 0);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.3, this.color);
            gradient.addColorStop(0.7, this.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = gradient;
            ctx.fillRect(0, -this.width/2, this.length, this.width);
            
            // Add glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.fillRect(0, -this.width/2, this.length, this.width);
            
            ctx.restore();
        }
    }
    
    // Initialize lasers
    function init() {
        for (let i = 0; i < laserCount; i++) {
            lasers.push(new Laser());
        }
    }
    
    // Draw dark background
    function drawBackground() {
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Animation loop
    function animate() {
        drawBackground();
        
        for (let i = 0; i < lasers.length; i++) {
            lasers[i].update();
            lasers[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
});