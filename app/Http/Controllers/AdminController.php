<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{

    /**
     * Tests if the user is an admin, under auth,admin middleware
     * 
     * @return true or false
     */
    public function test()
    {
        return response()->json(true);
    }
}
