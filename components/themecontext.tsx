import React, { createContext, useEffect, useRef, useState } from "react";

const ThemeContext = createContext({
    theme: '',
    toggleTheme: () => {},
});

type ChildComponent = {
    children: JSX.Element;
};

function ThemeProvider({ children }: ChildComponent) {
    const [theme, setTheme] = useState('');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }, [])
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.add('scrollbar-thumb-slate-600');
            localStorage.setItem('theme', 'dark');
        } else if(theme === 'light') {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.remove('scrollbar-thumb-slate-600');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            { children }
        </ThemeContext.Provider>
    );

}

export {ThemeContext, ThemeProvider};