// index.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import connectDB from './database.js';
import User from './models/User.js';
import Post from './models/Post.js';
import Trend from './models/Trend.js';
import { authenticateToken } from './middleware/auth.js';
import { loadTrendsData } from './utils/dataLoader.js';

dotenv.config();

// Directory setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Express app setup
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${unique}${path.extname(file.originalname)}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only images allowed'));
  }
});


// ================= ROUTES =================

// Register
// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, username, full_name } = req.body;

    const emailExists = await User.findOne({ email });
    const userExists = await User.findOne({ username });
    if (emailExists) return res.status(400).json({ error: 'Email already exists' });
    if (userExists) return res.status(400).json({ error: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      full_name
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userData } = user.toObject();

    res.status(201).json({ token, user: userData });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...userData } = user.toObject();
    res.json({ token, user: userData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Profile
app.put('/api/user/profile', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    const { username, fullName, bio } = req.body;
    const update = { username, full_name: fullName, bio };
    if (req.file) update.avatar_url = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.userId, update, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});




// Express example route
app.post('/api/posts/:id/like', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const alreadyLiked = post.likes.includes(userId);
    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ success: true, liked: !alreadyLiked });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});




// Toggle Follow
app.post('/api/users/:id/follow', authenticateToken, async (req, res) => {
  try {
    const userIdToFollow = req.params.id;
    const currentUserId = req.user.id;

    if (userIdToFollow === currentUserId) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(userIdToFollow);

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isFollowing = currentUser.following.includes(userIdToFollow);

    if (isFollowing) {
      currentUser.following.pull(userIdToFollow);
      targetUser.followers.pull(currentUserId);
    } else {
      currentUser.following.push(userIdToFollow);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({ success: true, following: !isFollowing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});





// Create Post
// Create Post (Corrected)
app.post('/api/posts', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { caption, tags, location } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const post = await Post.create({
      userId: req.userId, // ✅ Matches your Post schema
      caption,
      imageUrl, // ✅ Matches field name in Post model
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
      location
    });

    // Optional: Update user post count
    await User.findByIdAndUpdate(req.userId, { $inc: { posts_count: 1 } });

    res.status(201).json(post);
  } catch (err) {
    console.error('❌ Post creation error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});
// Get All Posts
app.get('/api/posts', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'username full_name avatar_url') // ✅ correct ref field
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error('Failed to load posts:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get Trends
app.get('/api/trends', async (req, res) => {
  try {
    const trends = await Trend.find().sort({ popularity_score: -1 });
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ================= SERVER START =================

const startServer = async () => {
  try {
    await connectDB();           // ✅ Wait for DB connection
    await loadTrendsData();      // ✅ Load trends AFTER DB is connected
    app.listen(PORT, () =>
      console.log(`🚀 Server running: http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('❌ Startup error:', err);
    process.exit(1);
  }
};

startServer();
