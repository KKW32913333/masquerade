// ===============================
// テーマ切り替え（ライト / ダーク）
// ===============================
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeBtn");
  const sunIcon = document.getElementById("themeIconSun");
  const moonIcon = document.getElementById("themeIconMoon");
  const label = document.getElementById("themeLabel");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
      label.textContent = "ダークモード";
    } else {
      root.removeAttribute("data-theme");
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
      label.textContent = "ライトモード";
    }
  }

  const saved = localStorage.getItem("theme");
  if (saved) {
    applyTheme(saved);
  } else {
    applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  btn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
})();


// ===============================
// スクロールアニメーション（フェードイン）
// ===============================
(function () {
  const reveals = document.querySelectorAll(".reveal");

  function reveal() {
    const trigger = window.innerHeight * 0.85;
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add("visible");
    });
  }

  window.addEventListener("scroll", reveal);
  window.addEventListener("load", reveal);
})();


// ===============================
// モバイルメニュー
// ===============================
const menuToggle = document.getElementById("menuToggle");
const mobileNavPanel = document.getElementById("mobileNavPanel");

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNavPanel.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuToggle.classList.toggle("active", isOpen);
});

document.querySelectorAll(".mobile-nav-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNavPanel.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.classList.remove("active");
  });
});


// ===============================
// スクロール連動：現在地のナビをハイライト
// ===============================
(function () {
  const sections = document.querySelectorAll("main [id]");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-panel a");

  if (!sections.length || !navLinks.length) return;

  const hrefFor = (id) => (id === "hero" ? "#top" : `#${id}`);

  const setActive = (id) => {
    const target = hrefFor(id);
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === target);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
})();


// ===============================
// トップへ戻るボタン
// ===============================
(function () {
  const backToTop = document.getElementById("backToTop");
  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
