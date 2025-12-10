const navLinks = document.querySelectorAll(".nav a");
const sections = Array.from(navLinks).map((link) =>
  document.querySelector(link.getAttribute("href")),
);
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
const backToTop = document.getElementById("backToTop");
const contactForm = document.querySelector(".contact__form");
const formStatus = document.getElementById("formStatus");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const revealTargets = document.querySelectorAll(
  ".hero__content, .card, .service-card, .work-card, .stat, .testimonial-card, .contact__form, .checklist, .contact-link",
);

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("animate-in"));
}

const toggleNav = (isOpen) => {
  const open =
    typeof isOpen === "boolean" ? isOpen : !nav?.classList.contains("open");
  nav?.classList.toggle("open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
};

menuToggle?.addEventListener("click", () => toggleNav());

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900) toggleNav(false);
  }),
);

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach((section, idx) => {
    if (!section) return;
    const { offsetTop, offsetHeight } = section;
    const link = navLinks[idx];
    if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if (window.scrollY > 400) {
    backToTop?.classList.add("show");
  } else {
    backToTop?.classList.remove("show");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const statNumbers = document.querySelectorAll(".stat__number");
const formatNumber = (num) => (Number.isInteger(num) ? num : num.toFixed(1));

if (!prefersReducedMotion) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.dataset.target);
        let current = 0;
        const increment = target / 80;

        const update = () => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = formatNumber(target);
          } else {
            entry.target.textContent = formatNumber(current);
            requestAnimationFrame(update);
          }
        };

        requestAnimationFrame(update);
        statObserver.unobserve(entry.target);
      }
    });
  });

  statNumbers.forEach((num) => statObserver.observe(num));
} else {
  statNumbers.forEach((num) => {
    const target = parseFloat(num.dataset.target);
    num.textContent = formatNumber(target);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");
    const originalText = button?.textContent ?? "Send";
    if (button) {
      button.textContent = "Message queued!";
      button.disabled = true;
    }
    if (formStatus) {
      formStatus.textContent = "Message queued! I'll reply shortly.";
    }
    setTimeout(() => {
      if (button) {
        button.textContent = originalText;
        button.disabled = false;
      }
      if (formStatus) {
        formStatus.textContent = "";
      }
      contactForm.reset();
    }, 1600);
  });
}
