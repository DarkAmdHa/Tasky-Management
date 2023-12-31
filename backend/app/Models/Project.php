<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function team(){
        return $this->belongsTo(Team::class);
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function latestTasks() {
        return $this->hasMany(Task::class)->latest()->take(3);
    }
}
