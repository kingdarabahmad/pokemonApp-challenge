import React from "react";

const PokemonCard = ({ pokeData, setSinglePokemon, id }) => {
  return (
    <div
      onClick={() => setSinglePokemon(pokeData)}
      className="cursor-pointer w-[180px] h-[120px] shadow-xl rounded-md flex items-center font-semibold p-2 gap-1"
    >
      <h1 className="text-lg">{id + 1}</h1>
      <div className="min-w-[20px] h-full">
        <img
          className="w-full h-full"
          src={pokeData.sprites.other.dream_world.front_default}
          alt={`pokemon-${id}`}
        />
      </div>
      <h1 className="text-lg capitalize">{pokeData.name}</h1>
    </div>
  );
};

export default PokemonCard;
