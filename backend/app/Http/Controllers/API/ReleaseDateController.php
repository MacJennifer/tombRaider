<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ReleaseDate;
use Illuminate\Http\Request;

class ReleaseDateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $releaseDates = ReleaseDate::all();

        return response()->json($releaseDates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|max:100'
        ]);

        $releaseDate = ReleaseDate::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $releaseDate
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ReleaseDate $releaseDate)
    {
        // dd($releaseDate);
        return response()->json($releaseDate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ReleaseDate $releaseDate)
    {
        $request->validate([
            'date' => 'required|max:100'
        ]);

        $releaseDate->update($request->all());

        return response()->json([
            'status' => 'Mise à jour avec succès',
            'data' => $releaseDate
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ReleaseDate $releaseDate)
    {
        $releaseDate->delete();

        return response()->json([
            'status' => 'Supprimer avec succès'
        ]);
    }
}
