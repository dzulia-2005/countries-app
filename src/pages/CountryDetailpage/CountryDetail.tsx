import React from "react";
import { useParams } from "react-router-dom";
import { article } from "@/pages/articles/static/dummy-data";
import { translations } from "@/translation";

const CountryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { lang } = useParams();
  const t = translations[lang as keyof typeof translations];

  const countryData = article.find((a) => a.id === id);

  if (!countryData) {
    return <div>Country not found</div>;
  }

  return (
    <div className="country-detail-card">
      <img src={countryData.img} alt={`${countryData.country} flag`} />
      <div>
        {t.country}: {countryData.country}
      </div>
      <div>
        {t.population}: {countryData.population}
      </div>
      <div>
        {t.capital}: {countryData.capital}
      </div>
    </div>
  );
};

export default CountryDetail;
