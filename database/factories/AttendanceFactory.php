<?php

namespace Database\Factories;

use App\Models\Meeting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $attend = fake()->boolean(50);
        return [
            'user_id' => fake()->randomNumber(),
            'meeting_id' => fake()->randomNumber(),
            'time'       => $attend ? fake()->time('H:i') : null,
            'attend'     => $attend,
        ];
    }
}
