// ACCIVELL — Cookie Consent & Google Analytics 4
// Consent Mode + 7-day consent retry after Reject

(function () {
  "use strict";

  // GOOGLE ANALYTICS

  const GA_ID = "G-34R0G6NYQ1";

  // CONSENT STORAGE

  const CONSENT_KEY = "accivell_cookie_consent";

  // Repeat consent request after 7 days
  const REJECT_RETRY_DAYS = 7;
  const REJECT_RETRY_MS = REJECT_RETRY_DAYS * 24 * 60 * 60 * 1000;

  // GOOGLE ANALYTICS / dataLayer

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;

  // =========================================================
  // CONSENT MODE — DEFAULT STATE

  // Analytics are denied until the user gives permission.
  // Advertising is not used by AcciVell.

  gtag("consent", "default", {
    analytics_storage: "denied",

    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",

    wait_for_update: 500,
  });

  // =========================================================
  // LOAD GOOGLE ANALYTICS

  function loadGoogleAnalytics() {
    if (!GA_ID || !GA_ID.startsWith("G-")) {
      console.warn("Google Analytics ID is not configured.");
      return;
    }

    // Prevent loading the script more than once
    if (document.getElementById("google-analytics-script")) {
      return;
    }

    const script = document.createElement("script");

    script.id = "google-analytics-script";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;

    document.head.appendChild(script);

    gtag("js", new Date());

    gtag("config", GA_ID);
  }

  // ==================================
  // READ SAVED CONSENT

  function getSavedConsent() {
    const raw = localStorage.getItem(CONSENT_KEY);

    if (!raw) {
      return null;
    }

    // Backward compatibility with old version
    if (raw === "accepted") {
      return {
        status: "accepted",
        timestamp: Date.now(),
      };
    }

    // Backward compatibility with old version
    if (raw === "rejected") {
      return {
        status: "rejected",
        timestamp: Date.now(),
      };
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }

  // =================================
  // ACCEPT ANALYTICS

  function acceptAnalytics() {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        status: "accepted",
        timestamp: Date.now(),
      }),
    );

    gtag("consent", "update", {
      analytics_storage: "granted",
    });

    loadGoogleAnalytics();

    hideCookieBanner();
    showCookieSettingsButton();
  }

  // ===============================
  // REJECT ANALYTICS

  function rejectAnalytics() {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        status: "rejected",
        timestamp: Date.now(),
      }),
    );

    gtag("consent", "update", {
      analytics_storage: "denied",
    });

    hideCookieBanner();
    showCookieSettingsButton();
  }

  // =====================================
  // CHECK REJECTION EXPIRATION

  function rejectionExpired(consent) {
    if (!consent || consent.status !== "rejected") {
      return false;
    }

    if (!consent.timestamp) {
      return true;
    }

    return Date.now() - consent.timestamp >= REJECT_RETRY_MS;
  }

  // ===========================
  // COOKIE BANNER

  function createCookieBanner() {
    if (document.getElementById("accivell-cookie-banner")) {
      return;
    }

    const banner = document.createElement("div");

    banner.id = "accivell-cookie-banner";

    banner.innerHTML = `
        <div
          style="
            position: fixed;
            left: 16px;
            right: 16px;
            bottom: 16px;
            z-index: 99999;
            max-width: 900px;
            margin: 0 auto;
            padding: 28px 30px;
            background: #F3F4F6;
            color: #111827;
            border: 1px solid #D1D5DB;
            border-radius: 16px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.18);
            font-family: Arial, sans-serif;
          "
        >

        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 32px;
            flex-wrap: wrap;
          "
        >

          <!-- Text -->

          <div
            style="
              flex: 1 1 600px;
              min-width: 0;
            "
          >

            <div
              style="
                font-size: 17px;
                font-weight: 700;
                margin-bottom: 8px;
                color: #111827;
              "
            >
              We use cookies
            </div>

            <div
              style="
                font-size: 15px;
                line-height: 1.6;
                color: #4B5563;
              "
            >
              AcciVell is free to use. With your permission,
              we use optional analytics cookies to understand
              how many people use the application and which
              features are most useful. This helps us improve
              the free service and plan future features.
            </div>

          </div>

          <!-- Buttons -->

          <div
            style="
              display: flex;
              align-items: center;
              gap: 10px;
              flex-shrink: 0;
            "
          >

            <!-- Reject -->

            <button
              id="accivell-cookie-reject"
              type="button"
              style="
                min-height: 44px;
                padding: 10px 20px;
                border-radius: 9px;
                border: 1px solid #9CA3AF;
                background: transparent;
                color: #374151;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
              "
            >
              Reject
            </button>

            <!-- Got it -->

            <button
              id="accivell-cookie-accept"
              type="button"
              style="
                min-height: 46px;
                min-width: 105px;
                padding: 10px 24px;
                border-radius: 9px;
                border: none;
                background: #16A34A;
                color: #FFFFFF;
                cursor: pointer;
                font-size: 14px;
                font-weight: 700;
                box-shadow: 0 3px 8px rgba(22,163,74,0.28);
              "
              onmouseover="this.style.background='#15803D'"
              onmouseout="this.style.background='#16A34A'"
            >
              Got it
            </button>

          </div>

        </div>

      </div>
    `;

    document.body.appendChild(banner);

    document
      .getElementById("accivell-cookie-accept")
      .addEventListener("click", acceptAnalytics);

    document
      .getElementById("accivell-cookie-reject")
      .addEventListener("click", rejectAnalytics);
  }

  // ===========================
  // HIDE COOKIE BANNER

  function hideCookieBanner() {
    const banner = document.getElementById("accivell-cookie-banner");

    if (banner) {
      banner.remove();
    }
  }

  // ==================================
  // COOKIE SETTINGS BUTTON

  function showCookieSettingsButton() {
    if (document.getElementById("accivell-cookie-settings")) {
      return;
    }

    const button = document.createElement("button");

    button.id = "accivell-cookie-settings";
    button.type = "button";

    button.textContent = "Cookie settings";

    button.style.cssText = `
      position: fixed;
      bottom: 16px;
      left: 16px;
      z-index: 99998;
      padding: 7px 11px;
      border: 1px solid #D1D5DB;
      border-radius: 7px;
      background: #FFFFFF;
      color: #6B7280;
      font-family: Arial, sans-serif;
      font-size: 12px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    `;

    button.addEventListener("click", function () {
      button.remove();
      createCookieBanner();
    });

    document.body.appendChild(button);
  }

  // ===============================
  // UNIVERSAL ANALYTICS EVENT TRACKING

  window.accivellTrackEvent = function (eventName, eventParams = {}) {
    const consent = getSavedConsent();

    // Custom analytics events are sent only
    // after the user has accepted analytics.

    if (!consent || consent.status !== "accepted") {
      return;
    }

    if (typeof window.gtag !== "function") {
      return;
    }

    gtag("event", eventName, eventParams);
  };

  // =================================
  // INITIALISE ANALYTICS

  function initialiseAnalytics() {
    const consent = getSavedConsent();

    // Load GA4 with Consent Mode.
    // Default analytics_storage is denied.

    loadGoogleAnalytics();

    // -----------------------
    // No previous decision
    // ----------------------

    if (!consent) {
      createCookieBanner();
      return;
    }

    // ----------------------------
    // Previously accepted
    // --------------------------

    if (consent.status === "accepted") {
      gtag("consent", "update", {
        analytics_storage: "granted",
      });

      showCookieSettingsButton();

      return;
    }

    // -----------------------------------
    // Previously rejected
    // ----------------------------

    if (consent.status === "rejected") {
      if (rejectionExpired(consent)) {
        localStorage.removeItem(CONSENT_KEY);

        gtag("consent", "update", {
          analytics_storage: "denied",
        });

        createCookieBanner();

        return;
      }

      showCookieSettingsButton();

      return;
    }

    // ---------------------
    // Unknown value
    // ---------------------

    localStorage.removeItem(CONSENT_KEY);

    gtag("consent", "update", {
      analytics_storage: "denied",
    });

    createCookieBanner();
  }

  // ======================
  // DOM READY

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseAnalytics);
  } else {
    initialiseAnalytics();
  }
})();
