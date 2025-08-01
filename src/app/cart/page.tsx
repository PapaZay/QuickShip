import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";
import CheckoutButton from "./CheckoutButton";

export const metadata = {
      title: "Your Cart - Quick Ship",
  };


export default async function CartPage(){
    const cart = await getCart();
    return(
        <div>
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            {cart?.items.map(cartItem => (
                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity}/>
            ))}
            {!cart?.items.length && <p>Your Cart is Empty.</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <CheckoutButton />
                <p className="text-red-500 mt-2">
                    Note: This is a demo - pressing the checkout button will take you to a Stripe Checkout session. It is in test mode, so no charges will be made.</p>
            </div>
        </div>
    );
}