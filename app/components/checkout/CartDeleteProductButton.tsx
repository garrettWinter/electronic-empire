import React from "react";

export default function CartDeleteProductButton(props: { productId: number }) {

    function deleteProductAction() {
        console.log("Delete Action");
        console.log(props.productId);
        let cart = JSON.parse(localStorage.cart);
        console.log(cart);
        let search = cart.findIndex((search: { productId: number }, index: number) => {
            console.log(search.productId);
            console.log(props.productId);
            search.productId == cart.productId;
            if (search.productId == props.productId) {
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