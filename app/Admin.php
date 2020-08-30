<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = "admins";
    public $timestamps = false;
    protected $fillable = ['user_id', 'role_id'];

    public function roles()
    {
        return Role::where('id', $this->role_id)->first()->name;
    }
}
