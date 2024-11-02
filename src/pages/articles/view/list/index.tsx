import React, { lazy, Suspense, useEffect, useState } from "react";
import Herosection from "@/pages/articles/components/list/herosection/herosection";
import OTPinput from "../../components/list/cardsection/otp-input/otp";
import Card from "../../components/list/cardsection/card";
import axios from "axios";

const LazyCardlist = lazy(() => import("@/pages/articles/components/list/cardsection/cardlist/index"));
const LazyCardinfo = lazy(() => import("@/pages/articles/components/list/cardsection/cardinfo/index"));
const LazyCardTitle = lazy(() => import("@/pages/articles/components/list/cardsection/cardtitle"));
const LazyCardDescription = lazy(() => import("@/pages/articles/components/list/cardsection/carddescription"));
const LazyCardpop = lazy(() => import("@/pages/articles/components/list/cardsection/cardpop"));
const LazyCardCapital = lazy(() => import("@/pages/articles/components/list/cardsection/cardcapital"));

type CountryProp = {
  id: string;
  country: string;
  population: string;
  capital: string;
  img: string;
};

const CardSectionview: React.FC = () => {
  const [countries, setCountries] = useState<CountryProp[]>([]);
  const [newCountry, setNewCountry] = useState<Partial<CountryProp>>({});
  const [editingCountry, setEditingCountry] = useState<CountryProp | null>(null);

  useEffect(() => {
    axios.get('/countries')
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data)) {
          setCountries(res.data); 
        } else {
          console.error("Expected an array but got:", res.data);
        }
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  const handleAddCountry = async () => {
    try {
      const response = await axios.post('/countries', newCountry);
      setCountries([...countries, response.data]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDeleteCountry = async (id: string) => {
    try {
      await axios.delete(`/countries/${id}`);
      setCountries(countries.filter((country) => country.id !== id));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEditCountry = async () => {
    if (editingCountry) {
      try {
        await axios.put(`/countries/${editingCountry.id}`, editingCountry);
        setCountries(countries.map((country) => country.id === editingCountry.id ? editingCountry : country));
        setEditingCountry(null);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCountry({ ...newCountry, img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Herosection />
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{marginLeft: "8%"}}>
          <h3>Add Card:</h3>
          <div>
            <input 
              type="text" 
              placeholder="Country" 
              onChange={(e) => setNewCountry({ ...newCountry, country: e.target.value })}
            />
          </div>
         <div>
            <input 
                type="text"  
                placeholder="Capital" 
                onChange={(e) => setNewCountry({ ...newCountry, capital: e.target.value })}
              />
         </div>
          <div>
            <input 
              type="text" 
              placeholder="Population"
              onChange={(e) => setNewCountry({ ...newCountry, population: e.target.value })}
            />
          </div>
          <div>
            <input 
              type="file" 
              onChange={handleUploadImage} 
              />
          </div>
          <button onClick={handleAddCountry}>Add Card</button>
        </div>

        <LazyCardlist> 
          {countries.map((item) => (
            <Card key={item.id}>
              <img src={item.img} style={{ width: "30%", margin: "0 5% 0 0" }} />
              <LazyCardinfo>
                <LazyCardTitle> Country : {item.country}</LazyCardTitle>
                <LazyCardDescription>
                  <LazyCardpop>Capital : {item.capital}</LazyCardpop>
                  <LazyCardCapital>Population : {item.population}</LazyCardCapital>
                </LazyCardDescription>
              </LazyCardinfo>
              <button onClick={() => handleDeleteCountry(item.id)} style={{margin: "0% 5%"}}>Delete</button>
              <button onClick={() => setEditingCountry(item)}>Edit</button>
            </Card>
          ))}
          
          {editingCountry && (
            <div>
              <h3>Edit Country</h3>
              <input 
                type="text" 
                value={editingCountry.country} 
                onChange={(e) => setEditingCountry({ ...editingCountry, country: e.target.value })}
              />
              <input 
                type="text" 
                value={editingCountry.capital} 
                onChange={(e) => setEditingCountry({ ...editingCountry, capital: e.target.value })}
              />
              <input 
                type="text" 
                value={editingCountry.population} 
                onChange={(e) => setEditingCountry({ ...editingCountry, population: e.target.value })}
              />
              <button onClick={handleEditCountry}>Save</button>
            </div>
          )}
          <OTPinput length={4} />
        </LazyCardlist>
      </Suspense>
    </>
  );
};

export default CardSectionview;
