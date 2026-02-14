import { useForm } from '@inertiajs/react';
import React from 'react';

const STATUS = {
    NOT_FOUND: 0,
    PARTIAL: 1,
    CORRECT: 2,
};

const WordleForm = ({ name = 'REACT' }) => {
    // Ensure name is uppercase, 5 chars max, and padded with spaces if short
    const cleanName = (name || '').toUpperCase().padEnd(5, ' ').slice(0, 5);

    const { data, setData, post } = useForm({
        word: cleanName,
        // Initialize statuses as an array of 0s (Grey)
        statuses: Array(5).fill(STATUS.NOT_FOUND),
    });

    const rows = 6;
    const cols = 5;

    const toggleStatus = (index: number) => {
        const currentStatus = data.statuses[index];
        // Cycle: 0 -> 1 -> 2 -> 0
        const newStatus = (currentStatus + 1) % 3;

        const newStatuses = [...data.statuses];
        newStatuses[index] = newStatus;

        setData('statuses', newStatuses);
    };

    const getColors = (status: unknown) => {
        switch (status) {
            case STATUS.NOT_FOUND:
                return 'bg-gray-500 border-gray-500 text-white'; // Grey
            case STATUS.PARTIAL:
                return 'bg-yellow-500 border-yellow-500 text-white'; // Yellow
            case STATUS.CORRECT:
                return 'bg-green-600 border-green-600 text-white'; // Green
            default:
                return 'border-gray-700 text-white';
        }
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        post('/submit-word');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-white">
            <h1 className="mb-8 text-4xl font-bold">wordleSolver</h1>

            {/* The Grid */}
            <div className="mb-8 grid grid-rows-6 gap-2">
                {[...Array(rows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                        {[...Array(cols)].map((_, colIndex) => {
                            // Only the first row is interactive and shows the name
                            const isRowActive = rowIndex === 0;
                            const char = isRowActive ? data.word[colIndex] : '';
                            const status = isRowActive
                                ? data.statuses[colIndex]
                                : STATUS.NOT_FOUND;

                            return (
                                <div key={colIndex} className="relative">
                                    {/* 1. VISIBLE INTERACTIVE BUTTON
                                      Acts as the visual block. Clicking this changes the state.
                                    */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            isRowActive &&
                                            toggleStatus(colIndex)
                                        }
                                        disabled={!isRowActive} // Only enable first row
                                        className={`flex h-14 w-14 items-center justify-center border-2 text-3xl font-bold uppercase transition-colors duration-150 ${isRowActive ? 'cursor-pointer hover:opacity-90' : 'cursor-default border-gray-700 bg-transparent'} ${isRowActive ? getColors(status) : ''} `}
                                    >
                                        {char}
                                    </button>

                                    {/* 2. HIDDEN INPUTS FOR SUBMISSION
                                      These hold the actual values (0, 1, 2) so they are submitted
                                      even if you use standard HTML forms instead of Inertia.
                                    */}
                                    {isRowActive && (
                                        <>
                                            {/* Holds the Status Value (0, 1, 2) */}
                                            <input
                                                type="hidden"
                                                name={`statuses[${colIndex}]`}
                                                value={status}
                                            />
                                            {/* Holds the Letter (e.g., "R") */}
                                            <input
                                                type="hidden"
                                                name={`letters[${colIndex}]`}
                                                value={char}
                                            />
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Instructions */}
            <div className="mb-6 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-500"></div>
                    Not Found
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-yellow-500"></div>
                    Partial
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-green-600"></div>
                    Correct
                </div>
            </div>

            <button
                type="submit"
                className="rounded bg-blue-600 px-8 py-3 font-bold text-white shadow-lg transition hover:bg-blue-500"
            >
                Save Wordle State
            </button>
        </form>
    );
};

export default WordleForm;
