/* ============================================================
   ANIMACOES.JS — Modern Interactive Logic (2025 Edition)
   IFC 60 Anos — Premium Identity
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ── SCROLL REVEAL (Intersection Observer) ─────────────────── */
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // observer.unobserve(entry.target); // Keep observing if you want it to trigger again
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    // Observe all elements with .reveal class
    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    /* ── ANIMATED COUNTERS ───────────────────────────────────────── */
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute("data-count"));
                animateValue(el, 0, target, 2000);
                observer.unobserve(el);
            }
        });
    }, { threshold: 1.0 });

    document.querySelectorAll(".counter-number").forEach(el => counterObserver.observe(el));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end + "+"; // Add a plus for a modern feel
            }
        };
        window.requestAnimationFrame(step);
    }

    /* ── MOBILE MENU (HAMBURGER) ─────────────────────────────────── */
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const header = document.querySelector(".site-header");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            document.body.classList.toggle("no-scroll");
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.classList.remove("no-scroll");
            });
        });
    }

    /* ── LIGHTBOX (FOR GALLERY) ──────────────────────────────────── */
    // Create element if it doesn't exist
    let lightbox = document.getElementById("lightbox");
    if (!lightbox) {
        lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        lightbox.className = "lightbox-overlay";
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-content" src="" alt="">
            <div id="lightbox-caption"></div>
        `;
        document.body.appendChild(lightbox);
        
        // Add minimal lightbox CSS if needed (or keep in animacoes.css)
    }

    const lightboxImg = lightbox.querySelector(".lightbox-content");
    const lightboxCap = lightbox.querySelector("#lightbox-caption");
    const lightboxClose = lightbox.querySelector(".lightbox-close");

    // Event delegation for dynamically added photos
    document.addEventListener("click", e => {
        const card = e.target.closest(".foto-card");
        if (card) {
            const img = card.querySelector("img");
            lightbox.classList.add("active");
            lightboxImg.src = img.src;
            lightboxCap.innerText = card.querySelector(".foto-desc")?.innerText || "";
            document.body.classList.add("no-scroll");
        }
    });

    lightboxClose.addEventListener("click", () => {
        lightbox.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });

    /* ── HEADER SCROLL EFFECT ────────────────────────────────────── */
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header?.classList.add("scrolled");
        } else {
            header?.classList.remove("scrolled");
        }
    });

});
