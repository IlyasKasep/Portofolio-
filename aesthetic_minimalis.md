# Context & Role

Kamu adalah Expert Frontend Developer dan UI/UX Designer yang spesialis dalam menciptakan pengalaman web yang elegan, minimalis, dan modern. 
Tugasmu adalah membuatkan source code lengkap (HTML, CSS, dan Vanilla JavaScript) untuk sebuah "Template Website Kado Digital - Tema Aesthetic Minimalis".

# Core Aesthetic & Vibe

* **Tema:** Minimalis, Elegan, Romantis, dan Clean. Sangat cocok untuk kado anniversary premium.
* **Palet Warna:** Warna-warna lembut dan hangat. Gunakan *background* krem pucat (off-white/beige) atau pastel, dengan teks berwarna abu-abu gelap (charcoal) atau cokelat tua agar tidak kontras menyakitkan mata.
* **Typography:** Kombinasi yang elegan. Gunakan font Serif klasik untuk judul (misalnya 'Playfair Display' atau 'Lora' dari Google Fonts) dan font Sans-Serif yang bersih untuk teks paragraf (misalnya 'Lato' atau 'Montserrat').
* **Responsivitas:** Wajib Mobile-First. Layout harus terlihat cantik dan proporsional di layar vertikal smartphone.

# Interactive Flow & Structure (Storytelling)

Website ini berkonsep "Scrolling Story". Alih-alih mengklik tombol, user akan men-scroll ke bawah dan elemen-elemen akan muncul secara elegan.

## 1. Hero Section (Layar Pertama)
* Tampilan sangat bersih. Hanya berisi teks ucapan pembuka (misal: "Happy Anniversary, Sayang") yang muncul perlahan dengan efek `fade-in`.
* Tambahkan ikon panah ke bawah (chevron down) yang bergerak memantul halus (bouncing animation) untuk mengisyaratkan user agar men-scroll ke bawah.
* Letakkan tombol pemutar musik (Play/Pause BGM) berupa ikon minimalis di pojok kanan atas yang berposisi `fixed`.

## 2. Scroll Animation (PENTING)
* Gunakan Vanilla JavaScript (Intersection Observer API) untuk mendeteksi elemen mana yang masuk ke dalam layar (viewport).
* Setiap elemen (foto atau teks) di section selanjutnya harus memiliki *state* awal `opacity: 0` dan bergeser ke bawah sedikit (`translateY`). Ketika di-scroll masuk ke layar, elemen tersebut akan bertransisi halus menjadi `opacity: 1` dan bergeser ke posisi aslinya (`slide-up`).

## 3. Gallery & Message Sections
* **Polaroid Style:** Buat container foto yang menyerupai foto polaroid (background putih, padding lebih besar di bagian bawah, dan sedikit `box-shadow` lembut). Berikan efek rotasi acak yang sangat tipis (misal `transform: rotate(2deg)`) agar terlihat organik dan estetik.
* **Pesan Romantis:** Selang-seling antara foto polaroid dan blok teks paragraf pendek yang berisi pesan atau cerita perjalanan cinta mereka.

# Technical Constraints

* Susun struktur kodenya sebersih mungkin. Beri komentar pada bagian-bagian yang harus saya edit manual nanti (seperti `<img src="...">`, teks ucapan, dan link `<audio>`).
* Gunakan CSS murni untuk semua animasi (keyframes dan transitions). JavaScript hanya digunakan untuk Intersection Observer (trigger scroll) dan logika tombol Play/Pause Audio.
* Jangan gunakan framework CSS (seperti Bootstrap/Tailwind) atau library JS (seperti jQuery/GSAP). Gunakan Vanilla HTML/CSS/JS agar file tetap ringan dan mudah saya jadikan template statis.

Berikan kodenya secara utuh dan siap pakai!