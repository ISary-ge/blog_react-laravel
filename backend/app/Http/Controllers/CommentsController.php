<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentsController extends Controller
{

    public function get($id,$skip){
        $comments = DB::table('comments')->where('post_id', '=', $id)->limit(3)->offset($skip)->get();
        $count = Comment::where('post_id', '=', $id)->count();

        return response()->json(["data"=>$comments,"count"=>$count],200);
    }

    public function createComment(Request $request, $id){
        $comment = new Comment;
        $comment->user_name = $request->input('userName');
        $comment->text = $request->input('commentText');
        $comment->post_id = $id;
        $comment->save();

        return response()->json(["data"=>$comment],200);

    }

}
