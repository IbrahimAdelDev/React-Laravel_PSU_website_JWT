<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
// use Symfony\Component\HttpFoundation\Response;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Models\student;

class isLoggedin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function verifyToken(Request $request, Closure $next)
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
            // $user = Student::where("id" , "=" , 1) ->first();
            // Log::info($user);
            // dd($user);
            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            $request->attributes->add(['user' => $user]);

            return $next($request);
            // return $user;

        } catch (\Exception $e) {
            return response()->json(['message' => 'Invalid token'], 401);
        }
    }
}
