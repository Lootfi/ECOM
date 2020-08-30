<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommandeProduct extends Model
{
    protected $fillable = [
        'product_id', 'commande_id', 'quantity'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commande_id', 'id');
    }
}
