import styles from './page.module.css';

import React from 'react';
import HeroBanner from './components/HeroBanner';
import HeroProducts from './components/HeroProducts';

export default function Home() {
  return (
    <main className={styles.main}>
    <p>Home Page</p>
    <HeroBanner/>
    <HeroProducts/>
  </main>
  )
}
