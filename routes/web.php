<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/unauthenticated', function () {
    return Inertia::render('unauthenticated');
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
