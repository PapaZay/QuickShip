"use server";
import { prisma } from "@/lib/db/prisma";
import { CreateCart, getCart } from "@/lib/db/cart";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productId: string){
    const cart = (await getCart() ?? await CreateCart());

    const articleInCart = cart.items.find(item => item.productId == productId)

    if (articleInCart){
        await prisma.cart.update({
            where: {id: cart.id},
            data: {
                items: {
                    update:{
                        where: {id: articleInCart.id},
                        data: {quantity: {increment: 1}}
                    }
                }
            }
        })

    } else {
        await prisma.cart.update({
            where: {id : cart.id},
            data: {
                items: {
                    create: {
                        productId,
                        quantity: 1,
                    }
                }
            }
        })
    }

    revalidatePath("products/[id]")
}