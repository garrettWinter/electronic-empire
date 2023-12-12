'use client'

import React from "react";
import { useSession } from 'next-auth/react';
import { completeOrderAction } from "../../../util/completeOrderAction";

export default function CompleteOrderForm() {
    console.log("In CompleteOrderForm");
    const { data: session } = useSession();

    let timeRemaining: number = 0;
    if (session) {timeRemaining = session.user.accessTokenExpires - (Date.now()/1000)};
    console.log (timeRemaining);

    const handleCompleteOrder = async () => {
        if (!session) {
            console.error("User session has been lost, please login again.");
            return;
        };

        const cart = JSON.parse(localStorage.getItem("cart")!); //Overrid a Type Script warning about null, but this cannot be seen if cart is null.

        if (cart === null || cart === undefined) {
            window.alert("Error, we dont see any products in your cart anymore, and therefore we are unable to submit your order.");
            return
        };

        try {
            const result = await completeOrderAction(session.user.accessToken, cart);
            if (!result.orderId) {
                window.alert("Error Occured preventing order placement. This could be due to a old access token. Please login and try again.\n" + result);
                window.location.href = '/cart'
                //Future DEV - Have this so it opens a modal, and has the user enter login details and 
                return
            } else {
                console.log("Order submitted successfully:\n", result);
                window.alert("Your order has been placed. The Order ID is: " + result.orderId);
                localStorage.removeItem("cart");
                window.location.href = `/accounts`;
            }
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };

    return (
        <div>
            {!session || timeRemaining < 300? (
                <div>
                    <p>Need to capture user details</p>
                    <button style={{ backgroundColor: "green" }} onClick={handleCompleteOrder}>
                        Create account and Complete Order
                    </button>
                </div>
            ) : (
                <div>
                    <button style={{ backgroundColor: "green" }} onClick={handleCompleteOrder}>
                        Complete Order
                    </button>
                </div>
            )}
        </div>
    );
}