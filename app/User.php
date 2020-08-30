<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    static $SUPER_ADMIN = 0;
    static $ADMIN = 1;
    static $CLIENT = 2;

    protected $fillable = ['role', 'username', 'email', 'firstName', 'middleName', 'lastName', 'phone', 'wilaya', 'commune', 'address_line', 'password'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function type()
    {
        $admin = Admin::where('user_id', $this->id)->first();
        $client = Client::where('user_id', $this->id)->first();
        if ($admin) return $admin->roles();
        elseif ($client) return 'CLIENT';
    }

    public function client()
    {
        return $this->hasOne(Client::class, 'user_id', 'id');
    }

    public function admin()
    {
        return $this->hasOne(Admin::class, 'user_id', 'id');
    }

    public function adress()
    {
        return $this->hasOne(Address::class, 'user_id', 'id');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'client_id', 'id')->orderBy('date_commande', 'DESC');
    }
}
