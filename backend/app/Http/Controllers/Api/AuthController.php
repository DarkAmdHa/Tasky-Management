<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Nette\Schema\ValidationException;

class AuthController extends Controller
{
    //
    public function register(RegisterRequest $request){
        $credentials = $request->validated();
        $user = User::create($credentials);

        Auth::login($user);

        return response()->json([
            'user'=>$user
        ], Response::HTTP_OK);
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();

        if(Auth::attempt($credentials)){
            $user = User::where('email', $credentials['email'])->first();
            return response()->json([
                'user'=>$user
            ], Response::HTTP_OK);
        }

        return response()->json([
            'error' => "Wrong Credentials",
        ], Response::HTTP_FORBIDDEN);

    }

    public function logout(Request $request){
        Auth::guard('web')->logout();
    }



}
