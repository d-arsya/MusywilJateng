<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasFactory;

    protected $guarded = [];
    protected $casts = [
        'paid' => 'boolean',
        'verified' => 'boolean',
        'admin' => 'boolean',
    ];
    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($user) {
            do {
                $code = strtolower(Str::random(6));
            } while (self::where('code', $code)->exists());

            $user->code = $code;
        });
        static::created(function ($user) {
            $meetingIds = Meeting::where('all', true)->pluck('id');
            $now = now();
            if ($meetingIds->isNotEmpty()) {
                $attendances = $meetingIds->map(fn($id) => [
                    'user_id' => $user->id,
                    'meeting_id' => $id,
                    'created_at' => $now,
                    'updated_at' => $now,
                ])->toArray();

                Attendance::insert($attendances); // batch insert
            }
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
