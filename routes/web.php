<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::get('/{any}', 'HomeController@index')->name('home')->where('any', '.*');

// Route::get('/test', 'HomeController@test')->name('test');
// Route::post('/test', 'HomeController@update')->name('update');
// Auth::routes();