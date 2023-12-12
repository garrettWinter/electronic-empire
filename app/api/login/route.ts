import prisma from '@/app/lib/prisma';
import { signJwtAccessToken, DEFAULT_SIGN_OPTION } from '@/app/lib/jwt';

import * as bcrypt from 'bcrypt';

interface RequestBody {
    username: string;
    password: string;
}
export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    const user = await prisma.user.findUnique({
        where: {
            username: body.username,
        }
    })
    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user;
        const accessToken = signJwtAccessToken(userWithoutPass);
        const accessTokenExpires = Math.floor(Date.now()/1000) + Number(DEFAULT_SIGN_OPTION.expiresIn!)
        const result = {
            ...userWithoutPass,
            accessToken,
            accessTokenExpires
        };
        return new Response(JSON.stringify(result));
    } else return new Response(JSON.stringify(null))

}