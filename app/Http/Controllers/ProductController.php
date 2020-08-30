<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Traits\ImageManager;
use App\Http\Traits\Importer;
use App\Price;
use App\Product;
use App\PromoCode;
use Cyberduck\LaravelExcel\Importer\Excel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    use Importer, ImageManager;

    protected $excel;

    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }


    public function all()
    {
        return Product::select(['id', 'name', 'stock', 'imageurls', 'category_id'])->with('category')->get();
    }

    public function import(Request $request)
    {
        $filepath = $request->file('file')->getRealPath();
        $excel = $this->excel->load($filepath);
        $collection = $excel->getCollection();
        $fieldNumbers = $request->except(['file']);
        return $this->importProducts($collection, $fieldNumbers);
    }


    public function index()
    {
        return Product::select(['id', 'name', 'imageurls', 'price_id', 'category_id', 'stock'])->with('prices')->paginate(8);
    }

    public function getCartProductsInfo(Request $request)
    {
        $products = array();
        foreach ($request->all() as $key => $value) {
            array_push($products, Product::where('id', $value['id'])->first());
        }
        return $products;
    }

    public function show($productId)
    {
        $product = Product::where('id', $productId)->with(['category', 'prices', 'promo_codes'])->first();

        return $product;
    }

    public function similar($productId)
    {
        $product = Product::where('id', $productId)->first();
        $products = Product::where(['category_id' => $product->category_id, ['id', '<>', $productId]])->with(['category', 'prices', 'promo_codes'])->limit(4)->get();

        return $products;
    }

    public function store(Request $request)
    {
        $imageNames = '';
        for ($i = 0; $i < $request->imgNum; $i++) {
            $picture = $request->file($i);
            $imageNames = $imageNames . $picture->store('product_pictures', 'public') . ',';
        }

        $product = new Product();
        $product->name = $request->name;
        $product->brand = $request->brand;
        $product->manufacturer = $request->manufacturer;
        $product->weight = $request->weight;
        $product->category_id = $request->category_id;
        $product->stock = $request->stock;
        $product->imageurls = $imageNames;
        $product->price_id = 0;
        $product->save();

        $prices = Price::create([
            'product_id' => $product->id,
            'prix_achat' => $request->prix_achat,
            'prix_vente' => $request->prix_vente
        ]);

        $product->price_id = $prices->id;
        $product->save();
    }



    public function update(Request $request, $id)
    {
        $product = Product::where('id', $id)->first();

        $prices = Price::where('product_id', $id)->first();
        $prices->prix_achat = $request->prix_achat;
        $prices->prix_vente = $request->prix_vente;
        $prices->save();


        $product->name = $request->name;
        $product->brand = $request->brand;
        $product->manufacturer = $request->manufacturer;
        $product->weight = $request->weight;
        $product->category_id = $request->category_id;
        $product->stock = $request->stock;
        $product->price_id = $prices->id;
        $product->save();

        return response()->json(['success' => true], 200);
    }

    public function updateImages(Request $request, $id)
    {
        return $this->updateImage($request, $id);
    }

    public function deleteImages(Request $request, $id)
    {
        return $this->deleteImage($request, $id);
    }


    public function destroy($id)
    {
        Product::where('id', $id)->first()->delete();
    }


    public function getSearchResults(Request $request)
    {
        $search =  $request->search;

        $products = '';

        if (trim($request->search)) {
            $products = Product::select(['id', 'category_id', 'name', 'imageurls'])
                ->where('name', 'LIKE', "%{$search}%")
                ->orderBy('created_at', 'DESC')->limit(5)->get();
        }

        return $products;
    }
}
