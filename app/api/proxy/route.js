// app/api/proxy/route.js

import axios from 'axios';
import { NextResponse } from 'next/server';

// Proxy endpoint
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        console.log(`Fetching data from: ${url}`);

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching data from the server:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
        return NextResponse.json({ error: 'Error fetching data from the server' }, { status: 500 });
    }
}

