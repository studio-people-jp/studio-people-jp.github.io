(function () {
  "use strict";

  function initMenu() {
    const body = document.body;
    if (!body) return;

    requestAnimationFrame(function () {
      body.classList.add("page-loaded");
    });

    const menuButton = document.getElementById("menuButton");
    const menuPanel = document.getElementById("menuPanel");
    const menuBackdrop = document.getElementById("menuBackdrop");

    if (!menuButton || !menuPanel || !menuBackdrop || menuButton.dataset.menuInitialized === "true") {
      return;
    }
    menuButton.dataset.menuInitialized = "true";

    function closeMenu() {
      menuButton.classList.remove("active");
      menuPanel.classList.remove("active");
      menuBackdrop.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    }

    menuButton.addEventListener("click", function () {
      const isOpen = menuPanel.classList.toggle("active");
      menuButton.classList.toggle("active", isOpen);
      menuBackdrop.classList.toggle("active", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    menuBackdrop.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenu, { once: true });
  } else {
    initMenu();
  }
})();