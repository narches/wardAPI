const mongodb = require('../database/wardDB'); // Ensure this is the correct path to your MongoDB connection file
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const result = await db.collection('calling').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const callingId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const result = await db.collection('calling').findOne({ _id: callingId });
        res.setHeader('Content-Type', 'application/json');
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'calling not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createCalling = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const calling = {
            Name: req.body.Name
        };

        // Validate required fields
        if (!calling.Name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('calling').insertOne(calling);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Calling was created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating calling' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCalling = async (req, res) => {
    try {
        const callingId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const calling = {
            Name: req.body.Name
        };

        // Validate required fields
        if (!calling.Name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('calling').replaceOne({ _id: callingId }, calling);
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'calling not found' });
        }

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Calling was updated successfully' });
        } else {
            res.status(304).json({ message: 'No changes made to the calling' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCalling = async (req, res) => {
    try {
        console.log(`Received request to delete calling with ID: ${req.params.id}`);
        const callingId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        console.log('Database connection established');
        
        const response = await db.collection('calling').deleteOne({ _id: callingId });
        console.log('Delete operation response:', response);

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Calling was deleted successfully' });
        } else {
            res.status(404).json({ error: 'Calling not found' });
        }
    } catch (err) {
        console.error('Error during calling deletion:', err); // Log the full error
        res.status(500).json({ error: 'An error occurred while deleting the calling' }); // Provide a generic error message
    }
};

module.exports = { getAll, getSingle, createCalling, updateCalling, deleteCalling };
