/* =============================================================================
   main-page.js — EXACT REPLICATION of script.js + about.js execution flow
   ============================================================================= */

// 1. PURE JS OVERRIDE: Kills Shery's blend-mode and forces back-link color
// This runs immediately before anything else, replacing the need for CSS hacks.
// 1. PURE JS OVERRIDE: Keeps cursor white, but forces back-link ABOVE the cursor
// This prevents the cursor's mix-blend-mode from inverting the back-link text
const style = document.createElement('style');
style.innerHTML = `
  .back-link { z-index: 10000 !important; position: relative; }
  .back-link svg { z-index: 10000 !important; position: relative; }
`;
document.head.appendChild(style);

// ── SHARED UTILITIES (Exact copies from script.js) ──────────────────
function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);
  const scrollContainer = document.querySelector(".data-scroll-container");
  if (!scrollContainer) return; 
  const locoScroll = new LocomotiveScroll({ el: scrollContainer, smooth: true, smoothMobile: true });
  window.locoScrollInstance = locoScroll;
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(".data-scroll-container", {
    scrollTop(value) { return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y; },
    getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; },
    pinType: document.querySelector(".data-scroll-container").style.transform ? "transform" : "fixed"
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function progressCounter() {
  const progressCount = document.querySelector("#progress h5");
  if (!progressCount) return; 
  let count = 0;
  const counter = setInterval(function () {
    count += Math.floor(Math.random() * 5) + 1;
    if (count >= 100) { count = 100; clearInterval(counter); }
    progressCount.textContent = count;
  }, 30);
}

function cursor() {
  if (!document.querySelector("#cursor")) return; // Guard clause

  document.documentElement.style.cursor = "none";

  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      x: dets.clientX,
      y: dets.clientY,
      ease: "expo.out"
    });
  });

  cursorAnimation();
}

function cursorAnimation() {
  function scaleCursorOnHover(elem) {
    const elements = document.querySelectorAll(elem);
    elements.forEach((element) => {
      element.addEventListener("mousemove", function () {
        gsap.to("#cursor", { scale: 1.4, duration: 0.3, ease: "sine" });
      });

      element.addEventListener("mouseleave", function () {
        gsap.to("#cursor", { scale: 1, duration: 0.3, ease: "sine" });
      });
    });
  }

  scaleCursorOnHover("#menu");
  scaleCursorOnHover("#nav-part2 h4");
}

function magnetEffect() {
  // Added #logo next to #menu
  Shery.makeMagnet("#menu, #logo", {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0.4
  });

  Shery.makeMagnet("#nav-part2 h4", {
    ease: "sine",
    duration: 0.3
  });
}

function flagAnimation() {
  const hoverContainer = document.querySelector(".text3");
  if (!hoverContainer) return; // Guard clause (Prevents error on pages without .text3)

  const hoverContainerDims = hoverContainer.getBoundingClientRect();

  hoverContainer.addEventListener("mousemove", function (dets) {
    let moveX = dets.clientX - hoverContainerDims.x;
    let moveY = dets.clientY - hoverContainerDims.y;

    gsap.to("#flag", {
      top: "50%",
      x: moveX,
      y: moveY,
      opacity: 1,
      ease: "circ"
    });
  });

  hoverContainer.addEventListener("mouseleave", function (dets) {
    let moveX = dets.clientX - hoverContainerDims.x;
    let moveY = dets.clientY - hoverContainerDims.y;

    gsap.to("#flag", {
      top: "50%",
      x: moveX,
      y: moveY,
      opacity: 0,
      ease: "circ"
    });
  });
}

function videoCursorHandler() {
  const videoContainer = document.querySelector("#video-container");
  if (!videoContainer) return; // Guard clause (Prevents error on pages without video)

  const videoCursor = document.querySelector("#video-cursor");
  const video = document.querySelector("#video-container video");

  videoContainer.addEventListener("mousemove", function (dets) {
    const videoDims = videoContainer.getBoundingClientRect();
    const x = dets.x - videoDims.x;
    const y = dets.y - videoDims.y;

    gsap.to("#cursor", { opacity: 0 });
    gsap.to("#video-cursor", { top: y - 50, left: x - 50, ease: "expo.out" });
  });

  videoContainer.addEventListener("mouseleave", function (dets) {
    gsap.to("#cursor", { opacity: 1 });
    gsap.to("#video-cursor", { top: "-10%", left: "69%", ease: "expo.out" });
  });

  let isPaused = true;
  videoContainer.addEventListener("click", function () {
    if (isPaused) {
      videoCursor.innerHTML = `<i class="ri-pause-fill"></i>`;
      videoCursor.style.scale = 0.5;
      video.play();
      video.style.opacity = 1;
      if (window.innerWidth <= 768) {
        videoCursor.style.opacity = 0;
      }
      isPaused = false;
    } else {
      videoCursor.innerHTML = `<i class="ri-play-fill"></i>`;
      videoCursor.style.scale = 1;
      video.pause();
      video.style.opacity = 0;
      videoCursor.style.opacity = 1;
      isPaused = true;
    }
  });
}

