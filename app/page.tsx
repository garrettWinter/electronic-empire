import styles from './page.module.css';

import React from 'react';
import HeroBanner from './components/HeroBanner';
import HeroProducts from './components/HeroProducts';
import SpotLightBanner1 from './components/SpotLightBanner1';
import SpotLightBanner2 from './components/SpotLightBanner2';

export default function Home() {
  return (
    <>
      <p>Home Page</p>
      <HeroBanner />
      <div className="flex flex-row justify-center">
        <SpotLightBanner1 />
        <HeroProducts />
        <SpotLightBanner2 />
      </div>
    </>
  );
}
