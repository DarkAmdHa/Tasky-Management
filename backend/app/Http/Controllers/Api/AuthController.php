<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function register(RegisterRequest $request){

        $data = $request->validated();
        $user = User::create($data);
        return json_encode($user);
    }

    public function login(){

    }

    public function logout(){

    }

}
