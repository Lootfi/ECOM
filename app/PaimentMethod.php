<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaimentMethod extends Model
{
    protected $fillable = [
        'method', 'commande_id'
    ];
}
