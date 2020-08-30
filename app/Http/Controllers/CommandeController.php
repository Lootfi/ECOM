<?php

namespace App\Http\Controllers;

use App\Commande;
use App\CommandeProduct;
use App\Livraison;
use App\PaimentMethod;
use App\Product;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{

    public function getRequested()
    {
        return Livraison::where('status', 'waiting')->with(['commande.client', 'commande.products.product'])->get();
    }

    public function getShipping()
    {
        return Livraison::where('status', 'shipping')->with('commande.client')->get();
    }

    public function clientCommandes($userId)
    {
        $user = User::where('id', $userId)->with('commandes')->first();
        return response()->json($user->commandes);
    }


    public function getCount()
    {
        $cmds = [];
        $cmds['waiting'] = Livraison::where('status', 'waiting')->get()->count();
        $cmds['shipping'] = Livraison::where('status', 'shipping')->get()->count();

        return $cmds;
    }


    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $total = 0;
            $cart = $request->cart;
            $adress = $request->adress;
            $paymentMethod = $request->paymentMethod;
            $cmd = Commande::create([
                'client_id' => $request->user()->id,
                'total' => 0,
            ]);
            for ($i = 0; $i < sizeof($cart); $i++) {
                $product = Product::where('id', $cart[$i]['id'])->with('prices')->first();
                $total = $total + $product->prices->prix_vente * $cart[$i]['quantity'];
                $product->stock = $product->stock - $cart[$i]['quantity'];
                $product->updated_at = now();
                $product->save();
                CommandeProduct::create([
                    'product_id' => $cart[$i]['id'],
                    'commande_id' => $cmd->id,
                    'quantity' => $cart[$i]['quantity'],
                ]);
            }

            $livr = Livraison::create([
                'status' => 'waiting',
                'commande_id' => $cmd->id,
                'adr_id' => $adress, //to dynam
                'date_livraison' => now()
            ]);

            $payMethod = PaimentMethod::create([
                'method' => $paymentMethod, //to dynam
                'commande_id' => $cmd->id
            ]);

            $cmd->total = $total;
            $cmd->livraison_id = $livr->id;
            $cmd->paiment_method_id = $payMethod->id;
            $cmd->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }

        return response()->json($cmd->id);
    }
}
