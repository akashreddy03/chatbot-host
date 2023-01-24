
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,tsx,jsx}',
    ],
    safelist: [
        'scrollbar-thumb-slate-600',
    ],
    theme: {
        extend: {
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '3/5': '60%',
                '4/5': '80%',
            }
        }
    },
    plugins : [
        require('@tailwindcss/forms'), 
        require('tailwind-scrollbar'),
    ],
    variants: {
        scrollbar: ['dark']
    }
}