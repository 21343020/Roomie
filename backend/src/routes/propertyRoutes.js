const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertiesByOwner
} = require('../controllers/propertyController');

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.post('/', auth, createProperty);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);
router.get('/owner/properties', auth, getPropertiesByOwner);

module.exports = router; 