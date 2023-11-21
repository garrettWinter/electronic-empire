'use client'
import { stringify } from "querystring";
import React from "react";

export default function AddToCartButton(parms: { productId: number, qty: number }) {
    function AddToCart() {
         let product = {
            productId: parms.productId,
            qty: parms.qty
        }
        if (localStorage.cart === null || localStorage.cart === undefined) {
            let cart = [product];
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            let cart = JSON.parse(localStorage.cart);
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
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