// Amazon Website Clone - script.js
// This script adds interactivity to the Amazon clone UI

document.addEventListener("DOMContentLoaded", function () {
  // Search bar: focus effect
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("focus", function () {
      this.parentElement.classList.add("active");
    });
    searchInput.addEventListener("blur", function () {
      this.parentElement.classList.remove("active");
    });
    // Keyboard search: Enter key
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        alert(`Searching for: ${this.value}`);
      }
    });
  }

  // Panel menu: highlight on click (for mobile)
  const panelAll = document.querySelector(".panel-all");
  const panelOps = document.querySelector(".panel-ops");
  if (panelAll && panelOps) {
    panelAll.addEventListener("click", function () {
      panelOps.classList.toggle("show");
      panelOps.style.transition = "max-height 0.4s cubic-bezier(.4,2,.6,1)";
      if (panelOps.classList.contains("show")) {
        panelOps.style.maxHeight = "200px";
      } else {
        panelOps.style.maxHeight = "0";
      }
    });
  }

  // Shop boxes: click effect
  document.querySelectorAll(".box-content p").forEach(function (btn) {
    btn.addEventListener("click", function () {
      alert(
        "This is a demo. In a real site, you would be taken to the relevant category!"
      );
    });
  });

  // Back to Top smooth scroll
  const backToTop = document.querySelector(".foot-panel-1 a");
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Cart item counter demo
  const navCart = document.querySelector(".nav-cart");
  if (navCart) {
    let cartCount = 0;
    // Add a badge
    let badge = document.createElement("span");
    badge.className = "cart-badge";
    badge.style.background = "#f08804";
    badge.style.color = "#fff";
    badge.style.fontSize = "0.8rem";
    badge.style.padding = "2px 7px";
    badge.style.borderRadius = "10px";
    badge.style.marginLeft = "6px";
    badge.style.verticalAlign = "middle";
    badge.textContent = cartCount;
    navCart.appendChild(badge);
    // Add to cart on any box click
    document.querySelectorAll(".box-content p").forEach(function (btn) {
      btn.addEventListener("dblclick", function () {
        cartCount++;
        badge.textContent = cartCount;
      });
    });
  }

  // Dark mode toggle
  let darkModeBtn = document.createElement("button");
  darkModeBtn.textContent = "🌙 Dark Mode";
  darkModeBtn.style.position = "fixed";
  darkModeBtn.style.bottom = "20px";
  darkModeBtn.style.right = "20px";
  darkModeBtn.style.zIndex = "999";
  darkModeBtn.style.padding = "10px 18px";
  darkModeBtn.style.background = "#232f3e";
  darkModeBtn.style.color = "#fff";
  darkModeBtn.style.border = "none";
  darkModeBtn.style.borderRadius = "6px";
  darkModeBtn.style.cursor = "pointer";
  darkModeBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
  document.body.appendChild(darkModeBtn);
  let dark = false;
  darkModeBtn.addEventListener("click", function () {
    dark = !dark;
    if (dark) {
      document.body.style.background = "#181a1b";
      document.body.style.color = "#eee";
      darkModeBtn.textContent = "☀️ Light Mode";
      document
        .querySelectorAll(
          ".box, .navbar, .panel, .foot-panel-1, .foot-panel-2, .foot-panel-3, .foot-panel-4, footer"
        )
        .forEach(function (el) {
          el.style.background = "#232f3e";
          el.style.color = "#eee";
        });
    } else {
      document.body.style.background = "#e3e6e6";
      document.body.style.color = "#111";
      darkModeBtn.textContent = "🌙 Dark Mode";
      document
        .querySelectorAll(
          ".box, .navbar, .panel, .foot-panel-1, .foot-panel-2, .foot-panel-3, .foot-panel-4, footer"
        )
        .forEach(function (el) {
          el.style.background = "";
          el.style.color = "";
        });
    }
  });
});
