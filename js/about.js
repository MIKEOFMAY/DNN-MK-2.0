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
    // Initialize Locomotive Scroll
    if (typeof LocomotiveScroll !== "undefined") {
      const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".data-scroll-container"),
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true }
      });

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

    // ===== FOOTER ANIMATION: "Let's Create" =====
    if (document.querySelector('.text-container')) {
      textFadeEffect();
    }
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