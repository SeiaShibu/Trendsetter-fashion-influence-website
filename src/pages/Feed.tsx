import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/feed/PostCard';
import { Button } from '../components/ui/Button';
import { apiClient } from '../lib/api';
import { Post } from '../types';

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  useEffect(() => {
    loadFeed();
    loadAIAnalysis();
  }, []);

  const loadFeed = async () => {
    try {
      const feedPosts = await apiClient.getPosts();
      setPosts(feedPosts);
    } catch (error) {
      console.error('Failed to load feed:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Feed</h1>
            <p className="text-gray-600">Discover the latest from your fashion community</p>
          </div>
          <Button as={Link} to="/create" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        </div>

        {/* AI Insights Card */}
        {aiAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl p-6 mb-8 text-white"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6" />
              <h2 className="text-xl font-bold">AI Fashion Insights</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{aiAnalysis.totalTrends}</div>
                <div className="text-sm opacity-90">Active Trends</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{aiAnalysis.averageConfidence}%</div>
                <div className="text-sm opacity-90">AI Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{aiAnalysis.topCategories?.length || 0}</div>
                <div className="text-sm opacity-90">Categories</div>
              </div>
            </div>
            
            <p className="text-sm opacity-90">
              Our AI has analyzed {aiAnalysis.totalTrends} fashion trends with {aiAnalysis.averageConfidence}% confidence. 
              Top trending categories include sustainable fashion, Y2K revival, and tech-wear integration.
            </p>
          </motion.div>
        )}

        {/* Posts */}
        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-white rounded-3xl shadow-lg"
            >
              <div className="text-gray-400 mb-4">
                <Users className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts in your feed yet</h3>
              <p className="text-gray-600 mb-6">
                Start following other users or create your first post to see content here!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button as={Link} to="/create">
                  Create Your First Post
                </Button>
                <Button as={Link} to="/trends" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Explore Trends
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Load more */}
        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}