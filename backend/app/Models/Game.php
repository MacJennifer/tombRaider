<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;
    protected $fillable = ['titleGames', 'image', 'gender', 'platform', 'editor', 'description', 'releaseDate_id'];

    public function releaseDates()
    {
        return $this->hasMany(ReleaseDate::class);
    }
}
