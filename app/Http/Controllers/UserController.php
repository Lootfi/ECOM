<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    public function check(Request $request)
    {
        $user = User::where('id', $request->user()->id)->select('*')->with(['client', 'admin', 'adress'])->first();

        return $user;
    }

    public function changeAvatar(Request $request, $userId)
    {
        $user = User::where('id', $userId)->first();

        $avatar = $request->file('avatar');
        Storage::delete('public/' . $user->avatar);
        $user->avatar = '/' . $avatar->store('avatars', 'public');

        $user->save();

        return $user->avatar;
    }
    public function updateDetails(Request $request, $userId)
    {
        $user = User::where('id', $userId)->first();
        $adress = $user->adress;
        $user->firstName = $request->firstName;
        $user->lastName = $request->lastName;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $adress->wilaya = $request->wilaya;
        $adress->commune = $request->commune;

        $user->save();
        $adress->save();

        return response()->json('ok');
    }
}
