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
        $start = $this->faker->dateTimeBetween('-2 years', 'now');
        $end   = $this->faker->dateTimeBetween($start, '+1 year');

        return [
            'title'            => [
                'en' => $this->faker->sentence(3),
                'ka' => $this->faker->sentence(3, true),
                'ru' => $this->faker->sentence(3, true),
            ],
            'description'      => [
                'en' => $this->faker->paragraph(),
                'ka' => $this->faker->paragraph(2, true),
                'ru' => $this->faker->paragraph(2, true),
            ],
            'location'         => $this->faker->city,
            'status'           => Arr::random(['planning', 'ongoing', 'completed']),
            'start_date'       => $start->format('Y-m-d'),
            'completion_date'  => $end->format('Y-m-d'),
            'main_image'       => $this->faker->imageUrl(800, 600, 'building', true),
            'render_image' => $this->faker->imageUrl(800, 600, 'render_building', true),
            'gallery_images'   => [
                $this->faker->imageUrl(400,300,'interior',true),
                $this->faker->imageUrl(400,300,'architecture',true),
                $this->faker->imageUrl(400,300,'exterior',true),
            ],
            'architect_name'   => $this->faker->name,
            'year'             => $this->faker->year,
            'is_active'        => $this->faker->boolean(80),
            'is_featured'      => $this->faker->boolean(30),
            'latitude'         => $this->faker->latitude(41.6, 42.3),
            'longitude'        => $this->faker->longitude(43.5, 44.0),
            'meta_title'       => $this->faker->sentence(6),
            'meta_description' => $this->faker->sentence(12),
        ];
    }
}
