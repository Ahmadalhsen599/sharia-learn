<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController\AuthController;
use App\Http\Controllers\HomePageController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
///////////////////Authintication///////////////////////////////////////////////////////
Route::post('/register', [AuthController::class, 'register']);
Route::post('/send_email', [AuthController::class, 'send_email']);
Route::post('/login',    [AuthController::class, 'login']);
/////////////////middleware/////////////////////////////////////////////////////////////
Route::middleware('auth:sanctum')->group(function () {  
    Route::middleware(['role:3','block'])->prefix('student')->group(function () {
        Route::get('GetAllLearningPath',[HomePageController::class,'GetAllLearningPath']);
        Route::get('GetAllTeacher',[HomePageController::class,'GetAllTeacher']);
        Route::get('/me',     [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/dashboard', fn () => 'لوحة الطالب');
    });

   
    Route::middleware('role:2')->prefix('teacher')->group(function () {
        Route::get('/me',     [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/dashboard', fn () => 'لوحة المعلم');
    });

  
    Route::middleware('role:1')->prefix('admin')->group(function () {
        Route::get('/me',     [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/dashboard', fn () => 'لوحة المدير');
    });
});

