const mongodb = require('../database/wardDB'); // Ensure this is the correct path to your MongoDB connection file
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const result = await db.collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const result = await db.collection('users').findOne({ _id: userId });
        res.setHeader('Content-Type', 'application/json');
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        // Validate required fields
        if (!user.email|| !user.password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json({ message: 'User created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating user' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        // Validate required fields
        if (!user.email|| !user.password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('users').replaceOne({ _id: userId }, user);
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(304).json({ message: 'No changes made to the user' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        console.log(`Received request to delete user with ID: ${req.params.id}`);
        const userId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        console.log('Database connection established');
        
        const response = await db.collection('users').deleteOne({ _id: userId });
        console.log('Delete operation response:', response);

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Error during user deletion:', err); // Log the full error
        res.status(500).json({ error: 'An error occurred while deleting the user' }); // Provide a generic error message
    }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
