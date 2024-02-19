<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReleaseDate extends Model
{
    use HasFactory;
    protected $fillable = ['releaseDate'];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
