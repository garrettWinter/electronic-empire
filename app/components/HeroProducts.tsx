import React from "react";

export default async function HeroProducts() {
    return (
        <div style={{display:"flex", flexDirection:"row", paddingTop:20}}>

            <div style={{display:"flex", flexDirection:"column", border: 'solid 2px', margin: 10, padding:10}}>
                <p style={{ fontSize: 20, fontWeight: 'bolder' }}>Product Name</p>
                <div style={{display:"flex", flexDirection:"row"}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ6cmDR54koroe_CWPYdoeLK8sXSSh7TwDLoleOXVjWA&s"></img>
                    <div style={{display:"flex", flexDirection:"column", justifyContent: "space-around"}}>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>Price: $X,XXX.XX</p>
                        <button style={{ backgroundColor: "green", color:"white" }}>Add to Cart</button>
                    </div>
                </div>
            </div>

        </div>
    )
};