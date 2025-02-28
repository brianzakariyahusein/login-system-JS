# Sistem Login dengan Node.js, Express, dan MongoDB

Sistem login ini dibuat menggunakan **Node.js**, **Express**, dan **MongoDB**, serta mendukung fitur seperti registrasi, login, logout, proteksi route, reset password dengan email, dan token autentikasi JWT.

## 📌 Fitur

✅ Registrasi pengguna  
✅ Login pengguna dengan autentikasi JWT  
✅ Logout pengguna  
✅ Middleware untuk proteksi route  
✅ Reset password via email  
✅ Token autentikasi dengan JWT  
✅ Penyimpanan token reset password di database  
✅ Enkripsi password dengan bcrypt  

## 🚀 Instalasi & Konfigurasi

### 1. Buat Folder Proyek
```sh
mkdir login-system-JS
cd login-system-JS
```

### 2. Inisialisasi Proyek Node.js
```sh
npm init -y
```

### 3. Install Dependencies
```sh
npm install express mongoose dotenv bcrypt jsonwebtoken cors morgan nodemailer
```

### 4. Install Dependencies untuk Development
```sh
npm install --save-dev nodemon
```

### 5. Buat Struktur Folder
```sh
mkdir backend
cd backend
mkdir controllers middlewares models routes utils
touch server.js .env
cd ..
mkdir frontend  # (akan dikembangkan nanti)
```

### 6. Konfigurasi Environment Variables
Buka file `.env` dan tambahkan konfigurasi berikut:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/login-system
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

Pastikan mengganti `your_jwt_secret`, `your_email@gmail.com`, dan `your_email_password` dengan kredensial yang benar.

### 7. Menjalankan Server
```sh
npm start
```
atau jika menggunakan **nodemon**
```sh
npm run dev
```

Server akan berjalan di `http://localhost:5000`

## 📌 API Endpoints

### 1️⃣ **Registrasi Pengguna**
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "token": "your_jwt_token"
}
```

### 2️⃣ **Login Pengguna**
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "token": "your_jwt_token"
}
```

### 3️⃣ **Logout Pengguna**
**Endpoint:** `POST /api/auth/logout`

**Response:**
```json
{
  "message": "Logout berhasil"
}
```

### 4️⃣ **Proteksi Route (Dashboard)**
**Endpoint:** `GET /api/auth/dashboard`

Tambahkan header **Authorization**:
```
Authorization: Bearer your_jwt_token
```

**Response:**
```json
{
  "message": "Halo, John Doe! Selamat datang di dashboard"
}
```

### 5️⃣ **Lupa Password**
**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "johndoe@example.com"
}
```

**Response:**
```json
{
  "message": "Email reset password telah dikirim"
}
```

### 6️⃣ **Reset Password**
**Endpoint:** `POST /api/auth/reset-password/:token`

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password berhasil direset"
}
```

## 🛠 Teknologi yang Digunakan
- **Node.js** - Backend runtime
- **Express.js** - Framework untuk Node.js
- **MongoDB + Mongoose** - Database
- **bcrypt** - Hashing password
- **jsonwebtoken (JWT)** - Autentikasi
- **Nodemailer** - Kirim email reset password
- **dotenv** - Konfigurasi environment variables
- **cors, morgan** - Middleware tambahan

## 📌 Struktur Folder
```
login-system-JS/
│── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
└── frontend/ (akan dikembangkan nanti)
```

## 📜 Lisensi
Proyek ini menggunakan lisensi **MIT**.

---

Jika ada pertanyaan atau kendala, silakan buka **Issue** di GitHub! 🚀