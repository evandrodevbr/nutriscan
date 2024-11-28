import prisma from "@/lib/prisma";

export async function Items() {
    const produtos = await prisma.produtos.findMany({});
    console.log(produtos);
}
