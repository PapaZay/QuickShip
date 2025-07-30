export default function CheckoutCancel(){
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    Payment Cancelled
                </h1>
                <p className="text-gray-600 mb-6">
                    Your Payment was cancelled. Your items are still in your cart.
                </p>
                <a href="/cart" className="btn btn-primary">Return to Cart</a>
            </div>
        </div>
    )
}