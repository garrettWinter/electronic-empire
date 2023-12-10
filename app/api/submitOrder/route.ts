import { Decimal } from '@prisma/client/runtime/library';
import { verifyJwt } from '../../lib/jwt';
import prisma from '@/app/lib/prisma';

interface RequestBody {
    products: [{
        productId: number,
        qty: number
    }]
};

interface OrderedProduct {
    productId: number;
    productPrice: Decimal;
    qty?: number; // Add this line to include the 'qty' property
    lineItemTotal?: number; // Optional property for line item total
};

export async function POST(request: Request) {
    console.log("SubmitOrder has started");
    const body: RequestBody = await request.json();
    //Validate Token

    let incomingToken = request.headers.get("authorization");
    if (incomingToken === null){
        return null
    }
    let cleanedToken = incomingToken.split(" ");
    console.log(cleanedToken);

    let verification = verifyJwt(cleanedToken[1]);
    console.log("about to log verfication");
    console.log(verification);

    //if no, push a failed response
    if (verification === null) {
        return new Response(JSON.stringify({ error: 'An error has occured!' }), { status: 401 })
    } else {
        let orderTotal = 0;
        let productList: number[] = [];
        //Creating an array of productIds for product lookup query
        for (let i = 0; i < body.products.length; i++) {
            productList.push(Number(body.products[i].productId));
        };
        //Creating a varaible that conatains the price of products from database
        let orderedProducts: OrderedProduct[] = await prisma.product.findMany({
            where: {
                productId: { in: productList }
            },
            select: {
                productId: true,
                productPrice: true,
            }
        });
        if (orderedProducts.length != body.products.length) {  // Error handing if there is a mismatch of number of products being returned from query.
            return new Response(JSON.stringify({ error: '1 or more productId(s) in the cart were unable to be found in the database' }), { status: 400 })
        }
        else {
            //Mapping the qty and lineItemPrice to the orderedProducts object
            for (let i = 0; i < orderedProducts.length; i++) {
                let search = body.products.findIndex((product, index) => {
                    return product.productId == orderedProducts[i].productId
                });
                if (search != -1) {
                    orderedProducts[i].qty = body.products[search].qty;
                    //Need to sum the line items (price * qty)
                    orderedProducts[i].lineItemTotal = parseFloat((body.products[search].qty * Number(orderedProducts[i].productPrice)).toFixed(2));
                    //Need to sum complete total
                    orderTotal = parseFloat((orderTotal + orderedProducts[i].lineItemTotal!).toFixed(2));;
                };
            }
            console.log("Final orderedProducts variable: ");
            console.log(orderedProducts);
            //if Yes, insert order in order table
            const createNewOrder = await prisma.order.create({
                data: {
                    userId: verification.userId,
                    orderTotal: orderTotal
                }
            });
            console.log("Newly Created Order:");
            console.log(createNewOrder);
            //for loop on line items and insert into line item table
            for (let i = 0; i < orderedProducts.length; i++) {
                const createLineItem = await prisma.orderLineItem.create({
                    data: {
                        orderId: createNewOrder.orderId,
                        productId: orderedProducts[i].productId,
                        qty: Number(orderedProducts[i].qty),
                        linePrice: Number(orderedProducts[i].lineItemTotal)
                    }
                });
                console.log("Newly Created line items:");
                console.log(createLineItem);
            };
            return new Response(JSON.stringify(createNewOrder), { status: 200 });
        }
    }
};