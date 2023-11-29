
interface RequestBody {
    accessToken: string,
    userId: string,
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
    //if no, push a failed response
    //if Yes, insert order in order table
    //Need to sum the line items (price * qty)
    //foreach on line items and instear into line item table
    //if Yes, insert order in line item table
    //Need to sum complete total
    //Create record in order table
    //give positive response if completes
    //give negative response if error

    console.log("SubmitOrder has finished");
    //CHANGE WHAT IS BEING PASSED BACK IN THE RESPONSE!!!!
    return new Response(JSON.stringify(body));
    
};