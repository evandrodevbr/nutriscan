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
        } catch {
            setError('Erro ao processar solicitação')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ background: 'var(--bg-base)' }}
        >
            <div
                className="max-w-md w-full space-y-8 p-8 rounded-xl"
                style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: '0 8px 32px -8px rgba(30,24,16,0.10)',
                }}
            >
                <div>
                    <h2
                        className="mt-6 text-center text-3xl font-display"
                        style={{ color: 'var(--fg-primary)' }}
                    >
                        Acesse sua lista
                    </h2>
                    <p
                        className="mt-2 text-center text-sm"
                        style={{ color: 'var(--fg-muted)' }}
                    >
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
                            className="appearance-none rounded-lg relative block w-full px-3 py-2"
                            style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-surface)' }}
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-center" style={{ color: 'var(--nutri-e)' }}>{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-accent w-full justify-center"
                    >
                        {loading ? 'Carregando...' : 'Acessar/Criar Lista'}
                    </button>
                </form>
            </div>
        </div>
    )
}