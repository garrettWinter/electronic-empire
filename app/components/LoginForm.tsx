import { signIn } from "next-auth/react";
import React, { useRef } from "react";

const LoginForm = () => {
    const username = useRef("");
    const pass = useRef("");

    const onSubmit = async () => {
        const result = await signIn("credentials", {
            username: username.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/"
        });
    };

    return (
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
            <p> test1:123123 and test2:123123 are current test accounts (username:password).</p>
        </div>
    )
};

export default LoginForm;