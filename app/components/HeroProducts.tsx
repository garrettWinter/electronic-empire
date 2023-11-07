import React from "react";
import prisma from '../lib/prisma';

export default async function HeroProducts() {
    let heroProducts = await prisma.product.findMany({
        take: 4
    });
    return (
        //width setting below, as temp display and should be removed when migrated to tailWind.
        <div style={{ display: "flex", flexDirection: "row", flexWrap: 'wrap', width: '50%', justifyContent: 'center', paddingTop: 20 }}>
            {heroProducts.map((product) => (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", border: 'solid 2px', margin: 10, padding: 10, minWidth: 300, maxHeight: 200 }}>
                        <p style={{ fontSize: 20, fontWeight: 'bolder' }}>{product.productName}</p>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <img
                                title={product.productName}
                                alt={product.productName}
                                src={product.productImage}></img>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                <p style={{ fontSize: 16, fontWeight: 'bold' }}>Price: {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(product.productPrice.toNumber())}</p>
                                <button style={{ backgroundColor: "green", color: "white" }}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            )}
        </div>
    )
};