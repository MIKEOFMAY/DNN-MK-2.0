/* contact.js - Scripts for contact.html only */

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
            initContactPage();
          }
        });
      }
      counterEl.textContent = String(count).padStart(2, "0");
    }, 30);
  }

  // ===== PAGE INITIALIZATION =====
  function initContactPage() {
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
        "a, .back-link, #menu, #nav-part2 h4, .submit-btn"
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

    // ===== BACKGROUND COLOR TRANSITIONS ON SCROLL =====
    const page1 = document.getElementById("page1");
    const formSection = document.getElementById("form-section");
    const infoSection = document.getElementById("info-section");

    if (typeof ScrollTrigger !== "undefined") {
      // Form section: Dark → Blue
      ScrollTrigger.create({
        trigger: formSection,
        scroller: ".data-scroll-container",
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => page1.classList.add("bg-blue"),
        onEnterBack: () => page1.classList.add("bg-blue"),
        onLeave: () => page1.classList.remove("bg-blue"),
        onLeaveBack: () => page1.classList.remove("bg-blue")
      });

      // Info section: Blue → Orange
      ScrollTrigger.create({
        trigger: infoSection,
        scroller: ".data-scroll-container",
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          page1.classList.remove("bg-blue");
          page1.classList.add("bg-orange");
        },
        onEnterBack: () => {
          page1.classList.remove("bg-blue");
          page1.classList.add("bg-orange");
        },
        onLeave: () => {
          page1.classList.remove("bg-orange");
          page1.classList.add("bg-dark");
        },
        onLeaveBack: () => {
          page1.classList.remove("bg-orange");
          page1.classList.add("bg-blue");
        }
      });

      // After info section: Orange → Dark
      ScrollTrigger.create({
        trigger: "footer",
        scroller: ".data-scroll-container",
        start: "top 80%",
        onEnter: () => {
          page1.classList.remove("bg-orange");
          page1.classList.add("bg-dark");
        },
        onLeaveBack: () => {
          page1.classList.remove("bg-dark");
          page1.classList.add("bg-orange");
        }
      });
    }

    // Page content animations
    gsap.from(".contact-header h1", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.from(".contact-intro", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.4
    });

    gsap.from(".form-group", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.6
    });

    gsap.from(".submit-btn", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.9
    });

    gsap.from(".info-box", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.7
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

    // ===== FORM SUBMISSION =====
    const contactForm = document.querySelector(".contact-form-section");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        
        // Simple validation
        if (name && email && message) {
          // Show success message
          const btn = this.querySelector(".submit-btn");
          const originalText = btn.textContent;
          
          btn.textContent = "Sending...";
          btn.disabled = true;
          
          // Simulate sending
          setTimeout(() => {
            btn.textContent = "Sent! ✓";
            btn.style.background = "#4CAF50";
            
            // Reset form after 2 seconds
            setTimeout(() => {
              contactForm.reset();
              btn.textContent = originalText;
              btn.disabled = false;
              btn.style.background = "#fff";
            }, 2000);
          }, 1500);
        }
      });
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