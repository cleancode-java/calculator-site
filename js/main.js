// ====== MAIN INITIALIZATION ======
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  initFooterYear();
  initModal();
  initLogout();
});

// Imitate user state: "guest", "free", "pro"
const currentUserState = "guest";

function loadHeader() {
  const headerEl = document.getElementById("header");
  if (!headerEl) return;

  // Choose header depending on user status
  if (currentUserState === "guest") {
    headerEl.innerHTML = guestHeader();
  } else if (currentUserState === "free") {
    headerEl.innerHTML = freeHeader();
  } else if (currentUserState === "pro") {
    headerEl.innerHTML = proHeader();
  }

  highlightActiveNav();
  initMobileMenu();
}

// ====== HAMBURGER MENU FUNCTIONALITY ======
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mainNav.classList.toggle("hidden");
      // Перемикаємо іконку з ☰ на ✕ і навпаки
      mobileMenuBtn.textContent = isHidden ? "☰" : "✕";
    });
  }
}

// ====== HEADER TEMPLATES ======

// Guest header
function guestHeader() {
  return `
    <header class="bg-gray-200">
      <section class="bg-white border-b border-fuchsia-200 shadow-md shadow-fuchsia-700/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8
                    flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <div class="flex items-center justify-between md:block">
            <div class="max-w-2xl border-l-4 border-fuchsia-600 pl-3 md:pl-4">
            <h1 class="text-2xl md:text-3xl font-bold">
                <a href="/" class="hover:opacity-80">
                <span class="text-purple-800">Acci</span><span class="text-fuchsia-600">Vell</span>
                </a>
            </h1>
            <!-- Показуємо слоган і на мобільному, і на десктопі -->
            <p class="text-sm md:text-lg text-gray-800 font-medium mt-0.5 md:mt-1">
                Numbers that empower your decisions.
            </p>
            <!-- Довгий опис залишаємо тільки для десктопа -->
            <p class="hidden md:block text-sm text-gray-500 mt-1">
                Accivell is a simple finance tool built for self-employed professionals <br /> who want clarity,
                confidence, and control over their numbers.
            </p>
            </div>

            <button id="mobileMenuBtn" class="md:hidden text-2xl font-bold p-2 text-gray-700 focus:outline-none">
              ☰
            </button>
          </div>

          <div class="navigation flex items-center gap-4">
            <!-- Navigation -->
            <nav id="mainNav" class="hidden md:block text-sm w-full md:w-auto">
              <ul class="flex flex-col gap-2 md:flex-row md:flex-wrap">
                <li><a href="/" class="block px-3 py-1.5 text-gray-700 hover:text-fuchsia-700 transition">Home</a></li>
                <li><a href="why-choose-pro.html" class="block px-3 py-1.5 text-gray-700 hover:text-fuchsia-700 transition">Why choose Pro</a></li>
                <li><a href="how-it-works.html" class="block px-3 py-1.5 text-gray-700 hover:text-fuchsia-700 transition">How it works</a></li>
                <li><a href="about.html" class="block px-3 py-1.5 text-gray-700 hover:text-fuchsia-700 transition">About</a></li>
                <li><a href="contact-us.html" class="block px-3 py-1.5 text-gray-700 hover:text-fuchsia-700 transition">Contact us</a></li>
                <li>
                  <a href="login.html" class="block px-3 py-1.5 text-purple-800 font-semibold hover:text-fuchsia-700 transition">
                    Login
                  </a>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </section>
    </header>
  `;
}

