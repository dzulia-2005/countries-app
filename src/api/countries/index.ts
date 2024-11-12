import { httpClient } from "../../api/index";

export type CountryProp = {
  likes: number;
  id: string;
  country: string;
  population: string;
  capital: string;
  img: string;
};

export const getCountries = async (sort: string): Promise<CountryProp[]> => {
  try {
    const isDescending = sort.startsWith('-'); 
    const sortField = isDescending ? sort.substring(1) : sort;
    const order = isDescending ? 'desc' : 'asc';
    
    const res = await httpClient.get(`/countries?_sort=${sortField}&_order=${order}`);
    return res.data; 
  } catch (error) {
    console.log("Error fetching countries:", error);
    return [];
  }
};

export const getCountryById = async (id: string) => {
  try {
    const res = await httpClient.get(`/countries/${id}`);
    return res.data;
  } catch (error) {
    console.log("error is : ", error);
    throw error;
  }
};

export const AddCountries = async (
  newcountry: Partial<CountryProp>,
): Promise<CountryProp> => {
  try {
    const res = await httpClient.post("/countries", newcountry);
    return res.data;
  } catch (error) {
    console.log("this is error", error);
    throw error;
  }
};

export const UpdateCountries = async (
  country: CountryProp,
): Promise<CountryProp> => {
  try {
    const res = await httpClient.put(`/countries/${country.id}`, country);
    return res.data;
  } catch (error) {
    console.log("this is error :", error);
    throw error;
  }
};

export const DeleteCountries = async (id: string | number): Promise<void> => {
  try {
    await httpClient.delete(`/countries/${id}`);
  } catch (error) {
    console.log("error :", error);
    throw error;
  }
};
