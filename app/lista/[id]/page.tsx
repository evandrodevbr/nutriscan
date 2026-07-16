import { Suspense } from 'react';
import { Main } from '@/app/components/Main';
import { CardList } from '@/app/components/CardList';
import { ThemeToggle } from '@/components/theme-toggle';
import { ListHeader } from '@/app/components/ListHeader';
import { Footer } from '@/app/components/Footer';
import { verificarLista } from '@/app/actions';
import { redirect } from 'next/navigation';

interface ListaPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ListaPage({ params }: ListaPageProps) {
    const { id } = await params;
    const { success } = await verificarLista(id);

    if (!success) {
        redirect('/');
    }

    return (
        <main className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-base)' }}>
            <ListHeader listaId={id} />
            <ThemeToggle />
            <div className="mx-auto px-4 pt-20 pb-8" style={{ maxWidth: 1400 }}>
                <div className="mb-8">
                    <Main listaId={id} />
                </div>

                <Suspense
                    fallback={
                        <div className="flex justify-center items-center p-8">
                            <div
                                className="animate-spin rounded-full h-8 w-8 border-b-2"
                                style={{ borderColor: 'var(--accent)' }}
                            />
                        </div>
                    }
                >
                    <CardList listaId={id} />
                </Suspense>

                <Footer />
            </div>
        </main>
    );
}