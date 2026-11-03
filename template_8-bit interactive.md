# Context & Role
Kamu adalah Expert Frontend Developer yang spesialis dalam membuat website interaktif, animasi CSS, dan UI/UX bertema Retro/Pixel Art. 
Tugasmu adalah membuatkan source code lengkap (HTML, CSS, dan Vanilla JavaScript dalam satu file jika memungkinkan, atau terpisah) untuk sebuah "Template Website Kado Digital Interaktif".

# Core Aesthetic & Vibe
- **Tema:** Classic 8-Bit / Retro Arcade Game.
- **Warna:** Background gelap (hitam atau dark navy) dengan aksen warna neon retro (hijau stabilo, pink magenta, atau cyan).
- **Typography:** Gunakan font bergaya pixel dari Google Fonts (misalnya 'Press Start 2P' atau 'VT323').
- **Styling:** Gunakan `image-rendering: pixelated` untuk gambar, dan buat border tebal berbentuk blok-blok (menggunakan trik `box-shadow` berlapis) untuk elemen UI agar terlihat seperti game 8-bit sungguhan.
- **Responsivitas:** Wajib Mobile-First. 90% pengguna akan membuka ini dari layar smartphone.

# Interactive Flow (Logika Website)
Website ini harus terasa seperti game kecil yang memiliki 2 State (Layar) utama yang diatur menggunakan JavaScript:

## State 1: The Hook (Layar Awal - Menunggu Interaksi)
- Halaman ini hanya menampilkan background gelap dan sebuah Kotak Kado bergaya pixel di tengah layar (bisa menggunakan emoji 🎁 yang dibesarkan, atau pixel art murni dari CSS/SVG).
- **Animasi:** Kotak kado harus memiliki animasi CSS `shake` (bergetar) ketika di-hover atau diklik, untuk memancing rasa penasaran.
- **Teks:** Di bawah kotak kado, berikan teks berkedip (blinking effect) ala game arcade: "PRESS START" atau "TAP TO OPEN".

## State 2: The Reveal (Layar Utama - Isi Kado)
- Ketika user mengklik kotak kado di State 1, layar State 1 akan menghilang (tambahkan efek transisi seperti pudar, meledak menjadi pixel, atau slide out) dan State 2 muncul.
- **Photo Frame:** Sebuah bingkai foto dengan border pixel tebal. Berikan tag `<img>` dengan placeholder, agar nanti saya mudah mengganti link fotonya.
- **Dialogue Box (Pesan):** Di bawah foto, buat sebuah kotak dialog yang menyerupai UI percakapan di game RPG jadul (background hitam, border putih tebal).
- **Typewriter Effect (PENTING):** Teks pesan di dalam dialogue box tidak boleh langsung muncul semua. Gunakan JavaScript untuk membuat efek mengetik (muncul satu per satu hurufnya). Sediakan variabel di dalam JS agar saya mudah mengganti teks panjangnya.
- **BGM Button:** Tombol bergaya pixel (chunky button) bertuliskan "🎵 Play BGM". Sertakan tag `<audio>` agar saya bisa memasukkan link lagu MP3 nantinya. Tombol ini untuk me-play/pause lagu.

# Technical Constraints
- Tuliskan kode yang bersih dan terkomentari dengan baik, khususnya di bagian variabel yang nanti perlu saya ubah secara manual (seperti link foto, isi teks ucapan, dan link lagu).
- Tidak perlu menggunakan framework berat seperti React. Cukup gunakan HTML statis, CSS3 murni, dan Vanilla JavaScript agar ringan dan mudah saya host di Vercel.
- Berikan kodenya secara utuh siap pakai!