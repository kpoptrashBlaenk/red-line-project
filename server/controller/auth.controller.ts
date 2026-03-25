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

    create = async(req: Request, res: Response)=>{
        const userBody = req.body as User;
        try {
            const existingUser = await this.authService.getUserByEmail(userBody.email);

            if (existingUser != null) {
                return res.status(400).json({ message: "Email already used" });
            }

            const hashedPassword = await this.authService.cryptPassword(userBody.password);

            userBody.password = hashedPassword;

            const userCreate = await this.authService.createUser(userBody);

            const token = jwt.sign(
            { id: userCreate.id, email: userCreate.email },
            SECRET,
            { expiresIn: "1h" }
            );

            userCreate.token = token;

            const result = this.authService.updateUserToken(token, userCreate);

            res.status(201).json(result)
        } catch (error) {
            console.error('Error creating new user:', error);
            res.status(500).json({ error: 'Failed to create new user' });
        }
    }

    delete = async(req: Request, res: Response)=>{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "Token manquant" });
        }

        const token = authHeader.split(" ")[1];
        try {
            const existingUser = await this.authService.getUserByJWT(token);

            console.log("TOKEN:", token);
            console.log("USER:", existingUser);

            if (existingUser == null) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            console.log(existingUser);

            const result = await this.authService.deleteUser(existingUser.id);

            if (!result) {
                return res.status(404).json({ message: "User already deleted" });
            }

            console.log("Arrivé dans createUser, user:", result);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(204).json({ error: 'Failed to delete user' });
        }
    }

    login = async(req: Request, res: Response)=>{
        const { email, password} = req.body;
        try {
           const existingUser = await this.authService.getUserByEmail(email);

            if (existingUser == null) {
                return res.status(400).json({ message: "Email doesn't exist" });
            }

            const passwordCorrect = await this.authService.verifyPassword(password, existingUser.password);

            if(!passwordCorrect){
                return res.status(500).json({ error: 'Failed to login user' })
            }

            res.status(200).json(existingUser);
        } catch (error) {
            console.error('Error login user:', error);
            res.status(500).json({ error: 'Fail to login user' });
        }
    }

    logOut = async(req: Request, res: Response)=>{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "User: not connected" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const existingUser = await this.authService.getUserByJWT(token);

            if(existingUser == null){
                return res.status(400).json({ message: "User doesn't exist" });
            }
            
            const result = await this.authService.updateUserToken(null, existingUser);

            if (result == null) {
                return res.status(401).json({ message: "Token invalide" });
            }
            res.status(200).json(result);
        } catch (error) {
            console.error('Error logout user:', error);
            res.status(500).json({ error: 'Failed to logout user' });
        }
    }

    me = async(req: Request, res: Response)=>{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "Token manquant" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const result = await this.authService.getUserByJWT(token);

            if (result == null) {
                return res.status(401).json({ message: "Token invalide" });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error('Error get user:', error);
            res.status(500).json({ error: 'Failed to get user' });
        }
    }

    reset = async(req: Request, res: Response)=>{
        const {password, email} = req.body;

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ message: "Token manquant" });
        }

        try {
            const existingUser = await this.authService.getUserByEmail(email);

            if (existingUser == null) {
                return res.status(400).json({ message: "User doesn't exist" });
            }

            const cryptedPassword = await this.authService.cryptPassword(password);

            const result = await this.authService.updateUserPassword(cryptedPassword, existingUser);

            res.status(200).json(result);
        } catch (error) {
            console.error('Error reset password:', error);
            res.status(500).json({ error: 'Failed to reset the password' });
        }
    }
}