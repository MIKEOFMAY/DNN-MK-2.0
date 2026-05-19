/* script-pages.js - Works with your existing GSAP/Shery setup */

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Locomotive Scroll (matches your existing setup)
  if (typeof LocomotiveScroll !== 'undefined') {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    
    // Sync with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      locoScroll.on("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
      });
      ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
      ScrollTrigger.refresh();
    }
  }

  // Custom Cursor (Desktop Only - matches your script.js)
  if (window.innerWidth > 600 && typeof Shery !== 'undefined') {
    Shery.mouseFollower({
      skew: false,
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 0.5,
    });
    
    // Hover effects for links/buttons
    document.querySelectorAll('a, .project-card, .social-btn, .magnetic').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(".mousefollower", { scale: 2, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(".mousefollower", { scale: 1, duration: 0.3 });
      });
    });
  }

  // Magnetic Effect (Desktop Only - matches your script.js)
  if (window.innerWidth > 600 && typeof Shery !== 'undefined') {
    Shery.makeMagnet(".magnetic", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });
  }

  // Project Card Click (navigate to work page)
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = 'work.html';
    });
  });

  // Social Button Clicks
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.dataset.platform;
      const urls = {
        'dribbble': 'https://dribbble.com/datnewnew',
        'behance': 'https://behance.net/datnewnew',
        'instagram': 'https://instagram.com/datnewnew',
        'twitter': 'https://twitter.com/datnewnew'
      };
      if (urls[platform]) {
        window.open(urls[platform], '_blank');
      }
    });
  });

  // Page Load Animations (matches your loaderanime style)
  gsap.from('.page-header h1', {
    y: 160,
    opacity: 0,
    duration: 1.5,
    ease: "power2.inout"
  });
  gsap.from('.page-header h4', {
    y: 80,
    opacity: 0,
    duration: 1,
    delay: 0.2
  });
  gsap.from('.project-card, .about-content, .contact-hero', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    delay: 0.4,
    ease: "power2.inout"
  });

  // Handle resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 600) {
      document.querySelectorAll('.mousefollower').forEach(el => el.style.display = 'none');
    } else {
      document.querySelectorAll('.mousefollower').forEach(el => el.style.display = 'block');
    }
  });
});/* script-pages.js - Works with your existing GSAP/Shery setup */

document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize Locomotive Scroll (matches your existing setup)
  if (typeof LocomotiveScroll !== 'undefined') {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    
    // Sync with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      locoScroll.on("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
      });
      ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
      ScrollTrigger.refresh();
    }
  }

  // Custom Cursor (Desktop Only - matches your script.js)
  if (window.innerWidth > 600 && typeof Shery !== 'undefined') {
    Shery.mouseFollower({
      skew: false,
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 0.5,
    });
    
    // Hover effects for links/buttons
    document.querySelectorAll('a, .project-card, .social-btn, .magnetic').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(".mousefollower", { scale: 2, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(".mousefollower", { scale: 1, duration: 0.3 });
      });
    });
  }

  // Magnetic Effect (Desktop Only - matches your script.js)
  if (window.innerWidth > 600 && typeof Shery !== 'undefined') {
    Shery.makeMagnet(".magnetic", {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });
  }

  // Project Card Click (navigate to work page)
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = 'work.html';
    });
  });

  // Social Button Clicks
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.dataset.platform;
      const urls = {
        'dribbble': 'https://dribbble.com/datnewnew',
        'behance': 'https://behance.net/datnewnew',
        'instagram': 'https://instagram.com/datnewnew',
        'twitter': 'https://twitter.com/datnewnew'
      };
      if (urls[platform]) {
        window.open(urls[platform], '_blank');
      }
    });
  });

  // Page Load Animations (matches your loaderanime style)
  gsap.from('.page-header h1', {
    y: 160,
    opacity: 0,
    duration: 1.5,
    ease: "power2.inout"
  });
  gsap.from('.page-header h4', {
    y: 80,
    opacity: 0,
    duration: 1,
    delay: 0.2
  });
  gsap.from('.project-card, .about-content, .contact-hero', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    delay: 0.4,
    ease: "power2.inout"
  });

  // Handle resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 600) {
      document.querySelectorAll('.mousefollower').forEach(el => el.style.display = 'none');
    } else {
      document.querySelectorAll('.mousefollower').forEach(el => el.style.display = 'block');
    }
  });
});