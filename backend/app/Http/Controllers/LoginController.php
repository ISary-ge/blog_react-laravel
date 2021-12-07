<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class LoginController extends Controller
{

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json("Вы зареганы",200);
        }else{
            $user = User::where('email',$request->input('email'))->first();
            if($user){
                return response()->json(["error"=>"Вы ввели неверный пароль"],422);
            }else{
                return response()->json(["error"=>"Вы ввели неверный логин"],422);
            }
        }
    }

    public function logout(){

    }


}
