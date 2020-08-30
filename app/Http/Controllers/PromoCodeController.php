<?php

namespace App\Http\Controllers;

use App\PromoCode;
use Illuminate\Http\Request;

class PromoCodeController extends Controller
{
    public function destroy($promoId)
    {
        PromoCode::where('id', $promoId)->first()->delete();

        return response()->json('success', 200);
    }

    public function store()
    {
        $code = PromoCode::create([
            'code' => request('code'),
            'product_id' => request('productId')
        ]);

        return response()->json($code);
    }
}
