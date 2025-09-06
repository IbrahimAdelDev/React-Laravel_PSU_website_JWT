<?php

use App\Http\Controllers\api\authcontroller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\studentcontroller;
use App\Http\Controllers\bookcontroller;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/usersignup', [authcontroller::class, 'signup']);

Route::post('/usersignupp', [studentcontroller::class, 'signup']);

Route::post('/usernewlogin', [studentcontroller::class, 'login']);

Route::post('/userlogin', [authcontroller::class, 'login']);

Route::get('/userloginnn', [studentcontroller::class, 'showdash'])
;
// ->middleware('isLoggedin');

Route::post('/userloginnnn/{male}', [studentcontroller::class, 'showstugen']);

Route::post('/userloginn', [studentcontroller::class, 'showstu']);

Route::post('/librarybooknb', [bookcontroller::class, 'showbooknb']);

Route::post('/librarystubook/{id}', [bookcontroller::class, 'showstubook']);

Route::post('/createbook', [bookcontroller::class, 'createbook']);

Route::post('/borrowbook', [bookcontroller::class, 'borrow']);

Route::post('/unborrowbook', [bookcontroller::class, 'unborrow']);

Route::post('/students', [studentcontroller::class, 'create']);

Route::get('/students',[StudentController::class,'show']);

Route::post('/userupdate/{id}',[StudentController::class,'update'])
;
// ->middleware('isLoggedin');

Route::delete('/students/{id}',[StudentController::class,'delete']);
