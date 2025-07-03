import Trend from '../models/Trend.js';

export async function loadTrendsData() {
  try {
    const existingTrends = await Trend.find();
    if (existingTrends.length > 0) {
      console.log('✅ Trends already exist in DB');
      return;
    }

    const trendsData = [
      {
        title: 'Y2K Revival',
        description: 'Early 2000s fashion is making a major comeback...',
        category: 'Retro',
        popularityScore: 92,
        imageUrl: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop',
        tags: ['Y2K', 'Retro', 'Low-rise', 'Metallic', 'Chunky sneakers'],
        aiConfidence: 0.94
      },
      {
        title: 'Sustainable Fashion',
        description: 'Eco-conscious fashion choices are trending...',
        category: 'Sustainable',
        popularityScore: 88,
        imageUrl: 'https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop',
        tags: ['Sustainable', 'Eco-friendly', 'Organic', 'Upcycled', 'Ethical'],
        aiConfidence: 0.91
      },
      // Add others...
    ];

    await Trend.insertMany(trendsData);
    console.log('✅ Trends loaded into MongoDB');
  } catch (error) {
    console.error('❌ Error loading trends data:', error);
  }
}
