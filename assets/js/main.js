const navLinks = document.querySelectorAll(".nav a");
const sections = Array.from(navLinks).map((link) =>
  document.querySelector(link.getAttribute("href")),
);
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
const backToTop = document.getElementById("backToTop");
const contactForms = document.querySelectorAll(".contact__form");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const revealTargets = document.querySelectorAll(
  ".hero__content, .card, .service-card, .contact__form, .checklist, .contact-link",
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

if (contactForms.length) {
  contactForms.forEach((form) => {
    const status = form.querySelector(".form-status");
    const successMessage =
      form.dataset.successMessage ||
      "Thanks! Your message was sent. I'll reply within 24 hours.";
    const errorMessage =
      form.dataset.errorMessage ||
      "Something went wrong. Please try again or email blueprintwebport@gmail.com directly.";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const requiredFields = form.querySelectorAll("[required]");
      const allFilled = Array.from(requiredFields).every((field) =>
        field.value.trim(),
      );

      if (!allFilled) {
        if (status) {
          status.textContent = "Please complete all required fields.";
        }
        return;
      }

      try {
        if (status) {
          status.textContent = "Sending your message...";
        }

        const response = await fetch(form.action, {
          method: form.method,
          headers: { Accept: "application/json" },
          body: formData,
        });

        if (response.ok) {
          if (status) {
            status.textContent = successMessage;
          }
          form.reset();
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        if (status) {
          status.textContent = errorMessage;
        }
      }
    });
  });
}
