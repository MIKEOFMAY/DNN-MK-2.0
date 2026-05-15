/* work.js - Scripts for work.html only */

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== PRELOADER ANIMATION =====
  const preloader = document.getElementById('preloader');
  const counterEl = document.querySelector('#progress h5');
  const mainContent = document.querySelector('.data-scroll-container');
  
  if (preloader && counterEl) {
    let count = 0;
    const counterInterval = setInterval(function() {
      count += Math.floor(Math.random() * 5) + 1;
      if (count >= 100) {
        count = 100;
        clearInterval(counterInterval);
        
        // Animate preloader out
        gsap.to('#preloader', {
          y: '-100%',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: function() {
            preloader.style.display = 'none';
            // Show main content
            if (mainContent) {
              mainContent.classList.add('loaded');
            }
            // Initialize page animations after preloader
            initWorkPage();
          }
        });
      }
      counterEl.textContent = String(count).padStart(2, '0');
    }, 30);
  }
  
  // ===== PAGE INITIALIZATION =====
  function initWorkPage() {
    
    // Initialize Locomotive Scroll
    if (typeof LocomotiveScroll !== 'undefined') {
      const locoScroll = new LocomotiveScroll({
        el: document.querySelector('.data-scroll-container'),
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true }
      });
      
      // Sync with GSAP ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined') {
        locoScroll.on('scroll', ScrollTrigger.update);
        ScrollTrigger.scrollerProxy('.data-scroll-container', {
          scrollTop: function(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
          },
          getBoundingClientRect: function() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          pinType: document.querySelector('.data-scroll-container').style.transform ? 'transform' : 'fixed'
        });
        ScrollTrigger.addEventListener('refresh', function() { locoScroll.update(); });
        ScrollTrigger.refresh();
      }
    }
    
    // Custom Cursor (Desktop Only)
    if (window.innerWidth > 768 && typeof Shery !== 'undefined') {
      Shery.mouseFollower({
        skew: false,
        ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
        duration: 0.5
      });
      
      // Hover scale effect for interactive elements
      var hoverElements = document.querySelectorAll('a, .work-card, .back-link, #menu, #nav-part2 h4');
      for (var i = 0; i < hoverElements.length; i++) {
        hoverElements[i].addEventListener('mouseenter', function() {
          gsap.to('.mousefollower', { scale: 2, duration: 0.3 });
        });
        hoverElements[i].addEventListener('mouseleave', function() {
          gsap.to('.mousefollower', { scale: 1, duration: 0.3 });
        });
      }
      
      // Magnetic effect for navigation
      Shery.makeMagnet('#nav-part2 h4, .back-link, #menu', {
        ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
        duration: 1
      });
    }
    
    // Gooey effect for project images (Desktop Only)
    if (window.innerWidth > 768 && typeof Shery !== 'undefined') {
      Shery.imageEffect('.work-card .img-wrapper', {
        style: 6,
        gooey: true,
        config: {
          "noiseDetail": { "value": 9.16, "range": [0, 100] },
          "distortionAmount": { "value": 3.74, "range": [0, 10] },
          "scale": { "value": 59.54, "range": [0, 100] },
          "speed": { "value": 0.51, "range": [0, 1] },
          "zindex": { "value": -9996999, "range": [-9999999, 9999999] },
          "aspect": { "value": 0.8886583026758482 },
          "ignoreShapeAspect": { "value": true },
          "shapePosition": { "value": { "x": 0, "y": 0 } },
          "shapeScale": { "value": { "x": 0.5, "y": 0.5 } },
          "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] },
          "shapeRadius": { "value": 0, "range": [0, 2] },
          "currentScroll": { "value": 0 },
          "scrollLerp": { "value": 0.07 },
          "gooey": { "value": true },
          "infiniteGooey": { "value": false },
          "growSize": { "value": 4, "range": [1, 15] },
          "durationOut": { "value": 1, "range": [0.1, 5] },
          "durationIn": { "value": 1.5, "range": [0.1, 5] },
          "displaceAmount": { "value": 0.5 },
          "masker": { "value": true },
          "maskVal": { "value": 1.37, "range": [1, 5] },
          "scrollType": { "value": 0 },
          "geoVertex": { "range": [1, 64], "value": 1 },
          "noEffectGooey": { "value": true },
          "onMouse": { "value": 0 },
          "noise_speed": { "value": 0.53, "range": [0, 10] },
          "metaball": { "value": 0.47, "range": [0, 2] },
          "discard_threshold": { "value": 0.5, "range": [0, 1] },
          "antialias_threshold": { "value": 0, "range": [0, 0.1] },
          "noise_height": { "value": 0.34, "range": [0, 2] },
          "noise_scale": { "value": 11.45, "range": [0, 100] }
        }
      });
    }
    
    // Page content animations
    gsap.from('.works-header h1', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    });
    
    gsap.from('.work-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.5
    });
    
    gsap.from('.back-link', {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  }
  
  // ===== RESIZE HANDLER =====
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      var followers = document.querySelectorAll('.mousefollower');
      for (var i = 0; i < followers.length; i++) {
        followers[i].style.display = 'none';
      }
    } else {
      var followers = document.querySelectorAll('.mousefollower');
      for (var i = 0; i < followers.length; i++) {
        followers[i].style.display = 'block';
      }
    }
  });
});