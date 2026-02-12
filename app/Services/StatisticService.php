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

    public function calculateLetterSum()
    {
        foreach ($this->alphabet as $i => $a) {
            $sum = array_sum($this->alphabet[$i]);

            $this->alphabet[$i]['count'] = $sum;
        }
    }

    public function findCharacterPosition()
    {
        foreach ($this->words as $word) {
            foreach (str_split(implode($word)) as $i => $l) {
                $this->alphabet[$l][$i] += 1;
            }
        }

        $this->calculateLetterSum();

        $content = '<?php'.PHP_EOL.PHP_EOL.'return '.var_export($this->alphabet, true).';';
        File::put(storage_path('alphabet.php'), $content);
    }
}
