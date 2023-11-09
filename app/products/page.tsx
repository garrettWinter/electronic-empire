// 'use client'

import styles from '../page.module.css'
import ProductDetails from '../components/ProductDetails';

type ctx = {
  query: any | null;
};

type ProductDetailsProps = {
  params: string | null
  searchParams: { id?: number } | null;
};

export async function getServerSideProps(ctx: ctx){
  const { ServerSearchParams } = ctx.query;


  return {
    props: {
      ServerSearchParams,
    },
  }

};

export default function ProductPage(serverSearchParams: ProductDetailsProps) {
  const params = serverSearchParams.searchParams?.id;
  const productId = params ? parseInt(params.toString(), 10) : null;
  return (
    <main className={styles.main}>
      <ProductDetails
        product={productId as number}
      />
    </main>
  )
}