<?php

namespace App\Http\Controllers;

use App\Mail\InviteUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class InviteEmailController extends Controller
{
    public function sendInviteEmail(string $inviter, string $invitee, string $team, bool $isUser)
    {
        Mail::to($invitee)->send(new InviteUser( $inviter, $team, $isUser));

        return "Email sent successfully!";
    }
}
