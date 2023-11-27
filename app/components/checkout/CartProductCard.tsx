'use client'

import React from "react";
import Image from 'next/image';
import PlaceHolderImage from '../../../public/images/200x200-Product-Placeholder.jpg';

export default function CartProductCard() {
    console.log("in product card")
    console.log(localStorage.cart)
    return (
        <div style={{
            display: 'flex'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Image
                    // title={product.productName}
                    alt='{product.productName}'
                    width='200'
                    height='200'
                    src={PlaceHolderImage}>
                </Image>
                <div >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <button>Delete</button>
                        <p>Product Name</p>
                    </div>
                    <p>Price: $XX,XXX.XX</p>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <p>QTY:</p>
                        <input></input>
                    </div>
                    <p>Line Total: $X,XXX.XX</p>
                </div>
            </div>
        </div>
    )
};