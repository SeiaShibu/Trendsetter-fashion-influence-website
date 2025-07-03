import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  bio: String,
  avatar_url: String,
  followers_count: { type: Number, default: 0 },
  following_count: { type: Number, default: 0 },
  posts_count: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
