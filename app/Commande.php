<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    const CREATED_AT = 'date_commande';
    const UPDATED_AT  = 'date_commande';

    protected $fillable = [
        'client_id',
        'livraison_id',
        'paiment_method_id',
        'total'
    ];


    protected $attributes = [
        'livraison_id' => 0,
        'paiment_method_id' => 0
    ];

    public function livraison()
    {
        return $this->hasOne(Livraison::class, 'commande_id', 'id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id', 'id');
    }

    public function products()
    {
        return $this->hasMany('App\CommandeProduct');
    }
}
