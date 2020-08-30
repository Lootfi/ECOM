<?php

namespace App\Http\Controllers;

use App\Commune;
use Illuminate\Http\Request;

class CommuneController extends Controller
{
    public function index()
    {
        return response(Commune::all()->toJson());
    }
}
