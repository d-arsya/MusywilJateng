<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'home'])->name('landingpage');
Route::redirect('/home', '/dashboard')->name('home');
Route::middleware('guest')->controller(AuthController::class)->group(function () {
    Route::get('login', 'login')->name('login');
    Route::get('register', 'register')->name('auth.register');
    Route::get('s/{code}', 'enter')->name('auth.enter');
});

Route::controller(UserController::class)->group(function () {
    Route::post('register', 'store')->middleware('guest');
});
Route::middleware('auth')->group(function () {
    Route::get('t/{code}', [AuthController::class, 'logout'])->name('auth.logout');
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('user.dashboard');
    Route::post('/pembayaran', [PaymentController::class, 'pay'])->name('payment.pay');
    Route::post('/pembayaran/{type}/{code}', [PaymentController::class, 'change']);
    Route::inertia('/denah', 'denah');
    Route::inertia('/penginapan', 'penginapan');
    Route::inertia('/profile', 'profile');
    Route::inertia('/card', 'card');
    Route::inertia('/jadwal', 'jadwal');
    Route::inertia('/full', 'full');
    Route::inertia('materi', 'materi');
});

Route::prefix('admin')->group(function () {
    Route::inertia('/', 'admin');
    Route::inertia('/dashboard', 'admin/dashboard');
    Route::get('/penginapan', [BuildingController::class, 'index']);
    Route::get('/penginapan/gedung/{building:name}', [BuildingController::class, 'show']);
    Route::get('/penginapan/kamar/{room:name}', [RoomController::class, 'show']);

    Route::get('/pembiayaan', [PaymentController::class, 'index']);
    Route::get('/peserta', [UserController::class, 'index']);
    Route::get('/peserta/{user:code}', [UserController::class, 'show'])->name('user.show');
    Route::get('/kegiatan', [MeetingController::class, 'index'])->name('admin.kegiatan');
    Route::post('/kegiatan', [MeetingController::class, 'store']);
    Route::inertia('/settings', 'admin/settings');
});
