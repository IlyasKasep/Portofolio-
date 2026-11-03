# Context & Role

Kamu adalah Expert Frontend Developer dan Creative Technologist yang ahli dalam membuat efek visual kompleks dengan CSS dan JavaScript.
Tugasmu adalah membuatkan source code lengkap (HTML, CSS, dan Vanilla JavaScript) untuk "Template Website Kado Digital - Tema Cyberpunk Y2K".

# Core Aesthetic & Vibe

* **Tema:** Cyberpunk, Y2K Tech, Hacker Aesthetic, Futuristic Retro.
* **Palet Warna:** Background hitam pekat (#000000) atau abu-abu sangat gelap. Aksen warna neon yang mencolok: Cyan terang (#00ffff), Magenta (#ff00ff), dan Kuning Cyberpunk (#fcee0a).
* **Typography:** Gunakan perpaduan font Monospace ala terminal (misal 'Space Mono' atau 'Fira Code') dan font futuristik bersudut tajam (misal 'Orbitron' atau 'Syncopate' dari Google Fonts).
* **Styling:** Gunakan efek `box-shadow` tebal untuk menciptakan efek "Neon Glow" pada tombol dan border. Gunakan grid line atau dot pattern tipis di background.
* **Responsivitas:** Wajib Mobile-First. Harus terlihat seperti antarmuka/HUD mesin masa depan di layar HP.

# Interactive Flow & Structure

Website ini berkonsep "System Decryption" (Seolah-olah user sedang meretas sistem untuk membuka kado).

## State 1: Terminal / Boot Sequence

* Halaman awal berwarna hitam dengan teks hijau ala terminal/command prompt.
* **Animasi Teks:** Gunakan JavaScript untuk memunculkan teks baris demi baris secara otomatis, contoh:
  `> INITIALIZING SYSTEM...`
  `> LOCATING TARGET...`
  `> ENCRYPTED GIFT FOUND.`
* Di bawah teks tersebut, buat sebuah tombol neon berkedip bertuliskan: `[ DECRYPT MESSAGE ]`.
* Berikan efek CSS *Glitch* (menggunakan keyframes dan clip-path/text-shadow offset) secara acak pada teks tertentu agar terasa seperti sistem bajakan.

## State 2: Main HUD (Heads Up Display)

* Ketika tombol `[ DECRYPT MESSAGE ]` diklik, layar Terminal berkedip/glitch (transisi cepat) lalu masuk ke UI Utama.
* **Photo Container:** Foto ditempatkan di dalam bingkai bergaya tech/HUD bersudut miring (gunakan CSS `clip-path: polygon(...)`). Berikan filter CSS tambahan seperti `contrast` yang agak tinggi atau sedikit `hue-rotate` saat di-hover.
* **Data Box (Pesan):** Pesan ucapan diletakkan di dalam kotak transparan (glassmorphism) dengan border neon terang. Teks ucapan menggunakan font monospace, seolah-olah itu adalah data yang berhasil di-decode.
* **BGM Player:** Pemutar musik harus terlihat seperti widget audio futuristik. Berikan elemen visual (seperti bar equalizer statis atau berkedip) di sebelah tombol Play.

# Technical Constraints

* Gunakan efek CSS "Glitch" murni (tanpa gambar statis/GIF). Buat animasi `@keyframes` yang memanipulasi `text-shadow` merah dan biru yang bergeser.
* Beri komentar yang sangat jelas pada variabel `<img src="...">`, teks pesan, dan link `<audio>`.
* Semua fungsionalitas logika transisi layar dan pemutar lagu harus menggunakan Vanilla JavaScript. Jangan gunakan framework eksternal.
* Berikan seluruh kode HTML, CSS, dan JS secara utuh dan siap pakai!