<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Illuminate\Http\Request;

Route::group(['middleware' => 'auth:api'], function () {
    // Route::get('user', function (Request $request) {
    //     return $request->user();
    // });
    Route::post('logout', 'Auth\AuthController@logout');
});
/*
*      ADMIN API ROUTES          
*/
/**
 *      USERS
 */
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('clients', 'ClientController@index');
    Route::get('clients/addresses', 'ClientController@getUserAdrs');
    Route::post('clients/{clientId}/block', 'ClientController@block')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('clients/{clientId}/add-address', 'ClientController@addAddress');

    Route::get('user', 'UserController@check');
    Route::get('users/{userId}/store', 'UserController@store');
    Route::get('users/{userId}/update', 'UserController@update');
    Route::post('users/{userId}/change-avatar', 'UserController@changeAvatar');
    Route::post('users/{userId}/update-details', 'UserController@updateDetails');
    Route::post('users/{userId}/commandes', 'CommandeController@clientCommandes');
});
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('products/all', 'ProductController@all')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('products/{productId}/delete-image', 'ProductController@deleteImages')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('products/import', 'ProductController@import')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('products/store', 'ProductController@store')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('products/{productId}/update', 'ProductController@update')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('products/{productId}/updateImages', 'ProductController@updateImages')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('products/{productId}/destroy', 'ProductController@destroy')->middleware(['scope:ADMIN,SUPER_ADMIN']);

    Route::post('promos/{promoId}/destroy', 'PromoCodeController@destroy')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('promos/store', 'PromoCodeController@store')->middleware(['scope:ADMIN,SUPER_ADMIN']);

    Route::get('categories/get', 'CategoryController@index')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('categories/edit', 'CategoryController@edit')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('categories/create', 'CategoryController@create')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('categories/delete', 'CategoryController@delete')->middleware(['scope:ADMIN,SUPER_ADMIN']);
});
Route::post('products/search', 'ProductController@getSearchResults');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('users/{userId}', 'UserController@show');
    Route::post('admins', 'AdminController@test')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::get('admins/{adminId}', 'AdminController@show')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::get('users/{userId}/block', 'UserController@block')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::get('users/{userId}/unblock', 'UserController@unblock')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::get('users/{userId}/destroy', 'UserController@destroy')->middleware(['scope:ADMIN,SUPER_ADMIN']);
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('commandes/requested', 'CommandeController@getRequested')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::get('commandes/shipping', 'CommandeController@getShipping')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::get('commandes/count', 'CommandeController@getCount')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('livraisons/ship-one', 'LivraisonController@shipOne')->middleware(['scope:ADMIN,SUPER_ADMIN']);
    Route::post('livraisons/confirm-delivery', 'LivraisonController@confirmDelivery')->middleware(['scope:ADMIN,SUPER_ADMIN']);
});


Route::group(['middleware' => 'auth:api'], function () {
    Route::post('order', 'CommandeController@store');
});
Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\AuthController@login');


Route::get('wilayas', 'WilayaController@index');
Route::get('communes', 'CommuneController@index');


Route::get('products', 'ProductController@index');
Route::get('products/{productId}/similar', 'ProductController@similar');
Route::get('products/{productId}', 'ProductController@show');
Route::get('categories/{category}', 'CategoryController@fetchCategory');
Route::get('categories', 'CategoryController@index');
Route::post('cart-info', 'ProductController@getCartProductsInfo');
