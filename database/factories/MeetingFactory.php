<?php

namespace Database\Factories;

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
        return [
            'name' => 'Rapat ' . fake()->name(),
            'room' => 'Ruang ' . fake()->name() . ' ' . fake()->numberBetween(1, 5),
            'date' => fake()->dateTimeBetween('-2 days', '3 days'),
            'description' => fake()->sentence(),
            'all' => fake()->boolean(),
            'time' => $this->timesw(),
            'status' => fake()->randomElement(['Belum', 'Sedang', 'Telah'])
        ];
    }

    protected function timesw()
    {
        $startHour   = str_pad(fake()->numberBetween(6, 10), 2, '0', STR_PAD_LEFT);
        $startMinute = fake()->randomElement(['15', '30', '45', '00']);
        $endHour     = str_pad(fake()->numberBetween(10, 16), 2, '0', STR_PAD_LEFT);
        $endMinute   = fake()->randomElement(['15', '30', '45', '00']);

        return "$startHour.$startMinute - $endHour.$endMinute";
    }
}
