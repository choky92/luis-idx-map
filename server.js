const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const DATASET_ID = 'miamire';
const SERVER_TOKEN = '59c3050021200f3ffcc9fb104589abba'; 

app.get('/', (req, res) => res.json({ status: 'Luis IDX Map - READY' }));

app.get('/map-listings', async (req, res) => {
  try {
    const url = `https://api.bridgedataoutput.com/api/v2/OData/${DATASET_ID}/Properties?$top=20&$filter=StandardStatus eq 'Active' and City eq 'Doral'&access_token=${SERVER_TOKEN}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Extract ONLY what map needs
    const listings = (data.value || []).slice(0, 20).map(p => ({
      mlsId: p.ListingId || p.ListingKeyNumeric,
      lat: p.Latitude,
      lng: p.Longitude,
      address: [p.StreetNumber, p.StreetName, p.City].filter(Boolean).join(' '),
      city: p.City || 'Miami',
      price: p.ListPrice || p.CurrentPrice,
      beds: p.BedroomsTotal,
      baths: p.BathroomsTotalDecimal || p.BathroomsTotalInteger
    })).filter(p => p.lat && p.lng && p.lat > 0); // Valid coordinates only

    res.json({
      success: true,
      count: listings.length,
      listings: listings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log('Luis IDX Map running'));
