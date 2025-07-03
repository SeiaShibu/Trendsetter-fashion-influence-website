import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Sparkles, BarChart3, Brain } from 'lucide-react';
import { TrendCard } from '../components/trends/TrendCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { apiClient } from '../lib/api';
import { Trend } from '../types';

export function Trends() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const categories = ['All', 'Retro', 'Sustainable', 'Prints', 'Inclusive', 'Tech', 'Aesthetic', 'Minimalist', 'Sporty'];

  useEffect(() => {
    loadTrends();
    loadAIAnalysis();
  }, []);

  const loadTrends = async () => {
    try {
      const trendsData = await apiClient.getTrends();
      setTrends(trendsData);
    } catch (error) {
      console.error('Failed to load trends:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAIAnalysis = async () => {
    try {
      const analysis = await apiClient.getAIAnalysis();
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Failed to load AI analysis:', error);
    }
  };

  const filteredTrends = trends.filter(trend => {
    const matchesSearch = trend.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trend.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trend.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || trend.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Fashion Trends
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the latest fashion movements analyzed by our AI system. Stay ahead of the curve with real-time trend insights.
          </p>
        </motion.div>

        {/* AI Analytics Dashboard */}
        {aiAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-8 w-8" />
                <h3 className="text-xl font-bold">AI Analysis</h3>
              </div>
              <div className="text-3xl font-bold mb-2">{aiAnalysis.totalTrends}</div>
              <p className="text-purple-100">Active trends analyzed</p>
            </div>

            <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-8 w-8" />
                <h3 className="text-xl font-bold">Confidence</h3>
              </div>
              <div className="text-3xl font-bold mb-2">{aiAnalysis.averageConfidence}%</div>
              <p className="text-rose-100">Average AI confidence</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="h-8 w-8" />
                <h3 className="text-xl font-bold">Categories</h3>
              </div>
              <div className="text-3xl font-bold mb-2">{aiAnalysis.topCategories?.length || 0}</div>
              <p className="text-emerald-100">Trending categories</p>
            </div>
          </motion.div>
        )}

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Our AI Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Collection</h3>
              <p className="text-gray-600 text-sm">Our AI analyzes fashion posts, social media trends, and runway data from multiple sources.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pattern Recognition</h3>
              <p className="text-gray-600 text-sm">Advanced machine learning algorithms identify emerging patterns and style movements.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Trend Prediction</h3>
              <p className="text-gray-600 text-sm">Real-time analysis provides confidence scores and popularity predictions for each trend.</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search trends, tags, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Trends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrends.map((trend, index) => (
            <TrendCard key={trend.id} trend={trend} index={index} />
          ))}
        </div>

        {filteredTrends.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trends found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find more trends.</p>
          </div>
        )}
      </div>
    </div>
  );
}