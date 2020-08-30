<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Client;
use App\Model;
use Faker\Generator as Faker;


$factory->define(Client::class, function (Faker $faker) {
    return [
        'state' => 'active',
    ];
});
