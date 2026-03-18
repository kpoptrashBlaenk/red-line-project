import { boolean } from 'zod';
import pool from '../database/database';
import { User } from '../types/user';
import bcrypt from "bcrypt";

export class AuthService {

    async getUserByJWT(jwt: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM user WHERE  = $1', [jwt]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.formatUser(result.rows[0]);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM user WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.formatUser(result.rows[0]);
    }

    async createUser(userBody: User): Promise<User> {
        const { first_name, last_name, email, prefix, phone, password, token} = userBody;
        const result = await pool.query(
        `INSERT INTO user
        (first_name, last_name, email, prefix, phone, password, admin, token)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [first_name, last_name, email, prefix, phone, password, false, token],
        );
        return this.formatUser(result.rows[0]);
    }

    async updateUserToken(token: string | null, userBody: User): Promise<User | null> {
        const result = pool.query(
            "UPDATE users SET token = $1 WHERE email = $2",
            [token, userBody.email]
            );
        return this.formatUser(result.row[0]);
    }

    async updateUserName(first_name: string, last_name: string, userBody: User): Promise<User | null> {
        const result = pool.query(
            "UPDATE users SET first_name = $1, last_name = $2 WHERE token = $3",
            [first_name, last_name, userBody.token]
            );
        return this.formatUser(result.row[0]);
    }

    async updateUserEmail(email: string, userBody: User): Promise<User | null> {
        const result = pool.query(
            "UPDATE users SET email = $1 WHERE token = $2",
            [email, userBody.token]
            );
        return this.formatUser(result.row[0]);
    }

    async updateUserPhone(phone: string, userBody: User): Promise<User | null> {
        const result = pool.query(
            "UPDATE users SET phone = $1 WHERE email = $2",
            [phone, userBody.email]
            );
        return this.formatUser(result.row[0]);
    }

    async updateUserPassword(password: string, userBody: User): Promise<User | null> {
        const result = pool.query(
            "UPDATE users SET token = $1 WHERE email = $2",
            [password, userBody.email]
            );
        return this.formatUser(result.row[0]);
    }

    async updateVerify(verify: boolean, userBody: User): Promise<User | null> {
        const result = pool.query(
            "UPDATE users SET is_verified = $1 FROM users WHERE token = $2",
            [verify, userBody.token]
        );
        return result;
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await pool.query(`DELETE FROM user WHERE id = $1 RETURNING *`, [id]);
        return result.rows.length > 0;
    }

    async cryptPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    async verifyPassword(password: string, hassedPassword: string): Promise<boolean>{
        const res = bcrypt.compare(password, hassedPassword);
        return res;
    }

    private formatUser(row: any): User {
        return {
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        phone: row.phone,
        password: row.password,
        prefix: row.prefix,
        admin: row.admin,
        token: row.token,
        };
    }
}