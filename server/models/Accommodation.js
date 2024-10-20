import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Accommodation', accommodationSchema);