<?php

namespace App\Http\Traits;

use App\Category;
use App\Price;
use App\Product;

trait Importer
{
    public function importProducts($collection, $fields)
    {
        foreach ($collection as $key => $row) {
            if ($key < 1) continue;
            if ($row[(int) $fields['stock']] > 0) {
                $product = Product::where('name', $row[(int) $fields['name']])->first();
                $category = Category::where('name', $row[(int) $fields['category']])->first();
                if ($category == []) {
                    $category = Category::create([
                        'name' => $row[(int) $fields['category']]
                    ]);
                }

                if ($product == []) {
                    $product = new Product();
                    $product->name = $row[(int) $fields['name']];
                    $product->category_id = $category->id;
                    $product->stock = $row[(int) $fields['stock']];
                    $product->price_id = 0;


                    $product->brand = $fields['brand'] != null ? $row[(int) $fields['brand']] : '';
                    $product->manufacturer = $fields['manufacturer'] != null ? $row[(int) $fields['manufacturer']] : '';
                    $product->weight = $fields['weight'] != null ? $row[(int) $fields['weight']] : '';
                    $product->imageurls = '';

                    $product->save();
                    $prices = Price::create([
                        'product_id' => $product->id,
                        'prix_achat' => $row[(int) $fields['prix_achat']],
                        'prix_vente' => $row[(int) $fields['prix_vente']]
                    ]);

                    $product->price_id = $prices->id;
                    $product->save();
                    $prices->save();
                }
            }
        }

        return response()->json('ok');
    }
}
