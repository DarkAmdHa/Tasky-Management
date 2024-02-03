<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function search($userId, $query)
    {
        return empty($query) ?static::query() : static::query()->
        where("name", "like", "%" . $query . "%")
            ->orWhere("description", "like", "%" . $query . "%")
            ->where(function ($q) use ($userId) {
                $q->where("user_id", $userId)
                    ->orWhereHas("team.users", function ($q) use ($userId){
                        $q->where("users.id", $userId);
                    });
            });
    }
    public function team(){
        return $this->belongsTo(Team::class);
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function latest5Tasks(){
        return $this->hasMany(Task::class)->latest()->take(5);
    }

    public function latestTasks() {
        return $this->hasMany(Task::class)->latest()->take(3);
    }
}
