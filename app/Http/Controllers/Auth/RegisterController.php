<?php

namespace App\Http\Controllers\Auth;

use App\Address;
use App\Client;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Lcobucci\JWT\Parser as JwtParser;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use League\OAuth2\Server\AuthorizationServer;
use Psr\Http\Message\ServerRequestInterface;

class RegisterController extends AccessTokenController
{

    use RegistersUsers;

    protected $redirectTo = RouteServiceProvider::HOME;


    protected $server;
    protected $tokens;
    protected $jwt;


    public function __construct(
        AuthorizationServer $server,
        TokenRepository $tokens,
        JwtParser $jwt
    ) {
        // $this->middleware('guest');
        $this->jwt = $jwt;
        $this->server = $server;
        $this->tokens = $tokens;
    }

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'max:255', 'unique:users', 'email'],
            'firstName' => ['required', 'string', 'max:255'],
            'middleName' => ['string', 'max:255', 'nullable'],
            'lastName' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'min:9', 'max:10', 'regex:/0[3-7][0-9]+/', 'unique:users'],
            'wilaya' => ['required', 'string', 'max:255'],
            'commune' => ['required', 'string', 'max:255'],
            'address_line' => ['string', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'min:8', 'same:password'],
        ]);
    }

    protected function create(array $data)
    {
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'firstName' => $data['firstName'],
            'middleName' => $data['middleName'] ?: '',
            'lastName' => $data['lastName'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
        ]);

        Address::create([
            'user_id' => $user->id,
            'wilaya' => $data['wilaya'],
            'commune' => $data['commune'],
            'address_line' => $data['address_line']
        ]);
        Client::create([
            'user_id' => $user->id,
            'state' => 'active'
        ]);

        return $user;
    }

    // public function register(ServerRequestInterface $request)
    // {
    //     $credentials = $request->withParsedBody([
    //         'email' => $request->getParsedBody()['email'],
    //         'password' => $request->getParsedBody()['password']
    //     ]);

    //     $validation = $this->validator($request->getParsedBody());

    //     if ($validation->fails()) {
    //         return response()->json(['errors' => $validation->errors()]);
    //     }

    //     $user = $this->create($request->getParsedBody());

    //     //authenticate
    //     $auth = new AuthController($this->server, $this->tokens, $this->jwt);
    //     $res = $auth->login($credentials);

    //     $success['user'] =  auth()->user();
    //     $success['response'] = $res;

    //     return response()->json($success, 200);
    // }

    public function register(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        $validation = $this->validator($request->all());

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()]);
        }

        $user = $this->create($request->all());

        $token = $user->createToken('Laravel Password Grant Client')->accessToken;

        return response()->json(['user' => $user, 'token' => $token], 200);
    }
}
