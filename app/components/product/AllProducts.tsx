import react from 'react';
import prisma from '../../lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export default async function AllProducts() {
    let allProducts = await prisma.product.findMany({
    });
    return (
        //width setting below, as temp display and should be removed when migrated to tailWind.
        <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap', width: '50%', justifyContent: 'center', paddingTop: 20 }}>
            {allProducts.map((product) => (
                <div key={product.productId} style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", border: 'solid 2px', margin: 10, padding: 10, minWidth: 400 }}>
                        <Link href={`/products?id=${product.productId}`}>
                            <p style={{ fontSize: 20, fontWeight: 'bolder' }}>{product.productName}
                            </p>
                        </Link>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Link href={`/products/${product.productId}`}>
                                <Image
                                    title={product.productName}
                                    alt={product.productName}
                                    src={product.productImage}
                                    width='200'
                                    height='200'>
                                </Image>
                            </Link>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>Price: {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(product.productPrice.toNumber())}</p>
                                <button style={{ backgroundColor: "green", color: "white" }}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            )}
        </div>
    )
};