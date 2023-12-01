import React from "react";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

export default function CompleteOrderAction() {
    console.log("CompleteOrderAction has been triggered");

    const { data: session } = useSession();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    console.log("Order has been attempted to be completed");
    let cart = localStorage.getItem("cart");
    //Have IF logic for when user is not logged in to display error message asking to login/create account
    if (session === null || session === undefined) {
        //CREATE OVERLAY TELLING CUSTOMER THEY NEED TO LOGIN

    } else {
        console.log(session.user.accessToken);
        console.log(session.user.userId);
        console.log(cart);
        // API call to complete order

        useEffect(() => {
            fetch('/api/submitOrder', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accessToken: session.user.accessToken,
                    products: cart,
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    setLoading(false)
                })
        });
        console.log(data);
    }
    return
};