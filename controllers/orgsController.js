const mongodb = require('../database/wardDB'); // Ensure this is the correct path to your MongoDB connection file
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags=['Organizations']
    try {
        const db = mongodb.getDatabase();
        const result = await db.collection('orgs').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Organizations']
    try {
        const orgsId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const result = await db.collection('orgs').findOne({ _id: orgsId });
        res.setHeader('Content-Type', 'application/json');
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Organization not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createOrgs = async (req, res) => {
    //#swagger.tags=['Organizations']
    try {
        const db = mongodb.getDatabase();
        const orgs = {
            Name: req.body.Name,
            
        };

        // Validate required fields
        if (!orgs.Name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('orgs').insertOne(orgs);
        if (response.acknowledged) {
            res.status(201).json({ message: 'organization created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating organization' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateOrgs = async (req, res) => {
    //#swagger.tags=['Organizations']
    try {
        const orgsId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const orgs = {
            Name: req.body.Name,
            
        };

        // Validate required fields
        if (!orgs.Name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('orgs').replaceOne({ _id: orgsId }, orgs);
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'organization not found' });
        }

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Organization updated successfully' });
        } else {
            res.status(304).json({ message: 'No changes made to the organization' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteOrgs = async (req, res) => {
    //#swagger.tags=['Organizations']
    try {
        console.log(`Received request to delete organization with ID: ${req.params.id}`);
        const orgsId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        console.log('Database connection established');
        
        const response = await db.collection('orgs').deleteOne({ _id: orgsId });
        console.log('Delete operation response:', response);

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Organization deleted successfully' });
        } else {
            res.status(404).json({ error: 'Organization not found' });
        }
    } catch (err) {
        console.error('Error during organization deletion:', err); // Log the full error
        res.status(500).json({ error: 'An error occurred while deleting the organization' }); // Provide a generic error message
    }
};

module.exports = { getAll, getSingle, createOrgs, updateOrgs, deleteOrgs };
