import React, {createContext, useContext, useEffect, useState} from 'react';
import {ApiError, authApi} from '@/lib/api';

interface User {
    id: string;
    email: string;
    name: string;
    company_name: string;
    partner_id: number;
    token: string;
    reset_password: boolean;
    user_type: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean | string>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for stored user session
        const storedUser = localStorage.getItem('mentra_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean | string> => {
        setIsLoading(true);

        try {
            const response = await authApi.login({email, password});

            const userData: User = {
                id: response.data.partner_id.toString(),
                email: response.data.email,
                name: response.data.company_name,
                company_name: response.data.company_name,
                partner_id: response.data.partner_id,
                token: response.data.token,
                reset_password: response.data.reset_password,
                user_type: response.data.group
            };

            setUser(userData);
            localStorage.setItem('mentra_user', JSON.stringify(userData));
            setIsLoading(false);
            return true;
        } catch (error: any) {
            console.error('Login error:', error);
            if (error instanceof ApiError) {
                return error.userMessage;
            }
            return 'An unexpected error occurred.';
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mentra_user');
    };

    return (
        <AuthContext.Provider value={{user, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};
