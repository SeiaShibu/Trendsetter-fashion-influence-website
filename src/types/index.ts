export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  bio?: string;
  avatar_url?: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
  updated_at: string;
  is_following?: boolean;
}

export interface Post {
  id: string;
  user_id: string;
  caption: string;
  image_url: string;
  tags?: string[];
  location?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
  is_liked?: boolean;
}

export interface Trend {
  id: string;
  title: string;
  description: string;
  category: string;
  popularity_score: number;
  image_url: string;
  tags: string[];
  ai_confidence: number;
  created_at: string;
  updated_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  user?: User;
}

export interface AIAnalysis {
  totalTrends: number;
  averageConfidence: number;
  topCategories: Array<{
    category: string;
    count: number;
    avg_score: number;
  }>;
  lastUpdated: string;
}

export interface NotificationData {
  id: string;
  type: 'like' | 'follow' | 'comment';
  user: User;
  post?: Post;
  created_at: string;
  read: boolean;
}