import React from "react";
import prisma from '../lib/prisma';

type ProductDetailsProps = {
    product: number;
  };

export default async function ProductDetails(props: ProductDetailsProps){
    const productDetails = await prisma.product.findUnique({
        where: {
            productId: props.product,
        },
    });
    console.log(productDetails);

return (
    <div>
    <p>Product Details Component -- Passed Prop is {props.product}</p>
    <p>Product Name is.... {productDetails?.productName}</p>
    </div>
)
};