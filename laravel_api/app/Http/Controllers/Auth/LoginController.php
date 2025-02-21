<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        $user = User::where('user_name', $request->code)->whereNot('category_id', 1)->first();
        if (!$user) {
            return response()->json([
                'message' => 'მომხმარებელი ვერ მოიძებნა.',
            ], 401);
        }

        if ($user && $request->password !== $user->password_without_hush) {
            return response()->json([
                'message' => 'მომხმარებელის პაროლი არასწორია.',
            ], 401);
        }

        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 200);
    }
}
