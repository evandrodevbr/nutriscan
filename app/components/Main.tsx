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
          className="flex-1 min-w-[200px] text-base px-4 py-2 border-[#383838] focus:border-[#1118A7]"
          placeholder="Nome do produto"
        />
        <Input
          required
          type="number"
          min="0"
          step="0.01"
          name="produtoQuantidade"
          className="w-32 text-base px-4 py-2 border-[#383838] focus:border-[#1118A7]"
          placeholder="Quantidade"
        />
        <Select name="produtoTipo" required>
          <SelectTrigger className="w-32 text-base border-[#383838] focus:border-[#1118A7]">
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
        <Button
          className="bg-[#1118A7] hover:bg-[#080C94] text-white min-w-[100px]"
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Salvando...' : 'Adicionar'}
        </Button>
      </div>
      {error && (
        <p className="text-[#CC2121] text-sm">{error}</p>
      )}
    </form>
  );
}