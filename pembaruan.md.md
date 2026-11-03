# Context

Melanjutkan project portofolio kita sebelumnya, sekarang saya ingin mengubah portofolio ini menjadi lebih komersial dengan menambahkan etalase untuk menjual jasa "Website Kado Digital" (undangan, anniversary, ulang tahun) kepada klien awam (B2C).

Target pasar untuk fitur baru ini adalah anak muda/Gen Z yang mengakses web melalui smartphone. Oleh karena itu, pastikan semua elemen baru yang kamu buat WAJIB Mobile-First, responsif, dan menggunakan desain UI/UX yang menarik, ramah, dan tidak kaku, menyesuaikan dengan styling yang sudah ada.

# Task

Tambahkan 4 elemen/section baru ke dalam halaman utama portofolio saya. Letakkan section baru ini tepat di bawah "Hero Section" atau di atas section "My Projects" yang lama.

## 1. Section "Katalog Kado Digital"

* Buat section dengan judul "Kirim Kado Anti-Mainstream" dan deskripsi singkat "Pilih tema website kado interaktif untuk orang tersayang."
* Gunakan CSS Grid/Flexbox untuk membuat layout Card (1 kolom di mobile, 2/3 kolom di desktop).
* Buat 3 dummy cards dengan spesifikasi berikut:
  * Card 1: Tema "Retro 8-Bit" | Harga Coret: Rp 150.000 | Harga Promo: Rp 89.000
  * Card 2: Tema "Aesthetic Minimalis" | Harga Coret: Rp 150.000 | Harga Promo: Rp 89.000
  * Card 3: Tema "Cyberpunk Y2K" | Harga Coret: Rp 200.000 | Harga Promo: Rp 129.000
* Di setiap card, berikan tempat untuk image thumbnail placeholder.
* Di bagian bawah tiap card, tambahkan 2 tombol berdampingan:
  1. Tombol sekunder: "Lihat Demo" (Link out ke target \_blank)
  2. Tombol primer (warna mencolok/call to action): "Pesan Tema Ini" (Link out ke WhatsApp).

## 2. Section "Cara Pemesanan" (How it Works)

* Buat section dengan judul "Cara Pesan Gampang Banget".
* Buat 3 langkah berjajar (horizontal di desktop, vertikal di mobile) menggunakan ikon SVG sederhana:
  1. Ikon Chat: "1. Pilih Tema & Chat" (Konsultasi via WA).
  2. Ikon Folder/Upload: "2. Kirim Materi" (Kirim foto, video, ucapan via GDrive).
  3. Ikon Roket/Centang: "3. Website Jadi!" (Tunggu 24 jam dan kado siap dikirim).

## 3. Section FAQ (Frequently Asked Questions)

* Buat section judul "Pertanyaan yang Sering Diajukan".
* Gunakan elemen Accordion (bisa dibuka-tutup) untuk 3 pertanyaan ini:
  * Q: Apakah webnya bisa diakses selamanya? | A: Ya, link akan aktif selamanya dengan subdomain khusus.
  * Q: Berapa lama proses pembuatannya? | A: Proses cepat, maksimal 1x24 jam kerja setelah materi lengkap.
  * Q: Apakah bisa pakai lagu background sendiri? | A: Tentu! Cukup sertakan link YouTube/Spotify lagu favorit kalian.

## 4. Floating WhatsApp Button

* Tambahkan tombol melayang (fixed position) di pojok kanan bawah layar (bottom-right).
* Gunakan ikon WhatsApp SVG berwarna hijau (#25D366).
* Tambahkan efek hover yang menarik (misalnya membesar sedikit atau ada tooltip "Pesan Sekarang").
* Set href link ke: `https://wa.me/628XXXXXXX?text=Halo%20bro,%20saya%20mau%20tanya%20soal%20jasa%20website%20kado` (Saya akan ganti nomornya nanti).

# Constraints

* Jangan menghapus section portofolio lamaku, cukup tambahkan section yang baru saja ke dalam layout utama.
* Pastikan jarak (padding/margin) antar section konsisten dengan desain portofolio yang sudah ada.
* Berikan kodenya dan tunjukkan di mana saya harus menyisipkan kodenya.