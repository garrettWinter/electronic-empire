'use client'

import styles from '../page.module.css'
import { signIn } from "next-auth/react";
import React, { useRef } from "react";
import LoginForm from '../components/LoginForm'

export default function Login() {

  return (
    <main className={styles.main}>
      <h1 style={{ fontSize: 24, fontWeight: 'bolder' }}>Account Login</h1>
      <LoginForm/>
      <p>If you dont have an account you can <a href="/signup" style={{ color: "blue", textDecoration: "underline" }}>click here </a>to create one.</p>
    </main>
  )
}