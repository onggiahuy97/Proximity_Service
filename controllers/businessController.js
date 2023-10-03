const { query } = require('../helpers/query');
const axios = require('axios');
require('dotenv').config();

async function getBusinessById(req, res) {
    const { id } = req.params;

    try {
        const business = await query('SELECT * FROM businesses WHERE id = $1', [id]);

        if (business.length === 0) {
            return res.status(404).json({ error: 'Business not found' });
        } else {
            res.json(business[0]);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function getAllBusinesses(req, res) {
    try {
        const businesses = await query('SELECT * FROM businesses');
        res.json(businesses);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function searchBusinesses(req, res) {
    const { latitude, longitude, radius } = req.query;

    console.log('latitude:', latitude);
    console.log('longitude:', longitude);
    console.log('radius:', radius);

    if (!latitude || !longitude || !radius) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Two-dimensional search
    const searchQuery = `
        SELECT * FROM businesses
        WHERE (latitude BETWEEN $1::numeric - $3::numeric AND $1::numeric + $3::numeric)
        AND (longitude BETWEEN $2::numeric - $3::numeric AND $2::numeric + $3::numeric)
    `;

    try {
        const results = await query(searchQuery, [latitude, longitude, radius]);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createBusiness(req, res) {
    const { address, city, state, country, latitude, longitude } = req.body;

    if (!address || !city || !state || !country || !latitude || !longitude) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const insertQuery = `
        INSERT INTO businesses (address, city, state, country, latitude, longitude)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;

    const values = [address, city, state, country, latitude, longitude];

    try {
        const result = await query(insertQuery, values);
        res.json(result[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createBusinessFromFullAddress(req, res) {
    
    const { fullAddress } = req.body;

    if (!fullAddress) {
        return res.status(400).json({ error: 'Missing fullAddress field' });
    }

    try {
        // Use the Google Maps Geocoding API to convert the full address to coordinates
        const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Replace with your actual Google API key
        const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`);

        if (geocodeResponse.data.status === 'OK' && geocodeResponse.data.results.length > 0) {
            const { address_components, geometry } = geocodeResponse.data.results[0];
            const { lat, lng } = geometry.location;
            const address = address_components.find(component => component.types.includes('street_number')).long_name + ' ' + address_components.find(component => component.types.includes('route')).short_name;
            const city = address_components.find(component => component.types.includes('locality')).long_name;
            const state = address_components.find(component => component.types.includes('administrative_area_level_1')).short_name;
            const country = address_components.find(component => component.types.includes('country')).short_name;
            const insertQuery = `
                INSERT INTO businesses (address, city, state, country, latitude, longitude)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
            `
            const values = [address, city, state, country, lat, lng];
            const result = await query(insertQuery, values);
            res.json(result[0]);
        } else {
            res.status(400).json({ error: 'Invalid or incomplete address' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteBusiness(req, res) {
    const { id } = req.params;
    console.log('id:', id);
    
    const deleteQuery = `
        DELETE FROM businesses
        WHERE id = $1
        RETURNING *
    `;

    try {
        const results = await query(deleteQuery, [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Business not found' });
        } else {
            res.json(results[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getBusinessById,
    getAllBusinesses,
    searchBusinesses,
    createBusiness,
    createBusinessFromFullAddress,
    deleteBusiness
};