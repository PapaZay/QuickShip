import { clearCart } from "@/lib/db/cart";
import { redirect } from "next/navigation";

export default async function CheckoutSuccess(){

    await clearCart();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed.</p>
                <a href="/" className="btn btn-primary">Continue Shopping</a>
            </div>
        </div>
    );
}