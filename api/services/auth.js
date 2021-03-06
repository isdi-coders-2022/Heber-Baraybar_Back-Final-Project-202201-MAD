import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
export function createToken(user) {
    console.log(user, ' user');
    const payload = { userName: user.name, userId: user.id };
    console.log(payload, ' pyfy');
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret);
    return token;
}
export function verifyToken(token) {
    const secret = process.env.SECRET;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return error.message;
    }
}
