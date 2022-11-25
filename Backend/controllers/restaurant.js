import Restaurant from '../models/restaurant.js';

export const registerRestaurant = async(req, res) => {
    const registeredPhone = req.body.phone;
    const { restaurantName, ownerName, ownerPhone, phone, address, image, pincode, category } = req.body.formData;
    const menu = req.body.menu;
    try{
        const existingRestaurant = await Restaurant.findOne({ registeredPhone });
        if(existingRestaurant?.restaurantName) return res.status(200).json({ message: "Restaurant already exists" });
        const result = await Restaurant.updateOne({ registeredPhone: registeredPhone }, { restaurantName, ownerName, ownerPhone, phone, address, restaurantImage: image, pincode, category });
        const result1 = await Restaurant.updateOne({ registeredPhone: registeredPhone }, {$push: {menu: { $each: menu }}});
        res.status(200).json({ result });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: error });
    }
}


export const restaurants = async(req, res) => {
    try{
        const data = await Restaurant.find({});
        res.status(200).json({ data });
    }catch(error) {

    }
}