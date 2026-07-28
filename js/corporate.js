"use strict";

document.documentElement.classList.add("js");

const KRIDIYA = {
  legal: "Kridiya Travel and Tourism FZ-LLC",
  site: "Kridiya Business Travel",
  mainSite: "https://www.kridiyatravel.com/",
  corporateSite: "https://corporate.kridiyatravel.com/",
  adminSite: "https://admin.kridiyatravel.com/",
  phoneDisplay: "+971 50 941 3873",
  phoneTel: "+971509413873",
  waNumber: "971509413873",
  emails: {
    corporate: "corporate@kridiyatravel.com",
    enquiry: "enquiry@kridiyatravel.com",
    info: "info@kridiyatravel.com"
  },
  supabaseUrl: "https://jmvqqpughlzeqrcyavwz.supabase.co",
  supabaseKey: "sb_publishable_wiA9tSt74X-UQhW4yOXgIQ_lEUG1Q1Q",
  supabaseCdn: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
};

const SERVICES = [
  ["flight", "Employee Flight Booking", "Staff routes, annual leave travel, group fares, urgent changes, and executive ticketing."],
  ["visa", "Business Visa Processing", "Employee business visas, visit visa support, file preparation, and application tracking."],
  ["guest", "UAE Visit Visa for Company Guests", "Visitor visas for partners, clients, trainers, auditors, and company guests arriving in the UAE."],
  ["hotel", "Hotel Corporate Rates", "Business accommodation, long-stay options, project teams, and negotiated hotel requests."],
  ["transfer", "Airport Transfers", "Airport pickup, staff movement, guest transfers, and meet-and-assist coordination."],
  ["insurance", "Travel Insurance", "Corporate travel insurance options for employees, groups, and international trips."],
  ["event", "Event & Group Travel", "Multi-traveller flights, hotels, visa coordination, and travel desk support for events."],
  ["mice", "MICE Travel", "Meetings, incentives, conferences, exhibitions, delegate travel, and group logistics."],
  ["vip", "Executive/VIP Travel", "Priority handling for owners, directors, senior staff, and premium itineraries."],
  ["emergency", "Emergency Travel Changes", "Urgent rebooking, route changes, document support, and human follow-up."],
  ["umrah", "Corporate Umrah Groups", "Company-sponsored Umrah groups, family groups, staff welfare travel, and package coordination."],
  ["reward", "Company Holiday / Reward Trips", "Reward trips, staff holiday packages, retreats, and incentive travel planning."],
  ["report", "Monthly Travel Statement", "Monthly travel summaries, pending payments, receipts, and accounting-ready reporting."]
];

function waLink(message) {
  return "https://wa.me/" + KRIDIYA.waNumber + (message ? "?text=" + encodeURIComponent(message) : "");
}

function pageName() {
  const p = location.pathname.split("/").pop();
  return p || "index.html";
}

