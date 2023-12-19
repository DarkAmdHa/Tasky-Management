<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class RegistrationController extends Controller
{

    public function store(){
        //Create a user
        request()->validate([
            'email'=>"required|email|max:255",
            'password'=>["required", "max:255", Password::min(8)->mixedCase()->numbers()->symbols()->uncompromised()],
            'first_name'=>"required|max:255|min:2",
            'last_name'=>"max:255"
        ]);



    }
}
