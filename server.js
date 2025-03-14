const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    const serpRes = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_shopping',
        q: query,
        api_key: process.env.SERP_API_KEY,
      },
    });

    const results = serpRes.data.shopping_results.map(item => ({
      title: item.title,
      price: item.price,
      source: item.source,
      link: item.link,
    }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
