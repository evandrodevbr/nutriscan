'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { verificarLista } from '../actions'

export function IdInput() {
    const [id, setId] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (!id.trim()) {
            setError('Digite um ID válido')
            setLoading(false)
            return
        }

        try {
            const result = await verificarLista(id.trim(), true) // Forçar criação se não existir
            if (result.success) {
                localStorage.setItem('listaId', id.trim())
                router.push(`/lista/${id.trim()}`)
            } else {
                setError('Erro ao acessar/criar lista')
            }
        } catch (error) {
            setError('Erro ao processar solicitação')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Acesse sua lista
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Digite um ID para acessar ou criar uma nova lista
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <Input
                            type="text"
                            required
                            placeholder="Digite o ID da lista"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="appearance-none rounded-lg relative block w-full px-3 py-2 border dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {loading ? 'Carregando...' : 'Acessar/Criar Lista'}
                    </Button>
                </form>
            </div>
        </div>
    )
}