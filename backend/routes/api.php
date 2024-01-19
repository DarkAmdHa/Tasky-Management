<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\RegistrationController;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

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
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function(Request $request){
        return $request->user();
    });

    Route::get('/logout', [AuthController::class, 'logout']);

    Route::get('/dashboardData', function(Request $request){
        $count = 3;
        $user = Auth::user();

        $latestProjects = $user->projects()->latest()->take($count)->get();

        foreach ($latestProjects as $project){
            $project->load(['latestTasks']);
        }

        return response()->json(["latestProjects"=>$latestProjects, "latestUploads"=>[]]);
    });

    Route::get('/projects', function(Request $request){
        
    });
});




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);





