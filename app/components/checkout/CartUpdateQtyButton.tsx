import React from "react";

export default function CartUpdateQtyButton(props: {
    productId: number,
    productQty: number
}) {

    function cartUpdateQtyActon() {
        console.log("QTY Update Action has been triggered");
        console.log(props);

        const qtyField = document.getElementById('qtyField' + props.productId) as HTMLInputElement;
        if (qtyField === null) {
            return null
        }
        else {
            if (qtyField.value === '' || Number(qtyField.value) === Number(props.productQty)) {
                console.log("No Change, no action");
                return null
            }
            // if(document.getElementById('qtyField'+props.productId).placeholder == props.productQty){
            //     console.log("Entered same value as before, no action");
            // }
            else {
                console.log("User added a qty value take actions");
                let cart = JSON.parse(localStorage.cart);
                console.log(cart);
                let change = cart.findIndex((search: { productId: number }, index: number) => {
                    console.log(search.productId);
                    console.log(props.productId);
                    if (search.productId == props.productId) {
                        cart[index].qty = qtyField.value;
                        localStorage.setItem('cart', JSON.stringify(cart))
                        console.log(JSON.parse(localStorage.cart));
                        window.location.href = window.location.href;
                        return cart
                    }
                })
                console.log(change)
            }

        }
    }
    return (
        <div>
            <p>QTY:</p>
            <input id={'qtyField' + props.productId} type='number' placeholder={String(props.productQty)}></input>
            <button
                onClick={cartUpdateQtyActon}
                style={{ backgroundColor: 'red', padding: '0px 5px 0px 5px' }}>Update QTY</button>
        </div>
    )
}