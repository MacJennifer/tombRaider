<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $games = Game::all();

        return response()->json($games);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titleGames' => 'required|max:150',
            'gender' => 'required|max:100',
            'platform' => 'required|max:150',
            'editor' => 'required|max:100',
            'description' => 'required|max:1000',

        ]);

        $filename = "";
        if ($request->hasFile('image')) {
            $filenameWithExt = $request->file('image')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $request->file('image')->storeAs('public/uploads', $filename);
        } else {
            $filename = Null;
        }

        $game = Game::create(array_merge($request->all(), ['image' => $filename]));

        return response()->json([
            'status' => 'Success',
            'game' => $game,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        return response()->json($game);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Game $game)
    {
        $request->validate([
            'titleGames' => 'required|max:150',
            'gender' => 'required|max:100',
            'platform' => 'required|max:150',
            'editor' => 'required|max:100',
            'description' => 'required|max:1000',

        ]);

        $filename = "";
        if ($request->hasFile('image')) {
            $filenameWithExt = $request->file('image')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $request->file('image')->storeAs('public/uploads', $filename);
        } else {
            $filename = Null;
        }

        $game->update(array_merge($request->all(), ['image' => $filename]));

        return response()->json([
            'status' => 'Mise à jour avec succès',
            'game' => $game

        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        $game->delete();

        return response()->json([
            'status' => 'Supprimer avec succès'
        ]);
    }
}
