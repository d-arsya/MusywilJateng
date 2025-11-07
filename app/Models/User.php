<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasFactory;

    protected $guarded = [];
    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($user) {
            // Generate unique 6 karakter code
            do {
                $code = strtolower(Str::random(6));
            } while (self::where('code', $code)->exists());

            $user->code = $code;
        });
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function employment()
    {
        return $this->belongsTo(Employment::class);
    }
}
