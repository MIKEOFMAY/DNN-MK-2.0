/* about.js - Scripts for about.html only */

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

        // Animate preloader out
        gsap.to("#preloader", {
          y: "-100%",
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: function () {
            preloader.style.display = "none";
            // Show main content
            if (mainContent) {
              mainContent.classList.add("loaded");
            }
            // Initialize page animations after preloader
            initAboutPage();
          }
        });
      }
      counterEl.textContent = String(count).padStart(2, "0");
    }, 30);
  }

  // ===== PAGE INITIALIZATION =====
  function initAboutPage() {
    // 🛑 REMOVED: Locomotive Scroll initialization
    // script.js already initializes Locomotive on ALL pages.
    // Creating a second instance causes conflicts and scroll bugs.
    // We rely on the shared locoScroll instance from script.js.

    // Custom Cursor (Desktop Only) - NO pointer finger
    if (window.innerWidth > 768 && typeof Shery !== "undefined") {
      Shery.mouseFollower({
        skew: false,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 0.5
      });

      // Hover scale effect for interactive elements
      var hoverElements = document.querySelectorAll(
        "a, .back-link, #menu, #nav-part2 h4, .about-image"
      );
      for (var i = 0; i < hoverElements.length; i++) {
        hoverElements[i].addEventListener("mouseenter", function () {
          gsap.to(".mousefollower", { scale: 2, duration: 0.3 });
        });
        hoverElements[i].addEventListener("mouseleave", function () {
          gsap.to(".mousefollower", { scale: 1, duration: 0.3 });
        });
      }

      // Magnetic effect for navigation
      Shery.makeMagnet("#nav-part2 h4, .back-link, #menu", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 0.6
      });
    }

    // Page content animations
    gsap.from(".about-header h1", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.from(".about-intro", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.4
    });

    gsap.from(".about-image", {
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.6
    });

    gsap.from(".about-image-text", {
      x: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.6
    });

    gsap.from(".award-item", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.8
    });

    gsap.from(".back-link", {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    });

    if (document.querySelector('.text-container')) {
      textFadeEffect();
    }

    // ===== FIX: FORCE SCROLL RECALCULATION AFTER CONTENT LOADS =====
    // This prevents the white blank area at bottom by ensuring Locomotive
    // recalculates height after all images/fonts have finished loading.
    // We access the global locoScroll instance from script.js.
    window.addEventListener('load', function() {
      setTimeout(function() {
        // Access the global locoScroll instance (created in script.js)
        if (typeof window.locoScrollInstance !== 'undefined' && window.locoScrollInstance) {
          window.locoScrollInstance.update();
        }
      }, 500); // 500ms delay ensures assets are loaded
    });

    // Also recalculate on window resize
    window.addEventListener('resize', function() {
      setTimeout(function() {
        if (typeof window.locoScrollInstance !== 'undefined' && window.locoScrollInstance) {
          window.locoScrollInstance.update();
        }
      }, 250);
    });
  }

  // ===== RESIZE HANDLER =====
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
      var followers = document.querySelectorAll(".mousefollower");
      for (var i = 0; i < followers.length; i++) {
        followers[i].style.display = "none";
      }
    } else {
      var followers = document.querySelectorAll(".mousefollower");
      for (var i = 0; i < followers.length; i++) {
        followers[i].style.display = "block";
      }
    }
  });
});