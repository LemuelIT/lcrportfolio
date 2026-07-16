/**
 * Lemuel C. Reyes Portfolio - Clean Modern UI Script
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. GSAP Scroll Animations
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // Simple Fade-Up Animation for elements with .fade-up class
        // We use batching to stagger elements that appear together
        gsap.set(".fade-up", { y: 30, opacity: 0, autoAlpha: 0 });

        ScrollTrigger.batch(".fade-up", {
            onEnter: batch => gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                overwrite: true
            }),
            once: true // Only animate once
        });

        // 3D Fade-to-Back Scroll Parallax for Hero Section content
        gsap.to("#home .content", {
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            scale: 0.82,
            opacity: 0,
            y: -80,
            ease: "power1.inOut"
        });

        // Active Link Observer via GSAP ScrollTrigger
        const sections = gsap.utils.toArray(".scene");
        const navLinks = document.querySelectorAll(".nav-link");

        sections.forEach(sec => {
            ScrollTrigger.create({
                trigger: sec,
                start: "top center",
                end: "bottom center",
                onToggle: self => {
                    if (self.isActive) {
                        const id = sec.getAttribute("id");
                        navLinks.forEach(link => {
                            link.classList.remove("active");
                            if (link.getAttribute("href") === `#${id}`) {
                                link.classList.add("active");
                            }
                        });
                    }
                }
            });
        });

    } else {
        console.error("GSAP or ScrollTrigger not loaded.");
    }

    // 2. Interactive Cursor Glow
    const cursorGlow = document.getElementById("cursor-glow");
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateGlow = () => {
            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;

            cursorGlow.style.transform = `translate(calc(${glowX}px - 50%), calc(${glowY}px - 50%))`;
            requestAnimationFrame(animateGlow);
        };

        cursorGlow.style.top = '0px';
        cursorGlow.style.left = '0px';

        animateGlow();
    }

    // 3. Navigation Header Styling & Mobile Toggle
    const header = document.querySelector(".header");
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navLinksList = document.querySelectorAll(".nav-link");

    const handleHeaderScroll = () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    };
    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            navToggle.classList.toggle("open");
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        navLinksList.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                navToggle.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }

    // 4. Copy Email to Clipboard Feature
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const emailAddress = document.getElementById("email-address");
    const copyIcon = document.getElementById("copy-icon");
    const toast = document.getElementById("toast");

    if (copyEmailBtn && emailAddress && toast) {
        copyEmailBtn.addEventListener("click", () => {
            const emailText = emailAddress.textContent.trim();

            navigator.clipboard.writeText(emailText).then(() => {
                if (copyIcon) {
                    copyIcon.className = "fa-solid fa-check";
                }

                toast.classList.add("show");

                setTimeout(() => {
                    toast.classList.remove("show");
                    if (copyIcon) {
                        copyIcon.className = "fa-regular fa-copy";
                    }
                }, 3000);
            }).catch(err => {
                console.error("Failed to copy text: ", err);
            });
        });
    }
});