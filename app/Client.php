<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    protected $table = 'clients';

    protected $fillable = ['user_id', 'state'];

    public function info()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function block()
    {
        switch ($this->state) {
            case 'active':
                $this->state = 'blocked';
                break;

            case 'blocked':
                $this->state = 'active';
                break;
            default:
                break;
        }
        return $this->state;
    }
}
