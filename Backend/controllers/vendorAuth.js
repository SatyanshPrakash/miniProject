import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Vendor from '../models/vendor.js';
import restaurant from '../models/restaurant.js';

export const vendorSignIn = async (req, res) => {
    const { phone, password } = req.body;
    try{
        const existingUser = await Vendor.findOne({ phone });
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials"});
        const token = jwt.sign({ phone: existingUser.phone, id: existingUser._id }, 'test', {expiresIn: "1h" });
        const restaurantData = await restaurant.findOne({ phone });
        if(restaurantData?.restaurantName) res.status(200).json({ result: existingUser, token, restaurantData});
        else res.status(200).json({ result: existingUser, token, message: "No Registered Restaurant"});
    }catch(error) {
        console.log(error);
        res.status(500).json({ message: "Something went Wrong."})
    }
}

export const vendorSignUp = async (req, res) => {
    const { email, password, name, phone } = req.body;
    try{
        const existingUser = await Vendor.findOne({ phone });
        if(existingUser) return res.status(200).json({ message: "User already exists."});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Vendor.create({ phone, email, password: hashedPassword, name});
        const result1 = await restaurant.create({ registeredPhone: phone });
        const token = jwt.sign({ phone: result.phone, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result, token });

    }catch(error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}