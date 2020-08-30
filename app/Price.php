<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $fillable = ['prix_achat', 'prix_vente', 'product_id'];
}
