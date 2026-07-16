'use client'
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { criarItens } from "../actions";
import { useTransition, useState } from 'react';
import { useRouter } from "next/navigation";

interface MainProps {
  listaId: string;
}

export function Main({ listaId }: MainProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const quantidade = Number(formData.get('produtoQuantidade'));

    if (quantidade <= 0) {
      setError('A quantidade deve ser maior que zero');
      return;
    }

    setError('');
    startTransition(async () => {
      await criarItens(formData, listaId);
      router.refresh();

      const form = document.querySelector('form') as HTMLFormElement;
      form.reset();
    });
  };

  return (
    <form className="flex flex-col space-y-4" action={handleSubmit}>
      <div className="flex flex-wrap gap-4">
        <Input
          required
          name="produtoNome"
          className="flex-1 min-w-[200px] text-base px-4 py-2"
          style={{ borderColor: 'var(--border-strong)', ['--tw-ring-color' as string]: 'var(--accent)' }}
          placeholder="Nome do produto"
        />
        <Input
          required
          type="number"
          min="0"
          step="0.01"
          name="produtoQuantidade"
          className="w-32 text-base px-4 py-2"
          style={{ borderColor: 'var(--border-strong)' }}
          placeholder="Quantidade"
        />
        <Select name="produtoTipo" required>
          <SelectTrigger
            className="w-32 text-base"
            style={{ borderColor: 'var(--border-strong)' }}
          >
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipos de unidades</SelectLabel>
              <SelectItem value="un">un</SelectItem>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="g">g</SelectItem>
              <SelectItem value="L">L</SelectItem>
              <SelectItem value="ml">ml</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <button
          className="btn-accent min-w-[100px]"
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Salvando...' : 'Adicionar'}
        </button>
      </div>
      {error && (
        <p className="text-sm" style={{ color: 'var(--nutri-e)' }}>{error}</p>
      )}
    </form>
  );
}