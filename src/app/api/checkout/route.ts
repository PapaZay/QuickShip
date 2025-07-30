import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'
import { env } from "@/lib/env";
import { getCart } from "@/lib/db/cart";
import { get } from "http";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest){
    try{
        const cart = await getCart();

        if (!cart || cart.items.length === 0){
            return NextResponse.json({error: 'Cart is empty'}, {status: 400});
        }
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: cart.items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product.name,
                        images: [item.product.imageUrl],
                    },
                    unit_amount: item.product.price,
                },
                quantity: item.quantity,
            })),
            success_url: `${request.nextUrl.origin}/checkout/success`,
            cancel_url: `${request.nextUrl.origin}/checkout/cancel`,
        });
        return NextResponse.json({url: session.url});
    } catch (error) {
        console.error('Stripe error:', error);
        return NextResponse.json({error: 'Failed to create checkout session'}, {status: 500});
    }

}