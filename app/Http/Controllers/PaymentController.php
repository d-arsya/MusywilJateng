<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = User::with(['employment', 'office'])->get();
        return inertia('admin/pembiayaan', compact('payments'));
    }

    public function pay(Request $request)
    {
        $request->validate([
            'invoice' => 'required|file|mimes:jpg,jpeg,png,pdf|max:4096',
        ]);
        $path = $request->file('invoice')->store('invoice', 'public');
        $link = Storage::url($path);
        $url = asset($link);
        Auth::user()->update(['invoice' => $url]);

        return redirect()->route('user.dashboard')
            ->with('success', 'Invoice uploaded successfully.');
    }

    public function change(string $type, string $code)
    {
        $user = User::whereCode($code)->first();
        $user->update(['paid' => $type == 'check']);
        return response()->json(['success' => true]);
    }
}
