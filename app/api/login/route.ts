import prisma from '@/app/lib/prisma';

import * as bcrypt from 'bcrypt';

interface RequestBody {
    username: string;
    password: string;
}
export async function POST(request: Request) {
    console.log("login route has run")
    const body: RequestBody = await request.json();
    console.log(body)
    const user = await prisma.user.findUnique({
        where: {
            username: body.username,
        }
    })
    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user
        console.log(userWithoutPass);
        return new Response(JSON.stringify(userWithoutPass));
    } else return new Response(JSON.stringify(null))

}