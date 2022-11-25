import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
    addresses: { type: [String]},
    previousOrders: { type: [String]}
})


export default mongoose.model("User", userSchema);