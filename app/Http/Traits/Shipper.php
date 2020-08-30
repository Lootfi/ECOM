<?php

namespace App\Http\Traits;

use App\Commande;
use App\Livraison;
use Exception;
use Illuminate\Support\Facades\DB;

trait Shipper
{
    public function ship($id)
    {
        try {
            DB::beginTransaction();

            $livr = Livraison::where('id', $id)->first();
            $CMDproducts = Commande::where('livraison_id', $id)->with('products')->first()->products;

            foreach ($CMDproducts as  $CMDproduct) {
                $product = $CMDproduct->product;
                $newStock = $product->stock - $CMDproduct->quantity;
                if ($newStock >= 0) {
                    $product->stock = $newStock;
                    $product->save();
                } else {
                    DB::rollback();
                    return response()->json('stock overload');
                }
            }

            $livr->status = 'shipping';
            $livr->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }


        return response()->json('ok');
    }
}
