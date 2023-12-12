'use client'

import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import CartProductCard from '../components/checkout/CartProductCard';
import CompleteOrderForm from '../components/checkout/CompleteOrderForm';

export default function Cart() {

  // Defining a type definition for the cart object
  interface CartItem {
    productId: number;
    productImage: string;
    productName: string;
    productPrice: number;
    qty: number;
  };

  const [cart, setCart] = useState<CartItem[]>([]);

  // Using the useEffect hook to call make the call from the server to the client to access localstorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")!) || [];
    setCart(storedCart);
  }, []);

  // Rendering a empty cart message when the cart object is not present or empty
  if (cart === null || cart === undefined || cart.length === 0) {
    return (
      <main className={styles.main}>
        Empty Cart Please continue shopping
      </main>
    );
  };

  // Calculate order total based on cart data
  let orderTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    orderTotal = orderTotal + (cart[i].productPrice * cart[i].qty);
  };

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
  );
};