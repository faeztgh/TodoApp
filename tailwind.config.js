module.exports = {
    purge: {
        content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
        options: {
            keyframes: true,
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                cornFlowerBlue: "#5582EF",
                cornFlowerBlue_light: "#668ff1",

                easternBlue: "#1984B8",
                easternBlue_light: "#3090bf",

                ribbonBlue: "#2464FC",
                ribbonBlue_light: "#3a74fc",

                carnationRed: "#F64F71",
                carnationRed_light: "#f7617f",

                webOrange: "#FFA700",
                webOrange_light: "#ffb01a",

                success: "#5cb85c",
                warning: "#f0ad4e",
                danger: "#d9534f",
                info: "#5bc0de",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
