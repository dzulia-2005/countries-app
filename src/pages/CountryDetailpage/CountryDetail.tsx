import React from 'react';
import { useParams } from 'react-router-dom'; // To get route params
import { article } from '@/pages/articles/static/dummy-data';

const CountryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the id from the route
  const countryData = article.find(a => a.id === id); // Find the card based on id

  if (!countryData) {
    return <div>Country not found</div>;
  }

  return (
    <div className="country-detail-card">
      <img src={countryData.img} alt={`${countryData.country} flag`} />
      <div>Country: {countryData.country}</div>
      <div>Population: {countryData.population}</div>
      <div>Capital: {countryData.capital}</div>
    </div>
  );
};

export default CountryDetail;
