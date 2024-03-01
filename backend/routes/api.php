<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\InviteEmailController;
use App\Http\Controllers\InviteResponderController;
use App\Models\Comment;
use App\Models\Invite;
use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function(){

    Route::get('/user', function(Request $request){
        return $request->user();
    });

    Route::get('/logout', [AuthController::class, 'logout']);

    Route::get('/dashboardData', function(Request $request){
        $count = 3;
        $user = Auth::user();

        $latestProjects = $user->projects()->latest()->take($count)->get();

        foreach ($latestProjects as $project){
            $project->load(['latestTasks']);
        }

        return response()->json(["latestProjects"=>$latestProjects, "latestUploads"=>[]]);
    });

    Route::get('/projects', function(Request $request){
        $projectLimits = 5;

        $user = Auth::user();

        $projects = $user->projects()->latest()->paginate($projectLimits);
        return response()->json(["paginatedProjects"=>$projects]);
    });

    Route::get('/tasks', function(Request $request){
        $projectsLimit = 5;

        $user = Auth::user();

        $tasks = $user->tasks($projectsLimit);
        return response()->json(["paginatedProjectsWithTasks"=>$tasks]);
    });

    Route::get('/projects/{project}', function(Request $request, Project $project){
        $user = Auth::user();


        if(isset($project) && $project['user_id'] === $user['id']){
            $project->load('tasks');
            return response()->json(['project'=>$project], Response::HTTP_OK);
        }else{
            return response()->json(['error' => "Project does not belong to user or does no exist",], Response::HTTP_FORBIDDEN);
        }
    });

    Route::get('/project-tasks/{project}', function(Request $request, Project $project){
        $user = Auth::user();

        $isInTeam = DB::table("users_teams")->whereUserId($user->id)->whereTeamId($project->team_id)->count() > 0;

        if(isset($project) && ($project['user_id'] === $user['id']) || ($isInTeam)){
            $tasks = $project->tasks()->paginate(5);
            return response()->json(['tasks'=>$tasks], Response::HTTP_OK);
        }else{
            return response()->json(['error' => "Project does not belong to user or does no exist",], Response::HTTP_FORBIDDEN);
        }
    });
    Route::get('/tasks/{task}', function(Request $request, Task $task){
        $user = Auth::user();

        $task->load('project');

        $task->load('comments');

        if(isset($task) && $task->project['user_id'] === $user['id']){
            return response()->json(['task'=>$task], Response::HTTP_OK);
        }else{
            return response()->json(['error' => "Task does not belong to user or does no exist",], Response::HTTP_FORBIDDEN);
        }
    });

    Route::post('/tasks', function (Request $request){
        $projectId = $request->input('projectId');
        $name = $request->input('name');
        $description = $request->input('description');

        if(isset($projectId) && isset($name) && isset($description)){
            $project = Project::find($projectId);
            $user = Auth::user();

            if(isset($project) && $project['user_id'] === $user['id']){
                $task = new Task;
                $task->name = $name;
                $task->description = $description;
                $task->project_id = $project['id'];
                $task->save();
                return response()->json($task, Response::HTTP_OK);
            }else{
                return response()->json(['error' => "Please add to a project that exists and was created either by you or someone in your team.",], Response::HTTP_FORBIDDEN);
            }
        }else{
            return response()->json(['error'=>'Please provide a name and description and project id of the parent project.'], Response::HTTP_BAD_REQUEST);
        }

    });

    Route::post('/tasks/comments', function(Request $request){
        $taskId = $request->input('taskId');
        $commentDescription = $request->input('commentDescription');
        if($commentDescription != '' && $taskId != ''){
            $user = Auth::user();
            $task = Task::find($taskId);
            $project = Project::find($task->project_id);
            if($user->id === $project->user_id){
                //Is user's task
                //Todo: Implement team logic

                $comment = new Comment;
                $comment->task_id = $taskId;
                $comment->user_id = $user->id;
                $comment->description = $commentDescription;
                $comment->save();
                return response()->json($comment, Response::HTTP_OK);
            }else{
                return response()->json(['error'=>'Task does not exist or does not belong to user'], Response::HTTP_BAD_REQUEST);
            }
        }else{
            return response()->json(['error'=>'Task id and comment required'], Response::HTTP_BAD_REQUEST);
        }

    });


    Route::post('/projects', function(Request $request){
        $user = Auth::user();
        $name = $request->input('name');
        $description = $request->input('description');
        $user_id = $user->id;
        if(isset($name) && isset($description) && isset($user_id)){
            $project = new Project;
            $project->name = $name;
            $project->description = $description;
            $project->user_id = $user_id;
            $project->save();
            return response()->json($project, Response::HTTP_OK);
        }else{
            return response()->json(['error'=>'Please provide a title and description for the project. You should also be logged in before being able to create a new project.'], Response::HTTP_BAD_REQUEST);
        }
    });

    //CREATE A TEAM
    Route::post('/teams', function (Request $request){
        $user = Auth::user();
        $team_name = $request->input("name");
        $team_description = $request->input("description");

        if($team_name != ''){
            $team = new Team;
            $team->name = $team_name;
            if($team_description != ""){
                $team->description = $team_description;
            }
            $team->save();

            $team->users()->attach($user->id, ["isTeamAdmin"=> 1]);

            return response()->json(["team"=>$team], Response::HTTP_OK);
        }else{
            return response()->json(["error"=> "Provide a name for the team"], Response::HTTP_BAD_REQUEST);
        }
    });

    Route::get("/teams", function(Request $request){
        $user = Auth::user();
        $teamsLimit = 5;

        $teams = $user->teams()->latest()->paginate($teamsLimit);

        return response()->json(["teams"=>$teams], Response::HTTP_OK);
    });


    Route::get("/teams/{team}", function(Request $request, Team $team){
        if(isset($team)){
            $max_projects = 4;
            $user = Auth::user();
            $isInTeam = DB::table("users_teams")->whereUserId($user->id)->whereTeamId($team->id)->count() > 0;


            if($isInTeam){
                //
                $team->projects = $team->projects()->latest()->paginate($max_projects);
                $team->load("users");
                return response()->json(["team"=> $team], Response::HTTP_OK);
            }else{
                return response()->json(["error"=> "User not in provided team"], Response::HTTP_BAD_REQUEST);
            }
        }else{
            return response()->json(["error"=> "No such team found"], Response::HTTP_BAD_REQUEST);
        }
    });


    Route::post("/inviteUser", function (Request $request){
        $validated = $request->validate([
            'email'=>'required|email'
        ]);

        $inviter = Auth::user();

        if($validated){
            $email = $request->input("email");
            $user = Auth::user();

            $team_id = $request->input("team_id") || "";

            //Check if there's already a pending invite for this user and this team
            if(Invite::where('team_id', $team_id)->where("email", $email)->where("status", "pending")->count()){
                return response()->json(["error"=>"This user already has a pending invite for this team."], Response::HTTP_BAD_REQUEST);
            }

            //Check if user already in team:
            $userToInvite = User::where("email", $email)->first();
            if($team_id != "" && $userToInvite){
                $isUserInTeam = DB::table("users_teams")->where("team_id", $team_id)->where("user_id", $userToInvite->id)->count() > 0;
                if($isUserInTeam)
                    return response()->json(["error"=>"User with provided email already in team"], Response::HTTP_BAD_REQUEST);
            }



            //Create invite instance:
            $invite = new Invite;
            $invite->email = $email;
            $invite->invited_by = $user->email;
            if($team_id != "")
                $invite->team_id = $team_id;
            //Send invite by email

            $invite->save();

            $inviteEmail = new InviteEmailController();
            if($team_id){
                $team = Team::find($team_id)->name;
            }else{
                $team = "";
            }

            $inviteEmail->sendInviteEmail($inviter->first_name . " " . $inviter->last_name, $email, $team,$userToInvite ? true : false );
            return response()->json(["success"=>"Invite sent successfully"], Response::HTTP_OK);
        }

        return response()->json(["error"=>"Please provide an email"], Response::HTTP_BAD_REQUEST);

    });

    Route::post("/teamInviteAccept", function(Request $request){
        $team_id = $request->input("team_id");
        $invite_id = $request->input("invite_id");

        $status = $request->input("status");

        if($team_id && $invite_id && ($status && $status === Invite::STATUS_ACCEPTED || $status === Invite::STATUS_REJECTED)){
            $user = Auth::user();
            $team = Team::find($team_id);

            $isUserInTeam = DB::table("users_teams")->whereUserId($user->id)->whereTeamId($team->id)->count() > 0;
            if(!$isUserInTeam){
                $invite = Invite::find($invite_id);
                $invite->status = $status;
                $invite->save();
                $inviteResponse = new InviteResponderController();

                if($status === Invite::STATUS_ACCEPTED){
                    $team->users()->attach($user->id,["isTeamAdmin"=> 0]);

                    //Send response email to inviter:
                    $inviteResponse->sendResponseEmail($invite->invited_by,[
                        "teamName"=>$team->name,
                        "accepted"=>true,
                        "inviteeName"=>$user->first_name,
                        "teamId"=>$team->id
                    ]);

                    return response()->json(["success"=>"User joined the team " . $team->name], Response::HTTP_OK);
                }
                //Send response email to inviter:
                $inviteResponse->sendResponseEmail($invite->invited_by,[
                    "teamName"=>$team->name,
                    "accepted"=>false,
                    "inviteeName"=>$user->first_name,
                    "teamId"=>$team->id
                ]);

                return response()->json(["success"=>"User declined to join the team " . $team->name], Response::HTTP_OK);
            }
            //User already in team
            return response()->json(["error"=>"User already in team"], Response::HTTP_BAD_REQUEST);
        }

        return response()->json(["error"=>"Invalid invite id or team id or status"], Response::HTTP_BAD_REQUEST);
    });


    Route::post("/search", function (Request $request){
        $query = $request->input("query");
        if($query){
            $user = Auth::user();
            $projects = Project::search($user->id, $query)->latest()->take(10)->get();
            $tasks = Task::search($user->id, $query)->latest()->take(10)->get();
            $teams = Team::search($user->id, $query)->latest()->take(10)->get();
            return response()->json(["result"=>[
                "projects"=>$projects,
                "tasks"=>$tasks,
                "teams"=>$teams
            ]], Response::HTTP_OK);
        }
        return response()->json(["result"=>[]], Response::HTTP_OK);
    });

    Route::post('/userProfile', function (Request $request){
        $user = Auth::user();

        $validatedData = $request->validate([
            'first_name' => 'string',
            'last_name' => 'string',
            'email' => 'email|unique:users,email,' . $user->id,
            'phone' => 'string|unique:users,phone,' . $user->id,
            'profession' => 'string',
        ]);

        $user->update($validatedData);

        return response()->json(["user" => $user], Response::HTTP_OK);
    });

    Route::post('/userProfileImage', function (Request $request){
        if ($request->hasFile('profilePic')) {
            $user = Auth::user();
            $file = $request->file('profilePic');

            $fileName = 'avatar_' . $user->id . '.' . $file->getClientOriginalExtension();

            // Store the file on the local disk
            Storage::disk('local')->put('public/avatars/' . $fileName, file_get_contents($file));

            // Update the user's avatarSrc with the new file path
            $user->avatar_src = 'avatars/' . $fileName;
            $user->save();

            return response()->json(["user" => $user], Response::HTTP_OK);
        }
    });

    Route::get("/pendingInvites", function(Request $request){
        $user = Auth::user();
        $pendingInvites = [];

        $invites = Invite::where("email", $user->email)->where("status", "pending")->get();
        if(!$invites->isEmpty()){
            foreach($invites as $invite){
                if($invite->team_id != ""){
                    $createdAtTimeStamp = Carbon::parse($invite->created_at);
                    $currentTimestamp = Carbon::now();

                    if($createdAtTimeStamp->diffInHours($currentTimestamp) < 48){
                        $invite->load("team");
                        $inviter = User::where("email", $invite->invited_by)->first();
                        if(isset($inviter)){
                            $invite->invited_by_name = $inviter->first_name . " " . $inviter->last_name;
                            $invite->invited_by_img = $inviter->avatar_src;
                        }

                        $pendingInvites[] = $invite;
                    }
                }
            }
        }

        return response()->json([
            'pendingInvites'=>$pendingInvites
        ], Response::HTTP_OK);
    });
});






