import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext('light');

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');

        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    

    return (
        <ThemeContext.Provider value={{theme,setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider

