<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class authcontroller extends Controller
{
    public function signup(Request $request){
        $validator = Validator::make($request -> all(),[
            'name' => 'required',
            // 'lastName' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        if($validator -> fails()){
            return response() -> json([
                'status' => 'false',
                'data' => $validator -> errors()
            ]);
        }
        else{
            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => $request->password
            ]);

            return response() -> json([
                'status' => 'true',
                'message' => 'USER SIGNUP SUCCESSFULLY',
                // 'data' => $user
                'token' => $user
                // 'data' => $user -> createToken('signup_token') -> plainTextToken
            ]);
        }
        // $user = User::create([
        //     "name" => $request -> name,
        //     "email" => $request -> email,
        //     "password" => $request -> password
        // ]);

        // return response() -> json([
        //     'status' => 'true',
        //     'message' => 'USER SIGNUP SUCCESSFULLY',
        //     'data' => $user 
        // ]);

    }


    function login(Request $request){
        $validator = Validator::make($request -> all(),[
            'email' => 'required',
            'password' => 'required'
        ]);

        if($validator -> fails()){
            return response() -> json([
                'status' => 'false',
                'message' => 'some input data error',
                'data' => $validator -> errors()
            ]);
        }
        else{
            $user = User::where('email' , '=' , $request -> email) ->first();

            if(Auth::attempt(['email' => $request -> email, 'password' => $request -> password])){
                return response() -> json([
                    'status' => 'true',
                    'data' => 'user login successfully',
                    'token' => $user
                    // 'token' => $user -> creatToken('login_token') -> plainTextToken
                ]);
            }
            else{
                return response() -> json([
                    'status' => 'false',
                    'data' => 'AUTHETICATION ERROR'
                ]);
            }
        }
    }
}
