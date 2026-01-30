module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#2C3E50',
                    dark: '#1A252F',
                    light: '#34495E'
                },
                teal: {
                    DEFAULT: '#1ABC9C',
                    dark: '#16A085'
                },
                orange: {
                    DEFAULT: '#E67E22',
                    dark: '#D35400'
                }
            }
        },
    },
    plugins: [],
}
