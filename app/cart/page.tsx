import styles from '../page.module.css';
import CartProductCard from '../components/checkout/CartProductCard';

export default function Cart() {
  console.log('in Cart function:');
  // if (localStorage.cart === null) {
  //   <div>Cart Empty</div>
  // }

  // let cartProducts: string | null = JSON.parse(localStorage.getItem('Cart'));
  // console.log (cartProducts);
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