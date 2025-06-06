<?php

namespace Database\Seeders;

use App\Models\Translation;
use Database\Factories\TranlsationFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Translation::factory()->count(80)->create();
    }
}
