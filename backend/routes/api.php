<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\RegistrationController;
use App\Models\Comment;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

    Route::post('/teams', function (Request $request){
       $team_name = $request->input("name");

       if($team_name != ''){
            $team = new Team;
            $team->name = $team_name;
            $team->save();

            $team->users()->attach($team->id);
            return response()->json(["team"=>$team], Response::HTTP_OK);
       }else{
           return response()->json(["error"=> "Provide a name for the team"], Response::HTTP_BAD_REQUEST);
       }
    });


});




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);





