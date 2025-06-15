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

    Route::middleware(['auth:student', 'block'])->prefix('student')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('GetAllLearningPath', [HomePageController::class, 'GetAllLearningPath']);
    Route::get('GetAllTeacher', [HomePageController::class, 'GetAllTeacher']);
});
    Route::middleware('auth:teacher')->prefix('teacher')->group(function () {
    Route::get('/me', [TeacherAuthController::class, 'me']);
    Route::post('/logout', [TeacherAuthController::class, 'logout']);
});  
    Route::middleware('auth:admin')->prefix('admin')->group(function () {
    Route::get('/me', [AdminAuthController::class, 'me']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);
});


