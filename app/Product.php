<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'brand',
        'manufacturer',
        'weight',
        'category_id',
        'stock',
        'imageurls',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function prices()
    {
        return $this->belongsTo(Price::class, 'price_id', 'id');
    }

    public function promo_codes()
    {
        return $this->hasMany(PromoCode::class, 'product_id', 'id');
    }
}
