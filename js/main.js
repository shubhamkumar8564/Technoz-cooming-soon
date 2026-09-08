const LAUNCH_AT = new Date("2026-11-01T00:00:00+05:30").getTime();

const units = {
  days: document.querySelector('[data-unit="days"]'),
  hours: document.querySelector('[data-unit="hours"]'),
  minutes: document.querySelector('[data-unit="minutes"]'),
  seconds: document.querySelector('[data-unit="seconds"]'),
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function tick() {
  const diff = Math.max(0, LAUNCH_AT - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  units.days.textContent = pad(days);
  units.hours.textContent = pad(hours);
  units.minutes.textContent = pad(minutes);
  units.seconds.textContent = pad(seconds);
}

tick();
setInterval(tick, 1000);

const header = document.querySelector(".header");
const toggle = document.querySelector(".nav-toggle");

toggle.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const form = document.querySelector(".notify");
const statusEl = form.querySelector(".notify__status");
const emailInput = form.querySelector("#email");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.classList.toggle("is-error", !valid);

  if (!valid) {
    statusEl.textContent = "Please enter a valid email address.";
    emailInput.focus();
    return;
  }

  const saved = JSON.parse(localStorage.getItem("technoz-notify") || "[]");
  if (!saved.includes(email)) {
    saved.push(email);
    localStorage.setItem("technoz-notify", JSON.stringify(saved));
  }

  statusEl.textContent = "You’re on the list. We’ll notify you when we launch.";
  form.reset();
});
