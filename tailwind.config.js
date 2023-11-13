/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/app/app.component.html",
    "src/app/weather/weather.component.html",
    "src/app/five-day-forecast/five-day-forecast.component.html",
  ],
  theme: {
    extend: {
      height: {
        "90vh": "90vh",
        "48rem": "48rem",
      },
      width: {
        "90vw": "90vw",
      },
    },
  },
  plugins: [],
};
