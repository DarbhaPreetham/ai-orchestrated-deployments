import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { validateRequest } from '../middleware/validation';
import { logger } from '../utils/logger';

const router = express.Router();

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

// Mock user for demo (replace with database)
const mockUser = {
  id: 1,
  username: 'admin',
  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
  role: 'admin'
};

router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate user credentials
    if (username !== mockUser.username) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, mockUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: mockUser.id, username: mockUser.username, role: mockUser.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    logger.info(`User ${username} logged in successfully`);

    res.json({
      token,
      user: {
        id: mockUser.id,
        username: mockUser.username,
        role: mockUser.role
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', (req, res) => {
  // In a real app, you might want to blacklist the token
  res.json({ message: 'Logged out successfully' });
});

router.get('/me', (req, res) => {
  // This would typically get user info from the database
  res.json({
    id: mockUser.id,
    username: mockUser.username,
    role: mockUser.role
  });
});

export default router;