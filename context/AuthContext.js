import { createContext, useContext, useState } from 'react';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const login = (username) => setUser({ username });
const logout = () => setUser(null);
return (
<AuthContext.Provider value={{ user, login, logout }}>
{children}
</AuthContext.Provider>
);
}
export function useAuth() {
const context = useContext(AuthContext);
if (!context) {
throw new Error('useAuth must be used inside AuthProvider');
}
return context;
}