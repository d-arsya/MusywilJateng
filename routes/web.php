<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'home']);
Route::controller(AuthController::class)->group(function () {
    Route::get('login', 'login')->name('auth.login');
    Route::get('register', 'register')->name('auth.register');
});
Route::controller(UserController::class)->group(function () {
    Route::post('register', 'store');
});
Route::inertia('/dashboard', 'dashboard')->name('user.dashboard');
Route::inertia('/denah', 'denah');
Route::inertia('/penginapan', 'penginapan');
Route::inertia('/profile', 'profile');
Route::inertia('/card', 'card');
Route::inertia('/jadwal', 'jadwal');
Route::inertia('/full', 'full');

Route::inertia('materi', 'materi');
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
