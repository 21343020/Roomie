# Roomie - Aplikasi Pencarian Kos

Roomie adalah platform pencarian kos yang fokus di wilayah Padang, memudahkan pencari kos untuk menemukan tempat tinggal yang sesuai dengan kebutuhan mereka.

## 🚀 Cara Menjalankan Aplikasi

### Prasyarat
- Node.js (versi 14 atau lebih baru)
- MySQL
- Git

### Langkah-langkah Instalasi

1. Clone repository
```bash
git clone [url-repository]
cd mamikos-clone
```

2. Install dependencies untuk frontend
```bash
npm install
```

3. Install dependencies untuk backend
```bash
cd backend
npm install
```

4. Setup database
- Buat database MySQL baru
- Import struktur database dari file `database/migrations.sql`
- Sesuaikan konfigurasi database di `backend/.env`

5. Konfigurasi environment variables
- Copy file `.env.example` ke `.env` di folder backend
- Sesuaikan nilai-nilai berikut:
  ```
  PORT=5000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=
  DB_NAME=mamikos_db
  JWT_SECRET=your-secret-key
  ```

6. Jalankan backend
```bash
cd backend
npm run dev
```

7. Jalankan frontend (di terminal terpisah)
```bash
cd ..
npm run dev
```

8. Buka aplikasi di browser
```
http://localhost:5173
```

## 🎯 Fitur Aplikasi

### 1. Halaman Utama
- Landing page dengan informasi tentang layanan
- Navigasi smooth scroll ke bagian "Tentang Kami"
- Fitur pencarian kos
- Informasi kontak dan social media

### 2. Autentikasi
- Register sebagai pencari kos atau pemilik kos
- Login dengan email/username
- Login khusus admin
- Logout

### 3. Dashboard Pencari Kos
- Melihat daftar kos tersedia
- Filter dan pencarian kos
- Detail informasi kos
- Form aplikasi sewa kos
- Melihat status aplikasi sewa

### 4. Dashboard Pemilik Kos
- Mengelola properti kos
  - Tambah properti baru
  - Edit informasi properti
  - Upload foto properti
  - Hapus properti
- Melihat daftar transaksi
- Mengelola aplikasi sewa masuk

### 5. Dashboard Admin
- Overview statistik platform
- Manajemen pengguna
- Manajemen properti
- Melihat dan mengelola transaksi
- Laporan aktivitas platform

### 6. Fitur Properti
- Detail informasi lengkap
- Galeri foto
- Informasi fasilitas
- Peraturan kos
- Harga dan ketentuan pembayaran
- Form aplikasi sewa

### 7. Fitur Transaksi
- Riwayat transaksi
- Status pembayaran
- Detail transaksi
- Filter dan pencarian transaksi

## 💡 Teknologi yang Digunakan

### Frontend
- React + TypeScript
- Material-UI (MUI)
- React Router
- Vite

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication

## 👥 Role Pengguna

### Admin
- Username: budi
- Password: 12345678
- Akses penuh ke semua fitur manajemen

### Pemilik Kos
- Dapat mendaftarkan properti
- Mengelola properti dan transaksi

### Pencari Kos
- Mencari dan melihat properti
- Mengajukan aplikasi sewa

## 📝 Catatan Tambahan

- Aplikasi ini adalah versi clone/prototype dari Mamikos
- Fokus pada wilayah Padang
- Menggunakan data dummy untuk demo
- Belum termasuk integrasi pembayaran
- Direkomendasikan menggunakan browser modern (Chrome, Firefox, Safari)

## 🤝 Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan:
1. Fork repository
2. Buat branch baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilindungi hak cipta - © 2024 Roomie
