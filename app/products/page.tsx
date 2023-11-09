'use client'

import styles from '../page.module.css'
import { useSearchParams } from 'next/navigation';
import ProductDetails from '../components/ProductDetails';

type ProductDetailsProps = {
  product: number | null;
};

export default function ProductPage(props: ProductDetailsProps) {
  const searchParams = useSearchParams();
  const params = searchParams.get('id');
  const product = params ? parseInt(params, 10) : null
  return (
    <main className={styles.main}>
      <ProductDetails
        product={product as number}
      />
    </main>
  )
}