'use client'

import styles from '../page.module.css';
import CartProductCard from '../components/checkout/CartProductCard';
import CompleteOrderForm from '../components/checkout/CompleteOrderForm';

export default function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart")!) || []; //Overrid a Type Script warning about null, as if the cart item is null, it will set to empty array
  if (cart === null || cart === undefined || cart.length === 0) {
    return (
      <main className={styles.main}>
        Empty Cart Please continue shopping
      </main>
    )
  } else {
    console.log(cart)
    let orderTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      orderTotal = orderTotal + (cart[i].productPrice * cart[i].qty);
    }

    return (
      <main className={styles.main}>
        <p>Shopping Cart</p>
        <CartProductCard />
        <div>
          <p style={{ fontSize: 16, fontWeight: 'bold' }}>Order Total: {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(orderTotal)}</p>
          <CompleteOrderForm />
        </div>
      </main>
    )
  };
};