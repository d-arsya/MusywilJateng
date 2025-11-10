<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Meeting>
 */
class MeetingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = Carbon::parse(fake()->time('H:i'));

        return [
            'name' => 'Rapat ' . fake()->name(),
            'room' => 'Ruang ' . fake()->name() . ' ' . fake()->numberBetween(1, 5),
            'date' => fake()->dateTimeBetween('-2 days', '3 days'),
            'description' => fake()->sentence(),
            'all' => fake()->boolean(),
            'start_time' => $start->format('H:i'),
            'end_time' => $start->copy()->addMinutes(fake()->numberBetween(10, 200))->format('H:i'),
            'status' => fake()->randomElement(['Belum', 'Sedang', 'Telah']),
        ];
    }
}
