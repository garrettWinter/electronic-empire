'use client'

import styles from '../page.module.css'
import React from "react";
import SignUpForm from "../components/SignUpForm";

export default function Signup() {

  return (
    <main className={styles.main}>
      <h1 style={{ fontSize: 24, fontWeight: 'bolder' }}>Account Creation</h1>
      <SignUpForm />
      <p>If you have an account already you can <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>click here </a>to login.</p>
    </main>
  )
}