/* project-detail.js - Scripts for project-detail.html only */

document.addEventListener("DOMContentLoaded", function () {
  
  // ===== PRELOADER ANIMATION =====
  const preloader = document.getElementById("preloader");
  const counterEl = document.querySelector("#progress h5");
  const mainContent = document.querySelector(".data-scroll-container");

  if (preloader && counterEl) {
    let count = 0;
    const counterInterval = setInterval(function () {
      count += Math.floor(Math.random() * 5) + 1;
      if (count >= 100) {
        count = 100;
        clearInterval(counterInterval);

        gsap.to("#preloader", {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: function () {
            preloader.style.display = "none";
            if (mainContent) {
              mainContent.classList.add("loaded");
            }
            initProjectDetailPage();
          }
        });
      }
      counterEl.textContent = String(count).padStart(2, "0");
    }, 30);
  }

  // ===== PAGE INITIALIZATION =====
  function initProjectDetailPage() {
    
    // Initialize Locomotive Scroll
    if (typeof LocomotiveScroll !== "undefined") {
      const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".data-scroll-container"),
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true }
      });

      window.locoScrollInstance = locoScroll;

      // Sync with GSAP ScrollTrigger
      if (typeof ScrollTrigger !== "undefined") {
        locoScroll.on("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(".data-scroll-container", {
          scrollTop: function (value) {
            return arguments.length
              ? locoScroll.scrollTo(value, 0, 0)
              : locoScroll.scroll.instance.scroll.y;
          },
          getBoundingClientRect: function () {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight
            };
          },
          pinType: document.querySelector(".data-scroll-container").style
            .transform
            ? "transform"
            : "fixed"
        });
        ScrollTrigger.addEventListener("refresh", function () {
          locoScroll.update();
        });
        ScrollTrigger.refresh();
      }
    }

    // ===== SHERY.JS EFFECTS (Desktop Only) =====
    if (window.innerWidth > 768 && typeof Shery !== "undefined") {
      
      // Mouse follower
      Shery.mouseFollower({
        skew: false,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 0.5
      });

      // ===== GOOEY EFFECT =====
      Shery.imageEffect(".project-image", {
        style: 6,
        gooey: true,
        config: {
          noiseDetail: { value: 9.16, range: [0, 100] },
          distortionAmount: { value: 3.74, range: [0, 10] },
          scale: { value: 59.54, range: [0, 100] },
          speed: { value: 0.51, range: [0, 1] },
          zindex: { value: -9996999, range: [-9999999, 9999999] },
          aspect: { value: 0.8886583026758482 },
          ignoreShapeAspect: { value: true },
          shapePosition: { value: { x: 0, y: 0 } },
          shapeScale: { value: { x: 0.5, y: 0.5 } },
          shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
          shapeRadius: { value: 0, range: [0, 2] },
          currentScroll: { value: 0 },
          scrollLerp: { value: 0.07 },
          gooey: { value: true },
          infiniteGooey: { value: false },
          growSize: { value: 4, range: [1, 15] },
          durationOut: { value: 1, range: [0.1, 5] },
          durationIn: { value: 1.5, range: [0.1, 5] },
          displaceAmount: { value: 0.5 },
          masker: { value: true },
          maskVal: { value: 1.37, range: [1, 5] },
          scrollType: { value: 0 },
          geoVertex: { range: [1, 64], value: 1 },
          noEffectGooey: { value: true },
          onMouse: { value: 0 },
          noise_speed: { value: 0.53, range: [0, 10] },
          metaball: { value: 0.47, range: [0, 2] },
          discard_threshold: { value: 0.5, range: [0, 1] },
          antialias_threshold: { value: 0, range: [0, 0.1] },
          noise_height: { value: 0.34, range: [0, 2] },
          noise_scale: { value: 11.45, range: [0, 100] }
        }
      });

      // Hover scale effect for interactive elements
      const hoverElements = document.querySelectorAll(
        "a, .back-link, #menu, #nav-part2 h4, .project-image, .next-project, .interactive-circle"
      );
      
      hoverElements.forEach(function(el) {
        el.addEventListener("mouseenter", function () {
          gsap.to(".mousefollower", { scale: 2, duration: 0.3 });
        });
        el.addEventListener("mouseleave", function () {
          gsap.to(".mousefollower", { scale: 1, duration: 0.3 });
        });
      });

      // Magnetic effect for navigation and circles
      Shery.makeMagnet("#nav-part2 h4, .back-link, #menu, .next-project, .interactive-circle", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 0.6
      });

      // ===== INTERACTIVE CIRCLES CLICK BEHAVIOR =====
      const circles = document.querySelectorAll('.interactive-circle');

      circles.forEach(function(circle) {
        circle.addEventListener('click', function(e) {
          e.preventDefault();
          
          const wrapper = circle.closest('.project-image-wrapper');
          if (!wrapper || !window.locoScrollInstance) return;
          
          // Get current section number from ID (e.g., "section-2" -> 2)
          const currentNum = parseInt(wrapper.id.split('-')[1]);
          const nextNum = currentNum + 1;
          const nextSection = document.getElementById(`section-${nextNum}`);
          
          // Determine target: next section or description
          const target = nextSection || document.getElementById('description');
          if (!target) return;
          
          // Disable ScrollTrigger during scroll to prevent glitching
          if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.getAll().forEach(function(t) { t.disable(); });
          }
          
          // Scroll with Locomotive Scroll
          window.locoScrollInstance.scrollTo(target);
          
          // Re-enable ScrollTrigger after scroll animation completes
          setTimeout(function() {
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.getAll().forEach(function(t) { t.enable(); });
              ScrollTrigger.refresh();
            }
          }, 1200);
        });
      });
    } // End of Shery.js block

    // ===== PARALLAX EFFECTS ON SCROLL =====
    if (typeof ScrollTrigger !== "undefined") {
      
      // Full width images parallax
      gsap.utils.toArray(".project-image-full").forEach(function(item) {
        const speed = parseFloat(item.getAttribute('data-scroll-speed')) || 1;
        gsap.to(item.querySelector('img'), {
          yPercent: speed * 15,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            scroller: ".data-scroll-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Left aligned images parallax
      gsap.utils.toArray(".project-image-left").forEach(function(item) {
        const speed = parseFloat(item.getAttribute('data-scroll-speed')) || 1;
        gsap.to(item.querySelector('img'), {
          yPercent: speed * 20,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            scroller: ".data-scroll-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Right aligned images parallax
      gsap.utils.toArray(".project-image-right").forEach(function(item) {
        const speed = parseFloat(item.getAttribute('data-scroll-speed')) || 1;
        gsap.to(item.querySelector('img'), {
          yPercent: speed * 20,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            scroller: ".data-scroll-container",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // ===== FOOTER UNDERLINE ANIMATION =====
      gsap.utils.toArray(".footer-line").forEach(function(line) {
        gsap.to(line, {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            scroller: ".data-scroll-container",
            start: "top 90%"
          }
        });
      });
    }

    // ===== FOOTER TEXT FADE EFFECT =====
    if (document.querySelector('.text-container')) {
      textFadeEffect();
    }
  }

  // ===== FOOTER TEXT FADE EFFECT =====
  function textFadeEffect() {
    const heading1 = document.querySelector('.heading1');
    const heading2 = document.querySelector('.heading2');
    
    if (!heading1 || !heading2) return;
    
    const text = "Let's Create";
    heading1.innerHTML = text.split('').map(function(char) {
      return '<span>' + (char === ' ' ? '&nbsp;' : char) + '</span>';
    }).join('');
    heading2.innerHTML = text.split('').map(function(char) {
      return '<span>' + (char === ' ' ? '&nbsp;' : char) + '</span>';
    }).join('');

    const spans1 = heading1.querySelectorAll('span');
    const spans2 = heading2.querySelectorAll('span');

    gsap.from(spans1, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.03,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heading1,
        scroller: ".data-scroll-container",
        start: "top 85%"
      }
    });

    gsap.from(spans2, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.03,
      ease: "power3.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: heading2,
        scroller: ".data-scroll-container",
        start: "top 85%"
      }
    });
  }

  // ===== RESIZE HANDLER =====
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
      var followers = document.querySelectorAll(".mousefollower");
      followers.forEach(function(f) { f.style.display = "none"; });
    } else {
      var followers = document.querySelectorAll(".mousefollower");
      followers.forEach(function(f) { f.style.display = "block"; });
    }
  });
});