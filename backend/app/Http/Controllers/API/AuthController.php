<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($token = auth()->attempt($request->only('email', 'password'))) {
            $user = auth()->user();

            //On intégre le role_id dans le token
            $customClaims = ['role_id' => $user->role_id];

            // Générer le token avec les réclamations personnalisées
            $token = Auth::claims($customClaims)->attempt($request->only('email', 'password'));


            return response()->json([
                'meta' => [
                    'code' => 200,
                    'status' => 'success',
                    'message' => 'User authenticated successfully.',
                ],
                'data' => [
                    'user' => $user,
                    'auth' => [
                        'token' => $token,
                        'type' => 'Bearer',
                        'expires_in' => Auth::factory()->getTTL() * 60,
                        'role_id' => $user->role_id,
                    ],
                ],
            ]);
        }
    }
    public function register(Request $request)
    {
        $request->validate([
            'pseudoUsers' => 'required|string|max:100',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'pseudoUsers' => $request->pseudoUsers,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => 1,
        ]);

        return response()->json([
            'message' => 'Enregistrement reussi',
            'user' => $user
        ]);
    }
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Déconnecté avec succès'
        ]);
    }
}
