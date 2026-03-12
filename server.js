const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());

const DATASET_ID = 'miamire';
const SERVER_TOKEN = '59c3050021200f3ffcc9fb104589abba'; // ← YOUR REAL TOKEN

app.get('/map-listings', async (req, res) => {
  try {
    const bridgeUrl = `https://api.bridgedataoutput.com/api/v2/OData/${DATASET_ID}/Properties?$top=50&$filter=StandardStatus eq 'Active' and City eq 'Doral' and ListPrice ge 300000&access_token=${SERVER_TOKEN}`;
    
    const bridgeResponse = await fetch(bridgeUrl);
    const data = await bridgeResponse.json();
    
    const listings = data.value.map(property => ({
      mlsId: property.ListingId,
      lat: property.Latitude,
      lng: property.Longitude,
      address: property.UnparsedAddress,
      city: property.City,
      price: property.ListPrice,
      beds: property.BedroomsTotal,
      baths: property.BathroomsTotalInteger
    })).filter(p => p.lat && p.lng);
    
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

app.listen(3000, () => console.log('Server running'));
