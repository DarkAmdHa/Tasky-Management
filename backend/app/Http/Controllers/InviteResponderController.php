<?php

namespace App\Http\Controllers;

use App\Mail\InviteResponded;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class InviteResponderController extends Controller
{
    public function sendResponseEmail(string $inviter, array $data)
    {
        Mail::to($inviter)->send(new InviteResponded($data["teamName"], $data["accepted"], $data["inviteeName"],$data["teamId"]));

        return "Email sent successfully!";
    }
}
