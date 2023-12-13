'use client'

import { useRef, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { signIn } from "next-auth/react";
import { completeOrderAction } from "../../../util/completeOrderAction";

export default function CompleteOrderForm() {
    console.log("In CompleteOrderForm");
    const { data: session } = useSession();
    const username = useRef("");
    const pass = useRef("");

    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        // Checks to see if the session is available and the form has been submitted, and if so attempts to complete order.
        if (session && formSubmitted) {
            handleCompleteOrder();
        }
    });

    // This functiom attempts to login the user and 
    const loginAndOrderSubmit = async () => {
        try {
            const result = await signIn("credentials", {
                username: username.current,
                password: pass.current,
                redirect: false,
            });
            console.log(result);
            // Checking to make sure login occured and if so setting FormSubmitted to true.
            if (result?.ok === true) {
                setFormSubmitted(true);
            }   
        } catch (error){
            console.log(error)
        }
     
    };

    let timeRemaining: number = 0;
    if (session) { timeRemaining = session.user.accessTokenExpires - (Date.now() / 1000) };
    console.log(timeRemaining);

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
                setFormSubmitted(false);
                window.location.href = `/accounts`;
            }
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };

    return (
        <div>
            {!session || timeRemaining < 300 ? (
                <div>
                    <div>
                        <br></br>
                        <p style={{ fontWeight: 'bold' }}>Please confirm you login details to complete the order.</p>
                        <div>
                            <p>User Name:</p>
                            <input name="text" placeholder='username' onChange={(e) => (username.current = e.target.value)}></input>
                        </div>
                        <div>
                            <p>Password:</p>
                            <input name="password" type="password" placeholder='password' onChange={(e) => (pass.current = e.target.value)}></input>
                        </div>
                        <p> test1:123123 and test2:123123 are current test accounts (username:password).</p>
                    </div>
                    <button style={{ backgroundColor: "green" }} onClick={loginAndOrderSubmit}>
                        Login and Complete Order
                    </button>
                    <br></br><br></br>
                    <p>If you need to create an account please <a style = {{color: 'blue', textDecoration: 'underline' }}href = '/signup'>click here</a></p>
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