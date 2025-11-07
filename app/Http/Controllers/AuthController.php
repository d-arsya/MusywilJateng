<?php

namespace App\Http\Controllers;

use App\Models\Employment;
use App\Models\Office;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login()
    {
        return inertia('auth/login');
    }
    public function register()
    {
        $offices = Office::all()->groupBy('type');
        $employments = Employment::all()->toArray();
        return inertia('auth/register', compact('offices', 'employments'));
    }
}
