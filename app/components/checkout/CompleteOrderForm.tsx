'use client'

import React from "react";
import { useSession } from 'next-auth/react';
import { completeOrderAction } from "../../../util/completeOrderAction";

export default function CompleteOrderForm() {
    const { data: session } = useSession();

    const handleCompleteOrder = async () => {
        if (!session) {
            // Display an error message or take appropriate action
            console.error("User session has been lost, please login again.");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")!); //Overrid a Type Script warning about null, but this cannot be seen if cart is null.

        try {
            if (cart === null || cart === undefined) {
                window.alert("Error, we dont see any products in your cart anymore, and therefore we are unable to submit your order.");
                return
            }
            const result = await completeOrderAction(session.user.accessToken, cart);
            console.log("Order submitted successfully:\n", result);
            if (!result.orderId) {
                window.alert("There was an issue, and we were unable to submit order.");
                return
            } else {
                window.alert("Your order has been placed. The Order ID is: " + result.orderId);
                localStorage.removeItem("cart");
                window.location.href = `/accounts`;
            }
        } catch (error) {
            console.error("Error submitting order:", error);
            // Handle the error as needed
        }
    };

    return (
        <div>
            {session === null || session === undefined ? (
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