document.addEventListener("DOMContentLoaded", function () {
  // Слайдер
  const initSlider = () => {
    const slides = document.querySelectorAll(".slide");
    const links = document.querySelectorAll(".collections_link a");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;

    const showSlide = (index) => {
      if (isAnimating || currentSlide === index || !slides[index]) return;

      isAnimating = true;
      const currentActive = document.querySelector(".slide.active");
      const nextSlide = slides[index];

      currentActive?.classList.add("fade-out");
      nextSlide?.classList.add("fade-in");

      setTimeout(() => {
        slides.forEach((slide) => {
          slide.classList.remove("active", "fade-out", "fade-in");
        });

        if (nextSlide) {
          nextSlide.classList.add("active");

          links.forEach((link) => link.classList.remove("active"));
          links[index]?.classList.add("active");

          dots.forEach((dot) => dot.classList.remove("active"));
          dots[index]?.classList.add("active");

          currentSlide = index;
        }
        isAnimating = false;
      }, 500);
    };

    const startSlider = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
      }, 10000);
    };

    const setupSliderControls = () => {
      links.forEach((link, index) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          if (!isAnimating && currentSlide !== index) {
            clearInterval(slideInterval);
            showSlide(index);
            startSlider();
          }
        });
      });

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          if (!isAnimating && currentSlide !== index) {
            clearInterval(slideInterval);
            showSlide(index);
            startSlider();
          }
        });
      });
    };

    if (slides.length > 0) {
      setupSliderControls();
      startSlider();
    }
  };

  // Бургер меню и сайдбар каталога
  const initMobileMenu = () => {
    const burgerMenu = document.getElementById("burgerMenu");
    const catalogLink = document.getElementById("catalogLink");
    const catalogSidebar = document.getElementById("catalogSidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const navLinks = document.querySelector(".nav-links");

    if (!burgerMenu || !catalogSidebar || !closeSidebar) return;

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    const toggleSidebar = (open) => {
      if (open) {
        catalogSidebar.classList.add("active");
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
      } else {
        catalogSidebar.classList.remove("active");
        overlay.style.display = "none";
        document.body.style.overflow = "";
      }
    };

    burgerMenu.addEventListener("click", () => {
      navLinks?.classList.toggle("active");
      overlay.style.display = navLinks?.classList.contains("active")
        ? "block"
        : "none";
      document.body.style.overflow = navLinks?.classList.contains("active")
        ? "hidden"
        : "";
    });

    if (catalogLink) {
      catalogLink.addEventListener("click", (e) => {
        e.preventDefault();
        toggleSidebar(true);
      });
    }

    closeSidebar.addEventListener("click", () => toggleSidebar(false));
    overlay.addEventListener("click", () => {
      toggleSidebar(false);
      navLinks?.classList.remove("active");
    });
  };

  // Навигация по странице

  // Модальные окна
  const initModals = () => {
    // Корзина
    const cartIcon = document.getElementById("cartIcon");
    const cartModal = document.getElementById("cartModal");
    const closeCartModal = document.getElementById("closeCartModal");

    if (cartIcon && cartModal && closeCartModal) {
      cartIcon.addEventListener("click", (e) => {
        e.preventDefault();
        cartModal.style.display = "block";
        document.body.style.overflow = "hidden";
      });

      closeCartModal.addEventListener("click", () => {
        cartModal.style.display = "none";
        document.body.style.overflow = "";
      });

      window.addEventListener("click", (e) => {
        if (e.target === cartModal) {
          cartModal.style.display = "none";
          document.body.style.overflow = "";
        }
      });
    }

    // Избранное
    const wishlistIcon = document.getElementById("wishlistIcon");
    const wishlistModal = document.getElementById("wishlistModal");
    const closeWishlistModal = document.getElementById("closeWishlistModal");

    if (wishlistIcon && wishlistModal && closeWishlistModal) {
      wishlistIcon.addEventListener("click", (e) => {
        e.preventDefault();
        wishlistModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });

      closeWishlistModal.addEventListener("click", () => {
        wishlistModal.style.display = "none";
        document.body.style.overflow = "auto";
      });

      wishlistModal.addEventListener("click", (e) => {
        if (e.target === wishlistModal) {
          wishlistModal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });

      const continueBtn = document.querySelector(".continue-shopping-btn");
      continueBtn?.addEventListener("click", () => {
        wishlistModal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
  };

  // Инициализация всех модулей
  initSlider();
  initMobileMenu();
  initPageNavigation();
  initModals();
});

// Вспомогательная функция
function appendItemsToContainer(items, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container || !items) return;

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const el = document.createElement("div");
    fragment.appendChild(el);
  });
  container.appendChild(fragment);
}
