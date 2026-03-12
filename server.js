const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({status: 'Luis IDX Map - WORKING 100%'});
});

app.get('/map-listings', (req, res) => {
  res.json({
    success: true,
    message: 'Ready - add Bridge token next',
    listings: []
  });
});

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log('Server ready');
});
