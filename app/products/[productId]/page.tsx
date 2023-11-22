import styles from '../../page.module.css'
import ProductDetails from '../../components/product/ProductDetails';
import NoProductFound from '../../components/product/NoProductFound';
import prisma from '../../lib/prisma';


export default async function ProductPage({ params, }: { params: { productId: number } }) {
  let product = parseInt(params.productId.toString(), 10);
  let productDetails = await prisma.product.findUnique({
    where: {
      productId: (product),
    },
    });
  //If no product was found via the query, this will display the user the NoProductFound component.
  if (productDetails === null) {
    return (
      <NoProductFound />
    )
  } else {
    // Convert 'Decimal' to 'number' for 'productPrice'
    const formattedProductDetails = {
      ...productDetails,
      productPrice: productDetails.productPrice.toNumber(),
    };
    return (
      <main className={styles.main}>
        <ProductDetails
          product={formattedProductDetails}
        />
      </main>
    )
  }
}