function textSwipeEffect(textContainer, swipeOffsetY, swipeDuration, hoverElementSelector = null) {
  let frames = document.querySelectorAll(textContainer);
  if (frames.length === 0) return; 
  frames.forEach(function (frame, index) {
    let hoverElement = hoverElementSelector ? document.querySelectorAll(hoverElementSelector)[index] : frame;
    if(!hoverElement) return; 
    hoverElement.addEventListener("mousemove", function () { gsap.to(frame.children, { y: swipeOffsetY, duration: swipeDuration }); });
    hoverElement.addEventListener("mouseleave", function () { gsap.to(frame.children, { y: 0, duration: swipeDuration }); });
  });
}

function gooeyEffect(selector) {
  // 🌟 FIX: Accept the selector passed from initWorkPage() or default to index.html
  const target = selector || ".project-image";
  if (!document.querySelector(target)) return; 
  
  Shery.imageEffect(target, {
    style: 6, gooey: true,
    config: {
      noiseDetail: { value: 9.16, range: [0, 100] }, distortionAmount: { value: 3.74, range: [0, 10] },
      scale: { value: 59.54, range: [0, 100] }, speed: { value: 0.51, range: [0, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] }, aspect: { value: 0.8886583026758482 },
      ignoreShapeAspect: { value: true }, shapePosition: { value: { x: 0, y: 0 } }, shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] }, shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 }, scrollLerp: { value: 0.07 }, gooey: { value: true },
      infiniteGooey: { value: false }, growSize: { value: 4, range: [1, 15] }, durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] }, displaceAmount: { value: 0.5 }, masker: { value: true },
      maskVal: { value: 1.37, range: [1, 5] }, scrollType: { value: 0 }, geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true }, onMouse: { value: 0 }, noise_speed: { value: 0.53, range: [0, 10] },
      metaball: { value: 0.47, range: [0, 2] }, discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] }, noise_height: { value: 0.34, range: [0, 2] },
      noise_scale: { value: 11.45, range: [0, 100] }
    }
  });
}

function textFadeEffect() {
  if (window.hasRunTextFadeEffect) return;
  window.hasRunTextFadeEffect = true;
  const textContainer = document.querySelector(".text-container");
  if (!textContainer) return; 
  const string = "Let's Create";
  const headings = document.querySelectorAll(".text-container h1");
  let hoverTimer, isHovering = false;
  headings.forEach(function (heading) {
    for (let i = 0; i < string.length; i++) {
      const span = document.createElement("span");
      span.textContent = string[i];
      heading.appendChild(span);
    }
  });
  textContainer.addEventListener("mouseenter", function () {
    isHovering = true;
    hoverTimer = setTimeout(() => {
      if (isHovering) {
        gsap.to(".heading1 span", { opacity: 0, duration: 0.2, stagger: 0.05 });
        gsap.to(".heading2 span", { opacity: 1, duration: 0.2, stagger: 0.05, delay: 0.2 });
        if (window.innerWidth <= 768) gsap.to(".arrow", { x: 40, duration: 0.4, ease: "circ" });
        else gsap.to(".arrow", { x: 100, duration: 0.4, ease: "circ" });
      }
    }, 500);
  });
  textContainer.addEventListener("mouseleave", function () {
    isHovering = false; clearTimeout(hoverTimer);
    gsap.to(".heading2 span", { opacity: 0, duration: 0.3, stagger: 0.05 });
    gsap.to(".heading1 span", { opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.3 });
    if (window.innerWidth <= 768) gsap.to(".arrow", { x: 10, duration: 0.4, ease: "circ", delay: 0.5 });
    else gsap.to(".arrow", { x: 20, duration: 0.4, ease: "circ", delay: 0.5 });
  });
}

