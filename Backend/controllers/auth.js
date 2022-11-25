import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signIn = async (req, res) => {
    const { phone, password } = req.body;
    console.log(req.body);
    try{
        const existingUser = await User.findOne({ phone });
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials"});
        const token = jwt.sign({ phone: existingUser.phone, id: existingUser._id }, 'test', {expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token});
    }catch(error) {
        res.status(500).json({ message: "Something went Wrong."})
    }
}

export const signUp = async (req, res) => {
    const { email, password, name, phone } = req.body;
    try{
        const existingUser = await User.findOne({ phone });
        if(existingUser) return res.status(200).json({ message: "User already exists."});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ phone, email, password: hashedPassword, name});
        const token = jwt.sign({ phone: result.phone, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result, token });

    }catch(error) {
        res.status(500).json({ error: error });
    }
}