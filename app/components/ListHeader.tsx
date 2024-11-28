'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { RefreshCcw, Plus } from "lucide-react"
import { useState } from "react"
import { verificarLista } from "../actions"
import { ThemeToggle } from "@/components/theme-toggle"

interface ListHeaderProps {
  listaId: string
}

export function ListHeader({ listaId }: ListHeaderProps) {
  const router = useRouter()
  const [novaLista, setNovaLista] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => setIsRefreshing(false), 1000) // Visual feedback
  }

  const handleNovaLista = async () => {
    if (!novaLista.trim()) {
      setError('Digite um nome para a lista')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await verificarLista(novaLista.trim())

      if (result.exists) {
        if (confirm(`A lista "${novaLista}" já existe. Deseja acessá-la?`)) {
          router.push(`/lista/${novaLista.trim()}`)
        }
      } else {
        if (confirm(`Tem certeza de que deseja criar uma nova lista chamada "${novaLista}"?`)) {
          const createResult = await verificarLista(novaLista.trim(), true)
          if (createResult.success) {
            router.push(`/lista/${novaLista.trim()}`)
          } else {
            setError('Erro ao criar nova lista')
          }
        }
      }
    } catch {
      setError('Erro ao processar solicitação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">
            Lista Atual: {listaId}
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Lista</DialogTitle>
                <DialogDescription>
                  Digite o nome da nova lista ou acesse uma existente
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Nome da lista"
                  value={novaLista}
                  onChange={(e) => setNovaLista(e.target.value)}
                />
                {error && (
                  <p className="text-destructive text-sm">{error}</p>
                )}
              </div>
              <DialogFooter>
                <Button
                  onClick={handleNovaLista}
                  disabled={loading}
                >
                  {loading ? 'Processando...' : 'Continuar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className={isRefreshing ? 'animate-spin' : ''}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}