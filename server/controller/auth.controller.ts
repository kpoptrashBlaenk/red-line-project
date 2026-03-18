import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from '../types/user';
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export default class UserController {
    private authService: AuthService;
    
    constructor() {
        this.authService = new AuthService();
    }

    async create(req: Request, res: Response) {
        const userBody = req.body as User;
        try {
            const existingUser = this.authService.getUserByEmail(userBody.email);

            if (existingUser != null) {
            return res.status(400).json({ message: "Email already used" });
            }

            const hashedPassword = await this.authService.cryptPassword(userBody.password);

            const token = jwt.sign(
            { id: userBody.id, email: userBody.email },
            SECRET,
            { expiresIn: "1h" }
            );

            userBody.password = hashedPassword;

            //userBody.is_verified = false;

            userBody.token = token;

            const result = this.authService.createUser(userBody);

            res.status(201).json(result)
        } catch (error) {
            console.error('Error creating new user:', error)
            res.status(500).json({ error: 'Failed to create new user' })
        }
    }

    async delete(req: Request, res: Response){
        const userBody = req.body;
        try {
           const existingUser = await this.authService.getUserByJWT(userBody.token);

            if (existingUser == null) {
                return res.status(400).json({ message: "User doesn't exist" });
            }

            const result = await this.authService.deleteUser(userBody.id);

            res.status(201).json(result);
        } catch (error) {
            console.error('Error deleting user:', error)
            res.status(500).json({ error: 'Failed to delete user' })
        }
    }

    async login(req: Request, res: Response){
        const { email, password} = req.body
        try {
           const existingUser = await this.authService.getUserByEmail(email);

            if (existingUser == null) {
                return res.status(400).json({ message: "Email doesn't exist" });
            }

            /*if(!existingUser.is_verified){
                return res.status(500).json({ error: 'User has not verified' });
            }*/

            const passwordCorrect = this.authService.verifyPassword(password, existingUser.password);

            if(!passwordCorrect){
                return res.status(500).json({ error: 'Failed to login user' })
            }

            const authHeader = req.headers.authorization;

            if (!authHeader) {
            return res.status(401).json({ message: "Non autorisé" });
            }

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(token, SECRET!);

            if(decoded){
                res.status(201).json(existingUser);
            }
        } catch (error) {
            console.error('Error login user:', error)
            res.status(500).json({ error: 'Failed to login user' })
        }
    }

    async logOut(req: Request, res: Response){
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "User: not connected" });
        }

        const token = authHeader.split(" ")[1];

        const existingUser = await this.authService.getUserByJWT(token);

        if(existingUser == null){
            return res.status(400).json({ message: "User doesn't exist" });
        }
        
        const result = await this.authService.updateUserToken(null, existingUser);

        if (result == null) {
            return res.status(401).json({ message: "Token invalide" });
        }
        res.json(result);
    }

    async me(req: Request, res: Response){
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "Token manquant" });
        }

        const token = authHeader.split(" ")[1];

        const result = await this.authService.getUserByJWT(token);

        if (result == null) {
            return res.status(401).json({ message: "Token invalide" });
        }

        res.json(result);
    }

    /*async verify(req: Request, res: Response){
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "Token manquant" });
        }

        const token = authHeader.split(" ")[1];

        const existingUser = await this.authService.getUserByJWT(token);

        if(existingUser == null){
            return res.status(400).json({ message: "User doesn't exist" });
        }

        const result = await this.authService.updateVerify(true, existingUser);

        if (result == null) {
            return res.status(401).json({ message: "Token invalide" });
        }

        res.json(result);
    }*/
}