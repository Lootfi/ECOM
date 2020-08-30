<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Lcobucci\JWT\Parser as JwtParser;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use League\OAuth2\Server\AuthorizationServer;
use Psr\Http\Message\ServerRequestInterface;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;
    protected $server;
    protected $tokens;
    protected $jwt;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(
        AuthorizationServer $server,
        TokenRepository $tokens,
        JwtParser $jwt
    ) {
        $this->middleware('guest')->except('logout');
        $this->jwt = $jwt;
        $this->server = $server;
        $this->tokens = $tokens;
    }

    public function login(Request $request)
    {
        $controller = new AccessTokenController($this->server, $this->tokens, $this->jwt);
        $this->validateLogin($request);
        $sri = new ServerRequestInterface();
        $sri->withAttribute('grant_type', 'password');
        return $sri;
        $request['grant_type'] = 'password';
        $request['client_id'] = '2';
        $request['client_secret'] = 'CHwCdIDP7K2XLAgSBfIvcUUXg0km5n10qd7YwhAd';
        $request['username'] = $request->email;

        return with($controller)->issueToken($request);
    }
}
