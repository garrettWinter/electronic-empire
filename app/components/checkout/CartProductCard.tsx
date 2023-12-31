'use client';

import React from "react";
import Image from 'next/image';
import PlaceHolderImage from '../../../public/images/200x200-Product-Placeholder.jpg';
import CartDeleteProductButton from "./CartDeleteProductButton";
import CartUpdateQtyButton from "./CartUpdateQtyButton";

interface Product {
    productId: number;
    productName: string;
    productPrice: number;
    qty: number;
}

export default function CartProductCard() {
    console.log("in product card");
    let cart = JSON.parse(localStorage.getItem("cart")!); //Forcing this to pass as this cannot be seen if no products in cart.
    console.log(cart)
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>

            {cart.map((product: Product) => (
                <div
                    key={product.productId}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 5
                    }}>
                    <Image
                        title={product.productName}
                        alt={product.productName}
                        width='200'
                        height='200'
                        src={PlaceHolderImage}>
                    </Image>
                    <div >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <CartDeleteProductButton
                                productId={product.productId} />
                            <p style={{ paddingLeft: 5 }}>{product.productName}</p>
                        </div>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>Price: {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(product.productPrice)}</p>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <CartUpdateQtyButton
                                productId={product.productId}
                                productQty={product.qty}
                            />
                        </div>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>Line Total: {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(product.productPrice * product.qty)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};