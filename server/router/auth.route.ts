import { Router } from 'express';
import pool from '../database/database';
import { User } from '../types/user';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router()

const SECRET = process.env.JWT_SECRET!;

router.post('/auth/register', async(req, res) => {
  const { first_name, last_name, email, phone, password} = req.body
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
      (first_name, last_name, email, phone, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [first_name, last_name, email, phone, hashedPassword],
    );

    const newUser = result.rows[0];

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      SECRET,
      { expiresIn: "1h" }
    );
    
    const formattedUser: User = {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      phone: newUser.phone,
      password: newUser.password,
      prefix: newUser.prefix,
      token: token,
    }; 
    res.status(201).json(formattedUser)
  } catch (error) {
    console.error('Error creating new user:', error)
    res.status(500).json({ error: 'Failed to create new user' })
  }
});

router.put('/auth/login', async(req, res) => {
  const { email, password} = req.body
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length === 0) {
      return res.status(400).json({ message: "Email doesn't exist" });
    }

    const passwordCorrect = bcrypt.compare(password, existingUser.password);

    if(!passwordCorrect){
      return res.status(500).json({ error: 'Failed to login user' })
    }

    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      SECRET,
      { expiresIn: "1h" }
    );
    
    const result = pool.query(
      "UPDATE users SET token = $1 WHERE email = $2",
      [token, existingUser.email]
    );

    res.status(201).json(result);
  } catch (error) {
    console.error('Error login user:', error)
    res.status(500).json({ error: 'Failed to login user' })
  }}
);

router.put('/auth/logout', async(req, res) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({ message: "User: not connected" });
  }

  const token = " ";

  const result = pool.query(
      "UPDATE token FROM users WHERE token = $1",
      [token]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Token invalide" });
  }

  res.json(result.rows[0]);
})

router.put('/auth/me', async(req, res) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  const result = pool.query(
      "SELECT id, first_name, last_name, email, phone FROM users WHERE token = $1",
      [token]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Token invalide" });
  }

  res.json(result.rows[0]);
});

export default router