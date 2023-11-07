import styles from './page.module.css';

import React from 'react';
import HeroBanner from './components/HeroBanner';
import HeroProducts from './components/HeroProducts';
import SpotLightBanner1 from './components/SpotLightBanner1';
import SpotLightBanner2 from './components/SpotLightBanner2';

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Home Page</p>
      <HeroBanner />
      <div style={{display:'flex', flexDirection: "row", justifyContent:'space-evenly'}}>
        <SpotLightBanner1 />
        <HeroProducts />
        <SpotLightBanner2 />
      </div>
    </main>
  )
}
