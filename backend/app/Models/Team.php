<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function search($userId, $query){
        return empty($query) ? static::query() :
            static::query()->where("name", "like", "%".$query . "%")
            ->whereHas("users", function($q) use ($userId){
                $q->where("users.id", $userId);
            });
    }

    public function projects(){
        return $this->hasMany(Project::class);
    }

    public function users(){
        return $this->belongsToMany(User::class, 'users_teams', 'team_id', 'user_id');
    }
}
