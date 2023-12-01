'use client'

import React from "react";
import { useSession } from 'next-auth/react';

export default function CompleteOrderButton() {
    const { data: session } = useSession();

    async function completeOrder() {
        console.log("Order has been attempted to be completed");
        let cart = localStorage.getItem("cart");
        //Have IF logic for when user is not logged in to display error message asking to login/create account
        if (session === null || session === undefined) {
            //CREATE OVERLAY TELLING CUSTOMER THEY NEED TO LOGIN

        } else {
            console.log(session.user.accessToken);
            console.log(session.user.userId);
        }

        // Create API to complete order

    };
    //Checking to see if user is logged in, allow user to submit order.
    if (session === null || session === undefined) {
        return (
            <div>
                <p>Need to capture user details</p>
                <button style={{ backgroundColor: "green" }} onClick={completeOrder}>Create account and Complete Order</button>
            </div>
        );
    } else {
        //User is logged in, will just display Complete order
        return (
            <div>
                <button style={{ backgroundColor: "green" }} onClick={completeOrder}>Complete Order</button>
            </div>
        );

    }
}