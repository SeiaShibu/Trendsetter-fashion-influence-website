// Simple in-memory authentication for demo purposes
interface User {
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
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

// Demo user data
const demoUser: User = {
  id: '1',
  email: 'demo@trendsetter.ai',
  username: 'fashionista_demo',
  full_name: 'Demo User',
  bio: '✨ Fashion enthusiast & trend setter\n📍 New York City\n💌 Demo account for TrendSetter AI',
  avatar_url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  followers_count: 12500,
  following_count: 890,
  posts_count: 234,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

class AuthService {
  private state: AuthState = {
    user: null,
    loading: false
  };

  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('trendsetter_user');
    if (savedUser) {
      this.state.user = JSON.parse(savedUser);
    }
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  getState() {
    return this.state;
  }

  async signIn(email: string, password: string) {
    this.state.loading = true;
    this.notify();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, any email/password combination works
    this.state.user = { ...demoUser, email };
    this.state.loading = false;
    
    // Save to localStorage
    localStorage.setItem('trendsetter_user', JSON.stringify(this.state.user));
    
    this.notify();
    return { data: { user: this.state.user }, error: null };
  }

  async signUp(email: string, password: string, userData: { username: string; full_name: string }) {
    this.state.loading = true;
    this.notify();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new user
    this.state.user = {
      ...demoUser,
      email,
      username: userData.username,
      full_name: userData.full_name,
      id: Math.random().toString(36).substr(2, 9)
    };
    this.state.loading = false;
    
    // Save to localStorage
    localStorage.setItem('trendsetter_user', JSON.stringify(this.state.user));
    
    this.notify();
    return { data: { user: this.state.user }, error: null };
  }

  async signOut() {
    this.state.user = null;
    this.state.loading = false;
    localStorage.removeItem('trendsetter_user');
    this.notify();
  }
}

export const authService = new AuthService();