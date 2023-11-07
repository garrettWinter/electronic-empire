import React from "react";
import Image from 'next/image';

export default async function HeroBanner() {
    return (
        <div>
            <Image src="/images/banner-5250183_1280.jpg"
            alt="This is the alt tag for the banner."
            title="This is the alt tag for the banner."
            width='1280'
            height='426'></Image>
        </div>
    )
};