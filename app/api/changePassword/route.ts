import prisma from '@/app/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
    userName: string;
    oldPassword: string;
    newPassword: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    // Find the user by their current username
    const user = await prisma.user.findUnique({
        where: {
            username: body.userName,
        },
    });

    // If user exists and password is correct
    if (user && (await bcrypt.compare(body.oldPassword, user.password))) {
        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(body.newPassword, 10);
        // Update user's password
        const updatedUser = await prisma.user.update({
            where: {
                userId: user.userId,
            },
            data: {
                password: hashedNewPassword,
            },
        });

        const { password, ...result } = updatedUser;

        return new Response(JSON.stringify(result));
    } else {
        // Handle case where user doesn't exist or password is incorrect
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
            status: 401,
        });
    }
}