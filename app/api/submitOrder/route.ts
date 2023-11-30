import { verifyJwt } from '../../lib/jwt';
import prisma from '@/app/lib/prisma';

interface RequestBody {
    accessToken: string,
    products: [
        {
            productId: number,
            qty: number
        }
    ]
}

export async function POST(request: Request) {
    console.log("SubmitOrder has started");
    const body: RequestBody = await request.json();
    console.log("API Body:");
    console.log(body);

    //Validate Token
    let verification = verifyJwt(body.accessToken);
    //if no, push a failed response
    if (verification === null) {
        return new Response(JSON.stringify({ response: 'An error has occured!' }), { status: 500 })
    } else {
        let orderTotal = 0;
        let productList: [] = [];
        //Creating an array of productIds for product lookup query
        for (let i = 0; i < body.products.length; i++) {
            productList.push(Number(body.products[i].productId));
        };
        //Creating a varaible that conatains the price of products from database
        let orderedProducts = await prisma.product.findMany({
            where: {
                productId: { in: productList }
            },
            select: {
                productId: true,
                productPrice: true,
            }
        });
        console.log("Queried Product Data:");
        console.log(orderedProducts);
        console.log("Local Storage Data:");
        console.log(body.products)
        //Mapping the qty and lineItemPrice to the orderedProducts object
        for (let i = 0; i < orderedProducts.length; i++) {
            console.log("\nLoop Index is: " + i)
            console.log("Loop looking for: " + orderedProducts[i].productId)
            let search = body.products.findIndex((product, index) => {
                console.log("Product-Search: " + product.productId);
                console.log("FindIndex Index: " + index);
                console.log(product);
                return product.productId == orderedProducts[i].productId
            });
            console.log("*** search Results: " + search);
            if (search != -1) {
                orderedProducts[i].qty = body.products[search].qty;
                //Need to sum the line items (price * qty)
                orderedProducts[i].lineItemTotal = parseFloat((body.products[search].qty * orderedProducts[i].productPrice).toFixed(2));
                //Need to sum complete total
                orderTotal = parseFloat((orderTotal + orderedProducts[i].lineItemTotal).toFixed(2));;
            };

        }
        console.log("Final orderedProducts variable: ");
        console.log(orderedProducts);
        console.log("\norderTotal is: " + orderTotal);
        //if Yes, insert order in order table
        const newOrder = await prisma.order.create({
            data: {
                userId: verification.userId,
                orderTotal: total
            }
        });
        //foreach on line items and instear into line item table
        //if Yes, insert order in line item table
        //give positive response if completes
        //give negative response if error

        console.log("SubmitOrder has finished");
        //CHANGE WHAT IS BEING PASSED BACK IN THE RESPONSE!!!!
        return new Response(JSON.stringify(body));
    }
};