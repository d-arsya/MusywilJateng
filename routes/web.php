<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
});
Route::get('/', function () {
    return Inertia::render('landingpage');
});
Route::get('/login', function () {
    return Inertia::render('auth/login');
});
Route::get('/denah', function () {
    return Inertia::render('denah');
});
Route::get('/penginapan', function () {
    return Inertia::render('penginapan');
});
Route::get('/profile', function () {
    return Inertia::render('profile');
});
Route::get('/card', function () {
    return Inertia::render('card');
});
Route::get('/jadwal', function () {
    return Inertia::render('jadwal');
});
Route::get('/admin', function () {
    return Inertia::render('admin');
});
Route::get('/register', function () {
    return Inertia::render('auth/register');
});
Route::get('/admin', function () {
    return Inertia::render('admin');
});
Route::get('/full', function () {
    return Inertia::render('full');
});
