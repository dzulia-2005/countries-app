import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCountryById } from "@/api/countries";

type CountryDetailProps = {
  id: string;
  country: string;
  capital: string;
  population: string;
  img: string;
};

const CountryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: country,
    isLoading,
    isError,
  } = useQuery<CountryDetailProps>({
    queryKey: ["country-detail", id],
    queryFn: () => getCountryById(id!),
    gcTime: 1000 * 6,
    staleTime: 1000 * 6,
  });

  if (isLoading) return <p>Loading country details...</p>;
  if (isError) return <p>Error loading country details</p>;

  return (
    <div>
      <h1>{country?.country}</h1>
      <img
        src={country?.img || "/path/to/default/flag.png"}
        alt={`${country?.country} flag`}
        style={{ width: "200px" }}
      />
      <p>Capital: {country?.capital}</p>
      <p>Population: {country?.population}</p>
    </div>
  );
};

export default CountryDetail;
