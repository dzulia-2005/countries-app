import fs from 'fs';
import axios from 'axios';

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data.map(country => ({
      id: country.cca3, 
      country: country.name.common,
      population: country.population.toString(), 
      capital: country.capital ? country.capital[0] : 'N/A', 
      img: country.flags.png 
    }));

 
    fs.writeFileSync('database.json', JSON.stringify({ countries }, null, 2));
    console.log('Database has been seeded with country data.');
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

fetchCountries();
