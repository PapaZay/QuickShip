"use client";
export default function CheckoutButton() {
      const handleCheckout = async () => {
          try {
              const response = await fetch('/api/checkout', {
                  method: 'POST',
              });
              const data = await response.json();
              if (data.url) {
                  window.location.href = data.url;
              }
          } catch (error) {
              console.error('Checkout error:', error);
          }
      };

      return (
          <button 
              className="btn btn-primary sm:w-[200px]"
              onClick={handleCheckout}
          >
              Checkout
          </button>
      );
  }