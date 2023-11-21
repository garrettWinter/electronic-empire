'use client'
import React from "react";

export default async function AddToCartButton(parms: { productId: number, qty: number }) {
    function AddToCart() {
        console.log('AddToCart has run. ProductId sent: ' + parms.productId + ' qty sent:' + parms.qty);
    }
    return (
        <button
            onClick={AddToCart}
            style={{
                backgroundColor: "green",
                color: "white"
            }}
        >Add to Cart</button>
    )
};