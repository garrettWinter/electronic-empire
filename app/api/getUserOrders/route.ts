import prisma from '@/app/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    try {
        const userOrders = await prisma.order.findMany({
            where: {
                userId: session.user.userId,
            },
            select: {
                orderId: true,
                orderTotal: true,
                orderDate: true,
                lineItem: {
                    select: {
                        orderLineItemId: true,
                        qty: true,
                        linePrice: true,
                        product: {
                            select: {
                                productName: true,
                                productImage: true,
                                productPrice: true,
                            },
                        },
                    },
                },
            },
        });

        

        return new Response(JSON.stringify(userOrders));
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
}

