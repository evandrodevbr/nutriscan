import { Suspense } from 'react';
import { Main } from '@/app/components/Main';
import { CardList } from '@/app/components/CardList';
import { ThemeToggle } from '@/components/theme-toggle';
import { ListHeader } from '@/app/components/ListHeader';
import { Footer } from '@/app/components/Footer';
import { verificarLista } from '@/app/actions';
import { redirect } from 'next/navigation';

interface ListaPageProps {
    params: {
        id: string
    }
}

export default async function ListaPage({ params }: ListaPageProps) {
    const { success, exists } = await verificarLista(params.id);

    if (!success) {
        redirect('/');
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <ListHeader listaId={params.id} />
            <ThemeToggle />
            <div className="container mx-auto px-4 pt-20 pb-8">
                <div className="mb-8">
                    <Main listaId={params.id} />
                </div>

                <Suspense
                    fallback={
                        <div className="flex justify-center items-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1118A7] dark:border-[#212FCC]"></div>
                        </div>
                    }
                >
                    <CardList listaId={params.id} />
                </Suspense>

                <Footer />
            </div>
        </main>
    );
}