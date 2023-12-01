import React from 'react';
import prisma from '../../lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import NoProductFound from './NoProductFound';
import AddToCartButton from '../checkout/AddToCartButton';

export default async function ProductSearchResults(params: { searchTerm: string }) {
    let searchedProducts = await prisma.product.findMany({
        where: {
            OR: [
                {
                    productName: { contains: params.searchTerm }
                },
                {
                    productDescription: { contains: params.searchTerm }
                },
            ]
        },
    });
    let numberOfProducts = Object.values(searchedProducts).length;

    if (numberOfProducts === 0) {
        return (
            <NoProductFound />
        )
    } else {
        return (
            //width setting below, as temp display and should be removed when migrated to tailWind.
            <div>
                <p>There are {numberOfProducts} products in the results.</p>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap', width: '50%', justifyContent: 'center', paddingTop: 20 }}>
                    {searchedProducts.map((product) => (
                        <div key={product.productId} style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ display: "flex", flexDirection: "column", border: 'solid 2px', margin: 10, padding: 10, minWidth: 500 }}>
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
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", padding: '7px' }}>
                                        <p style={{ maxWidth: '200px' }}>{product.productDescription}</p>
                                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>Price: {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(product.productPrice.toNumber())}</p>
                                        <AddToCartButton
                                            productId={product.productId}
                                            productName={product.productName}
                                            productPrice={product.productPrice}
                                            productImage={product.productImage}
                                            qty={1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
        )
    }
};