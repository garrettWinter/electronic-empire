import styles from '../page.module.css'
import AllProducts from '../components/product/AllProducts';

export default function ProductPage() {

  return (
    <main className={styles.main}>
      <div>
        <p style={{ fontWeight: "bolder", fontSize: "2.25em" }}>All Products:</p>
        <AllProducts />
      </div>
    </main>
  )
}