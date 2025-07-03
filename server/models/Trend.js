import mongoose from 'mongoose';

const trendSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  popularityScore: Number,
  imageUrl: String,
  tags: [String],
  aiConfidence: Number
});

export default mongoose.model('Trend', trendSchema);
