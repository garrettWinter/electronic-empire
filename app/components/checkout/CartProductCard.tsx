'use client';

import React from "react";
import Image from 'next/image';
import PlaceHolderImage from '../../../public/images/200x200-Product-Placeholder.jpg';

export default function CartProductCard() {
    console.log("in product card");
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart)
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>

            {cart.map((product) => (
                <div style={{
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
                            <button style={{ backgroundColor: 'red', padding: '0px 5px 0px 5px' }}>Delete</button>
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
                            <p>QTY:</p>
                            <input type='number' placeholder={product.qty}></input>
                            <button style={{ backgroundColor: 'red', padding: '0px 5px 0px 5px' }}>Update QTY</button>
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