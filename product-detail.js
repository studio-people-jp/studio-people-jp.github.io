(function () {
  "use strict";

  function initProductDetails() {
    const data = window.SPProductDetailData || {};
    const verifiedPrices = data.verifiedPrices || {};
    const verifiedWeights = data.verifiedWeights || {};

    const panel = document.getElementById("productDetailPanel");
    const backdrop = document.getElementById("productDetailBackdrop");
    const closeButton = document.getElementById("productDetailClose");
    const backButton = document.getElementById("productDetailBack");
    if (!panel || !backdrop || !closeButton || !backButton) return;

    const nameField = document.getElementById("productDetailName");
    const makerField = document.getElementById("productDetailMaker");
    const makerValue = document.getElementById("productDetailMakerValue");
    const seriesField = document.getElementById("productDetailSeries");
    const seriesValue = document.getElementById("productDetailSeriesValue");
    const categoryField = document.getElementById("productDetailCategory");
    const weightField = document.getElementById("productDetailWeight");
    const weightSourceLink = document.getElementById("productDetailWeightSource");
    const weightSourceNote = document.getElementById("productDetailWeightSourceNote");
    const priceField = document.getElementById("productDetailPrice");
    const priceSourceLink = document.getElementById("productDetailPriceSource");
    const priceSourceNote = document.getElementById("productDetailPriceSourceNote");
    const categoryLabel = document.querySelector(".hero .small-title");
    let previousFocus = null;

    function openDetail(link) {
      const card = link.closest(".stationery-card");
      if (!card) return;

      const name = card.querySelector(".stationery-card-name");
      const seriesSection = card.closest(".series-section");
      const maker = seriesSection && seriesSection.querySelector(".series-maker");
      const series = seriesSection && seriesSection.querySelector(".series-title");
      const fullName = name ? name.textContent.trim().replace(/\s+/g, " ") : "";
      const lookupName = name ? name.cloneNode(true) : null;
      if (lookupName) lookupName.querySelectorAll("small").forEach(label => label.remove());
      const cleanName = lookupName ? lookupName.textContent.trim().replace(/\s+/g, " ") : "";
      const makerName = maker ? maker.textContent.trim() : "";
      const weightKey = makerName + "|" + cleanName;
      const exactKey = makerName + "|" + fullName;
      const weightData = verifiedWeights[exactKey] || verifiedWeights[weightKey];
      const priceData = verifiedPrices[exactKey] || verifiedPrices[weightKey];

      nameField.textContent = name ? name.textContent.trim() : "商品詳細";
      priceField.textContent = priceData ? priceData.value : "未確認";
      priceSourceNote.hidden = Boolean(priceData);
      priceSourceLink.hidden = !priceData;
      if (priceData) {
        priceSourceLink.href = priceData.url;
        priceSourceLink.textContent = priceData.note;
      } else {
        priceSourceLink.removeAttribute("href");
      }

      weightField.textContent = weightData ? weightData.value : "未確認";
      weightSourceNote.hidden = Boolean(weightData);
      weightSourceLink.hidden = !weightData;
      if (weightData) {
        weightSourceLink.href = weightData.url;
        weightSourceLink.textContent = weightData.note;
      } else {
        weightSourceLink.removeAttribute("href");
      }

      makerField.textContent = makerName || "メーカー情報";
      makerValue.textContent = makerName || "確認中";
      seriesField.textContent = series ? series.textContent.trim() : "";
      seriesValue.textContent = series ? series.textContent.trim() : "確認中";
      categoryField.textContent = categoryLabel
        ? categoryLabel.textContent.replace("CATALOG /", "").trim()
        : "文房具";

      previousFocus = link;
      panel.hidden = false;
      backdrop.hidden = false;
      panel.setAttribute("aria-hidden", "false");
      document.body.classList.add("product-detail-open");
      requestAnimationFrame(function () {
        panel.classList.add("is-open");
        backdrop.classList.add("is-open");
        closeButton.focus();
      });
    }

    function closeDetail() {
      panel.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      document.body.classList.remove("product-detail-open");
      window.setTimeout(function () {
        panel.hidden = true;
        backdrop.hidden = true;
        if (previousFocus) previousFocus.focus();
      }, 220);
    }

    document.querySelectorAll(".stationery-card-link").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        openDetail(link);
      });
    });

    closeButton.addEventListener("click", closeDetail);
    backButton.addEventListener("click", closeDetail);
    backdrop.addEventListener("click", closeDetail);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hidden) closeDetail();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductDetails, { once: true });
  } else {
    initProductDetails();
  }
})();