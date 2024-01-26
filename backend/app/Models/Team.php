<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function projects(){
        return $this->hasMany(Project::class);
    }

    public function users(){
        return $this->belongsToMany(User::class, 'users_teams', 'user_id', 'team_id');
    }
}
