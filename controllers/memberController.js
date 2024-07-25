const mongodb = require('../database/wardDB'); // Ensure this is the correct path to your MongoDB connection file
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
     //#swagger.tags=['Members']
    try {
        const db = mongodb.getDatabase();
        const result = await db.collection('members').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Members']
    try {
        const memberId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const result = await db.collection('members').findOne({ _id: memberId });
        res.setHeader('Content-Type', 'application/json');
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'Member not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createMember = async (req, res) => {
    //#swagger.tags=['Members']
    try {
        const db = mongodb.getDatabase();
        const member = {
            MRN: req.body.MRN,
            Name: req.body.Name,
            Mission: req.body.Mission,
            Status: req.body.Status,
            Address: req.body.Address,
            Phone: req.body.Phone,
            Email: req.body.Email,
            Calling: req.body.Calling,
            Organization: req.body.Organization,
            Birth_Date: req.body.Birth_Date
        };

        // Validate required fields
        if (!member.MRN || !member.Name || !member.Birth_Date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('members').insertOne(member);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Member created successfully', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating Member' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateMember = async (req, res) => {
    //#swagger.tags=['Members']
    try {
        const memberId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        const member = {
            MRN: req.body.MRN,
            Name: req.body.Name,
            Mission: req.body.Mission,
            Status: req.body.Status,
            Address: req.body.Address,
            Phone: req.body.Phone,
            Email: req.body.Email,
            Calling: req.body.Calling,
            Organization: req.body.Organization,
            Birth_Date: req.body.Birth_Date
        };

        // Validate required fields
        if (!member.MRN || !member.Name || !member.Birth_Date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const response = await db.collection('members').replaceOne({ _id: memberId }, member);
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Member updated successfully' });
        } else {
            res.status(304).json({ message: 'No changes made to the Member' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteMember = async (req, res) => {
    //#swagger.tags=['Members']
    try {
        console.log(`Received request to delete user with ID: ${req.params.id}`);
        const memberId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        
        const response = await db.collection('members').deleteOne({ _id: memberId });
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

module.exports = { getAll, getSingle, createMember, updateMember, deleteMember };
