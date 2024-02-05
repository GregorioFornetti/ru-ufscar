/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
  ["./src/app/**/.{ts,tsx}",
   "./src/app/*.{js,jsx,ts,tsx}", 
   "./src/components/*/*.{js,jsx,ts,tsx}",    
   "./<custom directory>/**/*.{js,jsx,ts,tsx}",
   "./src/app/(tabs)/index.{ts,tsx}",
   "./src/**/**/**/*.{ts,tsx}"
  
  ],
    theme: {
      extend: {},
    },
    plugins: [],
}

