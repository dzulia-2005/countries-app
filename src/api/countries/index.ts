import { httpClient } from "../../api/index";

export type CountryProp = {
  id: string;
  country: string;
  population: string;
  capital: string;
  img: string;
};

export const getCountries = async (): Promise<CountryProp[]> => {
  try {
    const res = await httpClient.get("/countries");
    return res.data;
  } catch (error) {
    console.log("error is : ", error);
    return [];
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
  }
};
