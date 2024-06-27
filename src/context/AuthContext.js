import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar si hay un usuario autenticado al cargar la aplicación
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            try {
                const user = JSON.parse(loggedInUser);
                setIsAuthenticated(true);
                setUser(user);
            } catch (error) {
                console.error("Error parsing user from localStorage", error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
