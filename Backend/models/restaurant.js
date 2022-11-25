import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema({
    restaurantImage: { type: String},
    restaurantName: { type: String },
    pincode: { type: String },
    ownerName: { type: String },
    ownerPhone: { type: String },
    category: { type: String },
    registeredPhone: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    menu: { type: [{ itemName: {type: String },  price: {type: String }, itemDescription: {type: String }, itemImage:  {type: String} }] }
})

export default mongoose.model("Restaurant", restaurantSchema);