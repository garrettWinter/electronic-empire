import styles from '../page.module.css';
import CartProductCard from '../components/checkout/CartProductCard';
import CompleteOrderButton from '../components/checkout/CompleteOrderButton';

export default function Cart() {

  return (
    <main className={styles.main}>
      <p>Shopping Cart</p>
      <CartProductCard />
      <div>
        <p>Order Total: $XXX.XX</p>
        <CompleteOrderButton/>
      </div>
    </main>
  )
}