import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route'; // Import your NextAuth options

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    // Check for user session using getServerSession
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
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
                // Add any other fields you need
            },
        });

        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
