import React from "react";

export default function CartDeleteProductButton(productId: number) {

    function deleteProductAction() {
        console.log("Delete Action");
        console.log(productId.productId);
        let cart = JSON.parse(localStorage.cart);
        console.log(cart);
        let search = cart.findIndex((search: { productId: number }, index) => {
            console.log(search.productId);
            console.log(productId.productId);
            search.productId == cart.productId;
            if (search.productId == productId.productId) {
                console.log("Match On " + index);
                cart.splice(index, 1)
                console.log(cart);
                localStorage.cart = JSON.stringify(cart);
                window.location.href = window.location.href;
                return cart
            }
        })
    }
    return (
        <button
            style={{ backgroundColor: 'red', padding: '0px 5px 0px 5px' }}
            onClick={deleteProductAction}
        >Delete</button>
    );


}