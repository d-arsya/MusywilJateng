<?php

namespace App\Http\Controllers;

use App\Models\Employment;
use App\Models\Office;
use Illuminate\Http\Request;

class OfficeController extends Controller
{
    public function index()
    {
        $offices = Office::all()->groupBy('type');


        return response()->json([
            'success' => true,
            'data' => $offices,
            'code' => 200,
        ]);
    }
}
