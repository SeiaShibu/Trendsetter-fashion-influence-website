import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Tag } from 'lucide-react';
import { Trend } from '../../types';

interface TrendCardProps {
  trend: Trend;
  index: number;
}

export function TrendCard({ trend, index }: TrendCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={trend.image_url}
          alt={trend.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">{trend.popularity_score}% trending</span>
          </div>
          <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {trend.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{trend.title}</h3>
        <p className="text-white/90 text-sm mb-3 line-clamp-2">{trend.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {trend.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs"
            >
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </span>
          ))}
          {trend.tags.length > 3 && (
            <span className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
              +{trend.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}