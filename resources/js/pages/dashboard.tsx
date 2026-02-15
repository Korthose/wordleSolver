import { Head } from '@inertiajs/react';
import { WordleForm } from '@/components/wordle-form';
import AppLayout from '@/layouts/app-layout';

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Daily Wordle" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <WordleForm/>
            </div>
        </AppLayout>
    );
}
