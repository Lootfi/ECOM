<?php

namespace App\Http\Controllers;

use App\Address;
use App\Client;
use App\Http\Traits\ClientBlocker;
use App\User;
use Illuminate\Http\Request;

class ClientController extends Controller
{

    use ClientBlocker;

    public function index()
    {
        return Client::with('info')->get();
    }

    public function getUserAdrs()
    {
        return Address::where('user_id', auth()->user()->id)->get();
    }

    public function block($clientId)
    {
        return $this->blockClient($clientId);
    }

    public function addAddress(Request $request, $clientId)
    {
        Address::create([
            'user_id' => $request->user()->id,
            'wilaya' => $request->wilaya,
            'commune' => $request->commune,
            'address_line' => $request->address_line
        ]);
        $addresses = Address::where('user_id', $request->user()->id)->get();
        return response()->json(['addresses' => $addresses]);
    }
}
