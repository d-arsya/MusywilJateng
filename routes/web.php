<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'landingpage');
Route::inertia('/dashboard', 'dashboard');
Route::inertia('/login', 'auth/login');
Route::inertia('/register', 'auth/register');
Route::inertia('/denah', 'denah');
Route::inertia('/penginapan', 'penginapan');
Route::inertia('/profile', 'profile');
Route::inertia('/card', 'card');
Route::inertia('/jadwal', 'jadwal');
Route::inertia('/full', 'full');

Route::prefix('admin')->group(function () {
    Route::inertia('/', 'admin');
    Route::inertia('/dashboard', 'admin/dashboard');
    Route::inertia('/penginapan', 'admin/penginapan');
    Route::inertia('/gedung/{gedung}', 'admin/gedung');
    Route::inertia('/kamar/{kamar}', 'admin/kamar');
    Route::inertia('/pembiayaan', 'admin/pembiayaan');
    Route::inertia('/kegiatan', 'admin/kegiatan');
    Route::inertia('/peserta', 'admin/peserta');
    Route::inertia('/settings', 'admin/settings');
});
