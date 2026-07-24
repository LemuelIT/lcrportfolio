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
    // 5. Skills "See All" Modal Feature
    const skillsData = {
        stacks: {
            title: "Stacks & Frameworks",
            items: [
                { name: "Flutter", icon: "fa-brands fa-flutter", color: "#38bdf8" },
                { name: "Dart", icon: "fa-solid fa-terminal", color: "#0284c7" },
                { name: "Firebase", icon: "fa-solid fa-fire", color: "#f59e0b" },
                { name: "HTML5", icon: "fa-brands fa-html5", color: "#ea580c" },
                { name: "CSS3", icon: "fa-brands fa-css3-alt", color: "#2563eb" },
                { name: "JavaScript", icon: "fa-brands fa-js", color: "#eab308" },
                { name: "MySQL", icon: "fa-solid fa-database", color: "#00758f" },
                { name: "Git & GitHub", icon: "fa-brands fa-github", color: "#a855f7" }
            ]
        },
        multimedia: {
            title: "Multimedia, Tools & Design",
            items: [
                { name: "UI/UX Design", icon: "fa-solid fa-compass-drafting", color: "#ec4899" },
                { name: "Figma", icon: "fa-brands fa-figma", color: "#a259ff" },
                { name: "Photoshop", icon: "fa-solid fa-image", color: "#31a8ff" },
                { name: "Illustrator", icon: "fa-solid fa-pen-nib", color: "#ff9a00" },
                { name: "Premiere Pro", icon: "fa-solid fa-film", color: "#ea4c89" },
                { name: "Canva", icon: "fa-solid fa-wand-magic-sparkles", color: "#00c4cc" },
                { name: "Graphic Design", icon: "fa-solid fa-swatchbook", color: "#f43f5e" }
            ]
        },
        additional: {
            title: "Additional Skills",
            items: [
                { name: "Software Testing & QA", icon: "fa-solid fa-vial-circle-check", color: "#10b981" },
                { name: "Technical Documentation", icon: "fa-solid fa-file-code", color: "#6366f1" },
                { name: "Database Management", icon: "fa-solid fa-server", color: "#14b8a6" },
                { name: "Troubleshooting", icon: "fa-solid fa-screwdriver-wrench", color: "#f97316" },
                { name: "Agile Workflow", icon: "fa-solid fa-diagram-project", color: "#8b5cf6" },
                { name: "Responsive Design", icon: "fa-solid fa-display", color: "#3b82f6" }
            ]
        }
    };

    const modal = document.getElementById("skills-modal");
    const modalOverlay = document.getElementById("skills-modal-overlay");
    const modalTitle = document.getElementById("skills-modal-title");
    const modalBody = document.getElementById("skills-modal-body");
    const modalClose = document.getElementById("skills-modal-close");
    const seeAllBtns = document.querySelectorAll(".see-all-btn");

    const openModal = (categoryKey) => {
        const data = skillsData[categoryKey];
        if (!data || !modal) return;

        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
            <div class="skills-modal-grid">
                ${data.items.map(item => `
                    <div class="skill-card glass-card">
                        <i class="${item.icon}" style="color: ${item.color};"></i>
                        <span>${item.name}</span>
                    </div>
                `).join('')}
            </div>
        `;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    };

    seeAllBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const cat = btn.getAttribute("data-category");
            openModal(cat);
        });
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // 6. True Infinite 360° Auto-Scroll & Manual Drag/Swipe Carousel
    const marqueeContainers = document.querySelectorAll(".marquee-container");

    marqueeContainers.forEach(container => {
        const track = container.querySelector(".marquee-track");
        if (!track) return;

        const isRight = track.classList.contains("marquee-right");
        const speed = 0.55;
        let isHovered = false;
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;

        const getOneSetWidth = () => track.scrollWidth / 4;

        const initCenter = () => {
            const oneSet = getOneSetWidth();
            if (oneSet > 0) {
                container.scrollLeft = oneSet * 1.5;
            }
        };

        setTimeout(initCenter, 100);
        window.addEventListener("resize", initCenter);

        function animate() {
            const oneSet = getOneSetWidth();

            if (oneSet > 0) {
                if (!isHovered && !isDragging) {
                    if (isRight) {
                        container.scrollLeft -= speed;
                    } else {
                        container.scrollLeft += speed;
                    }
                }

                if (container.scrollLeft >= oneSet * 2) {
                    container.scrollLeft -= oneSet;
                } else if (container.scrollLeft <= oneSet * 0.5) {
                    container.scrollLeft += oneSet;
                }
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        container.addEventListener("mouseenter", () => { isHovered = true; });
        container.addEventListener("mouseleave", () => { isHovered = false; isDragging = false; });

        container.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.pageX - container.offsetLeft;
            startScrollLeft = container.scrollLeft;
        });

        window.addEventListener("mouseup", () => { isDragging = false; });

        container.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            container.scrollLeft = startScrollLeft - walk;

            const oneSet = getOneSetWidth();
            if (oneSet > 0) {
                if (container.scrollLeft >= oneSet * 2) {
                    container.scrollLeft -= oneSet;
                    startX = e.pageX - container.offsetLeft;
                    startScrollLeft = container.scrollLeft;
                } else if (container.scrollLeft <= oneSet * 0.5) {
                    container.scrollLeft += oneSet;
                    startX = e.pageX - container.offsetLeft;
                    startScrollLeft = container.scrollLeft;
                }
            }
        });

        container.addEventListener("touchstart", () => { isHovered = true; }, { passive: true });
        container.addEventListener("touchend", () => { isHovered = false; }, { passive: true });

        container.addEventListener("scroll", () => {
            const oneSet = getOneSetWidth();
            if (oneSet > 0) {
                if (container.scrollLeft >= oneSet * 2) {
                    container.scrollLeft -= oneSet;
                } else if (container.scrollLeft <= oneSet * 0.5) {
                    container.scrollLeft += oneSet;
                }
            }
        }, { passive: true });
    });
});