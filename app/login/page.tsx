'use client'

import styles from '../page.module.css'
import { signIn } from "next-auth/react";
import React, { useRef } from "react";

export default function login() {
const username = useRef("");
const pass = useRef("");

const onSubmit = async () => {
  const result = await signIn("credentials", {
username: username.current,
password: pass.current,
redirect: true,
callbackUrl: "/"
  });
}

  return (
    <main className={styles.main}>
   <h1>Account Login</h1>
   <div>
    <div>
      <p>User Name:</p>
      <textarea name="text" placeholder='username' onChange={(e) => (username.current = e.target.value)}></textarea>
    </div>
    <div>
      <p>Password:</p>
      <input name="password" type="password" placeholder='password' onChange={(e) => (pass.current = e.target.value)}></input>
    </div>
    <button style={{backgroundColor: "green"}}onClick={onSubmit}>Login</button>
    <p>If you dont have an account you can <a href="/signup">click here </a>to create one.</p>
    <br></br>
    <p> test1:123123 and test2:123123 are current test accounts (username:password).</p>
   </div>
    </main>
  )
}