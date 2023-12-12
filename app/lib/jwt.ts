import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn?: string | number;
}
export const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: 3600 //Time in seconds 3600 = 1 hour
}


export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
    const jwt__secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, jwt__secret!, options);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!! In JWT !!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log (token)
    return token;
}

export function verifyJwt(token: string) {
    try {
        const jwt_secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, jwt_secret!)
        return decoded as JwtPayload;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}