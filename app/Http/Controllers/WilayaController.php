<?php

namespace App\Http\Controllers;

use App\Wilaya;
use Illuminate\Http\Request;

class WilayaController extends Controller
{
    public function index()
    {
        return response(Wilaya::all()->toJson());
    }
}
