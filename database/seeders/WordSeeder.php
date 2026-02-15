<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class WordSeeder extends Seeder
{
    /**
     * Read and format the word list file.
     */
    private function getWords(): array
    {
        $path = resource_path('valid-wordle-words.txt');

        if (!File::exists($path)) {
            throw new \Exception("Word file not found at: {$path}");
        }

        return collect(File::lines($path))
            ->map(fn ($line) => trim($line))
            ->filter() 
            ->unique() 
            ->values()
            ->toArray();
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $words = $this->getWords();

        $chunks = array_chunk($words, 1000);

        foreach ($chunks as $chunk) {
            DB::table('words')->insert(
                array_map(fn ($word) => ['word' => $word], $chunk)
            );
        }
    }
}