// Free header
function freeHeader() {
  return `
    <header class="bg-gray-200">
      <section class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8
                    flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <div class="flex items-center justify-between md:block">
            <div class="max-w-2xl border-l-4 border-fuchsia-600 pl-3 md:pl-4">
              <h1 class="text-2xl md:text-3xl font-bold mb-1 md:mb-3">
                <a href="/" class="hover:opacity-80">
                  <span class="text-purple-800">FinLoggy:</span> <span class="text-fuchsia-600">UK Tax Calculator</span>
                </a>
              </h1>
              <p class="hidden md:block text-gray-600">
                Estimate your Income Tax and National Insurance contributions.
                Designed for UK sole traders and freelancers.
              </p>
            </div>

            <button id="mobileMenuBtn" class="md:hidden text-2xl font-bold p-2 text-gray-700 focus:outline-none">
              ☰
            </button>
          </div>

          <div class="navigation">
            <nav id="mainNav" class="hidden md:block text-sm space-x-0 md:space-x-6 md:justify-end">
              <ul class="flex flex-col gap-2 md:flex-row">
                <li><a href="/" class="block px-3 py-1.5 hover:underline">Dashboard - Free</a></li>
                <li><a href="/why-choose-pro.html" class="block px-3 py-1.5 hover:underline">Calculator</a></li>
                <li><a href="how-it-works.html" class="block px-3 py-1.5 hover:underline">Upgrade to Pro</a></li>
                <li><a href="contact-us.html" class="block px-3 py-1.5 hover:underline">Contact us</a></li>
                <li>
                  <button id="logoutBtn" class="block w-full text-left md:w-auto px-3 py-1.5 text-red-600 hover:text-red-800 transition">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </section>
    </header>
  `;
}

// Pro header
function proHeader() {
  return `
    <header class="bg-gray-200">
      <section class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8
                    flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <div class="flex items-center justify-between md:block">
            <div class="max-w-2xl border-l-4 border-fuchsia-600 pl-3 md:pl-4">
              <h1 class="text-2xl md:text-3xl font-bold mb-1 md:mb-3">
                <a href="/" class="hover:opacity-80">
                  <span class="text-purple-800">FinLoggy:</span> <span class="text-fuchsia-600">UK Tax Calculator</span>
                </a>
              </h1>
              <p class="hidden md:block text-gray-600">
                Estimate your Income Tax and National Insurance contributions.
                Designed for UK sole traders and freelancers.
              </p>
            </div>

            <button id="mobileMenuBtn" class="md:hidden text-2xl font-bold p-2 text-gray-700 focus:outline-none">
              ☰
            </button>
          </div>

          <div class="navigation">
            <nav id="mainNav" class="hidden md:block text-sm space-x-0 md:space-x-6 md:justify-end">
              <ul class="flex flex-col gap-2 md:flex-row">
                <li><a href="#" class="block px-3 py-1.5 hover:underline">Dashboard - Pro</a></li>
                <li><a href="#" class="block px-3 py-1.5 hover:underline">Calculator</a></li>
                <li><a href="#" class="block px-3 py-1.5 hover:underline">Reports</a></li>
                <li><a href="#" class="block px-3 py-1.5 hover:underline">Analytics</a></li>
                <li><a href="contact-us.html" class="block px-3 py-1.5 hover:underline">Contact us</a></li>
                <li>
                  <button id="logoutBtn" class="block w-full text-left md:w-auto px-3 py-1.5 text-red-600 hover:text-red-800 transition">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>

        </div>
      </section>
    </header>
  `;
}

// ====== HELPER FUNCTIONS ======

// Highlight active link
function highlightActiveNav() {
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll(".navigation a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "/")) {
      link.classList.add(
        "px-3",
        "py-1.5",
        "border",
        "border-gray-400",
        "rounded",
        "bg-gray-50",
        "font-semibold",
      );
    }
  });
}

// Set current year in footer
function initFooterYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Upgrade Modal logic
function initModal() {
  const upgradeBtn = document.getElementById("upgradeBtn");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");

  if (upgradeBtn && modal && closeModal) {
    upgradeBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }
}

// Logout logic (Supabase)
function initLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      if (typeof supabase !== "undefined") {
        await supabase.auth.signOut();
      }
      window.location.href = "/";
    });
  }
}
