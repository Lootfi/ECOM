<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Livraison extends Model
{
    const CREATED_AT = 'date_livraison';
    const UPDATED_AT  = 'date_livraison';

    protected $fillable = [
        'status', 'commande_id', 'adr_id', 'date_livraison'
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commande_id', 'id');
    }
}
