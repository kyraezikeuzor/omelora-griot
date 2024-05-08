import express from 'express'
import fetch from 'node-fetch'
import dotenv from "dotenv";
import {config} from "serpapi";
import cors from 'cors'
import axios from 'axios'

dotenv.config();
config.api_key = process.env.NEXT_PUBLIC_SERPAPI_API_KEY;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3002"],
    methods: ["POST", "GET"],
    credentials: true
}));

const PORT = 3001 // Set the port for your server

// Define a route to proxy requests to SerpApi
/*
app.get('/search', async (req, res) => {
    try {
        const { api_key, engine, q, location, google_domain, gl, hl, tbm } = req.query;
        const apiUrl = `https://serpapi.com/search?api_key=${api_key}&engine=${engine}&q=${q}&location=${location}&google_domain=${google_domain}&gl=${gl}&hl=${hl}&tbm=${tbm}&output=json&source=nodejs,serpapi@2.1.0`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error proxying request to SerpApi:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
*/

app.get('/proxy', async (req, res) => {
    try {
      const url = req.query.url;
      const response = await axios.get(url);
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching data from the server:', error);
      res.status(500).send('Error fetching data from the server');
    }
  });


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

