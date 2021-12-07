<?php

use Illuminate\Support\Facades\Route;
use App\Models\Todo;
use \Illuminate\Http\Request;
use \App\Http\Controllers\PostsController;
use \App\Http\Controllers\CommentsController;
use \App\Http\Controllers\LoginController;
use \App\Http\Controllers\CategoryController;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/todo',function (){
    $all_todos = Todo::all();
    return response()->json(["data"=>$all_todos],200);
});

Route::post('/todo',function (Request $request){
    extract($request->input());

    $todo = Todo::create([
        "user_id" => $user_id,
        "title" => $title,
        "done" => $done,
        "important" => $important
    ]);

    $todos = Todo::all();

    if($todo){
        return response()->json(["data"=>$todos],200);
    }
});

Route::post('/todo/{id}', function (Request $request, $id){
    extract($request->input());
    $todo = Todo::findOrFail($id);
    $update_todo = compact(array_keys($request->input()));
    $todo->update($update_todo);

    $todos = Todo::all();
    if($todo){
        return response()->json(["data"=>$todos],200);
    }

});

Route::delete('/todo/{id}', function (Request $request, $id){
    extract($request->input());
    $todo = Todo::findOrFail($id);

    $todo->delete();
    $todos = Todo::all();
    if($todo){
        return response()->json(["data"=>$todos],200);
    }

});



Route::get('/posts', [\App\Http\Controllers\PostsController::class, 'getAll']);
Route::get('/post/{id}', [\App\Http\Controllers\PostsController::class, 'getPost']);
Route::post('/post',[PostsController::class, 'createPost']);
Route::get('/categories',[CategoryController::class, 'getCategories']);
Route::get('/category/{name}',[CategoryController::class, 'getCategoryPosts']);

Route::middleware(['auth:sanctum'])->prefix('admin')->group(function(){
    Route::post('/post',[PostsController::class, 'createPost']);
    Route::post('/post/{id}',[PostsController::class, 'editPost']);
    Route::delete('/post/{id}', [PostsController::class,'deletePost']);
});



Route::get('/comments/{id}/{skip}',[CommentsController::class, 'get']);
Route::post('/comments/{id}', [CommentsController::class, 'createComment']);
Route::post('/login', [LoginController::class, 'authenticate']);


