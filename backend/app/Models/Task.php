<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function search($userId, $query) {
        return empty($query) ?static::query() : static::query()
            ->where('name', 'like', '%' . $query . '%')
            ->orWhere("description",'like', '%' . $query . '%')
            ->where(function ($q) use ($userId) {
                $q->whereHas('project', function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                })
                ->orWhereHas('project.team.users', function ($q) use ($userId) {
                    $q->where('users.id', $userId);
                });
            });
    }

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
