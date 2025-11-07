<?php

namespace App\Http\Controllers;

use App\Models\Employment;
use App\Models\Office;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function enter(string $code)
    {
        $user = User::whereCode($code)->first();
        if ($user) {
            Auth::login($user);
            return redirect()->route('user.dashboard');
        }
        return redirect()->route('auth.login');
    }
}
