<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    //
    public function getCategories(){
        $categories = Category::all(['category_title','name']);
        return response()->json(["data"=>$categories],200)->header("Access-Control-Allow-Origin", "http://localhost:3000");
    }

    public function getCategoryPosts($name){
        $posts = DB::table('posts')->join('categories', 'posts.category_id','=','categories.id')->
        select('posts.id', 'posts.title', 'posts.img','posts.description', 'categories.name')->where('name', '=',$name)->get();
        return response()->json(["data" => $posts], 200);
    }

}
