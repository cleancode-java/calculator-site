// code for header
document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
    // ====== Hamburger menu JS ======
    // the code is executed after the header is already inserted into the DOM
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mainNav = document.getElementById("mainNav");

    mobileMenuBtn.addEventListener("click", () => {
            console.log("Button clicked")
    });

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener("click", () => {
            mainNav.classList.toggle("hidden");
        });
    }
});

// imitate who is it: guest, userFree, userPro
const currentUserState = "guest";

function loadHeader(){
    const headerEl = document.getElementById("header");
    if(!headerEl) return;

    // choose header depeading on users status
    if(currentUserState === "guest"){
        headerEl.innerHTML = guestHeader();
    } else if (currentUserState === "free") {
        headerEl.innerHTML = freeHeader();
    } else if (currentUserState === "pro"){
        headerEl.innerHTML = proHeader();
    }

    highlightActiveNav();
    initLogout();
}



function initLogout(){

    
}

// Guest header
function guestHeader(){
    return `
       <header class="bg-gray-200">
        <section class="bg-white shadow-md shadow-emerald-700/20">
            <div class="max-w-7xl mx-auto px-6 py-8
                        flex flex-col gap-6
                        md:flex-row md:items-center md:justify-between">
                <div class="max-w-2xl border-l-4 border-emerald-600 pl-4">
                    <h1 class="text-3xl font-bold mb-2">
                    <a href="/" class="text-3xl font-bold hover:opacity-80">
                        <span class="text-emerald-900">Fin</span><span class="text-emerald-700">Loggy</span>
                    </a>  
                    </h1>
                    <p class="text-gray-600">
                        UK tax calculator for sole traders and freelancers.
                    </p>
                    <p class="text-sm text-gray-500 mt-1">
                        Estimate your Income Tax and National Insurance contributions.
                    </p>
                </div>

                <div class="navigation flex items-center gap-4">
                    <button id="mobileMenuBtn"
                            class="md:hidden text-3xl font-bold">
                        ☰
                    </button>

                    <!-- Navigation -->
                    <nav id="mainNav" class="hidden md:block text-sm">
                        <ul class="flex flex-col gap-2 md:flex-row md:flex-wrap">
                            <li><a href="/" class="px-3 py-1.5 text-gray-700 hover:text-emerald-700 transition">Home</a></li>
                            <li><a href="why-choose-pro.html" class="px-3 py-1.5 text-gray-700 hover:text-emerald-700 transition">Why choose Pro</a></li>
                            <li><a href="how-it-works.html" class="px-3 py-1.5 text-gray-700 hover:text-emerald-700 transition">How it works</a></li>
                            <li><a href="contact-us.html" class="px-3 py-1.5 text-gray-700 hover:text-emerald-700 transition">Contact us</a></li>
                            <li><a href="login.html" 
                                class="px-3 py-1.5 text-emerald-700 font-semibold hover:text-emerald-900 transition">
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




// Free header (поки пустий, можу додавати додаткові меню)
function freeHeader(){
    return `
        <header class="bg-gray-200">
        <section class="bg-white shadow-md">
            <div class="max-w-7xl mx-auto px-6 py-8
                        flex flex-col gap-6
                        md:flex-row md:items-center md:justify-between">
                <div class="max-w-2xl">
                    <h1 class="text-3xl font-bold mb-3">
                        FinLoggy: UK Tax Calculator for Self-Employed
                    </h1>
                    <p class="text-gray-600">
                        Estimate your Income Tax and National Insurance contributions.
                        Designed for UK sole traders and freelancers.
                    </p>
                </div>

                <div class="navigation">
                    <nav class="space-x-6 text-sm md:justify-end">
                        <ul class="flex gap-2">
                            <li><a href="/" class="px-3 py-1.5 hover:underline">Dashboard - Free</a></li>
                            <li><a href="/why-choose-pro.html" class="px-3 py-1.5 hover:underline">Calculator</a></li>
                            <li><a href="how-it-works.html" class="px-3 py-1.5 hover:underline">Upgrade to Pro</a></li>
                            <li><a href="contact-us.html" class="px-3 py-1.5 hover:underline">Contact us</a></li>
                            <li><button id="logoutBtn" 
                                class="px-3 py-1.5 text-red-600 hover:text-red-800 transition">
                                Logout
                            </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    </header>
    `
}

// proHeader
function proHeader(){
    return `
           <header class="bg-gray-200">
        <section class="bg-white shadow-md">
            <div class="max-w-7xl mx-auto px-6 py-8
                        flex flex-col gap-6
                        md:flex-row md:items-center md:justify-between">
                <div class="max-w-2xl">
                    <h1 class="text-3xl font-bold mb-3">
                        FinLoggy: UK Tax Calculator for Self-Employed
                    </h1>
                    <p class="text-gray-600">
                        Estimate your Income Tax and National Insurance contributions.
                        Designed for UK sole traders and freelancers.
                    </p>
                </div>

                <div class="navigation">
                    <nav class="space-x-6 text-sm md:justify-end">
                        <ul class="flex gap-2">
                            <li><a href="#" class="px-3 py-1.5 hover:underline">Dashboard - Pro</a></li>
                            <li><a href="#l" class="px-3 py-1.5 hover:underline">Calculator</a></li>
                            <li><a href="#" class="px-3 py-1.5 hover:underline">Reports</a></li>
                            <li><a href="#" class="px-3 py-1.5 hover:underline">Analitics</a></li>
                            <li><a href="contact-us.html" class="px-3 py-1.5 hover:underline">Contact us</a></li>
                            <li><button id="logoutBtn" 
                                class="px-3 py-1.5 text-red-600 hover:text-red-800 transition">
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

// Підсвічування активного пункту
function highlightActiveNav(){
    const path = window.location.pathname.split("/").pop();
    document.querySelectorAll(".navigation a").forEach(link =>{
        if (link.getAttribute("href") === path || (path ==="" &&link.getAttribute("href")==="/")){
            link.classList.add(
                "px-3",
                 "py-1.5",
                "border",
                "border-gray-400",
                "rounded",
                "bg-fray-50",
                "font-semibold"
            );
        }
    });
}





// code for current date in footer
document.addEventListener("DOMContentLoaded", ()=> {
    const yearEl = document.getElementById("currentYear");
    if (yearEl){
        yearEl.textContent = new Date().getFullYear();
    }
});

const upgradeBtn = document.getElementById("upgradeBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

if (upgradeBtn && modal && closeModal) {

  // Відкриваємо модальне вікно
  upgradeBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // Закриваємо модальне вікно кнопкою OK
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Закриття при кліку поза вікном
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

}


const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  });
}
