import React from "react";

const SinglePokemonCard = ({ singlePokemon }) => {
  return (
    <div className=" flex items-center justify-center flex-col w-full h-full gap-2">
      <h1 className='font-["Pattaya"] text-xl capitalize'>
        {singlePokemon?.name}
      </h1>
      <img className="w-[150px]" src={singlePokemon?.sprites?.other.dream_world.front_default}
        alt={`pokemon-${singlePokemon?.name}`}
      />
      <h1 className="text-xs font-bold text-center ">
        Height:-{singlePokemon?.height} Weight:-{singlePokemon?.weight}
      </h1>
      <div className="flex gap-2 flex-wrap justify-center">
        {singlePokemon?.abilities.map((power, i) => (
          <h1 key={i} className="bg-teal-400 text-xs p-2 shadow-lg shadow-teal-400/40 font-bold capitalize rounded-md">
            {power.ability.name}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default SinglePokemonCard;
