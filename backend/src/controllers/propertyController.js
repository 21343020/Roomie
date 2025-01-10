const db = require('../config/database');

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const [properties] = await db.query(`
      SELECT p.*, u.name as owner_name 
      FROM properties p 
      JOIN users u ON p.owner_id = u.id
    `);
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get property by id
const getPropertyById = async (req, res) => {
  try {
    const [properties] = await db.query(`
      SELECT p.*, u.name as owner_name 
      FROM properties p 
      JOIN users u ON p.owner_id = u.id 
      WHERE p.id = ?
    `, [req.params.id]);

    if (properties.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(properties[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create property
const createProperty = async (req, res) => {
  try {
    const { name, address, price, type, description, facilities, rules } = req.body;
    const owner_id = req.user.id;

    const [result] = await db.query(
      'INSERT INTO properties (owner_id, name, address, price, type, description, facilities, rules) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [owner_id, name, address, price, type, description, facilities, rules]
    );

    res.status(201).json({
      message: 'Property created successfully',
      propertyId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const { name, address, price, type, description, facilities, rules } = req.body;
    const propertyId = req.params.id;
    const owner_id = req.user.id;

    // Check if property exists and belongs to user
    const [properties] = await db.query(
      'SELECT * FROM properties WHERE id = ? AND owner_id = ?',
      [propertyId, owner_id]
    );

    if (properties.length === 0) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }

    await db.query(
      'UPDATE properties SET name = ?, address = ?, price = ?, type = ?, description = ?, facilities = ?, rules = ? WHERE id = ?',
      [name, address, price, type, description, facilities, rules, propertyId]
    );

    res.json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const owner_id = req.user.id;

    // Check if property exists and belongs to user
    const [properties] = await db.query(
      'SELECT * FROM properties WHERE id = ? AND owner_id = ?',
      [propertyId, owner_id]
    );

    if (properties.length === 0) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }

    await db.query('DELETE FROM properties WHERE id = ?', [propertyId]);

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get properties by owner
const getPropertiesByOwner = async (req, res) => {
  try {
    const owner_id = req.user.id;

    const [properties] = await db.query(
      'SELECT * FROM properties WHERE owner_id = ?',
      [owner_id]
    );

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertiesByOwner
}; 