import styles from '../../page.module.css'
import ProductDetails from '../../components/product/ProductDetails';


export default function ProductPage({ params, }: { params: { productId: number } }) {
  const product = params.productId;
  return (
    <main className={styles.main}>
      <ProductDetails
        productId={product}
      />
    </main>
  )
}