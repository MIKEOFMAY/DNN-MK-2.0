/* contacts-menu.js - Scripts for contacts-menu.html only */

document.addEventListener("DOMContentLoaded", function () {
  // ===== 1. PRELOADER ANIMATION =====
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
            initContactsMenuPage();
          }
        });
      }
      counterEl.textContent = String(count).padStart(2, "0");
    }, 30);
  }

  // ===== 2. PAGE INITIALIZATION =====
  function initContactsMenuPage() {
    // A. Initialize Locomotive Scroll


    // B. Custom Cursor & Magnet (Desktop Only)
    if (window.innerWidth > 768 && typeof Shery !== "undefined") {
      Shery.mouseFollower({
        skew: false,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 0.5
      });

      var hoverElements = document.querySelectorAll(
        "a, .back-link, #menu, #nav-part2 h4, .menu-link"
      );
      for (var i = 0; i < hoverElements.length; i++) {
        hoverElements[i].addEventListener("mouseenter", function () {
          gsap.to(".mousefollower", { scale: 2, duration: 0.3 });
        });
        hoverElements[i].addEventListener("mouseleave", function () {
          gsap.to(".mousefollower", { scale: 1, duration: 0.3 });
        });
      }

      Shery.makeMagnet("#nav-part2 h4, .back-link, #menu", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 0.6
      });
    }

    // C. SLOT MACHINE EFFECT FOR SOCIAL LINKS
    const socialLinks = document.querySelectorAll('.sidebar-section ul li a');
    
    socialLinks.forEach(link => {
      const originalText = link.textContent.trim();
      const slotMachine = document.createElement('div');
      slotMachine.className = 'slot-machine';
      
      const slotContent = document.createElement('div');
      slotContent.className = 'slot-content';
      
      // Create original and hover states
      const originalSpan = document.createElement('span');
      originalSpan.textContent = originalText;
      
      const hoverSpan = document.createElement('span');
      hoverSpan.textContent = originalText;
      
      slotContent.appendChild(originalSpan);
      slotContent.appendChild(hoverSpan);
      slotMachine.appendChild(slotContent);
      
      // Clear original and add slot machine
      link.textContent = '';
      link.appendChild(slotMachine);
    });

    // D. GSAP ENTRANCE ANIMATIONS
    const menuLinks = document.querySelectorAll('.menu-link');
    const sidebarSections = document.querySelectorAll('.sidebar-section');

    if (menuLinks.length > 0) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to('.menu-link', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out'
      }, '-=0.2');

      tl.to('.sidebar-section', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.6');
    }

    gsap.from(".back-link", {
      x: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.2
    });

    if (typeof textFadeEffect === 'function' && document.querySelector('.text-container')) {
      textFadeEffect();
    }
  }

  // ===== 3. RESIZE HANDLER =====
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