// code for header
document.addEventListener("DOMContentLoaded", () => {
    loadHeader();
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
}

// Guest header
function guestHeader(){
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
                            <li><a href="/" class="px-3 py-1.5 hover:underline">Home</a></li>
                            <li><a href="why-choose-pro.html" class="px-3 py-1.5 hover:underline">Why choose Pro</a></li>
                            <li><a href="how-it-works.html" class="px-3 py-1.5 hover:underline">How it works</a></li>
                            <li><a href="contact-us.html" class="px-3 py-1.5 hover:underline">Contact us</a></li>
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
                            <li><a href="contact-us.html" class="px-3 py-1.5 hover:underline">Logout</a></li>
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
                            <li><a href="contact-us.html" class="px-3 py-1.5 hover:underline">Logout</a></li>
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



/*
// Вставляю появу модального вікна для кнопки Upgrade Pro, оскільки кнопка ще не готова
// Отримуємо елементи
const upgradeBtn = document.getElementById("upgradeBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

// Відкриваємо модальне вікно при натисканні Upgrade
upgradeBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

// Закриваємо модальне вікно при натисканні OK
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Додатково: закриття при кліку поза вікном
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

*/

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