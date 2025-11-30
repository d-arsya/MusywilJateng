<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\Office;
use App\Models\User;
use Illuminate\Http\Request;


class LandingPageController extends Controller
{
    public function home()
    {
        $users = User::count();
        $offices = Office::whereType('DPD')->count();
        $meetings = Meeting::count();
        return inertia('landingpage', [
            'from' => request('from') ?? 'all',
            'users' => $users,
            'offices' => $offices,
            'meetings' => $meetings,
        ]);
    }
}
