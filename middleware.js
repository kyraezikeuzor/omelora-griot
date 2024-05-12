import { NextResponse } from 'next/server';

export default function middleware(request) {

    const { nextUrl } = request;

    // Check if the URL starts with /api/proxy/
    if (nextUrl.pathname.startsWith('/api/proxy/')) {
        // Remove the /api/proxy segment and ensure a correct URL formation
        const targetUrl = nextUrl.pathname.replace('/api/proxy/', '');

        // Prepend 'https://' if not already in targetUrl
        const fullUrl = targetUrl.startsWith('http://') || targetUrl.startsWith('https://') || targetUrl.startsWith('https:/') ? targetUrl : `https://${targetUrl}`;

        // Validate and potentially modify the URL
        let validUrl;
        try {
            validUrl = new URL(decodeURIComponent(fullUrl));
        } catch (error) {
            console.error('Invalid URL', targetUrl);
            return new Response('Invalid URL', { status: 400 });
        }

        // Rewrite to the actual external URL
        // Rewrite to the actual external URL
        const proxiedResponse = NextResponse.rewrite(validUrl);

        // Add CORS headers
        proxiedResponse.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        proxiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        proxiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return proxiedResponse;

    }

    // Proceed with other routes normally
    return NextResponse.next();

    
    /*const { nextUrl } = request;

    // Check if the URL starts with /api/proxy/
    if (nextUrl.pathname.startsWith('/api/proxy/')) {
        // Remove the /api/proxy segment and ensure a correct URL formation
        const targetUrl = nextUrl.pathname.substring(11);

        // Validate and potentially modify the URL
        let validUrl;
        try {
            validUrl = new URL(decodeURIComponent(targetUrl));
        } catch (error) {
            console.error('Invalid URL', targetUrl);
            return new Response('Invalid URL', { status: 400 });
        }

        // Rewrite to the actual external URL
        return NextResponse.rewrite(validUrl);
    }

    // Proceed with other routes normally
    return NextResponse.next();*/
}