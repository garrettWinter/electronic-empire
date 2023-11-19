import styles from '../page.module.css'
import AllProducts from '../components/product/AllProducts';

export default function ProductPage() {

  return (
    <main className={styles.main}>
      <AllProducts />
    </main>
  )
}