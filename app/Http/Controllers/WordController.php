<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WordController extends Controller
{
    public function start() {
        return Inertia::render('dashboard', [
            'words' => [
                [
                    'word' => 'SALET',
                    'statuses' => [
                        0 => 0,
                        1 => 0,
                        2 => 0,
                        3 => 0,
                        4 => 0,
                    ],
                ],
            ],
        ]);
    }

    public function store(Request $request)
    {
        dd($request);
    }
}
