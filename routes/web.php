<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return [
        'admin_logged_in' => Auth::guard('admin')->check(),
        'web_logged_in' => Auth::guard('web')->check(),
        'admin_user' => Auth::guard('admin')->user(),
    ];
});
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
Route::get('t/{code}', [AuthController::class, 'logout'])->name('auth.logout');
Route::post('/pembayaran/{type}/{code}', [PaymentController::class, 'change'])->middleware('auth:admin');
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard'])->name('user.dashboard');
    Route::post('/pembayaran', [PaymentController::class, 'pay'])->name('payment.pay');
    Route::inertia('/denah', 'denah');
    Route::get('/penginapan', [RoomController::class, 'user']);
    Route::get('/profile', [UserController::class, 'profile'])->name('user.profile');
    Route::post('/profile', [UserController::class, 'editProfile']);
    Route::inertia('/card', 'card');
    Route::get('/jadwal', [MeetingController::class, 'userView']);
    Route::inertia('/full', 'full');
    Route::inertia('materi', 'materi');
});

Route::prefix('admin')->middleware('auth:admin')->group(function () {
    Route::redirect('/', 'dashboard');
    Route::get('/dashboard', [UserController::class, 'adminDashboard'])->name('admin.dashboard');
    Route::get('/penginapan', [BuildingController::class, 'index'])->name('admin.penginapan');
    Route::post('/penginapan', [BuildingController::class, 'store']);
    Route::get('/penginapan/gedung/{building:name}', [BuildingController::class, 'show'])->name('admin.gedung');
    Route::post('/penginapan/gedung/{building:name}/kamar', [RoomController::class, 'store']);
    Route::put('/penginapan/gedung/{building:name}/kamar/{room}', [RoomController::class, 'update']);
    Route::delete('/penginapan/gedung/{building:name}/kamar/{room}', [RoomController::class, 'destroy']);
    Route::get('/penginapan/gedung/{building:name}/kamar/{room}', [RoomController::class, 'show']);
    Route::get('/penginapan/unassigned', [RoomController::class, 'unassigned']);
    Route::put('/penginapan/unassigned/{code}', [RoomController::class, 'unassignedUser']);
    Route::put('/penginapan/assign', [RoomController::class, 'assign']);
    Route::put('/penginapan/{building}', [BuildingController::class, 'update']);
    Route::delete('/penginapan/{building}', [BuildingController::class, 'destroy']);

    Route::get('/pembiayaan', [PaymentController::class, 'index']);
    Route::get('/peserta', [UserController::class, 'index'])->name('admin.peserta');
    Route::get('/peserta/{user:code}', [UserController::class, 'show'])->name('user.show');
    Route::post('/peserta/{user:code}', [UserController::class, 'editUser'])->name('user.update');
    Route::get('/kegiatan', [MeetingController::class, 'index'])->name('admin.kegiatan');
    Route::post('/kegiatan', [MeetingController::class, 'store']);
    Route::delete('/kegiatan/{meeting:code}', [MeetingController::class, 'destroy']);
    Route::inertia('/settings', 'admin/settings');
    Route::inertia('/kegiatan/create', 'admin/kegiatan/create');
    Route::get('/kegiatan/assign/{meeting:code}', [MeetingController::class, 'assign']);
    Route::put('/kegiatan/assign/{meeting:code}', [MeetingController::class, 'assignUsers']);
    Route::put('/kegiatan/unassign/{meeting:code}', [MeetingController::class, 'unassignUsers']);
    Route::get('/kegiatan/scan/{meeting:code}', [MeetingController::class, 'scan']);
    Route::post('/kegiatan/scan/{meeting_code}/{user_code}', [MeetingController::class, 'attend']);
    Route::get('/kegiatan/stats/{meeting:code}', [MeetingController::class, 'stats']);
    Route::get('/kegiatan/{meeting:code}/edit', [MeetingController::class, 'edit']);
    Route::put('/kegiatan/{meeting:code}', [MeetingController::class, 'update']);
});
