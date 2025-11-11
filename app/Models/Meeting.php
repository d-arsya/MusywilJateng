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
            do {
                $code = strtolower(Str::random(10));
            } while (self::where('code', $code)->exists());

            $meeting->code = $code;
        });
        static::created(function ($meeting) {
            if ($meeting->all) {;
                User::query()
                    ->select('id')
                    ->chunk(1000, function ($users) use ($meeting) {
                        $attendances = $users->map(fn($u) => [
                            'user_id' => $u->id,
                            'meeting_id' => $meeting->id,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ])->toArray();
                        Attendance::insert($attendances);
                    });
            }
        });
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
