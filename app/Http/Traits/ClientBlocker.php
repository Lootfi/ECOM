<?php

namespace App\Http\Traits;

use App\Client;

trait ClientBlocker
{
    public function blockClient($id)
    {
        $client = Client::where('user_id', $id)->first();
        switch ($client->state) {
            case 'active':
                $client->state = 'blocked';
                break;

            case 'blocked':
                $client->state = 'active';
                break;
        }
        $client->save();
        return $client->state;
    }
}
