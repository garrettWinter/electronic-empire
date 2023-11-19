import React from "react";
import prisma from '../lib/prisma';
import Image from 'next/image';
import NoProductFound from './NoProductFound';


export default async function ProductDetails(params: { productId: number }) {
    let product = parseInt(params.productId.toString(), 10);
    const productDetails = await prisma.product.findUnique({
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
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image
                        title={productDetails!.productName}
                        alt={productDetails!.productName}
                        src={productDetails!.productImage}
                        width='200'
                        height='200'>
                    </Image>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '5px' }}>
                        <p style={{ fontSize: '25px', fontWeight: 'bold' }}>{productDetails!.productName}</p>
                        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Price: {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(productDetails!.productPrice.toNumber())}</p>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <p>QTY:</p>
                            <input placeholder='1' style={{ width: '25px' }}></input>
                            <button style={{ backgroundColor: 'green', color: 'white', padding: '3px' }}>BUY NOW</button>
                        </div>
                    </div>
                </div>
                <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Product Information:</p>
                <p>{productDetails?.ProductDescription}</p>
            </div>
        )
    }
};