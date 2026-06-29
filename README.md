# Web Pengajuan Cuti
Leave Application Form is a web-based leave management application developed using React.js and Tailwind CSS for the frontend, C# and .NET 8 for the backend, with JSON used for data storage. The application enables users to submit leave requests and track their leave history, including the total number of leave applications they have submitted.

## Mock Up
<img src="https://github.com/user-attachments/assets/fbad94e1-f44f-491e-a05d-1378400ca483" width="600" />

## Main Page
<img src="https://github.com/user-attachments/assets/3d91def6-3094-4e4c-9973-ce48cfb59513" width="600" />

## Read
<img src="https://github.com/user-attachments/assets/7018089f-60bd-49cc-992c-6ac21c52920c" width="600" />

## Create
<img src="https://github.com/user-attachments/assets/03ed322c-4378-4e89-b726-983d8abd4b8f" width="600" />

## Update
<img src="https://github.com/user-attachments/assets/d7f52594-f653-40fa-a98d-0a64ac8b73b8" width="600" />

## Delete
<img src="https://github.com/user-attachments/assets/d4066f3f-ad90-4327-867a-be6386eff718" width="600" />

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
