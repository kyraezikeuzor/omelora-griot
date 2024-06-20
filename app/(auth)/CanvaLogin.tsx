// CanvaLogin.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import crypto from 'crypto-browserify';

import { createClient } from "@/lib/supabase/client";

interface CanvaLoginProps {
    clientId: string;
    redirectUri: string;
    scopes: string[];
}

const CanvaLogin = ({ clientId, redirectUri, scopes }:CanvaLoginProps) => {
    const [authCode, setAuthCode] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const generateCodeVerifier = (): string => {
        return crypto.randomBytes(96).toString('base64url');
    };

    const generateCodeChallenge = (codeVerifier: string): string => {
        return crypto.createHash('sha256').update(codeVerifier).digest('base64url');
    };

    const handleLogin = (): void => {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = generateCodeChallenge(codeVerifier);
        localStorage.setItem('codeVerifier', codeVerifier);

        const authorizationUrl = `https://www.canva.com/api/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(' ')}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

        window.location.href = authorizationUrl;
    };

    useEffect(() => {

        const handleGetCanvaAccessToken = async () => {
            const supabase = createClient()
            const user = await handleGetSessionUser()
    
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            console.log(code)
            const storedVerifier = localStorage.getItem('codeVerifier');
            console.log(storedVerifier)
    
            if (code && storedVerifier) {
                setAuthCode(code);

                axios.post('https://api.canva.com/rest/v1/oauth/token', {
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    redirect_uri: redirectUri,
                    code_verifier: storedVerifier,
                    code
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(async (response) => {
                    console.log('THIS IS TOKEN',accessToken)
                    setAccessToken(response.data.access_token);
                    try {
                        const { data, error } = await supabase
                        .from('Profiles')
                        .update({
                            canva_access_token: accessToken
                        })
                        .eq('user_id', user?.id);
                
                        if (data) {
                            console.log(data);
                        }
                        if (error) {
                            console.log(error);
                        }
                        console.log('THIS IS TOKEN',accessToken)
                        localStorage.removeItem('codeVerifier');
                    } catch (error) {
                        console.error('Error updating Canva access token:', error);
                    }
                })
            }
        }
        handleGetCanvaAccessToken()
    }, [clientId, redirectUri]);


    const handleGetSessionUser = async () => {
        const supabase = createClient()
        const {data: { user }, error} = await supabase.auth.getUser();
        if (error || !user) {
          return null; // Return null if no user or error occurs
        }
        return user;
    }

    return (
        <div>
            {!accessToken && <button onClick={handleLogin}>Login with Canva</button>}
            {accessToken && <div>Canva login successful! Access token: {accessToken}</div>}
        </div>
    );
};

export default CanvaLogin;
