# Web Pengajuan Cuti

## Fitur

- Menampilkan daftar data izin
- Menambahkan data izin baru
- Mengubah data izin
- Menghapus data izin
- Validasi tanggal izin minimal 3 hari kerja dari hari ini
- Validasi tanggal izin tidak menghitung Sabtu dan Minggu

## Tech Stack

### Backend
- ASP.NET Core .NET 8
- C#
- JSON file storage
- Swagger

### Frontend
- React
- Vite
- JavaScript
- CSS
- Lucide React icons

## Setup

### Frontend (React)
- cd frontend
- npm install
- npm run dev

### Backend (.NET)
- cd backend
- dotnet run

## Endpoint

- GET    /api/Izin
- GET    /api/Izin/{id}
- GET    /api/Izin/minimum-tanggal
- POST   /api/Izin
- PUT    /api/Izin/{id}
- DELETE /api/Izin/{id}
