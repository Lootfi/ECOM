<?php

namespace App\Http\Controllers\Auth;

use App\Admin;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Lcobucci\JWT\Parser as JwtParser;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Passport;
use League\OAuth2\Server\AuthorizationServer;
use Psr\Http\Message\ServerRequestInterface;
use Laravel\Passport\Client;
use Laravel\Passport\ClientRepository;


class AuthController extends Controller /*AccessTokenController */
{

    use AuthenticatesUsers;

    // protected $server;
    // protected $tokens;
    // protected $jwt;


    public function __construct(
        AuthorizationServer $server,
        TokenRepository $tokens,
        JwtParser $jwt
    ) {
        $this->middleware('guest')->except('logout');
        // $this->jwt = $jwt;
        // $this->server = $server;
        // $this->tokens = $tokens;
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 400);
        }
        $user = User::where('email', $request->email)->first();

        if ($user) {
            if ($this->guard()->once(['email' => $request->email, 'password' => $request->password])) {
                $token = $user->createToken('Laravel Password Grant Client', [$user->type()])->accessToken;
                return response()->json(['token' => $token, 'user' => $user], 200);
            } else {
                $response = ["message" => "Password mismatch"];
                return response($response, 422);
            }
        } else {
            $response = ["message" => 'User does not exist'];
            return response($response, 422);
        }
    }

    // public function login(ServerRequestInterface $request)
    // {
    //     $this->validateLogin(new Request([
    //         'email' => $request->getParsedBody()['email'],
    //         'password' => $request->getParsedBody()['password']
    //     ]));

    //     if (!auth()->attempt([
    //         'email' => $request->getParsedBody()['email'],
    //         'password' => $request->getParsedBody()['password']
    //     ])) {
    //         return response()->json('failed attempt', 400);
    //     }
    //     $client = Client::where('name', 'LIKE', "%Password Grant Client%")->first();
    //     $clientRepo = new ClientRepository();
    //     $clientRepo->create(auth()->user()->id, $request->getHeaders()['user-agent'][0], 'http://127.0.0.1:8000', false, true);

    //     $request = $request->withParsedBody($request->getParsedBody() +
    //         [
    //             'grant_type' => 'password',
    //             'client_id' => $client->id,
    //             'client_secret' => $client->secret,
    //             'username' => $request->getParsedBody()['email'],
    //             'password' => $request->getParsedBody()['password'],
    //             'scope' => auth()->user()->type()
    //         ]);
    //     $res = with(new AccessTokenController($this->server, $this->tokens, $this->jwt))
    //         ->issueToken($request);

    //     $token = auth()->user()->tokens->first();
    //     $token->name = $request->getHeaders()['user-agent'][0];
    //     $token->save();

    //     return [$res->getContent(), auth()->user()];
    // }

    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }
}
