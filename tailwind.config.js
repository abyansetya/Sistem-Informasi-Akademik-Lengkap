import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                poppins: ["Poppins", "sans-serif"], // Menambahkan Poppins
            },
            colors: {
                cpurple: {
                    0: "#CFDAF6",
                    1: "#697DEE",
                },
                cgreen: {
                    0: "#45C882",
                    1: "#69DB7C",
                    2: "#2ED039",
                },
                cred: {
                    0: "#FF8787",
                    1: "#FF0000",
                },
                cyellow: {
                    0: "#FCD307",
                },
                cgrey: {
                    0: "#F8F5F5",
                    1: "#C8C8C8",
                    2: "#696B6E",
                    3: "#FFF6F6"
                },
            },
        },
    },

    plugins: [forms],
};
