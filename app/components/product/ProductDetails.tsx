'use client'
import React, { useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import AddToCartButton from '../checkout/AddToCartButton';


export default function ProductDetails(params: {
    product: {
        productId: number,
        productName: string,
        productDescription: string,
        productImage:string,
        productPrice: number,
    }
}) {
    const [quantity, setQuantity] = useState(1);
    const productDetails = params.product;
    //If no product was found via the query, this will display the user the NoProductFound component.
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Image
                    title={productDetails.productName}
                    alt={productDetails.productName}
                    src={productDetails.productImage}
                    width='200'
                    height='200'>
                </Image>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '5px' }}>
                    <p style={{ fontSize: '25px', fontWeight: 'bold' }}>{productDetails.productName}</p>
                    <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Price: {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(productDetails.productPrice)}</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p>QTY:</p>
                        <input
                            id='qtyField'
                            value={quantity}
                            type='number'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
                            style={{ width: '25px' }}></input>
                        <AddToCartButton
                            productId={productDetails.productId}
                            qty={quantity}
                        />
                    </div>
                </div>
            </div>
            <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Product Information:</p>
            <p>{productDetails.productDescription}</p>
        </div>
    )
}