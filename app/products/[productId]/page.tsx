import styles from '../../page.module.css'
import ProductDetails from '../../components/ProductDetails';


export default function ProductPage({ params,}: {params: {productId: number}}) {
  const product = params.productId;
console.log("In Dynamic Route Param is: " + product);
  return (
    <main className={styles.main}>
      <ProductDetails
        productId={product}
      />
    </main>
  )
}