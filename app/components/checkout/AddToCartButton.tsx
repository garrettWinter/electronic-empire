'use client'
import React from "react";

export default function AddToCartButton(parms: { productId: number, qty: number | string}) {
    function AddToCart() {
        console.log("In AddToCart");
        console.log(parms);
        let product = {
            productId: parms.productId,
            qty: parms.qty
        }
        if (localStorage.cart === null || localStorage.cart === undefined) {
            let cart = [product];
            console.log("new Cart created")
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            let cart = JSON.parse(localStorage.cart);
            let search = cart.findIndex(( search: { productId: number }) => search.productId === product.productId);
            if (search === -1) {
                //Product not present in Cart, adding to cart
                console.log("Product added to cart");
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                return;

            } else {
                console.log("Product in cart already, updating to incoming qty.");
                cart[search].qty = product.qty;
                localStorage.setItem('cart', JSON.stringify(cart));
                return;
            }
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