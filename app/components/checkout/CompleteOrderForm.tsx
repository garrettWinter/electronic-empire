'use client'

import React from "react";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import CompleteOrderAction from "./CompleteOrderAction";

export default function CompleteOrderForm() {
    const { data: session } = useSession();

    //Checking to see if user is logged in, allow user to submit order.
    if (session === null || session === undefined) {
        return (
            <div>
                <p>Need to capture user details</p>
                <button style={{ backgroundColor: "green" }} onClick={CompleteOrderAction}>Create account and Complete Order</button>
            </div>
        );
    } else {
        //User is logged in, will just display Complete order
        return (
            <div>
                <button style={{ backgroundColor: "green" }} onClick={CompleteOrderAction}>Complete Order</button>
            </div>
        );

    }
}