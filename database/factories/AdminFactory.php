<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Admin;
use App\Model;
use Faker\Generator as Faker;

$factory->define(Admin::class, function (Faker $faker) {
    return [
        'role_id' => 0
    ];
});
