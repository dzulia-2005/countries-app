import React, { lazy, Suspense, useState } from "react";
import Herosection from "@/pages/articles/components/list/herosection/herosection";
import OTPinput from "../../components/list/cardsection/otp-input/otp";
import Card from "../../components/list/cardsection/card";
import {
  AddCountries,
  DeleteCountries,
  getCountries,
  UpdateCountries,
} from "@/api/countries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

const LazyCardlist = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardlist/index"),
);
const LazyCardinfo = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardinfo/index"),
);
const LazyCardTitle = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardtitle"),
);
const LazyCardDescription = lazy(
  () => import("@/pages/articles/components/list/cardsection/carddescription"),
);
const LazyCardpop = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardpop"),
);
const LazyCardCapital = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardcapital"),
);

type CountryProp = {
  id: string;
  country: string;
  population: string;
  capital: string;
  img: string;
  likes: number;
};

const CardSectionview: React.FC = () => {
  const [newCountry, setNewCountry] = useState<Partial<CountryProp>>({});
  const [editingCountry, setEditingCountry] = useState<CountryProp | null>(
    null,
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  console.log("Country ID:", id);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "-likes";

  const {
    data: countries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countries-list", sort],
    queryFn: async () => {
      console.log("Fetching countries with sort:", sort);
      const countries = await getCountries(sort);

      return countries.sort((a, b) => {
        if (sort === "population") {
          return parseInt(a.population) - parseInt(b.population); // ASC for population
        } else if (sort === "-population") {
          return parseInt(b.population) - parseInt(a.population); // DESC for population
        }
        return 0;
      });
    },
  });

  const addCountryMutation = useMutation<
    CountryProp,
    Error,
    Partial<CountryProp>
  >({
    mutationFn: (newCountry: Partial<CountryProp>) => AddCountries(newCountry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries-list"] });
    },
  });

  const updateCountryMutation = useMutation<CountryProp, Error, CountryProp>({
    mutationFn: (country: CountryProp) => UpdateCountries(country),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries-list"] });
    },
  });

  const deleteCountryMutation = useMutation<void, Error, string | number>({
    mutationFn: (id: string | number) => DeleteCountries(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries-list"] });
    },
  });

  const handleAddCountry = async () => {
    await addCountryMutation.mutateAsync(newCountry);
  };

  const handleDeleteCountry = async (id: string) => {
    await deleteCountryMutation.mutateAsync(id);
  };

  const handleEditCountry = async () => {
    if (editingCountry) {
      await updateCountryMutation.mutateAsync(editingCountry);
      setEditingCountry(null);
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

  const handledetailpage = (id: string) => {
    const lang = "en";
    navigate(`/${lang}/articles/${id}`);
  };

  const handleSortChange = (order: string) => {
    setSearchParams({ sort: order === "asc" ? "population" : "-population" });
    queryClient.invalidateQueries({ queryKey: ["countries-list"] });
  };

  return (
    <>
      <Herosection />
      <div style={{ marginLeft: "8%" }}>
        <button onClick={() => handleSortChange("asc")}>Sort ASC</button>
        <button onClick={() => handleSortChange("desc")}>Sort DESC</button>
      </div>
      {editingCountry && (
        <div>
          <h3>Edit Country</h3>
          <input
            type="text"
            value={editingCountry.country}
            onChange={(e) =>
              setEditingCountry({ ...editingCountry, country: e.target.value })
            }
          />
          <input
            type="text"
            value={editingCountry.capital}
            onChange={(e) =>
              setEditingCountry({ ...editingCountry, capital: e.target.value })
            }
          />
          <input
            type="text"
            value={editingCountry.population}
            onChange={(e) =>
              setEditingCountry({
                ...editingCountry,
                population: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editingCountry.img}
            onChange={(e) =>
              setEditingCountry({ ...editingCountry, img: e.target.value })
            }
          />
          <button
            onClick={handleEditCountry}
            disabled={updateCountryMutation.status === "pending"}
          >
            {updateCountryMutation.status === "pending" ? "Saving..." : "Save"}
          </button>
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{ marginLeft: "8%" }}>
          <h3>Add Card:</h3>
          <div>
            <input
              type="text"
              placeholder="Country"
              onChange={(e) =>
                setNewCountry({ ...newCountry, country: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Capital"
              onChange={(e) =>
                setNewCountry({ ...newCountry, capital: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Population"
              onChange={(e) =>
                setNewCountry({ ...newCountry, population: e.target.value })
              }
            />
          </div>
          <div>
            <input type="file" onChange={handleUploadImage} />
          </div>
          <button
            onClick={handleAddCountry}
            disabled={addCountryMutation.status === "pending"}
          >
            {addCountryMutation.status === "pending" ? "Adding..." : "Add Card"}
          </button>
        </div>

        <LazyCardlist>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error loading countries</p>}
          <List
            height={500}
            itemCount={countries?.length || 0}
            itemSize={300}
            width="100%"
            style={{ display: "flex", flexDirection: "column", gap: "20%" }}
          >
            {({ index, style }) => {
              const item = countries?.[index];
              if (!item) return null;
              return (
                <Card key={item.id} style={style}>
                  <img
                    src={item.img}
                    style={{ width: "200px", margin: "0 5% 0 0" }}
                  />
                  <LazyCardinfo>
                    <LazyCardTitle>Country: {item.country}</LazyCardTitle>
                    <LazyCardDescription>
                      <LazyCardpop>Capital: {item.capital}</LazyCardpop>
                      <LazyCardCapital>
                        Population: {item.population}
                      </LazyCardCapital>
                    </LazyCardDescription>
                  </LazyCardinfo>
                  <button onClick={() => handleDeleteCountry(item.id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => setEditingCountry(item)}
                    style={{ margin: "0% 5%" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handledetailpage(item.id)}>
                    Detail
                  </button>
                </Card>
              );
            }}
          </List>
        </LazyCardlist>
      </Suspense>
      <OTPinput length={4} />
    </>
  );
};

export default CardSectionview;
