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

// kkomentar di website ==================================================
// const API_URL =
//   "https://script.google.com/macros/s/AKfycbwNTjwaVZzSmOC0fGxYcCfR1O47tyz-_QMnKnZv-NSAjJUNVzml690WqMIJqdGvRDZE/exec";

// const form = document.getElementById("commentForm");
// const list = document.getElementById("commentsList");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const nama = document.getElementById("nama").value;
//   const pesan = document.getElementById("pesan").value;

//   await fetch(API_URL, {
//     method: "POST",
//     body: JSON.stringify({ nama, pesan }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   form.reset();
//   loadComments();
// });

// async function loadComments() {
//   const res = await fetch(API_URL);
//   const data = await res.json();

//   list.innerHTML = "";

//   data.reverse().forEach((item) => {
//     const div = document.createElement("div");
//     div.className = "comment-item";
//     div.innerHTML = `
//       <h4>${item.nama}</h4>
//       <p>${item.pesan}</p>
//     `;
//     list.appendChild(div);
//   });
// }

// loadComments();

const API_URL =
  "https://script.google.com/macros/s/AKfycbwNTjwaVZzSmOC0fGxYcCfR1O47tyz-_QMnKnZv-NSAjJUNVzml690WqMIJqdGvRDZE/exec";

const form = document.getElementById("formKomentar");
const statusText = document.getElementById("statusKomentar");
const list = document.getElementById("commentsList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.getElementById("namaKomentar").value.trim();
  const pesan = document.getElementById("pesanKomentar").value.trim();

  if (!nama || !pesan) {
    statusText.textContent = "Nama dan pesan tidak boleh kosong";
    statusText.className = "status error";
    return;
  }

  const formData = new FormData();
  formData.append("nama", nama);
  formData.append("pesan", pesan);

  try {
    await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    statusText.textContent = "Berhasil membuat komentar 🤍";
    statusText.className = "status success";
    form.reset();
    loadComments();
  } catch {
    statusText.textContent = "Gagal mengirim komentar";
    statusText.className = "status error";
  }
});

async function loadComments() {
  const res = await fetch(API_URL);
  const data = await res.json();

  list.innerHTML = "";
  data.reverse().forEach((item) => {
    list.innerHTML += `
      <div class="comment-item">
        <h4>${item.nama}</h4>
        <p>${item.pesan}</p>
      </div>
    `;
  });
}

loadComments();
