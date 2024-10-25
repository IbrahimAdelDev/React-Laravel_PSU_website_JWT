<?php

namespace App\Http\Controllers;

use App\Models\student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;



class studentcontroller extends Controller
{
    function showstu(Request $request){
        $student = Student::where("email" , "=" , $request -> email) ->first();
        if($student){
            if ($request->password === $student->password)
            {
                return response() -> json([
                    'status' => 'true',
                    'data' => 'user login successfully',
                    'token' => $student
                ]);
            }
            else{
                return response() -> json([
                    'status' => 'false',
                    'data' => 'Try Again'
                ]);
            }
        }
        else{
            return response() -> json([
                'status' => 'false',
                'data' => 'Try Again'
            ]);
        }
        
    }
      
    

    public function generateToken($user)
    {
        $expiresAt = Carbon::now()->addMinutes(30);

        $tokenPayload = [
            'user_id' => $user->id,
            'expires_at' => $expiresAt->timestamp
        ];

        $token = Crypt::encrypt(json_encode($tokenPayload));

        return $token;
    }

    public function verifyToken($request)
    {
        try {
            $token = $request->cookie('auth_token');
            if (!$token) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
            $payload = json_decode(Crypt::decrypt($token), true);

            if ($payload['expires_at'] < Carbon::now()->timestamp) {
                return response()->json(['message' => 'Token expired'], 401);
            }

            $user = student::find($payload['user_id']);
            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }


            return ([ 'user' => [
                'name' => $user->name,
                'id' => $user->id,
                'email' => $user->email,
                'gender' => $user->gender,
                'birth_date' => $user->birth_date,
                'dept_id' => $user->dept_id,
                'GPA' => $user->GPA,
                'years_of_study' => $user->years_of_study,
                'credits' => $user->credits
            ] , 'message' => 'success']);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Invalid token'], 401);
        }
    }
    
    public function signup(Request $request){

        $credentials = $request->validate([
                'name' => 'required:users,name|min:3|max:50',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:8'
            ]
            ,
            [//error messages
                'name.required' => 'Please enter your name.',
                'password.required' => 'Please enter your password.',
                'email.required' => 'Please enter your email.',
                'email.email' => 'Please enter a valid email.',
                'email.unique' => 'This email is already exist.',
            ]
        );

        $credentials['password'] = Hash::make($credentials['password']);

        $user = Student::where('email', $credentials['email'])->first();

        if($user){
            return response()->json(['message' => 'Email already exists'], 401);
        }

        $user = Student::create($credentials);
        
        $token = $this->generateToken($user);

        return response()->json([
            'message' => 'Registration successful',
            'token' => $token,
            'user' => [
                'name' => $user->name,
                'id' => $user->id,
                'email' => $user->email,
                'gender' => $user->gender,
                'birth_date' => $user->birth_date,
                'dept_id' => $user->dept_id,
                'GPA' => $user->GPA,
                'years_of_study' => $user->years_of_study,
                'credits' => $user->credits
            ]
        ])->cookie('auth_token', $token, 30, '/', null, true, true);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|min:5|max:50',
            'password' => 'required|min:8'
        ],
        [//error messages
            'email.required' => 'Please enter your username.',
            'email.email' => 'Please enter a valid email.',
            'email.unique' => 'This email is already exist.',
            'password.required' => 'Please enter your password.',
        ]);

        $user = Student::where('email', $credentials['email'])->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'incorrect data'], 401);
        }

        $token = $this->generateToken($user);

        return response()->json([
            'message' => 'Registration successful',
            'token' => $token,
            'user' => [
                'name' => $user->name,
                'id' => $user->id,
                'email' => $user->email,
                'gender' => $user->gender,
                'birth_date' => $user->birth_date,
                'dept_id' => $user->dept_id,
                'GPA' => $user->GPA,
                'years_of_study' => $user->years_of_study,
                'credits' => $user->credits
            ]
        ])
        ->cookie('auth_token', $token, 30, '/', null, true, true);
    }

    public function update(Request $request){
        $data = $this->verifyToken($request);
        if($data['message'] === 'success'){

            Student::where('id','=', $request->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'gender' => $request->gender,
                'birth_date' => $request->birth_date,
                'dept_id' => $request->dept_id,
                'GPA' => $request->GPA,
                'years_of_study' => $request->years_of_study,
                'credits' => $request->credits
            ]);
            $user = Student::find($request->id);
    
            return ([ 'user' => [
                'name' => $user->name,
                'id' => $user->id,
                'email' => $user->email,
                'gender' => $user->gender,
                'birth_date' => $user->birth_date,
                'dept_id' => $user->dept_id,
                'GPA' => $user->GPA,
                'years_of_study' => $user->years_of_study,
                'credits' => $user->credits
            ] , 'message' => 'success']);
        }
        return (['message' => 'failed']);
    }

    public function showdash(Request $request)
    {
        $data = $this->verifyToken($request);
        return response()->json($data);
    }

    function showstugen($male){
        $student = Student::where("gender" , "=" , $male) ->get();
        return $student;
    }

    public function delete($id){
        Student::where('id','=', $id)->delete();

        return response()->json([
            'message' => 'success'
        ]);
    }
}