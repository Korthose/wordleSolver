<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class WordSeeder extends Seeder
{

    // Gets the txt file
    private function getTxt(): string
    {
        $path = resource_path('valid-wordle-words.txt');

        return File::get($path);
    }

    // Formats txt file
    private function formatTxt(): array
    {
        $file = $this->getTxt();

        // generally use PHP_EOL for new line
        return explode(PHP_EOL, $file);
    }

    /**
     * Deletes the last entry, as it most likely empty
     * due to formatting issues with the txt fetching
     */
    private function deleteLastEntry()
    {
        return DB::table('words')
            ->orderByDesc('id')
            ->limit(1)
            ->delete();
    }


     // Run the database seeds.
    public function run(): void
    {
        $words = $this->formatTxt();
        foreach ($words as $word) {
            DB::table('words')->insert([
                'word' => $word
            ]);
        }

        $this->deleteLastEntry();
    }
}
