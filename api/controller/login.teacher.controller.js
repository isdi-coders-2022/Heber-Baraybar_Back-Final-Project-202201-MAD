import { createToken } from '../services/auth.js';
import bcrypt from 'bcryptjs';
import teacherUser from '../models/students.model.js';

export const userTeacherLogin = async (req, resp, next) => {
    const user = req.body;
    const loginError = new Error('user or password invalid');
    loginError.status = 401;
    if (!user.name || !user.password) {
        next(loginError);
    } else {
        const userFound = await teacherUser.findOne({
            name: user.name,
        });
        if (!userFound) {
            next(loginError);
        } else if (!bcrypt.compareSync(user.password, userFound.password)) {
            next(loginError);
        } else {
            const token = createToken({
                name: userFound.name,
                id: userFound.id,
            });
            resp.json({
                token,
                userName: userFound.name,
                id: userFound.id,
            });
        }
    }
};