import fetch from 'node-fetch';
import Cors from 'cors';
import { runMiddleware } from '@/lib/requests/middleware'; // You need to define this utility function
import { config } from "serpapi";
import axios from 'axios';

config.api_key = process.env.NEXT_PUBLIC_SERPAPI_API_KEY;

// Initialize the cors middleware
/*const cors = Cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type'], // Allow only certain headers
  credentials: true
});*/

export async function POST(req, res) {
    
    const body = await req.json();
    const q = body.query
    const api_key = process.env.NEXT_PUBLIC_SERPAPI_API_KEY
    const engine = 'google'
    const location = '585069efee19ad271e9c9b36'
    const google_domain = 'google.com'
    const gl = 'us'
    const hl = 'en'
    const tbm = 'nws'


    const apiUrl = `https://serpapi.com/search?api_key=${api_key}&engine=${engine}&q=${q}&location=${location}&google_domain=${google_domain}&gl=${gl}&hl=${hl}&tbm=${tbm}&output=json&source=nodejs,serpapi@2.1.0`;
    
    const response = await fetch(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
          },
    });

    const data = await response.json()
    return Response.json({ data })

    /*try {
        // Run the cors middleware
        //await runMiddleware(req, res, cors);

      

    } catch (error) {
        console.error('Error proxying request to SerpApi:', error);
        res.status(500).json({ error: 'Internal server error' });
    }*/
}
