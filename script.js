// ページ内リンク、メール起動、画像の有無判定、FAQ開閉を実装しています。
document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ページ内リンクをなめらかに移動させます。
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  // メール相談ボタンは、クリック時にメーラーの新規作成画面を開きます。
  document.querySelectorAll("[data-mail-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = link.getAttribute("href");
    });
  });

  // 納品物イメージ画像が読み込める場合だけ、プレースホルダーから画像表示に切り替えます。
  document.querySelectorAll("[data-fallback-image]").forEach((image) => {
    const preview = image.closest(".sheet-preview");
    const showImage = () => {
      preview?.classList.add("has-image");
      image.hidden = false;
    };
    const hideImage = () => {
      preview?.classList.remove("has-image");
      image.hidden = true;
    };

    image.addEventListener("load", showImage);
    image.addEventListener("error", hideImage);

    if (image.complete) {
      if (image.naturalWidth > 0) {
        showImage();
      } else {
        hideImage();
      }
    }
  });

  // FAQアコーディオン。複数の質問を同時に開けるシンプルな仕様です。
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const answerId = button.getAttribute("aria-controls");
      const answer = document.getElementById(answerId);
      if (!answer) return;

      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.hidden = isOpen;

      const icon = button.querySelector(".faq-icon");
      if (icon) {
        icon.textContent = isOpen ? "＋" : "−";
      }
    });
  });
});