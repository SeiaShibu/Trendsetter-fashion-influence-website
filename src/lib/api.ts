const BASE_URL = '/api';

class APIClient {
  private token: string | null = localStorage.getItem('auth_token');

  private getHeaders(isFormData = false): HeadersInit {
    const headers: HeadersInit = {};
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async parseJSONSafe(res: Response) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      console.warn('⚠️ Failed to parse JSON from response:', text);
      return {};
    }
  }

  async register(data: {
    email: string;
    password: string;
    username: string;
    fullName: string;
  }) {
    const payload = {
      email: data.email,
      password: data.password,
      username: data.username,
      full_name: data.fullName // match backend snake_case
    };

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
    });

    const json = await this.parseJSONSafe(res);
    if (!res.ok) throw new Error(json.error || 'Registration failed');

    this.setToken(json.token);
    return json;
  }

  async login(data: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const json = await this.parseJSONSafe(res);
    if (!res.ok) throw new Error(json.error || 'Login failed');

    this.setToken(json.token);
    return json;
  }
async getPosts() {
  const res = await fetch('/api/posts', {
    method: 'GET',
    headers: this.getHeaders(),
  });

  const json = await this.parseJSONSafe(res);
  if (!res.ok) throw new Error(json.error || 'Failed to fetch posts');

  return json;
}
async getAIAnalysis() {
  const res = await fetch('/api/ai/analysis', {
    method: 'GET',
    headers: this.getHeaders(),
  });

  const json = await this.parseJSONSafe(res);
  if (!res.ok) throw new Error(json.error || 'Failed to fetch AI analysis');

  return json;
}
async toggleLike(postId: string) {
  const res = await fetch(`/api/posts/${postId}/like`, {
    method: 'POST',
    headers: this.getHeaders(),
  });

  const json = await this.parseJSONSafe(res);
  if (!res.ok) throw new Error(json.error || 'Failed to toggle like');

  return json;
}


async toggleFollow(userId: string) {
  const res = await fetch(`/api/users/${userId}/follow`, {
    method: 'POST',
    headers: this.getHeaders(),
  });

  const json = await this.parseJSONSafe(res);
  if (!res.ok) throw new Error(json.error || 'Failed to toggle follow');

  return json;
}


  async getProfile() {
    const res = await fetch(`${BASE_URL}/user/profile`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    const json = await this.parseJSONSafe(res);
    if (!res.ok) throw new Error(json.error || 'Failed to fetch profile');

    return json;
  }
async getUserPosts(userId: string) {
  const res = await fetch(`/api/users/${userId}/posts`, {
    method: 'GET',
    headers: this.getHeaders()
  });

  const json = await this.parseJSONSafe(res);
  if (!res.ok) throw new Error(json.error || 'Failed to fetch user posts');
  return json;
}

  async updateProfile(formData: FormData) {
    const res = await fetch(`${BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: formData,
    });

    const json = await this.parseJSONSafe(res);
    if (!res.ok) throw new Error(json.error || 'Profile update failed');

    return json;
  }

  async getTrends() {
    const res = await fetch(`${BASE_URL}/trends`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    const json = await this.parseJSONSafe(res);
    if (!res.ok) throw new Error(json.error || 'Failed to fetch trends');

    return json;
  }

  async createPost(formData: FormData) {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: this.getHeaders(true), // no Content-Type when sending FormData
      body: formData,
    });

    const json = await this.parseJSONSafe(res);
    if (!res.ok) throw new Error(json.error || 'Failed to create post');

    return json;
  }
}

export const apiClient = new APIClient();
