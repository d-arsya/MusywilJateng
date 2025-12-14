<?php

namespace Database\Factories;

use App\Models\Employment;
use App\Models\Office;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $arrive = Carbon::instance(fake()->dateTimeBetween('-2 days', '+3 days'));

        return [
            'employment_id' => Employment::inRandomOrder()->value('id'),
            'office_id'     => Office::inRandomOrder()->value('id'),
            'room_id'       => fake()->randomElement([null, Room::inRandomOrder()->value('id')]),
            'name'          => fake()->name(),
            'phone'         => fake()->phoneNumber(),
            'paid'          => fake()->boolean(50),
            'clothsize'       => fake()->randomElement(['S', 'M', 'L', 'XL', 'XXL']),
            'arrive'        => $arrive,
            'depart'        => $arrive->copy()->addDays(fake()->numberBetween(2, 10)),
        ];
    }
}
