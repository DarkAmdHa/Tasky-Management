<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    use HasFactory;
    const STATUS_ACCEPTED  = "Accepted";
    const STATUS_REJECTED = "Rejected";
    public function team(){
        return $this->belongsTo(Team::class);
    }
}
