<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Invite;
use App\Models\User;
use Carbon\Carbon;
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

        //Check if user has any pending invites:
        $invite = Invite::where("email", $user->email)->where("status", "pending")->first();
        if($invite){
            if($invite->team_id != ""){
                $createdAtTimeStamp = Carbon::parse($invite->created_at);
                $currentTimestamp = Carbon::now();

                if($createdAtTimeStamp->diffInHours($currentTimestamp) > 48){
                    $invite->load("team");
                    return response()->json([
                        'user'=>$user,
                        'pendingInvite'=>$invite
                    ], Response::HTTP_OK);
                }
            }
            $invite->status = "accepted";
            $invite->save();
        }


        return response()->json([
            'user'=>$user
        ], Response::HTTP_OK);
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();

        if(Auth::attempt($credentials)){
            $user = User::where('email', $credentials['email'])->first();

            //Check if user has any pending invites:
            $invite = Invite::where("email", $user->email)->where("status", "pending")->first();
            if($invite){
                $createdAtTimeStamp = Carbon::parse($invite->created_at);
                $currentTimestamp = Carbon::now();

                if($createdAtTimeStamp->diffInHours($currentTimestamp) > 48){
                    $invite->load("team");
                    return response()->json([
                        'user'=>$user,
                        'pendingInvite'=>$invite
                    ], Response::HTTP_OK);
                }
            }
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
