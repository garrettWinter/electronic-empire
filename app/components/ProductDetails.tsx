import React from "react";
import prisma from '../lib/prisma';
import Image from 'next/image';

type ProductDetailsProps = {
    product: number;
};

export default async function ProductDetails(props: ProductDetailsProps) {
    //Logic in place to allow for us to load a different content based if their is a query peram of id in the URL.

    //UPDATE SO CHECKS TO MAKE SURE CAN FIND RESULT AS WELL!!!!
    if (props.product === null) {
        return (
            <div>No id query string present... Make it so this is the general all products page component.</div>
        )
    } else {
        const productDetails = await prisma.product.findUnique({
            where: {
                productId: props.product,
            },
        });
        console.log(productDetails);

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
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding:'5px' }}>
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