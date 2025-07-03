import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Grid, Bookmark, Tag, MoreHorizontal, Edit3, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { formatNumber } from '../lib/utils';
import { Link } from 'react-router-dom';

export function Profile() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    bio: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        fullName: user.full_name,
        bio: user.bio || ''
      });
      loadUserPosts();
    }
  }, [user]);

  const loadUserPosts = async () => {
    if (!user) return;
    
    try {
      const posts = await apiClient.getUserPosts(user.id);
      setUserPosts(posts);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('bio', formData.bio);
      
      if (selectedFile) {
        formDataToSend.append('avatar', selectedFile);
      }

      await updateProfile(formDataToSend);
      setEditMode(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData({
      username: user?.username || '',
      fullName: user?.full_name || '',
      bio: user?.bio || ''
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  const avatarUrl = previewUrl || (user.avatar_url ? `http://localhost:3001${user.avatar_url}` : null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Camera className="h-12 w-12" />
                  </div>
                )}
              </div>
              
              {editMode && (
                <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                  <Camera className="h-5 w-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              )}
              
              {!editMode && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                {editMode ? (
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="text-2xl font-bold"
                    placeholder="Username"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">@{user.username}</h1>
                )}
                
                <div className="flex gap-3">
                  {editMode ? (
                    <>
                      <Button onClick={handleSaveProfile} size="sm">
                        Save Changes
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => setEditMode(true)} variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatNumber(user.posts_count)}</div>
                  <div className="text-sm text-gray-600">posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatNumber(user.followers_count)}</div>
                  <div className="text-sm text-gray-600">followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{formatNumber(user.following_count)}</div>
                  <div className="text-sm text-gray-600">following</div>
                </div>
              </div>

              {/* Bio */}
              <div>
                {editMode ? (
                  <>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="mb-2"
                      placeholder="Full Name"
                    />
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Write a bio..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200 resize-none"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold text-gray-900 mb-1">{user.full_name}</h2>
                    <p className="text-gray-600 whitespace-pre-line">{user.bio || 'No bio yet'}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'posts'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Grid className="h-4 w-4" />
              <span>Posts</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'saved'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>Saved</span>
            </button>
            <button
              onClick={() => setActiveTab('tagged')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === 'tagged'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Tag className="h-4 w-4" />
              <span>Tagged</span>
            </button>
          </nav>
        </div>

        {/* Posts Grid */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {userPosts.map((post: any, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="aspect-square group cursor-pointer relative overflow-hidden rounded-lg"
              >
                <img
                  src={`http://localhost:3001${post.image_url}`}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <MoreHorizontal className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state for posts */}
        {activeTab === 'posts' && userPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Grid className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">Share your first fashion post to get started!</p>
<Button as={Link} to="/create">Create Post</Button>
          </div>
        )}

        {/* Empty state for other tabs */}
        {activeTab !== 'posts' && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {activeTab === 'saved' ? <Bookmark className="h-12 w-12 mx-auto" /> : <Tag className="h-12 w-12 mx-auto" />}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'saved' ? 'No saved posts yet' : 'No tagged posts yet'}
            </h3>
            <p className="text-gray-600">
              {activeTab === 'saved' 
                ? 'Posts you save will appear here' 
                : 'Posts where you are tagged will appear here'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}