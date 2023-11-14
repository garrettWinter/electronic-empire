import prisma from '@/app/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
    userName: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    // Find the user by their username
    const user = await prisma.user.findUnique({
        where: {
            username: body.userName,
        },
    });

    // If user exists and password is correct
    if (user && (await bcrypt.compare(body.password, user.password))) {
        // Delete user's account
        await prisma.user.delete({
            where: {
                userId: user.userId,
            },
        });

        return new Response(JSON.stringify({ message: 'Account deleted successfully' }));
    } else {
        // Handle case where user doesn't exist or password is incorrect
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
            status: 401,
        });
    }
}
