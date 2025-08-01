import { prisma } from "./prisma"
import { cookies } from "next/headers";
import { Cart, Prisma, CartItem } from "@prisma/client";
import { getServerSession } from "next-auth";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authOptions } from "@/app/@utils/authOptions";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: {product: true}}}
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: {product: true};
}>;

export type ShoppingCart = CartWithProducts & {
    size: number,
    subtotal: number,
}
export async function getCart(): Promise<ShoppingCart| null>{
    const session = await getServerSession(authOptions);

    let cart: CartWithProducts | null = null;

    if (session){
        cart = await prisma.cart.findFirst({
            where: {userId : session.user.id},
            include: {items: {include: {product: true}}},
        })
    } else {
    const localCartId = cookies().get("localCartId")?.value
    cart = localCartId ? 
    await prisma.cart.findUnique({
        where: {id: localCartId},
        include: {items: {include: {product: true}}}
    })
    : null;
}

    if (!cart){
        return null;
    }

    return{
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
    }

    
}
export async function CreateCart(): Promise<ShoppingCart> {
    const session = await getServerSession(authOptions);

    let newCart: Cart;

    if(session){
         newCart = await prisma.cart.create({
            data: {userId: session.user.id},
    
    });
    } else {
        newCart = await prisma.cart.create({
        data: {},
    });
    
    cookies().set("localCartId", newCart.id);
}

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0
    }
}

export async function clearCart() {
    const cart = await getCart();
    if (!cart) return;

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          deleteMany: {}
        }
      }
    });
  }

export async function mergeAnonymousCartIntoUserCart(userId: string){
    const localCartId = cookies().get("localCartId")?.value
    const cart = localCartId ?
    await prisma.cart.findUnique({
        where: {id: localCartId},
        include: {items: true},
    })
    : null;

    if (!cart) return;

    const userCart = await prisma.cart.findFirst({
        where: {userId},
        include: {items: true},
    })

    await prisma.$transaction(async tx => {
        if (userCart){
            const mergedCartItems = mergeCartItems(cart.items, userCart.items);

            await tx.cartItem.deleteMany({
                where: {cartId: userCart.id}
            })
            await tx.cart.update({
                where: {id: userCart.id},
                data: {
                    items: {
                        createMany: {
                                data: mergedCartItems.map(item => ({
                                cartId: userCart.id,
                                productId: item.productId,
                                quantity: item.quantity
                                })),
                        },
                    }
                }
            })
            await tx.cartItem.createMany({
                data: mergedCartItems.map(item => ({
                    cartId: userCart.id,
                    productId: item.productId,
                    quantity: item.quantity
                })),
            });

        } else {
            await tx.cart.create({
                data: {
                    userId,
                    items: {
                        createMany: {
                            data: cart.items.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            })),
                        },
                    },
                },
            });
        }
    
        await tx.cart.delete({
            where: {id: cart.id}
        })

        cookies().set("localCartId", "");
    });

}

function mergeCartItems(...cartItems: CartItem[][]){
    return cartItems.reduce((acc, items) => {
        items.forEach((item) => {
            const existingItem = acc.find((i) => i.productId === item.productId);
            if (existingItem){
                existingItem.quantity += item.quantity;
            } else {
                acc.push(item);
            }
            
            
        });
        return acc;

    }, [] as CartItem[]);

}