import React, { useEffect, useRef, useState } from "react";
import Hero from "../components/Hero";
import InputSearch from "../components/InputSearch";
import InputCategoryUser from "../components/InputCategoryUser";
import Card from "../components/Card";
import { Spinner } from "flowbite-react";
import { useStore } from "../store/store";
import api from "../service/api";

export default function Home() {
  const DataUser = useStore((state) => state.dataUser);
  const [predictDefault, setPredictDefault] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputSearch, setInputSearch] = useState("");
  const [dataFiltered, setDataFiltered] = useState([]);
  const cardsRef = useRef(null); // Reference untuk elemen list card

  // Fetch data from the API
  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/predict", DataUser);
      const data = response?.data || [];
      if (!Array.isArray(data)) {
        throw new Error("Data tidak valid, harus berupa array.");
      }
      setPredictDefault(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data, silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [DataUser]);

  useEffect(() => {
    if (inputSearch !== "") {
      const filteredData = predictDefault.filter((data) =>
        data["Place Name"]?.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setDataFiltered(filteredData);
    } else {
      setDataFiltered(predictDefault);
    }
  }, [inputSearch, predictDefault]);

  const handleSearchSubmit = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll ke elemen list card
    }
  };

  return (
    <div className="pb-32">
      {/* Hero */}
      <Hero />

      {/* Search */}
      <InputSearch
        setInputSearch={setInputSearch}
        onSubmit={handleSearchSubmit} // Panggil fungsi saat submit
      />

      {/* User Category */}
      <div>
        <InputCategoryUser />
      </div>

      {/* Cards or Loading/Error State */}
      <div ref={cardsRef}>
        {" "}
        {/* Tambahkan ref pada elemen list card */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="xl" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500">
            <h1 className="text-2xl">{error}</h1>
          </div>
        ) : dataFiltered?.length > 0 ? (
          <div className="grid xl:grid-cols-3 lg:grid-cols-2  gap-10 w-[90%] mx-auto mt-9">
            {dataFiltered.map((data) => (
              <Card key={data["Place ID"]} data={data} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <h1 className="text-2xl">Data Not Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}
