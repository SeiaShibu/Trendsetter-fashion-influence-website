import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Search, Heart, User, LogOut, Home, TrendingUp, ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const showBackButton = user && location.pathname !== '/feed' && location.pathname !== '/' && location.pathname !== '/profile';

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            
            {/* Logo */}
            <Link to={user ? "/feed" : "/"} className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl"
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                TrendSetter AI
              </span>
            </Link>
          </div>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/feed"
                className={`flex items-center space-x-1 transition-colors ${
                  location.pathname === '/feed' 
                    ? 'text-rose-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Feed</span>
              </Link>
              <Link
                to="/trends"
                className={`flex items-center space-x-1 transition-colors ${
                  location.pathname === '/trends' 
                    ? 'text-rose-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                <span>Trends</span>
              </Link>
              <Link
                to="/create"
                className={`flex items-center space-x-1 transition-colors ${
                  location.pathname === '/create' 
                    ? 'text-rose-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Plus className="h-5 w-5" />
                <span>Create</span>
              </Link>
            </nav>
          )}

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/notifications"
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </Link>
                  
                  {/* Profile Avatar */}
                  <Link
                    to="/profile"
                    className={`p-1 transition-colors rounded-full ${
                      location.pathname === '/profile' 
                        ? 'ring-2 ring-rose-500' 
                        : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                  >
                    {user.avatar_url ? (
                      <img
                        src={`http://localhost:3001${user.avatar_url}`}
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Mobile menu */}
                <div className="md:hidden flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {user.avatar_url ? (
                      <img
                        src={`http://localhost:3001${user.avatar_url}`}
                        alt={user.username}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Log in
                </Link>
                <Button as={Link} to="/signup">
                  Sign up
                </Button>
                {/* Profile icon for non-logged users */}
                <Link
                  to="/login"
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}