function underlineAnimations() {
  let underlines = document.querySelectorAll(".underline");
  underlines.forEach(function (underline) {
    let underlineParentId = underline.parentElement.id;
    if(!underlineParentId) return;
    gsap.to(`#${underlineParentId} .underline`, {
      scaleX: 1, duration: 1, ease: "circ", stagger: 0.3,
      scrollTrigger: { trigger: `#${underlineParentId}`, scroller: ".data-scroll-container", start: "top 70%" }
    });
  });
  let projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((projectItem) => {
    gsap.to(projectItem, {
      onStart: () => projectItem.classList.add("animate-image-underline"),
      scrollTrigger: { trigger: projectItem, scroller: ".data-scroll-container", start: "25% 20%" }
    });
  });
}

// ── PAGE SPECIFIC INITS (Exact copies from about.js, work.js, etc.) ──────
function initAboutPage() {
  if (window.innerWidth > 768 && typeof Shery !== "undefined") {
    Shery.mouseFollower({ skew: false, ease: "cubic-bezier(0.23, 1, 0.320, 1)", duration: 0.5 });
    document.querySelectorAll("a, .back-link, #menu, #nav-part2 h4, .about-image").forEach(el => {
      el.addEventListener("mouseenter", () => gsap.to(".mousefollower", { scale: 2, duration: 0.3 }));
      el.addEventListener("mouseleave", () => gsap.to(".mousefollower", { scale: 1, duration: 0.3 }));
    });
    Shery.makeMagnet("#nav-part2 h4, .back-link, #menu", { ease: "cubic-bezier(0.23, 1, 0.320, 1)", duration: 0.6 });
  }
  gsap.from(".about-header h1", { y: 100, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  gsap.from(".about-intro", { y: 60, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.4 });
  gsap.from(".about-image", { x: -40, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.6 });
  gsap.from(".about-image-text", { x: 40, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.6 });
  gsap.from(".award-item", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.8 });
  gsap.from(".back-link", { x: -30, opacity: 0, duration: 0.6, ease: "power2.out" });
}

function initWorkPage() {
  if (window.innerWidth > 768 && typeof Shery !== "undefined") {
    Shery.mouseFollower({ skew: false, ease: "cubic-bezier(0.23, 1, 0.320, 1)", duration: 0.5 });
    document.querySelectorAll("a, .work-card, .back-link, #menu, #nav-part2 h4, .interactive-circle, .interactive-circle2").forEach(el => {
      el.addEventListener("mouseenter", () => gsap.to(".mousefollower", { scale: 2, duration: 0.3 }));
      el.addEventListener("mouseleave", () => gsap.to(".mousefollower", { scale: 1, duration: 0.3 }));
    });
    Shery.makeMagnet("#nav-part2 h4, .back-link, #menu, .interactive-circle, .interactive-circle2", { ease: "cubic-bezier(0.23, 1, 0.320, 1)", duration: 0.6 });
    gooeyEffect(".work-card .img-wrapper");
  }
  gsap.from(".works-header h1", { y: 100, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  gsap.from(".work-card", { y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.5 });
  gsap.from(".interactive-circle", { scale: 0, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power2.out", delay: 0.7 });
  gsap.from(".interactive-circle2", { scale: 0, opacity: 0, duration: 0.6, ease: "power2.out", delay: 1 });
  gsap.from(".back-link", { x: -30, opacity: 0, duration: 0.6, ease: "power2.out" });
}

function initContactPage() {
  if (window.innerWidth > 768 && typeof Shery !== "undefined") {
    Shery.mouseFollower({ skew: false, ease: "cubic-bezier(0.23, 1, 0.320, 1)", duration: 0.5 });
    document.querySelectorAll("a, .back-link, #menu, #nav-part2 h4, .submit-btn").forEach(el => {
      el.addEventListener("mouseenter", () => gsap.to(".mousefollower", { scale: 2, duration: 0.3 }));
      el.addEventListener("mouseleave", () => gsap.to(".mousefollower", { scale: 1, duration: 0.3 }));
    });
    Shery.makeMagnet("#nav-part2 h4, .back-link, #menu", { ease: "cubic-bezier(0.23, 1, 0.320, 1)", duration: 0.6 });
  }
  const page1 = document.getElementById("page1");
  const formSection = document.getElementById("form-section");
  const infoSection = document.getElementById("info-section");
  if (page1 && formSection && typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({ trigger: formSection, scroller: ".data-scroll-container", start: "top 60%", end: "bottom 40%", onEnter: () => page1.classList.add("bg-blue"), onEnterBack: () => page1.classList.add("bg-blue"), onLeave: () => page1.classList.remove("bg-blue"), onLeaveBack: () => page1.classList.remove("bg-blue") });
  }
  if (page1 && infoSection && typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({ trigger: infoSection, scroller: ".data-scroll-container", start: "top 60%", end: "bottom 40%", onEnter: () => { page1.classList.remove("bg-blue"); page1.classList.add("bg-orange"); }, onEnterBack: () => { page1.classList.remove("bg-blue"); page1.classList.add("bg-orange"); }, onLeave: () => { page1.classList.remove("bg-orange"); page1.classList.add("bg-dark"); }, onLeaveBack: () => { page1.classList.remove("bg-orange"); page1.classList.add("bg-blue"); } });
    ScrollTrigger.create({ trigger: "footer", scroller: ".data-scroll-container", start: "top 80%", onEnter: () => { page1.classList.remove("bg-orange"); page1.classList.add("bg-dark"); }, onLeaveBack: () => { page1.classList.remove("bg-dark"); page1.classList.add("bg-orange"); } });
  }
  gsap.from(".contact-header h1", { y: 100, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  gsap.from(".contact-intro", { y: 60, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.4 });
  gsap.from(".form-group", { y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.6 });
  gsap.from(".submit-btn", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.9 });
  gsap.from(".info-box", { y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.7 });
  gsap.from(".back-link", { x: -30, opacity: 0, duration: 0.6, ease: "power2.out" });
  
  const contactForm = document.querySelector(".contact-form-section");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value;
      const email = document.getElementById("email")?.value;
      const message = document.getElementById("message")?.value;
      if (!name || !email || !message) return;
      const btn = this.querySelector(".submit-btn");
      const original = btn.textContent;
      btn.textContent = "Sending..."; btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Sent! ✓"; btn.style.background = "#4CAF50";
        setTimeout(() => { contactForm.reset(); btn.textContent = original; btn.disabled = false; btn.style.background = "#fff"; }, 2000);
      }, 1500);
    });
  }
}

function initContactsMenuPage() {
  if (window.innerWidth > 768 && typeof Shery !== "undefined") {
    Shery.mouseFollower({ skew: false, ease: "cubic-bezier(0.23, 1, 0.320, 1)", duration: 0.5 });
    document.querySelectorAll("a, .back-link, #menu, #nav-part2 h4, .menu-link").forEach(el => {
      el.addEventListener("mouseenter", () => gsap.to(".mousefollower", { scale: 2, duration: 0.3 }));
      el.addEventListener("mouseleave", () => gsap.to(".mousefollower", { scale: 1, duration: 0.3 }));
    });
    Shery.makeMagnet("#nav-part2 h4, .back-link, #menu", { ease: "cubic-bezier(0.23, 1, 0.320, 1)", duration: 0.6 });
  }
  document.querySelectorAll(".sidebar-section ul li a").forEach(function (link) {
    const text = link.textContent.trim();
    const machine = document.createElement("div"); machine.className = "slot-machine";
    const content = document.createElement("div"); content.className = "slot-content";
    const s1 = document.createElement("span"); s1.textContent = text;
    const s2 = document.createElement("span"); s2.textContent = text;
    content.appendChild(s1); content.appendChild(s2); machine.appendChild(content);
    link.textContent = ""; link.appendChild(machine);
  });
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(".menu-link", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power4.out" }, "-=0.2")
    .to(".sidebar-section", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.6");
  gsap.from(".back-link", { x: -30, opacity: 0, duration: 0.6, ease: "power2.out" });
}

function initIndexPage() {
  // Index page doesn't use mouseFollower in the original setup, keeping it pure to script.js
  
  flagAnimation();
  videoCursorHandler();
  textFadeEffect();
  if (window.innerWidth > 768) gooeyEffect();
  if (window.innerWidth <= 768) {
    removeimages();
    textSwipeEffect(".header-frame", "-6.7vw", 0.45, ".project-item");
    textSwipeEffect(".frame", "-6.5vw", 0.55);
  } else {
    textSwipeEffect(".header-frame", "-2.1vw", 0.45, ".project-item");
    textSwipeEffect(".frame", "-1.6vw", 0.55);
  }
}

function removeimages() {
  let projectimages = document.querySelectorAll(".project-image img");
  projectimages.forEach((projectImage, index) => { if (index % 2 !== 0) projectImage.style.display = "none"; });
}

// ── PRELOADER LOGIC (Handles both Index 4.5s and Inner 0.8s) ──────
function preloaderAnimations() {
  const preloader = document.querySelector("#preloader");
  if (!preloader) return; 
  const isIndex = document.querySelector(".hero-text") !== null;

  gsap.from(".line h1", { y: 150, stagger: 0.25, duration: 0.5, delay: 0.3 });
  gsap.from("#progress", { opacity: 0, duration: 0.8, delay: 0.6 });
  gsap.from("#wait-message p", { opacity: 0, duration: 0.4, delay: 1.2 });

  let count = 0;
  const counter = setInterval(function () {
    count += Math.floor(Math.random() * 5) + 1;
    if (count >= 100) { 
      count = 100; 
      clearInterval(counter); 
      
      // INNER PAGES: Fast 0.8s slide (Matches about.js exactly)
      if (!isIndex) {
        gsap.to("#preloader", {
          y: "-100%", duration: 0.8, ease: "power3.inOut",
          onComplete: function () {
            preloader.style.display = "none";
            triggerPageInit();
          }
        });
      }
    }
    const counterEl = document.querySelector("#progress h5");
    if (counterEl) counterEl.textContent = String(count).padStart(2, "0");
  }, 30);

  // INDEX PAGE: 4.5s cinematic (Matches script.js exactly)
  if (isIndex) {
    gsap.to("#line1 #progress", { opacity: 0, duration: 0.5, delay: 3.2 });
    gsap.to("#line1 h1", { opacity: 0, duration: 0.9, delay: 3.2 });
    gsap.to("#line3 h1 span", { opacity: 0, duration: 0.9, delay: 3.2 });
    gsap.to("#wait-message p", { opacity: 0, duration: 0.9, delay: 3.2 });
    gsap.to("#line2 h1", { opacity: 0, duration: 0.8, delay: 3.4 });
    gsap.to("#line3 h1", { opacity: 0, duration: 0.8, delay: 3.4 });
    gsap.to("#preloader", { y: -1600, duration: 1.45, delay: 4.5 });
    gsap.to("#preloader", { display: "none", delay: 4.65, onComplete: triggerPageInit });


    gsap.from(".hero-text h1", { y: 150, duration: 0.6, stagger: 0.25, delay: 4.35 });
    gsap.to(".hero-text", { overflow: "visible", delay: 5.7 });
  }
}

// ── ROUTER & JS FIXES ──────────────────────────────────────
function triggerPageInit() {
  // PURE JS FIX: Force back-link to be white and above everything
  const backLink = document.querySelector('.back-link');
  if (backLink) {
    backLink.style.color = '#ffffff';
    backLink.style.zIndex = '99999';
    backLink.style.position = 'relative';
    const svg = backLink.querySelector('svg');
    if(svg) svg.style.stroke = '#ffffff';
  }

  // PURE JS FIX: Kill mix-blend-mode on the follower if it exists
  const follower = document.querySelector('.mousefollower');
  if (follower) follower.style.mixBlendMode = 'normal';

  // Route to specific page init
  if (document.querySelector(".about-header")) initAboutPage();
  else if (document.querySelector(".works-header")) initWorkPage();
  else if (document.querySelector(".contact-header")) initContactPage();
  else if (document.querySelector(".menu-link")) initContactsMenuPage();
  else initIndexPage();
  
  // PURE JS FIX: Force Locomotive recalculate (Matches about.js load event)
  setTimeout(() => {
    if (window.locoScrollInstance) window.locoScrollInstance.update();
  }, 500);
}

// ── IMMEDIATE EXECUTION (Exactly like script.js) ────────────
// This MUST be at the bottom, outside of any DOMContentLoaded wrapper
locoScroll();
cursor();
progressCounter();
preloaderAnimations();
underlineAnimations();
magnetEffect();
textSwipeEffect(".header-frame", "-2.1vw", 0.45, ".project-item");
textSwipeEffect(".frame", "-1.6vw", 0.55);
textFadeEffect();

function runOnDesktop() {
  if (window.innerWidth > 768) {
    magnetEffect();
    gooeyEffect();
  }
}
runOnDesktop();

function runOnMobile() {
  if (window.innerWidth <= 768) {
    removeimages();
    textSwipeEffect(".header-frame", "-6.7vw", 0.45, ".project-item");
    textSwipeEffect(".frame", "-6.5vw", 0.55);
  }
}
runOnMobile();