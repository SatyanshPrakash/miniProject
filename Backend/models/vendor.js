import mongoose from 'mongoose';

const vendorSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
})


export default mongoose.model("Vendor", vendorSchema);