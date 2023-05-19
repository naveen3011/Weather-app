// Import libraries
const Airtable = require('airtable');
const fetch = require('node-fetch');

// Set up Airtable API
const airtableApiKey = 'keyl0q1ovYKIbNFWM';
const airtableBaseId = 'appGCeUIgYgH30kAs';
const airtableTable = 'api';
const base = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId);

// Set up weather API
const weatherApiKey = '3e9bc6d4dcb94fadb30223837231905';
const weatherApiUrl = `https://www.weatherapi.com/my/`

// Airtable script
document.getElementById('cityForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('cityInput').value;
    
    try {
      await base(airtableTable).create([{ fields: { City: city } }]);
      console.log(`Record created successfully: ${city}`);
    } catch (error) {
      console.error('Error creating record:', error);
    }
  });

  // Weather API script
document.getElementById('fetchTemperature').addEventListener('click', async () => {
    try {
      const records = await base(airtableTable).select().all();
      for (const record of records) {
        const city = record.get('City');

        const response = await fetch(`${weatherApiUrl}forecast.json?key=${weatherApiKey}&q=${city}&days=1`);
        const data = await response.json();
        const temperature = data.forecast.forecastday[0].day.avgtemp_c;
        console.log(`The temperature in ${city} is ${temperature}°C`);
        }
    } catch (error) {
        console.error('Error fetching records:', error);
        }
    });
    
