# Musyawarah Wilayah Hidayatullah VI - Management System

[![Laravel 12](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TailwindCSS 4](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)

A comprehensive event management platform built for the **Musyawarah Wilayah (Muswil) Hidayatullah VI**. This system facilitates participant registration, accommodation management, attendance tracking via QR codes, and real-time monitoring for event organizers.

## 🚀 Overview

The Muswil Hidayatullah VI platform is a modern full-stack application designed to handle high-concurrency registration and logistics for large-scale organizational events. It ensures a seamless experience for both participants and administrators across different operational regions.

## ✨ Key Features

- **QR-Based Attendance**: Instant check-in/check-out system using integrated QR code scanning for sessions and meetings.
- **Accommodation Management**: Automated lodging assignment system (Gedung & Kamar) with capacity tracking and unassigned participant management.
- **Dynamic ID Cards**: Auto-generated digital ID cards for participants with embedded individual QR codes.
- **Payment & Fee Tracking**: Integrated module for monitoring registration fees and financial status.
- **Admin Dashboard**: Real-time analytics on registration, attendance stats, and logistics status across multiple regions.
- **Schedule & Materials**: Centralized hub for event agendas, floor plans (denah), and downloadable event materials.
- **Data Portability**: Built-in Excel export functionality for participants and session attendance data.

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/arsyadkamaluddin/muswil-kaltara.git
   cd muswil-kaltara
   ```

2. **Run via Docker (Recommended)**
   ```bash
   docker-compose up -d
   ```

3. **Manual Setup**
   ```bash
   # Install PHP dependencies
   composer install

   # Install JS dependencies
   npm install

   # Setup Environment
   cp .env.example .env
   php artisan key:generate

   # Database Migration
   php artisan migrate --seed

   # Run Development
   npm run dev
   # In another terminal
   php artisan serve
   ```

## 👨‍💻 Maintainer

**Kamaluddin Arsyad Fadllillah**
*Freelance Fullstack Web Developer*

- 📧 [arsyadkamaluddin@gmail.com](mailto:arsyadkamaluddin@gmail.com)
- 🔗 [LinkedIn](https://linkedin.com/in/arsyadkamaluddin)
- 🌐 [Portfolio](https://disyfa.space)
- 📞 [+62 896-3605-5420](https://wa.me/6289636055420)

---

Developed for Hidayatullah Regional Event Management.
