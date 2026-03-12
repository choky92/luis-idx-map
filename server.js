const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.json({ status: 'Luis IDX server - ALIVE ✅' });
});

app.get('/map-listings', async (req, res) => {
  res.json({
    success: true,
    message: 'Ready for GHL map! Token setup needed.',
    count: 0,
    listings: []
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Luis server on port ${port}`);
});

