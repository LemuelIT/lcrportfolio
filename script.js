/**
 * Lemuel C. Reyes Portfolio - Interactive Client Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Page Load Transition
    setTimeout(() => {
        document.body.classList.remove("loading");
    }, 100);

    // 2. DOM Elements Selection
    const header = document.querySelector(".header");
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const cursorGlow = document.getElementById("cursor-glow");
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const emailAddress = document.getElementById("email-address");
    const copyIcon = document.getElementById("copy-icon");
    const toast = document.getElementById("toast");
    const backToTopBtn = document.getElementById("back-to-top");
    const progressCircle = document.querySelector(".progress-ring-circle");
    
    // Circle calculations for scroll progress
    // Radius = 20, Circumference = 2 * PI * r = ~125.66
    const circumference = 2 * Math.PI * 20;

    // 3. Mobile Navigation Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            navToggle.classList.toggle("open");
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                navToggle.classList.remove("open");
                document.body.style.overflow = "";
            });
        });
    }

    // 4. Header Scroll Styling
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll(); // Call once initially

    // 5. Scroll Progress & Scroll To Top Button
    const handleScrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (docHeight <= 0) return;
        
        const scrollPercent = scrollTop / docHeight;
        
        // Show/hide button
        if (scrollTop > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }

        // Update SVG circle stroke-dashoffset
        if (progressCircle) {
            const offset = circumference - (scrollPercent * circumference);
            progressCircle.style.strokeDashoffset = offset;
        }
    };

    window.addEventListener("scroll", handleScrollProgress);

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 6. Interactive Cursor Ambient Light Source Tracker
    if (cursorGlow) {
        document.addEventListener("mousemove", (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });

        document.addEventListener("mouseleave", () => {
            cursorGlow.style.opacity = "0";
        });

        document.addEventListener("mouseenter", () => {
            cursorGlow.style.opacity = "1";
        });
    }

    // 7. Intersection Observer for Scroll Reveals
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: Unobserve if animation should run only once
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach(el => revealObserver.observe(el));

    // 8. Active Link Observer highlighting navigation sections
    const activeSectionCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    const sectionObserver = new IntersectionObserver(activeSectionCallback, {
        root: null,
        threshold: 0.4,
        rootMargin: "-20% 0px -40% 0px"
    });

    sections.forEach(sec => sectionObserver.observe(sec));

    // 9. Copy-to-Clipboard Direct Action for Email address
    if (copyEmailBtn && emailAddress && toast) {
        copyEmailBtn.addEventListener("click", () => {
            const emailText = emailAddress.textContent.trim();
            
            navigator.clipboard.writeText(emailText)
                .then(() => {
                    // Show checkmark icon
                    if (copyIcon) {
                        copyIcon.className = "fa-solid fa-check";
                        copyIcon.style.color = "var(--primary)";
                    }
                    
                    // Show Toast Alert Notification
                    toast.classList.add("show");
                    
                    // Reset visual cues after 3 seconds
                    setTimeout(() => {
                        toast.classList.remove("show");
                        if (copyIcon) {
                            copyIcon.className = "fa-regular fa-copy";
                            copyIcon.style.color = "";
                        }
                    }, 3000);
                })
                .catch(err => {
                    console.error("Failed to copy text: ", err);
                });
        });
    }

    console.log("Portfolio Assets and Interactions Loaded Successfully");
});