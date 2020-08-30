<?php

namespace App\Http\Traits;

use App\Product;
use Illuminate\Support\Facades\Storage;

trait ImageManager
{
    public function updateImage($request, $id)
    {
        $product = Product::where('id', $id)->first();
        $imageNames = $product->imageurls;
        for ($i = 0; $i < $request->imgNum; $i++) {
            $picture = $request->file($i);
            $imageNames = $imageNames . $picture->store('product_pictures', 'public') . ',';
        }
        $product->imageurls = $imageNames;
        $product->save();

        return $product->imageurls;
    }

    public function deleteImage($request, $id)
    {
        $product = Product::where('id', $id)->first();
        $imageNames = '';
        Storage::delete('public/' . $request->deletedImage);
        for ($i = 0; $i < count($request->images); $i++) {
            $picture = $request->images[$i];
            $imageNames = $imageNames . $picture . ',';
        }
        $product->imageurls = $imageNames;
        $product->save();
        return response()->json(['success' => true], 200);
    }
}
