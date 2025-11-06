<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Meeting extends Model
{
    /** @use HasFactory<\Database\Factories\MeetingFactory> */
    use HasFactory;
    protected $guarded = [];
    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($meeting) {
            // Generate unique 6 karakter code
            do {
                $code = strtolower(Str::random(10));
            } while (self::where('code', $code)->exists());

            $meeting->code = $code;
        });
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
