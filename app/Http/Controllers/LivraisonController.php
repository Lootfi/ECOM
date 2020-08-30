<?php

namespace App\Http\Controllers;

use App\Http\Traits\Shipper;
use App\Livraison;
use Illuminate\Http\Request;

class LivraisonController extends Controller
{

    use Shipper;

    public function shipOne(Request $request)
    {
        return $this->ship($request->id);
    }

    public function confirmDelivery(Request $request)
    {
        $livr = Livraison::where('id', $request->id)->first();
        $livr->status = 'delivered';
        $livr->save();

        return response()->json('ok');
    }
}
