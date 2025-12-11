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
  ".hero__content, .card, .service-card, .work-card, .contact__form, .checklist, .contact-link",
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

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const details = formData.get("details")?.toString().trim();

    if (!name || !email || !details) {
      formStatus.textContent = "Please complete all fields before sending.";
      return;
    }

    const subject = `Project inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nProject details:\n${details}`;
    const mailtoLink = `mailto:blueprintwebport@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    if (formStatus) {
      formStatus.textContent = "Opening your email client...";
    }

    window.location.href = mailtoLink;

    setTimeout(() => {
      if (formStatus) {
        formStatus.textContent =
          "If your email client didn't open, please check your pop-up or email settings.";
      }
    }, 400);
  });
}
