const config = {
  email: "petrakadernickabusiness@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/petra_kadernicka/",
    facebook: "https://www.facebook.com/petra.dreskova.5",
    tiktok: "https://www.tiktok.com/@petrakadernicka?lang=en",
  },
};

function setImageBackground(image, target) {
  const apply = () => {
    target.style.setProperty("--photo-bg", `url("${image.currentSrc || image.src}")`);
  };

  if (image.complete) {
    apply();
  } else {
    image.addEventListener("load", apply, { once: true });
  }
}

const heroImage = document.querySelector(".hero-image");
if (heroImage) {
  setImageBackground(heroImage, document.querySelector(".hero"));
}

document.querySelectorAll(".image-frame img").forEach((image) => {
  setImageBackground(image, image.closest(".image-frame"));
});

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-social]").forEach((link) => {
  const name = link.dataset.social;
  link.href = config.socials[name] || "#";
  link.addEventListener("click", (event) => {
    if (link.href.endsWith("#")) {
      event.preventDefault();
      alert("Sem si neskôr doplň vlastný odkaz na sociálnu sieť v súbore script.js.");
    }
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const formNote = document.querySelector("#form-note");
const messageField = document.querySelector('textarea[name="message"]');

if (messageField) {
  messageField.minLength = 10;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;

    try {
      await copyText(text);
      formNote.textContent = `Skopírované: ${text}`;
    } catch {
      formNote.textContent = "Nepodarilo sa skopírovať. Označ text ručne a skopíruj ho.";
    }
  });
});

const address = document.querySelector(".contact-details span");
if (address) {
  address.textContent = "Pri Gymnáziu 2, 940 02 Nové Zámky";
  address.setAttribute("role", "button");
  address.setAttribute("tabindex", "0");
  address.addEventListener("click", async () => {
    const text = address.textContent.trim();

    try {
      await copyText(text);
      formNote.textContent = `Skopírované: ${text}`;
    } catch {
      formNote.textContent = "Nepodarilo sa skopírovať. Označ text ručne a skopíruj ho.";
    }
  });
  address.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      address.click();
    }
  });
}
