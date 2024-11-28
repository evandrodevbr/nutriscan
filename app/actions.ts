'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

export async function verificarLista(id: string, criar: boolean = false) {
    try {
        let lista = await prisma.lista.findUnique({
            where: { id }
        });

        if (!lista && criar) {
            lista = await prisma.lista.create({
                data: { id }
            });
        }

        return {
            success: true,
            exists: !!lista,
            lista
        };
    } catch (error) {
        console.error('Erro ao verificar lista:', error);
        return { success: false, error: 'Erro ao processar solicitação' };
    }
}

export async function criarItens(formData: FormData, listaId: string) {
    try {
        const produto = formData.get('produtoNome') as string;
        const qtd = Number(formData.get('produtoQuantidade'));
        const tipo = formData.get('produtoTipo') as string;

        if (!produto || !qtd || !tipo) {
            throw new Error('Todos os campos são obrigatórios');
        }

        const novoProduto = await prisma.produtos.create({
            data: {
                nome: produto,
                qtd: qtd,
                tipoUN: tipo,
                listaId
            }
        });

        revalidatePath(`/lista/${listaId}`);
        return { success: true, data: novoProduto };
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        return { success: false, error: 'Erro ao criar produto' };
    }
}

export async function listarProdutos(listaId: string) {
    try {
        const produtos = await prisma.produtos.findMany({
            where: { listaId },
            orderBy: {
                id: 'desc'
            }
        });
        return produtos;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}

export async function deletarProduto(id: number, listaId: string) {
    try {
        await prisma.produtos.delete({
            where: {
                id: id,
                listaId: listaId
            }
        });

        revalidatePath(`/lista/${listaId}`);
        return { success: true, message: 'Produto removido com sucesso' };
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        return { success: false, error: 'Erro ao remover produto' };
    }
}

export async function toggleComprado(id: number, listaId: string) {
    try {
        const produto = await prisma.produtos.findUnique({
            where: { id }
        });

        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        await prisma.produtos.update({
            where: {
                id,
                listaId: listaId
            },
            data: {
                comprado: !produto.comprado
            }
        });

        revalidatePath(`/lista/${listaId}`);
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        return { success: false };
    }
}