"use client";
// MainLogin.tsx
import React, { useState } from 'react';
import GriotLogin from './GriotLogin'; // Assuming you have a Supabase login component
import CanvaLogin from './CanvaLogin';


const MainLogin: React.FC = () => {
    const [isSupabaseLoggedIn, setIsSupabaseLoggedIn] = useState<boolean>(false);
    
    const handleSupabaseLogin = (): void => {
        // Your logic to log in with Supabase
        setIsSupabaseLoggedIn(true);

    };

    return (
        <main className='flex flex-col'>
            <GriotLogin onLogin={handleSupabaseLogin} />
                {/*{isSupabaseLoggedIn && 
                    <CanvaLogin 
                        clientId="YOUR_CANVA_CLIENT_ID" 
                        redirectUri="YOUR_REDIRECT_URI" 
                        scopes={['design:write', 'assets:read']} 
                    />
                }*/}
        </main>
    );
};

export default MainLogin;

