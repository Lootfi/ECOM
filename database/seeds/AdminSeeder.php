<?php

use App\Admin;
use App\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 1)->create()->each(function ($user) {
            $user->admin()->save(factory(Admin::class)->make());
        });
    }
}
