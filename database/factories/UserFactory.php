<?php

namespace Database\Factories;

use App\Models\Employment;
use App\Models\Office;
use App\Models\Room;
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
        return [
            'employment_id' => Employment::inRandomOrder()->value('id'),
            'office_id'     => Office::inRandomOrder()->value('id'),
            'room_id'       => Room::inRandomOrder()->value('id'),
            'name'          => fake()->name(),
            'phone'         => fake()->phoneNumber(),
            'paid'          => fake()->boolean(50),
            'verified'      => fake()->boolean(50),
            'admin'         => fake()->boolean(0),
            'capsize'       => fake()->numberBetween(1, 100),
            'arrive'        => fake()->date(),
            'depart'        => fake()->date(),
        ];
    }
}
