const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

// GET /api/businesses/:id
router.get('/businesses/:id', businessController.getBusinessById);

// GET /api/businesses
router.get('/businesses', businessController.getAllBusinesses);

// GET /api/search/
router.get('/search', businessController.searchBusinesses);

// POST /api/businesses
router.post('/businesses', businessController.createBusiness);

// POST /api/businesses/fullAddress
router.post('/businesses/address', businessController.createBusinessFromFullAddress);

// Delete /api/businesses/:id
router.delete('/businesses/:id', businessController.deleteBusiness);

module.exports = router;