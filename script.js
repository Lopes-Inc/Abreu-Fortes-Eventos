const SITE_CONFIG = {
  // Substitua este URL pelo link final criado em https://wa.me/
  whatsappUrl: "https://wa.me/351931395935?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20personalizado%20para%20o%20meu%20evento.",
  instagramUrl: "#",
  facebookUrl: "#"
};

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const navigationLinks = navigation.querySelectorAll("a");

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.href = SITE_CONFIG.whatsappUrl;
});

function setSocialLink(platform, url) {
  document.querySelectorAll(`[data-social="${platform}"]`).forEach((link) => {
    if (!url || url === "#") {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      link.title = "Ligação a adicionar";
      return;
    }

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
  });
}

setSocialLink("instagram", SITE_CONFIG.instagramUrl);
setSocialLink("facebook", SITE_CONFIG.facebookUrl);

document.querySelector("[data-year]").textContent = new Date().getFullYear();

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  navigation.classList.remove("open");
  header.classList.remove("menu-active");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  navigation.classList.toggle("open", !isOpen);
  header.classList.toggle("menu-active", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const filterButtons = document.querySelectorAll(".filter-button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    galleryItems.forEach((item) => {
      const shouldShow = selectedCategory === "todos" || item.dataset.category === selectedCategory;
      item.hidden = !shouldShow;
    });
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
const lightboxClose = lightbox.querySelector(".lightbox-close");

function openLightbox(item) {
  const image = item.querySelector("img");
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = item.dataset.title;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

galleryItems.forEach((item) => item.addEventListener("click", () => openLightbox(item)));
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closeMenu();
  }
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item").forEach((faqItem) => {
      faqItem.classList.remove("open");
      faqItem.querySelector("button").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});
