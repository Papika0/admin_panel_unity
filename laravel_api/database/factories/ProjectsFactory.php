<?php

namespace Database\Factories;

use App\Models\Projects;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Projects>
 */
class ProjectsFactory extends Factory
{
    protected $model = Projects::class;

    public function definition()
    {
        $start       = $this->faker->dateTimeBetween('-2 years', 'now');
        $end         = $this->faker->dateTimeBetween($start, '+1 year');
        $mainSeed    = $this->faker->unique()->uuid;
        $renderSeed  = $this->faker->unique()->uuid;
        $gallerySeeds= [$this->faker->unique()->uuid, $this->faker->unique()->uuid, $this->faker->unique()->uuid];

        return [
            'title'           => [
                'en' => $this->faker->sentence(3),
                'ka' => $this->faker->sentence(3, true),
                'ru' => $this->faker->sentence(3, true),
            ],
            'description'     => [
                'en' => $this->faker->paragraph(),
                'ka' => $this->faker->paragraph(2, true),
                'ru' => $this->faker->paragraph(2, true),
            ],
            'location'        => [                              // ← new
                'en' => $this->faker->city,
                'ka' => $this->faker->city,    // you can swap to more Georgian-specific if you like
                'ru' => $this->faker->city,
            ],
            'status'          => Arr::random(['planning','ongoing','completed']),
            'start_date'      => $start->format('Y-m-d'),
            'completion_date' => $end->format('Y-m-d'),

            'main_image'      => "https://picsum.photos/seed/{$mainSeed}/800/600",
            'render_image'    => "https://picsum.photos/seed/{$renderSeed}/800/600",
            'gallery_images'  => [
                "https://picsum.photos/seed/{$gallerySeeds[0]}/400/300",
                "https://picsum.photos/seed/{$gallerySeeds[1]}/400/300",
                "https://picsum.photos/seed/{$gallerySeeds[2]}/400/300",
            ],

            'architect_name'  => $this->faker->name,
            'year'            => $this->faker->year,
            'is_active'       => $this->faker->boolean(80),
            'is_featured'     => $this->faker->boolean(30),
            'latitude'        => $this->faker->latitude(41.6, 42.3),
            'longitude'       => $this->faker->longitude(43.5, 44.0),
            'meta_title'      => $this->faker->sentence(6),
            'meta_description'=> $this->faker->sentence(12),
        ];
    }
}
