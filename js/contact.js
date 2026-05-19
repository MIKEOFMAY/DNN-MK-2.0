/* contact.js - Scripts for contact.html only */

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
        
        gsap.to('#preloader', {
          y: '-100%',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: function() {
            preloader.style.display = 'none';
            if (mainContent) {
              mainContent.classList.add('loaded');
            }
            initContactPage();
          }
        });
      }
      counterEl.textContent = String(count).padStart(2, '0');
    }, 30);
  }
  
  // ===== PAGE INITIALIZATION =====
  function initContactPage() {
    
    // Initialize Locomotive Scroll
    if (typeof LocomotiveScroll !== 'undefined') {
      const locoScroll = new LocomotiveScroll({
        el: document.querySelector('.data-scroll-container'),
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true }
      });
      
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
    
    // ===== CUSTOM CURSOR & MAGNETIC (Desktop Only) =====
    if (window.innerWidth > 768 && typeof Shery !== 'undefined') {
      
      // Initialize mouse follower
      Shery.mouseFollower({
        skew: false,
        ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
        duration: 0.5
      });
      
      // Cursor scale effect for links/navigation
      var cursorScaleElements = document.querySelectorAll('a, .back-link, #menu, #nav-part2 h4');
      for (var i = 0; i < cursorScaleElements.length; i++) {
        cursorScaleElements[i].addEventListener('mouseenter', function() {
          gsap.to('.mousefollower', { scale: 2, duration: 0.3 });
        });
        cursorScaleElements[i].addEventListener('mouseleave', function() {
          gsap.to('.mousefollower', { scale: 1, duration: 0.3 });
        });
      }
      
      // Magnetic effect (including social buttons)
      Shery.makeMagnet('#nav-part2 h4, .back-link, .submit-btn, #menu, .social-btn', {
        ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
        duration: 0.6
      });
      
      // Special handler for social buttons to prevent stuck position
      var socialBtns = document.querySelectorAll('.social-btn');
      for (var j = 0; j < socialBtns.length; j++) {
        socialBtns[j].addEventListener('mouseenter', function() {
          gsap.to('.mousefollower', { scale: 2, duration: 0.3 });
        });
        socialBtns[j].addEventListener('mouseleave', function() {
          gsap.to('.mousefollower', { scale: 1, duration: 0.3 });
          // Force reset transform to prevent Shery from getting stuck
          gsap.set(this, { clearProps: 'transform' });
        });
      }
    }
    
    // ===== BACKGROUND COLOR CHANGE ON SCROLL =====
    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      const page1 = document.getElementById('page1');
      
      // Blue background when form is in view
      ScrollTrigger.create({
        trigger: '.contact-form-section',
        scroller: '.data-scroll-container',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: function() {
          page1.classList.remove('bg-dark');
          page1.classList.add('bg-blue');
        },
        onLeaveBack: function() {
          page1.classList.remove('bg-blue');
          page1.classList.add('bg-dark');
        }
      });
      
      // Orange background when contact info is in view
      ScrollTrigger.create({
        trigger: '.contact-info-section',
        scroller: '.data-scroll-container',
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: function() {
          page1.classList.remove('bg-blue');
          page1.classList.add('bg-orange');
        },
        onLeaveBack: function() {
          page1.classList.remove('bg-orange');
          page1.classList.add('bg-blue');
        }
      });
      
      // Reset to dark at end
      ScrollTrigger.create({
        trigger: 'footer',
        scroller: '.data-scroll-container',
        start: 'top 80%',
        onEnter: function() {
          page1.classList.remove('bg-orange');
          page1.classList.add('bg-dark');
        }
      });
    }
    
    // Form submission handler
    var contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Your message has been sent.');
        contactForm.reset();
      });
    }
    
    // Social button clicks
    var socialBtns = document.querySelectorAll('.social-btn');
    for (var i = 0; i < socialBtns.length; i++) {
      socialBtns[i].addEventListener('click', function(e) {
        e.preventDefault();
        var platform = this.dataset.platform;
        var urls = {
          'dribbble': 'https://dribbble.com/datnewnew',
          'behance': 'https://behance.net/datnewnew',
          'instagram': 'https://instagram.com/datnewnew',
          'twitter': 'https://twitter.com/datnewnew'
        };
        if (urls[platform]) {
          window.open(urls[platform], '_blank');
        }
      });
    }
    
    // Page content animations
    gsap.from('.contact-header h1', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    });
    
    gsap.from('.contact-intro', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.4
    });
    
    gsap.from('.form-group', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.6
    });
    
    gsap.from('.info-box', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.8
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