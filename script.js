/* =========================
   TRAVLOG SITE SCRIPT (FULL)
   Copy-Paste Direct
========================= */

/* ===== RIGHT DRAWER (Menu) ===== */
const drawer = document.getElementById("drawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const drawerClose = document.getElementById("drawerClose");
const menuIcon = document.querySelector(".menu-icon");

function openDrawer() {
  if (!drawer || !drawerOverlay) return;
  drawer.classList.add("open");
  drawerOverlay.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  if (!drawer || !drawerOverlay) return;
  drawer.classList.remove("open");
  drawerOverlay.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

if (menuIcon) menuIcon.addEventListener("click", openDrawer);
if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // close drawer
    if (drawer && drawer.classList.contains("open")) closeDrawer();

    // close highlights modal
    if (hlOverlay && hlOverlay.classList.contains("open")) closeHighlights();

    // close personal gallery modal
    if (pgModal && pgModal.classList.contains("open")) closePgModal();
  }
});

/* ===== About animation ===== */
window.addEventListener("load", () => {
  const aboutText = document.querySelector(".about-text");
  const aboutImages = document.querySelector(".about-images");
  if (aboutText) aboutText.classList.add("active");
  if (aboutImages) aboutImages.classList.add("active");
});

/* ===== Travlog Info Tabs (Inbound/Outbound) ===== */
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".info-card");
    if (!parent) return;

    const tabId = btn.dataset.tab;
    if (!tabId) return;

    parent.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    parent.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    const target = parent.querySelector("#" + tabId);
    if (target) target.classList.add("active");
  });
});

/* ===== Accordions ===== */
document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    const icon = btn.querySelector(".acc-icon");
    if (!panel) return;

    panel.classList.toggle("open");
    if (icon) icon.textContent = panel.classList.contains("open") ? "−" : "+";
  });
});

/* =========================
   DESTINATIONS (Tabs + Navbar Dropdown)  ✅ FIXED
========================= */
const navDomestic = document.getElementById("nav-domestic");
const navInternational = document.getElementById("nav-international");
const destTabs = document.querySelectorAll(".dest-tab");
const destPanels = document.querySelectorAll(".dest-panel");

function activateDest(panelId) {
  destTabs.forEach((t) => t.classList.remove("active"));
  destPanels.forEach((p) => p.classList.remove("active"));

  const btn = document.querySelector(`.dest-tab[data-target="${panelId}"]`);
  const panel = document.getElementById(panelId);

  if (btn) btn.classList.add("active");
  if (panel) panel.classList.add("active");
}

destTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    if (!target) return;
    activateDest(target);
  });
});

function goToDestination(panelId) {
  const section = document.getElementById("destinations-section");
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => activateDest(panelId), 350);
}

if (navDomestic) {
  navDomestic.addEventListener("click", (e) => {
    e.preventDefault();
    goToDestination("domestic-panel");
  });
}

if (navInternational) {
  navInternational.addEventListener("click", (e) => {
    e.preventDefault();
    goToDestination("international-panel");
  });
}

/* =========================
   DESTINATION HIGHLIGHTS MODAL
========================= */
const hlOverlay = document.getElementById("hlModalOverlay");
const hlCloseBtn = document.getElementById("hlCloseBtn");
const hlCloseBtn2 = document.getElementById("hlCloseBtn2");

const hlTitle = document.getElementById("hlTitle");
const hlSubtitle = document.getElementById("hlSubtitle");
const hlDuration = document.getElementById("hlDuration");
const hlBestTime = document.getElementById("hlBestTime");
const hlList = document.getElementById("hlList");
const hlImage = document.getElementById("hlImage");

/* Edit these anytime (images path + content) */
const HIGHLIGHTS_DATA = {
  himachal: {
    title: "Himachal",
    subtitle: "Mountains, snowfall, and hill-station escapes.",
    image: "him.png",
    points: ["Scenic valleys & viewpoints", "Local culture & cafes", "Adventure activities", "Comfort stays & transfers"],
  },
  uttarakhand: {
    title: "Uttarakhand",
    subtitle: "Nature, spirituality, and serene landscapes.",
    image: "utt.png",
    points: ["Temple circuits", "Hill retreats", "Nature trails", "Verified hotel options"],
  },
  rajasthan: {
    title: "Rajasthan",
    subtitle: "Forts, heritage, and royal experiences.",
    image: "rajj.png",
    points: ["Fort tours & city walks", "Desert safari experiences", "Cultural shows", "Heritage stays"],
  },
  goa: {
    title: "Goa",
    subtitle: "Sun, sand, beaches, and vibrant nightlife.",
    image: "g.png",
    points: ["Beach hopping", "Water sports activities", "Night markets & nightlife", "Relaxing coastal stays"],
  },
  vietnam: {
    title: "Vietnam",
    subtitle: "Food, culture, beaches, and vibrant cities.",
    image: "viiet.png",
    points: ["City + nature blend", "Food & local markets", "Day cruises & tours", "Smooth transfers"],
  },
  cambodia: {
    title: "Cambodia",
    subtitle: "Temples, heritage, and timeless beauty.",
    image: "caam.png",
    points: ["Angkor experiences", "Cultural heritage tours", "Local cuisine stops", "Guided excursions"],
  },
  maldives: {
    title: "Maldives",
    subtitle: "Luxury resorts and crystal-clear waters.",
    image: "mal.png",
    points: ["Resort stay packages", "Snorkeling & water sports", "Private transfers", "Honeymoon specials"],
  },
  thailand: {
    title: "Thailand",
    subtitle: "Night markets, islands, and iconic beaches.",
    image: "thail.png",
    points: ["Island hopping", "City shopping & nightlife", "Temples & culture", "Family-friendly tours"],
  },
};

