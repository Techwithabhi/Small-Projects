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
  }

  // Panel menu: highlight on click (for mobile)
  const panelAll = document.querySelector(".panel-all");
  if (panelAll) {
    panelAll.addEventListener("click", function () {
      document.querySelector(".panel-ops").classList.toggle("show");
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

  // Responsive panel menu (for demonstration)
  // You can expand this for a real mobile menu
});
