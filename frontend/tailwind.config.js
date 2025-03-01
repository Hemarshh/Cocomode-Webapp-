/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ['"Playwrite ES Deco Guides"', 'cursive'], // Add your custom font
        PlayfairDisplay: ['"Playfair Display"', 'serif'], // Ensure proper quotation marks
        Dancing_Script:[ "Dancing Script", "serif"],

      },
    
      colors: {
        'rich-chocolate': '#4E342E',
        'golden-caramel': '#D99328',
        'soft-ivory': '#FAF8F1',
        'creamy-beige': '#F5E8D0',
        'muted-olive': '#8C7A5A',
      },
    },
  },
  plugins: [],
};
