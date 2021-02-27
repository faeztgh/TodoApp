module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                cornFlowerBlue: "#5582EF",
                easternBlue: "#1984B8",
                ribbonBlue: "#2464FC",
                carnationRed: "#F64F71",
                webOrange: "#FFA700",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
