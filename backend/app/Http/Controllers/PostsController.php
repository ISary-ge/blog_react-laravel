<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Contracts\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    public function getAll (Request $request){
        $posts = DB::table('posts')->join('categories', 'posts.category_id','=','categories.id')->
        select('posts.id', 'posts.title', 'posts.img','posts.description', 'categories.name', 'categories.color')->get();
        return response()->json(["data" => $posts], 200);
    }

    public function getPost(Request $request, $id){

        $post = Post::findOrFail($id);
        $views_inc = $post->update(['views' => $post->views+1]);
        if($views_inc){
            $post = Post::join('categories', 'posts.category_id','=','categories.id')->where('posts.id', '=', $id)->
            select('posts.*','categories.name', 'categories.color')->first();
        }
        $post->date = Post::MySQLtimestamp_conrverter($post->created_at);




        return response()->json(["data" => $post], 200);
    }

    public function editPost(Request  $request, $id){
        extract($request);
        $post = Post::findOrFail($id);
        if($post){
            $post->update([$title]);
        }
    }
}
