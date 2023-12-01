import styles from '../page.module.css';
import CartProductCard from '../components/checkout/CartProductCard';
import CompleteOrderForm from '../components/checkout/CompleteOrderForm';

export default function Cart() {

  return (
    <main className={styles.main}>
      <p>Shopping Cart</p>
      <CartProductCard />
      <div>
        <p>Order Total: $XXX.XX</p>
        <CompleteOrderForm/>
      </div>
    </main>
  )
}