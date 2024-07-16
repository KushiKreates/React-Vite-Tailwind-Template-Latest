const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs').promises; // For filesystem operations
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';
const USERS_FILE = 'users.json'; // JSON file to store user data

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  credentials: true
}));

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Helper function to read users from JSON file
const readUsersFromFile = async () => {
  try {
    const data = await fs.readFile(USERS_FILE);
    return JSON.parse(data);
  } catch (error) {
    return []; // Return empty array if file doesn't exist or read error
  }
};

// Helper function to write users to JSON file
const writeUsersToFile = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Read existing users from file
    let users = await readUsersFromFile();

    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Add new user
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    // Write updated users array back to file
    await writeUsersToFile(users);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Read existing users from file
    const users = await readUsersFromFile();

    // Find user by email
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: email }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    // Read existing users from file
    const users = await readUsersFromFile();

    // Find user by userId (email in this case)
    const user = users.find(user => user.email === req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