function renderChrome() {
  const current = pageName();
  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="topbar">
        <div class="container topbar-inner">
          <span>${KRIDIYA.site} - UAE and international corporate travel</span>
          <span><a href="tel:${KRIDIYA.phoneTel}">${KRIDIYA.phoneDisplay}</a> &nbsp; <a href="mailto:${KRIDIYA.emails.corporate}">${KRIDIYA.emails.corporate}</a></span>
        </div>
      </div>
      <div class="container header-inner">
        <a class="logo" href="index.html" aria-label="Kridiya Business Travel home"><img src="assets/logo.png" alt="Kridiya Travel and Tourism" width="256" height="256"></a>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
        <nav class="main-nav" aria-label="Main navigation">
          <ul>
            ${navLink("index.html", "Home", current)}
            <li class="nav-drop"><button type="button">Company</button><div class="drop-menu">
              ${dropLink("company.html", "Open Corporate Account")}
              ${dropLink("company.html#workflow", "Approval Workflow")}
              ${dropLink("company.html#billing", "Billing and LPO")}
              <a href="${KRIDIYA.mainSite}">Kridiya Main Site</a>
            </div></li>
            <li class="nav-drop"><button type="button">Services</button><div class="drop-menu">
              ${SERVICES.slice(0, 9).map((s) => `<a href="services.html#${s[0]}">${s[1]}</a>`).join("")}
            </div></li>
            <li class="nav-drop"><button type="button">For Teams</button><div class="drop-menu">
              <a href="company.html#teams">Business Owners</a>
              <a href="company.html#teams">HR Teams</a>
              <a href="company.html#teams">Travel Coordinators</a>
              <a href="company.html#teams">Finance Teams</a>
              <a href="company.html#teams">Employees</a>
            </div></li>
            ${navLink("booking.html", "Book Travel", current)}
            ${navLink("corporate-account.html", "Portal", current)}
            ${navLink("contact.html", "Contact", current)}
          </ul>
        </nav>
        <div class="header-actions">
          <a class="btn btn-outline" href="login.html?next=corporate-account.html">Sign In</a>
          <a class="btn btn-primary" href="index.html#apply">Apply</a>
        </div>
      </div>`;
    const nav = header.querySelector(".main-nav");
    const toggle = header.querySelector(".nav-toggle");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <img class="footer-logo" src="assets/logo.png" alt="Kridiya Travel and Tourism">
          <h4>Kridiya Business Travel</h4>
          <p>Corporate travel management for UAE and international companies: flights, visas, hotels, transfers, MICE, VIP travel, approvals, billing, and monthly reporting.</p>
        </div>
        <div><h4>Quick Links</h4><ul class="footer-links">
          <li><a href="company.html">Company Account</a></li>
          <li><a href="booking.html">Book Travel</a></li>
          <li><a href="corporate-account.html">Corporate Portal</a></li>
          <li><a href="contact.html">Contact Desk</a></li>
          <li><a href="${KRIDIYA.mainSite}">Main Kridiya Site</a></li>
        </ul></div>
        <div><h4>Services</h4><ul class="footer-links">
          <li><a href="services.html#flight">Flights</a></li>
          <li><a href="services.html#visa">Visa</a></li>
          <li><a href="services.html#hotel">Hotels</a></li>
          <li><a href="services.html#transfer">Transfers</a></li>
          <li><a href="services.html#mice">MICE</a></li>
        </ul></div>
        <div><h4>For Teams</h4><ul class="footer-links">
          <li><a href="company.html#teams">Business Owners</a></li>
          <li><a href="company.html#teams">HR Teams</a></li>
          <li><a href="company.html#teams">Finance Teams</a></li>
          <li><a href="company.html#teams">Travel Coordinators</a></li>
        </ul></div>
        <div><h4>Contact</h4><p><b>Need help?</b><br><a href="tel:${KRIDIYA.phoneTel}">${KRIDIYA.phoneDisplay}</a></p><p><b>Email</b><br><a href="mailto:${KRIDIYA.emails.corporate}">${KRIDIYA.emails.corporate}</a></p></div>
      </div>
      <div class="container footer-bar"><span>© ${new Date().getFullYear()} ${KRIDIYA.legal}. All rights reserved.</span><span>corporate.kridiyatravel.com</span></div>`;
  }

  const wa = document.createElement("a");
  wa.className = "btn btn-wa wa-float";
  wa.href = waLink("Hello Kridiya Business Travel, I need corporate travel support.");
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.textContent = "WhatsApp";
  document.body.appendChild(wa);
}

function navLink(href, label, current) {
  return `<li><a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a></li>`;
}

function dropLink(href, label) {
  return `<a href="${href}">${label}</a>`;
}

function renderServiceCards(targetSelector, limit) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = SERVICES.slice(0, limit || SERVICES.length).map((s, i) => `
    <article class="service-card reveal" id="${s[0]}">
      <span class="service-mark">${String(i + 1).padStart(2, "0")}</span>
      <h3>${s[1]}</h3>
      <p>${s[2]}</p>
    </article>`).join("");
}

function prepareTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const title = document.getElementById("request-title");
  const copy = document.getElementById("request-copy");
  const cta = document.getElementById("request-cta");
  if (!tabs.length || !title || !copy || !cta) return;
  tabs.forEach((btn) => btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    title.textContent = btn.dataset.title;
    copy.textContent = btn.dataset.copy;
    cta.href = "booking.html?service=" + encodeURIComponent(btn.dataset.service);
  }));
}

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function setFieldError(input, msg) {
  const field = input.closest(".field");
  if (!field) return;
  let err = field.querySelector(".err");
  if (!err) {
    err = document.createElement("span");
    err.className = "err";
    field.appendChild(err);
  }
  field.classList.toggle("invalid", Boolean(msg));
  err.textContent = msg || "";
}

function validateForm(form) {
  let ok = true;
  let first = null;
  form.querySelectorAll("input[required], select[required], textarea[required]").forEach((input) => {
    const val = input.value.trim();
    let msg = "";
    if (!val) msg = "This field is required.";
    else if (input.type === "email" && !RE_EMAIL.test(val)) msg = "Enter a valid email address.";
    setFieldError(input, msg);
    if (msg && !first) first = input;
    if (msg) ok = false;
  });
  if (first) first.focus();
  return ok;
}

