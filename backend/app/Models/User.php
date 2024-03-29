<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded =[];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function projects(){
        return $this->hasMany(Project::class);
    }

    public function teamProjects(){
       $teams = $this->teams();
        $projects= [];
       foreach($teams as $team){
           foreach($team->projects as $pr){
               $projects[] = $pr;
           }
       }
       return $projects;
    }

    public function tasks($projectsLimit){
        $projects = $this->projects()->latest()->paginate($projectsLimit);
        foreach($projects as $project){
            $project->tasks = $project->tasks()->latest()->get();
        }
        return $projects;
    }


    public function teams(){
        return $this->belongsToMany(Team::class,'users_teams','user_id', 'team_id' );
    }


}
