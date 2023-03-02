import React, { useEffect, useRef, useState } from "react";
import PokemonCard from "./PokemonCard";
import Loader from "./Loader";
import SinglePokemonCard from "./SinglePokemonCard";

const HomePage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [singlePokemon, setSinglePokemon] = useState(null);
  useEffect(() => {
    //function that will fetch pokemon data, whenever offset changes it will execute
    const getPokemon = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${20}&offset=${offset}`
        );
        const data = await response.json();

        //return the resolved promises in newFinalData array
        const newFinalData = await Promise.all(
          data.results.map(async (item) => {
            const newData = await fetch(item.url);
            const pokeData = await newData.json();
            return pokeData;
          })
        );
        setPokemonData((prev) => [...prev, ...newFinalData]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPokemon();
  }, [offset]);

  //function that will handle scroll when scrollbar touches page ends it changes the offset value
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setOffset((prev) => prev + 1);
    }
  };

  // listen to the scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="flex">
      <div className={` h-full flex flex-col ${singlePokemon ? "w-[56%]" : "w-[100%]"} justify-center items-center gap-2`}>
        {/* display list of pokemons */}
        <div className={` h-full flex ${singlePokemon ? "w-[100%]" : "w-[100%]"} m-2 p-3 justify-center flex-wrap gap-4`}>
          {pokemonData?.map((pokeData, i) => (
            <PokemonCard
              key={i}
              id={i}
              pokeData={pokeData}
              setSinglePokemon={(data) => setSinglePokemon(data)}
            />
          ))}
        </div>
        {isLoading ? <Loader /> : null}
      </div>
      {/* display deatails about singlePokemon */}
      <div className={`w-[40%] ${singlePokemon ? null : "hidden"}  fixed right-0 top-[150px] m-2 p-2 justify-center flex-wrap gap-4`}>
        <SinglePokemonCard singlePokemon={singlePokemon} />
      </div>
    </div>
  );
};

export default HomePage;
