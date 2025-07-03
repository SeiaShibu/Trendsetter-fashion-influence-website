import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, UserPlus, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';
import { formatRelativeTime, formatNumber } from '../../lib/utils';
import { apiClient } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

interface PostCardProps {
  post: Post;
  onLikeUpdate?: (postId: string, isLiked: boolean, newCount: number) => void;
}

export function PostCard({ post, onLikeUpdate }: PostCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isFollowing, setIsFollowing] = useState(post.user?.is_following || false);
  const [followLoading, setFollowLoading] = useState(false);

  const handleLike = async () => {
    try {
      const result = await apiClient.toggleLike(post.id);
      setIsLiked(result.isLiked);
      const newCount = result.isLiked ? likesCount + 1 : likesCount - 1;
      setLikesCount(newCount);
      
      if (onLikeUpdate) {
        onLikeUpdate(post.id, result.isLiked, newCount);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleFollow = async () => {
    if (!post.user || post.user.id === user?.id) return;
    
    setFollowLoading(true);
    try {
      const result = await apiClient.toggleFollow(post.user.id);
      setIsFollowing(result.isFollowing);
    } catch (error) {
      console.error('Failed to toggle follow:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  const avatarUrl = post.user?.avatar_url 
    ? `http://localhost:3001${post.user.avatar_url}`
    : `https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`;

  const isOwnPost = user?.id === post.user?.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.user?.id}`}>
            <img
              src={avatarUrl}
              alt={post.user?.username}
              className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-rose-300 transition-all"
            />
          </Link>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Link 
                to={`/profile/${post.user?.id}`}
                className="font-semibold text-gray-900 hover:text-rose-600 transition-colors"
              >
                @{post.user?.username || 'user'}
              </Link>
              {!isOwnPost && (
                <button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="h-3 w-3" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3 w-3" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500">{formatRelativeTime(post.created_at)}</p>
            {post.location && (
              <p className="text-xs text-gray-400">📍 {post.location}</p>
            )}
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Image */}
      <div className="aspect-square relative group">
        <img
          src={`http://localhost:3001${post.image_url}`}
          alt="Fashion post"
          className="w-full h-full object-cover"
        />
        {/* Double tap to like overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity pointer-events-none">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-black/50 rounded-full p-4"
          >
            <Heart className="h-12 w-12 text-white fill-current" />
          </motion.div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share className="h-6 w-6" />
            </button>
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Bookmark className="h-6 w-6" />
          </button>
        </div>

        {/* Likes and Caption */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-900">{formatNumber(likesCount)} likes</p>
          <div className="text-gray-900">
            <Link 
              to={`/profile/${post.user?.id}`}
              className="font-semibold hover:text-rose-600 transition-colors"
            >
              @{post.user?.username || 'user'}
            </Link>
            {post.caption && (
              <span className="ml-2">{post.caption}</span>
            )}
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-rose-600 text-sm hover:text-rose-700 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {post.comments_count > 0 && (
            <button className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
              View all {formatNumber(post.comments_count)} comments
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}