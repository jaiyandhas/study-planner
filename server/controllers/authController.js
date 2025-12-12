import User from '../models/User.js';

export const createInitialUser = async (req, res) => {
    console.log('createInitialUser called');
    console.log('Request body:', req.body);

    const { username, password } = req.body;

    if (!username || !password) {
        console.log('Missing username or password');
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        console.log('Checking for existing user:', username);
        const existing = await User.findOne({ username });
        if (existing) {
            console.log('User already exists:', username);
            return res.status(400).json({ message: 'User already exists' });
        }
        console.log('Creating new user:', username);
        const user = await User.create({ username, password });
        res.json({ message: 'User created successfully', user });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const loginUser = async (req, res) => {
    console.log('loginUser called');
    console.log('Request body:', req.body);

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login success', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
