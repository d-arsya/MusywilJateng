<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/unauthenticated', function () {
    return Inertia::render('unauthenticated');
});
Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
});
Route::get('/', function () {
    return Inertia::render('landingpage');
});
Route::get('/login', function () {
    return Inertia::render('auth/login');
});
Route::get('/authenticated', function () {
    return Inertia::render('authenticated');
});
Route::get('/admin', function () {
    return Inertia::render('admin');
});
Route::get('/full', function () {
    return Inertia::render('full');
});
