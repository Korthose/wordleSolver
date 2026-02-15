import { useForm } from '@inertiajs/react';

const STATUS = {
    NOT_FOUND: 0, // grey
    PARTIAL: 1, // yellow
    CORRECT: 2, // green
};

// type initialization
interface WordEntry {
    word: string;
    statuses: number[];
}

interface Props {
    words?: WordEntry[];
}

export function WordleForm({ words = [] }: Props) {
    const initializeGrid = () => {
        const grid = [...words];

        // fills the array till 6 rows present
        while (grid.length < 6) {
            grid.push({
                word: '',
                statuses: Array(5).fill(STATUS.NOT_FOUND),
            });
        }

        return grid.map((row) => ({
            word: (row.word || '').toUpperCase().padEnd(5, ' ').slice(0, 5),
            statuses: row.statuses || Array(5).fill(STATUS.NOT_FOUND),
        }));
    };

    const { data, setData, get, processing } = useForm({
        words: initializeGrid(),
    });

    const toggleStatus = (rowIndex: number, colIndex: number) => {
        const newWords = [...data.words];
        const currentStatus = newWords[rowIndex].statuses[colIndex];

        // cycle status when clicking
        newWords[rowIndex].statuses[colIndex] = (currentStatus + 1) % 3;

        setData('words', newWords);
    };

    const getColors = (status: number) => {
        switch (status) {
            case STATUS.NOT_FOUND:
                return 'bg-gray-500 border-gray-500 text-white';
            case STATUS.PARTIAL:
                return 'bg-yellow-500 border-yellow-500 text-white';
            case STATUS.CORRECT:
                return 'bg-green-600 border-green-600 text-white';
            default:
                return 'border-gray-700 bg-transparent text-white';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        get('/submit-words');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-2 text-white"
        >
            <h1 className="mb-6 text-3xl font-bold tracking-wider uppercase">
                Wordle Grid
            </h1>

            {/* Grid Container */}
            <div className="mb-8 grid grid-rows-6 gap-2">
                {data.words.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1 sm:gap-2">
                        {[...Array(5)].map((_, colIndex) => {
                            const char = row.word[colIndex]?.trim() || '';
                            const status = row.statuses[colIndex];

                            const isEmptyBlock = char === '';

                            return (
                                <div key={colIndex} className="relative">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleStatus(rowIndex, colIndex)
                                        }
                                        className={`flex h-12 w-12 items-center justify-center border-2 text-2xl font-bold uppercase transition-all duration-150 select-none sm:h-14 sm:w-14 sm:text-3xl ${
                                            isEmptyBlock
                                                ? 'cursor-default border-gray-700 bg-transparent'
                                                : `cursor-pointer hover:opacity-90 ${getColors(status)}`
                                        } `}
                                        disabled={isEmptyBlock}
                                    >
                                        {char}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mb-8 flex gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 border border-gray-500 bg-gray-500"></div>
                    <span>Miss</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 border border-yellow-500 bg-yellow-500"></div>
                    <span>Partial</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 border border-green-600 bg-green-600"></div>
                    <span>Match</span>
                </div>
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full max-w-xs rounded bg-blue-600 px-8 py-3 font-bold text-white shadow-lg transition hover:bg-blue-500 disabled:opacity-50"
            >
                {processing ? 'Submitting...' : 'Update Grid'}
            </button>
        </form>
    );
}
