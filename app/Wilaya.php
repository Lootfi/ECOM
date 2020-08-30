<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wilaya extends Model
{
    public function communes()
    {
        return $this->hasMany('App\Commune');
    }
}
