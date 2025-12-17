// ===================== COUNTDOWN
const targetDate = new Date("June 1, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  document.getElementById("days").innerHTML = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );
  document.getElementById("hours").innerHTML = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  document.getElementById("minutes").innerHTML = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60)
  );
  document.getElementById("seconds").innerHTML = Math.floor(
    (diff % (1000 * 60)) / 1000
  );
}, 1000);

// ubah nama ===========================
// ambil parameter dari URL ============================
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n");

const namaContainer = document.querySelector(".hero p span");
namaContainer.innerText = nama;

// salin no rekening -------=============
document.querySelectorAll(".btn-copy").forEach((btn) => {
  btn.addEventListener("click", () => {
    const rek = btn.dataset.rek;
    navigator.clipboard.writeText(rek).then(() => {
      alert("Nomor rekening berhasil disalin!");
    });
  });
});

// data tamu =============================================
window.addEventListener("load", function () {
  const form = document.getElementById("rsvp-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Konfirmasi kehadiran berhasil!");
    });
  });
});

// ==================================

// gabisa scroll pertamakali, hanya bisa ketika klik buka undagan
const btnOpen = document.getElementById("btnOpen");
const navbar = document.getElementById("navbar");
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const musicIcon = musicBtn.querySelector("i");

// reset scroll saat reload
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.onload = () => {
  window.scrollTo(0, 0);
};

btnOpen.addEventListener("click", () => {
  // buka scroll
  document.body.classList.remove("no-scroll");

  // tampilkan navbar
  navbar.classList.remove("hidden");

  // play musik
  music.play();

  // set icon jadi pause
  musicIcon.classList.remove("fa-play");
  musicIcon.classList.add("fa-pause");

  // scroll ke halaman 2
  document.getElementById("page2").scrollIntoView({
    behavior: "smooth",
  });
});

// toggle pause di navbar
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicIcon.classList.remove("fa-play");
    musicIcon.classList.add("fa-pause");
  } else {
    music.pause();
    musicIcon.classList.remove("fa-pause");
    musicIcon.classList.add("fa-play");
  }
});
