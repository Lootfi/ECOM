<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::withCount('products')->orderBy('created_at', 'desc')->get()->toJson();
    }

    public function fetchCategory($category)
    {
        return Product::where('category_id', $category)
            ->select(['id', 'name', 'imageurls', 'price_id', 'category_id'])
            ->with(['category', 'prices'])
            ->paginate(8);
    }

    public function edit(Request $request)
    {
        $category = Category::where('id', $request->id)->first();

        $validation = Validator::make($request->all(), [
            'name' => ['alpha', 'required', Rule::unique('categories')->ignore($category->id)],
            'id' => ['exists:categories']
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()]);
        } else {
            $category->name = $request->name;
            $category->save();
            return response()->json('ok');
        }
    }

    public function create(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => ['alpha', 'required', Rule::unique('categories')]
        ]);

        if ($validation->fails())
            return response()->json(['errors' => $validation->errors()]);
        else {
            $category = Category::create([
                'name' => $request->name
            ]);
            return response()->json($category->withCount('products')->orderBy('created_at', 'desc')->first());
        }
    }

    public function delete(Request $request)
    {
        $category = Category::where('id', $request->id)->with('products.prices')->first();
        try {
            DB::beginTransaction();

            foreach ($category->products as $product) {
                $product->prices->delete();
                $product->delete();
            }
            $category->delete();

            DB::commit();
            return response()->json('ok');
        } catch (Exception $e) {
            DB::rollback();
            return response()->json($e);
            throw $e;
        }
    }
}
