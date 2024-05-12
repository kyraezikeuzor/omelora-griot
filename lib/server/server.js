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
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));

const PORT = 3001 // Set the port for your server

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

