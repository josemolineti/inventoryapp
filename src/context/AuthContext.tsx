import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    user: { nome: string; isAdmin: number } | null;
    login: (userData: { nome: string; isAdmin: number }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ nome: string; isAdmin: number } | null>(null);

    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData: { nome: string; isAdmin: number }) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("error");
    }
    return context;
};
