"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const SigninButton = () => {
    const { data: session } = useSession();
    if (session && session.user) {
        console.log("In SigninButton");
        console.log(session)
        console.log("token expires in: ", session.user.accessTokenExpires - (Date.now()/1000), " seconds")

        return (
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-600">{session.user.username}</p>
                <button onClick={() => signOut()} className="text-red-600">
                    Sign Out
                </button>
            </div>
        )
    }
    return <button onClick={() => signIn()} className="text-green-600 ml-auto">Sign In</button>
}

export default SigninButton;