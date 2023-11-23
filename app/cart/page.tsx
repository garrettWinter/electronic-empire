import styles from '../page.module.css';
import CartProductCard from '../components/checkout/CartProductCard';

export default function Cart() {
  return (
    <main className={styles.main}>
      <p>Shopping Cart</p>
      <CartProductCard />
      <div>
        <p>Order Total: $XXX.XX</p>
        <button> Complete Order Button</button>
      </div>
    </main>
  )
}