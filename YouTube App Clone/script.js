// YouTube App Clone - script.js
// Adds interactivity to the UI

// --- Helper: Toast Notification ---
function showToast(message) {
  let toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "32px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(24,24,24,0.95)";
  toast.style.color = "#fff";
  toast.style.padding = "12px 32px";
  toast.style.borderRadius = "24px";
  toast.style.fontSize = "16px";
  toast.style.zIndex = 9999;
  toast.style.opacity = 0;
  toast.style.transition = "opacity 0.3s";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = 1;
  }, 10);
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 1800);
  setTimeout(() => {
    toast.remove();
  }, 2200);
}

document.addEventListener("DOMContentLoaded", function () {
  // Sidebar active state
  const sideIcons = document.querySelectorAll(".side-icons");
  sideIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      sideIcons.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
      showToast(this.querySelector("p")?.textContent + " selected");
    });
  });

  // Sidebar collapse/expand
  const aside = document.querySelector("aside");
  const bars = document.querySelector(".bars");
  let sidebarCollapsed = false;
  if (bars && aside) {
    bars.addEventListener("click", function () {
      sidebarCollapsed = !sidebarCollapsed;
      aside.style.width = sidebarCollapsed ? "56px" : "";
      aside.querySelectorAll("p").forEach((p) => {
        p.style.display = sidebarCollapsed ? "none" : "";
      });
      aside.querySelectorAll("img").forEach((img) => {
        img.style.margin = sidebarCollapsed ? "0" : "";
      });
    });
  }

  // Tag filter active state & filter cards
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.addEventListener("click", function () {
      tags.forEach((t) => t.classList.remove("dark"));
      tags.forEach((t) => t.classList.add("light"));
      this.classList.remove("light");
      this.classList.add("dark");
      filterCardsByTag(this.textContent.trim());
    });
  });

  // Search input: Enter key triggers search & filter
  const searchInput = document.querySelector(".search input");
  const searchButton = document.querySelector(".search button");
  if (searchInput && searchButton) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        searchButton.click();
      }
    });
    searchButton.addEventListener("click", function () {
      filterCardsBySearch(searchInput.value);
    });
  }

  // Mic button: fake voice search
  const micBtn = document.querySelector(".mic");
  if (micBtn) {
    micBtn.addEventListener("click", function () {
      showToast("🎤 Listening... (just kidding!)");
    });
  }

  // Card click: open video (demo)
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.closest(".dots")) return;
      const title = card.querySelector("h3")?.textContent || "Video";
      showToast("Opening: " + title);
    });
  });

  // Dots menu: show dropdown options
  const dots = document.querySelectorAll(".dots");
  dots.forEach((dot) => {
    dot.addEventListener("click", function (e) {
      e.stopPropagation();
      showDropdownMenu(dot);
    });
  });

  // Light/Dark mode toggle
  addDarkModeToggle();
});

// --- Dropdown menu for dots ---
function showDropdownMenu(parent) {
  // Remove any existing menu
  document.querySelectorAll(".dropdown-menu").forEach((m) => m.remove());
  const menu = document.createElement("div");
  menu.className = "dropdown-menu";
  menu.style.position = "absolute";
  menu.style.top =
    parent.getBoundingClientRect().top + window.scrollY + 28 + "px";
  menu.style.left =
    parent.getBoundingClientRect().left + window.scrollX - 80 + "px";
  menu.style.background = "#fff";
  menu.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
  menu.style.borderRadius = "10px";
  menu.style.padding = "8px 0";
  menu.style.zIndex = 10000;
  menu.style.minWidth = "140px";
  menu.innerHTML = `
    <div class="dropdown-item">Add to playlist</div>
    <div class="dropdown-item">Save to Watch later</div>
    <div class="dropdown-item">Share</div>
    <div class="dropdown-item">Report</div>
  `;
  document.body.appendChild(menu);
  menu.querySelectorAll(".dropdown-item").forEach((item) => {
    item.style.padding = "10px 18px";
    item.style.cursor = "pointer";
    item.style.fontSize = "15px";
    item.addEventListener("mouseover", function () {
      this.style.background = "#f1f3f4";
    });
    item.addEventListener("mouseout", function () {
      this.style.background = "";
    });
    item.addEventListener("click", function (e) {
      showToast(this.textContent + " (demo)");
      menu.remove();
      e.stopPropagation();
    });
  });
  // Remove menu on click outside
  setTimeout(() => {
    document.addEventListener("click", function handler() {
      menu.remove();
      document.removeEventListener("click", handler);
    });
  }, 10);
}

// --- Card filtering by tag ---
function filterCardsByTag(tag) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (tag === "All") {
      card.style.display = "";
      return;
    }
    const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
    if (title.includes(tag.toLowerCase())) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// --- Card filtering by search ---
function filterCardsBySearch(query) {
  const cards = document.querySelectorAll(".card");
  query = query.trim().toLowerCase();
  cards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
    if (title.includes(query)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// --- Light/Dark mode toggle ---
function addDarkModeToggle() {
  let btn = document.createElement("button");
  btn.textContent = "🌙";
  btn.title = "Toggle dark mode";
  btn.style.position = "fixed";
  btn.style.top = "18px";
  btn.style.right = "24px";
  btn.style.zIndex = 10001;
  btn.style.background = "#fff";
  btn.style.border = "none";
  btn.style.fontSize = "22px";
  btn.style.borderRadius = "50%";
  btn.style.width = "40px";
  btn.style.height = "40px";
  btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)";
  btn.style.cursor = "pointer";
  btn.style.transition = "background 0.2s";
  btn.addEventListener("mouseenter", () => (btn.style.background = "#f1f3f4"));
  btn.addEventListener("mouseleave", () => (btn.style.background = "#fff"));
  btn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    btn.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
    showToast(
      document.body.classList.contains("dark-mode")
        ? "Dark mode on"
        : "Light mode on"
    );
    applyDarkModeCSS();
  });
  document.body.appendChild(btn);
}

function applyDarkModeCSS() {
  if (document.body.classList.contains("dark-mode")) {
    document.body.style.background = "#181818";
    document
      .querySelectorAll(".main-container, header, aside, .card, .dropdown-menu")
      .forEach((el) => {
        if (el) el.style.background = "#232323";
      });
    document.querySelectorAll(".card, .dropdown-menu").forEach((el) => {
      if (el) el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.35)";
    });
    document.querySelectorAll(".tag").forEach((tag) => {
      if (tag.classList.contains("dark")) {
        tag.style.background = "#fff";
        tag.style.color = "#181818";
      } else {
        tag.style.background = "#232323";
        tag.style.color = "#fff";
      }
    });
    document
      .querySelectorAll("h3, .channel-name, .content-status, .side-icons p")
      .forEach((el) => {
        if (el) el.style.color = "#fff";
      });
  } else {
    document.body.style.background = "";
    document
      .querySelectorAll(".main-container, header, aside, .card, .dropdown-menu")
      .forEach((el) => {
        if (el) el.style.background = "";
      });
    document.querySelectorAll(".card, .dropdown-menu").forEach((el) => {
      if (el) el.style.boxShadow = "";
    });
    document.querySelectorAll(".tag").forEach((tag) => {
      tag.style.background = "";
      tag.style.color = "";
    });
    document
      .querySelectorAll("h3, .channel-name, .content-status, .side-icons p")
      .forEach((el) => {
        el.style.color = "";
      });
  }
}
