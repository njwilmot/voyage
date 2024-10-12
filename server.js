const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

// This route will proxy the Google Maps API request
app.get('/api/maps', async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/js', {
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        ...req.query, 
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
