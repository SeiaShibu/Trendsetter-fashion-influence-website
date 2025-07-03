import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Users, Zap, Heart, MessageCircle, Bookmark, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

// Sample Instagram-style posts for the home page
const featuredPosts = [
  {
    id: '1',
    username: 'emma_styles',
    avatar: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    likes: 1250,
    caption: 'Vintage vibes for the weekend ✨'
  },
  {
    id: '2',
    username: 'alex_urban',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    likes: 2180,
    caption: 'Tokyo street style inspiration 🌸'
  },
  {
    id: '3',
    username: 'sofia_minimal',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    likes: 945,
    caption: 'Less is more 🤍'
  }
];

export function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Fashion Trends
                <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Powered by AI
                </span>
              </h1>
              
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Join a community of fashion enthusiasts, share your personal style, and get AI-powered insights on the latest trends. Discover what's next in fashion before it happens.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {user ? (
                  <>
                    <Button as={Link} to="/feed" size="lg" className="px-8">
                      Go to Feed
                    </Button>
                    <Button as={Link} to="/profile" variant="outline" size="lg" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button as={Link} to="/signup" size="lg" className="px-8">
                      Get Started Free
                    </Button>
                    <Button as={Link} to="/login" variant="outline" size="lg" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </Button>
                  </>
                )}
                <Button as={Link} to="/trends" variant="outline" size="lg">
                  Explore Trends
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Fashion Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5K+</div>
                  <div className="text-sm text-gray-600">Style Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">AI Trends</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 lg:mt-0"
            >
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                    className="space-y-4"
                  >
                    <img
                      src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                      alt="Fashion trend 1"
                      className="w-full h-48 object-cover rounded-2xl shadow-lg"
                    />
                    <img
                      src="https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                      alt="Fashion trend 2"
                      className="w-full h-32 object-cover rounded-2xl shadow-lg"
                    />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="space-y-4 pt-8"
                  >
                    <img
                      src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                      alt="Fashion trend 3"
                      className="w-full h-32 object-cover rounded-2xl shadow-lg"
                    />
                    <img
                      src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                      alt="Fashion trend 4"
                      className="w-full h-48 object-cover rounded-2xl shadow-lg"
                    />
                  </motion.div>
                </div>

                {/* Floating AI badge */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full shadow-lg"
                >
                  <div className="flex items-center space-x-1">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">AI Powered</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Access Profile Section for Logged Users */}
      {user && (
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    {user.avatar_url ? (
                      <img
                        src={`http://localhost:3001${user.avatar_url}`}
                        alt={user.username}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Welcome back, {user.full_name}!</h3>
                    <p className="text-rose-100">@{user.username}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button as={Link} to="/profile" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    View Profile
                  </Button>
                  <Button as={Link} to="/create" className="bg-white text-rose-600 hover:bg-gray-100">
                    Create Post
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Instagram-style Feed Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              See what's trending now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get inspired by the latest fashion posts from our community of style creators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Post Header */}
                <div className="flex items-center space-x-3 p-4">
                  <img
                    src={post.avatar}
                    alt={post.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.username}</h3>
                  </div>
                </div>

                {/* Post Image */}
                <div className="aspect-square">
                  <img
                    src={post.image}
                    alt="Fashion post"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <button className="text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="h-6 w-6" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <MessageCircle className="h-6 w-6" />
                      </button>
                    </div>
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                      <Bookmark className="h-6 w-6" />
                    </button>
                  </div>

                  <p className="font-semibold text-gray-900 mb-1">{post.likes.toLocaleString()} likes</p>
                  <p className="text-gray-900">
                    <span className="font-semibold">{post.username}</span> {post.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button as={Link} to={user ? "/feed" : "/signup"} size="lg" className="px-8">
              {user ? "View Full Feed" : "Join the Community"}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need for fashion discovery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered trend analysis to a vibrant community of fashion enthusiasts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'AI Trend Analysis',
                description: 'Get real-time insights on emerging fashion trends powered by advanced AI algorithms.',
                gradient: 'from-rose-500 to-pink-500'
              },
              {
                icon: Users,
                title: 'Fashion Community',
                description: 'Connect with style enthusiasts, follow your favorite creators, and build your fashion network.',
                gradient: 'from-purple-500 to-indigo-500'
              },
              {
                icon: Sparkles,
                title: 'Smart Discovery',
                description: 'Find trends, styles, and creators that match your aesthetic with intelligent recommendations.',
                gradient: 'from-blue-500 to-cyan-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-8 rounded-3xl bg-white hover:shadow-xl transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}