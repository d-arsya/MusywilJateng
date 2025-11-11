<?php

namespace App\Http\Controllers;

use App\Auth\AdminUser;
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
        if ($code == env('ADMIN_CODE')) {
            // return 'Halo';
            $admin = new AdminUser();
            Auth::guard('admin')->login($admin);
            // dd(Auth::guard('admin')->check());
            return redirect()->route('admin.dashboard');
        }
        $user = User::whereCode($code)->first();
        if ($user) {
            Auth::login($user);
            return redirect()->route('user.dashboard');
        }
        return redirect()->route('login');
    }

    public function logout(string $code)
    {
        if ($code === env('ADMIN_CODE')) {
            Auth::guard('admin')->logout();
            return redirect()->route('landingpage');
        }
        $user = User::whereCode($code)->first();
        if ($user) {
            Auth::logout($user);
            return redirect()->route('landingpage');
        }
        return redirect()->route('login');
    }
}
