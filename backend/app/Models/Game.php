<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;
    protected $fillable = ['titleGames', 'image', 'gender', 'platform', 'editor', 'description', 'release_id'];

    public function releaseDate()
    {
        return $this->belongsTo(ReleaseDate::class, 'release_id');
    }
}
