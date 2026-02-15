import { Head } from '@inertiajs/react';
import { WordleForm } from '@/components/wordle-form';
import AppLayout from '@/layouts/app-layout';

export default function Dashboard({words = []}) {
    return (
        <AppLayout>
            <Head title="Daily Wordle" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <WordleForm words={words}/>
            </div>
        </AppLayout>
    );
}