function reference(prefix) {
  const now = new Date();
  return "KD-" + prefix + "-" + now.getFullYear() + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

async function sendToSupabase(form, ref) {
  const sb = await supabaseClient();
  const data = new FormData(form);
  const details = {};
  data.forEach((value, key) => {
    if (key.charAt(0) !== "_") details[key] = String(value).trim();
  });
  const payload = {
    reference: ref,
    service_type: "other",
    full_name: details.Contact_person || details.Name || details.Authorized_contact || "Corporate contact",
    email: details.Email || details.Company_email || details.Billing_email || KRIDIYA.emails.corporate,
    phone: details.Phone || details.WhatsApp || null,
    summary: (details.Service_needed || details.Request_type || "Corporate business travel") + " - " + (details.Company_name || "Company pending"),
    details
  };
  await sb.from("enquiries").insert(payload);
}

async function sendFormSubmit(form, ref) {
  const data = new FormData(form);
  const payload = { Reference: ref };
  data.forEach((value, key) => { payload[key] = value; });
  await fetch("https://formsubmit.co/ajax/" + KRIDIYA.emails.corporate, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload)
  });
}

function prepareForms() {
  document.querySelectorAll("form[data-corporate-form]").forEach((form) => {
    form.addEventListener("input", (e) => {
      if (e.target.matches("input, select, textarea")) setFieldError(e.target, "");
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validateForm(form)) return;
      const btn = form.querySelector('button[type="submit"]');
      const old = btn ? btn.textContent : "";
      const ref = reference(form.dataset.prefix || "BIZ");
      if (btn) { btn.disabled = true; btn.textContent = "Sending..."; }
      const status = form.querySelector("[data-form-status]");
      try {
        const results = await Promise.allSettled([
          sendToSupabase(form, ref),
          sendFormSubmit(form, ref)
        ]);
        if (results.every((result) => result.status === "rejected")) throw results[0].reason;
        const message = form.dataset.successMessage
          ? form.dataset.successMessage.replace("{ref}", ref)
          : `Request prepared with reference ${ref}. Kridiya will contact you from ${KRIDIYA.emails.corporate}.`;
        if (status) status.innerHTML = `<div class="form-banner success">${message}</div>`;
        form.reset();
      } catch (err) {
        if (status) status.innerHTML = `<div class="form-banner error">Could not save online. Please email ${KRIDIYA.emails.corporate} or WhatsApp ${KRIDIYA.phoneDisplay}.</div>`;
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = old; }
      }
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count-to]");
  if (!counters.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const animate = (el) => {
    const target = Number(el.dataset.countTo);
    if (!Number.isFinite(target)) return;
    const start = performance.now();
    const duration = 900;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });
  counters.forEach((el) => io.observe(el));
}

async function supabaseClient() {
  if (!window.supabase || !window.supabase.createClient) {
    await new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-supabase-js="true"]');
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = KRIDIYA.supabaseCdn;
      script.defer = true;
      script.dataset.supabaseJs = "true";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return window.supabase.createClient(KRIDIYA.supabaseUrl, KRIDIYA.supabaseKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
}

function prepareLogin() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;
  const status = form.querySelector("[data-form-status]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;
    const btn = form.querySelector('button[type="submit"]');
    const old = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Signing in...";
    try {
      const sb = await supabaseClient();
      const result = await sb.auth.signInWithPassword({
        email: form.email.value.trim(),
        password: form.password.value
      });
      if (result.error) throw result.error;
      status.innerHTML = '<div class="form-banner success">Signed in. Corporate data visibility depends on approved company access and RLS policies.</div>';
    } catch (err) {
      status.innerHTML = '<div class="form-banner error">Could not sign in. Check the username/password or ask Kridiya to approve your company access.</div>';
    } finally {
      btn.disabled = false;
      btn.textContent = old;
    }
  });
}

function prefillBookingService() {
  const select = document.getElementById("service-needed");
  if (!select) return;
  const service = new URLSearchParams(location.search).get("service");
  if (!service) return;
  Array.from(select.options).forEach((option) => {
    if (option.textContent === service) select.value = option.textContent;
  });
}

function initReveal() {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

function loadSupabase() {
  if (document.querySelector('script[data-supabase-js="true"]')) return;
  const script = document.createElement("script");
  script.src = KRIDIYA.supabaseCdn;
  script.defer = true;
  script.dataset.supabaseJs = "true";
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  renderServiceCards("[data-services-home]", 8);
  renderServiceCards("[data-services-all]");
  prepareTabs();
  prefillBookingService();
  prepareForms();
  prepareLogin();
  initReveal();
  initCounters();
  loadSupabase();
});
