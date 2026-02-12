<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class StatisticService
{
    private $sum;

    private $words;

    private $letter;

    private $config;

    private $alphabet;

    /**
     * @param  $sum
     */
    public function __construct()
    {
        $this->sum = DB::table('words')->count();
        $this->words = json_decode(DB::table('words')->select('word')->get(), true);
        $this->alphabet = Config::collection('alphabet_template')->toArray();
    }

    public function findCharacterPositions()
    {
        //
    }

    public function createStatistic()
    {
        foreach ($this->words as $word) {
            foreach (str_split(implode($word)) as $i => $l) {
                $this->alphabet[$l][$i] += 1;
            }
        }

        $content = '<?php'.PHP_EOL.PHP_EOL.'return '.var_export($this->alphabet, true).';';
        File::put(storage_path('alphabet_template.php'), $content);
    }
}