function openHighlights(key) {
  if (!hlOverlay) return;
  const data = HIGHLIGHTS_DATA[key];
  if (!data) return;

  if (hlTitle) hlTitle.textContent = data.title;
  if (hlSubtitle) hlSubtitle.textContent = data.subtitle;
  if (hlDuration) hlDuration.textContent = data.duration;
  if (hlBestTime) hlBestTime.textContent = data.bestTime;
  if (hlImage) hlImage.src = data.image;

  if (hlList) {
    hlList.innerHTML = "";
    data.points.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p;
      hlList.appendChild(li);
    });
  }

  hlOverlay.classList.add("open");
  hlOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeHighlights() {
  if (!hlOverlay) return;
  hlOverlay.classList.remove("open");
  hlOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".hl-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.dest;
    if (!key) return;
    openHighlights(key);
  });
});

if (hlCloseBtn) hlCloseBtn.addEventListener("click", closeHighlights);
if (hlCloseBtn2) hlCloseBtn2.addEventListener("click", closeHighlights);

if (hlOverlay) {
  hlOverlay.addEventListener("click", (e) => {
    if (e.target === hlOverlay) closeHighlights();
  });
}

/* =========================
   PERSONAL GALLERY (Tabs + Modal)
========================= */
const pgTabs = document.querySelectorAll(".pg-tab[data-pg]");
const pgPanels = document.querySelectorAll(".pg-panel");

pgTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    pgTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    pgPanels.forEach((p) => p.classList.remove("active"));
    const target = document.getElementById("pg-" + tab.dataset.pg);
    if (target) target.classList.add("active");
  });
});

/* Modal */
const pgModal = document.getElementById("pgModal");
const pgClose = document.getElementById("pgClose");
const pgModalImg = document.getElementById("pgModalImg");
const pgModalTitle = document.getElementById("pgModalTitle");
const pgCards = document.querySelectorAll(".pg-card[data-img]");

function openPgModal(src, title) {
  if (!pgModal || !pgModalImg) return;

  // if user gives data-img like "ali" (no extension), it will break.
  // so we use the clicked card's inner <img> if dataset looks invalid.
  const normalized =
    src && (src.includes(".jpg") || src.includes(".png") || src.includes(".jpeg") || src.includes(".webp"))
      ? src
      : null;

  if (normalized) pgModalImg.src = normalized;
  else {
    // fallback: use thumbnail image src
    const activeBtn = document.activeElement;
    const thumb = activeBtn && activeBtn.querySelector ? activeBtn.querySelector("img") : null;
    pgModalImg.src = thumb ? thumb.getAttribute("src") : src;
  }

  if (pgModalTitle) pgModalTitle.textContent = title || "Preview";

  pgModal.classList.add("open");
  pgModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePgModal() {
  if (!pgModal || !pgModalImg) return;
  pgModal.classList.remove("open");
  pgModal.setAttribute("aria-hidden", "true");
  pgModalImg.src = "";
  if (pgModalTitle) pgModalTitle.textContent = "Preview";
  document.body.style.overflow = "";
}

pgCards.forEach((card) => {
  card.addEventListener("click", () => {
    openPgModal(card.dataset.img, card.dataset.title);
  });
});

if (pgClose) pgClose.addEventListener("click", closePgModal);

if (pgModal) {
  pgModal.addEventListener("click", (e) => {
    if (e.target === pgModal) closePgModal();
  });
}
// ===== GALLERY VIDEO MODAL =====
(() => {
  const modal   = document.getElementById("gvModal");
  const closeBtn= document.getElementById("gvClose");
  const player  = document.getElementById("gvPlayer");
  const titleEl = document.getElementById("gvTitle");
  const cards   = document.querySelectorAll(".gvideo-card[data-video]");

  if (!modal || !player || !cards.length) return;

  const openVideo = (src, title) => {
    if (titleEl) titleEl.textContent = title || "Video";

    // open modal first
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // set source + reset
    player.src = src;
    player.currentTime = 0;
    player.load();

    // play (autoplay can be blocked, but user can press play)
    const p = player.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  const closeVideo = () => {
    // ✅ full stop + reset
    player.pause();
    player.currentTime = 0;

    // src remove so background me kuch hold na rahe
    player.removeAttribute("src");
    player.load();

    // close modal
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // cards click
  cards.forEach(card => {
    card.addEventListener("click", () => {
      openVideo(card.dataset.video, card.dataset.title);
    });
  });

  // close button
  if (closeBtn) closeBtn.addEventListener("click", closeVideo);

  // click outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeVideo();
  });

  // esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeVideo();
  });
})();

