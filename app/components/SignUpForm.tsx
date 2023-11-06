import React, { useRef } from "react";
import { signIn } from "next-auth/react";

const SignUpForm = () => {
    const username = useRef("");
    const pass = useRef("");

    const onSubmit = async () => {
        //FUTURE DEVELOPMENT --- CHECK TO SEE IF USER ID IS USED ALREADY, AND IF SO NOTIFY USER

        //CREATE THE USER
        const domain = window.location.origin;
        const fetchURL = `${domain}/api/user`;
        const res = await fetch(fetchURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.current,
                password: pass.current,
            }),
        });
        if (res?.ok === true) {
            // LOGIN THE USER
            const result = await signIn("credentials", {
                username: username.current,
                password: pass.current,
                redirect: true,
                callbackUrl: "/"
            });
        } else {
            //FUTURE DEVELOPMENT --- Add Error Messaging Component!!!
        }
    };
    return (
        <div>
            <div>
                <div>
                    <p>User Name:</p>
                    <input name="text" placeholder='username' onChange={(e) => (username.current = e.target.value)}></input>
                </div>
                <div>
                    <p>Password:</p>
                    <input name="password" type="password" placeholder='password' onChange={(e) => (pass.current = e.target.value)}></input>
                </div>
                <button style={{ backgroundColor: "green" }} onClick={onSubmit}>Login</button>
            </div>
        </div>
    )
};

export default SignUpForm;