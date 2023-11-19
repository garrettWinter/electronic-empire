import React from 'react';
import Image from 'next/image'

export default async function SpotLightBanner1() {
    return (
        <div>
            <Image src="/images/Spotlight-Banner-1.jpg"
                alt="This is the alt tag for the banner."
                title="This is the alt tag for the banner."
                width='160'
                height='600'></Image>
        </div>
    )
};