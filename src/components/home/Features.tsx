import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Sparkles, Camera, Heart, Search } from 'lucide-react';

const features = [
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
    icon: Camera,
    title: 'Style Sharing',
    description: 'Share your outfits, get inspired by others, and showcase your unique fashion sense.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Heart,
    title: 'Personalized Feed',
    description: 'Discover content tailored to your style preferences and fashion interests.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Search,
    title: 'Smart Discovery',
    description: 'Find trends, styles, and creators that match your aesthetic with intelligent search.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Sparkles,
    title: 'Trend Predictions',
    description: 'Stay ahead of the curve with AI-powered predictions of upcoming fashion movements.',
    gradient: 'from-violet-500 to-purple-500'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-white">
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
            From AI-powered trend analysis to a vibrant community of fashion enthusiasts, 
            TrendSetter AI provides all the tools you need to stay ahead in fashion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}