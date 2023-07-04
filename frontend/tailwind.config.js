/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      "backgroundImage":{
        "login_bg":"url('../public/rithvik_bg.jpg')",
        "sign_up":"url('../public/signup_bg3.jpg')",
        "teacher_bg":"url('../public/teacher1.png')",
        "about_bg":"url('../public/about_bg.jpg')"
      }
    },
  },
  plugins: [],
}

