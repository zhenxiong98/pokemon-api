import React from 'react'
import { useState, useEffect } from 'react';

const PokemonList = ({ allPokemon, setTrigger, setSelectedPokemon, viewFavorite, favoritePokemon }) => {

    
  return(!viewFavorite) ? (
    <>
        <div className='first-column-pokemon'>
          {allPokemon.slice(0,10).map(p => (
                <div key={p.name}>
                    <button type="button" className='pokemon-btn' onClick={()=>{setSelectedPokemon(p.name);setTrigger(true);}}>
                        {p.name}
                    </button>
                </div>
            ))}
        </div>
        <div className='second-column-pokemon'>
          {allPokemon.slice(10,20).map(p => (
                <div  key={p.name}>
                    <button type="button" className='pokemon-btn' onClick={()=>{setSelectedPokemon(p.name);setTrigger(true); }}>
                        {p.name}
                    </button>
                </div>
            ))}
        </div>
    </>


  )
  :
  <>
        <div className='first-column-pokemon'>
          {favoritePokemon.slice(0,10).map(p => (
                <div key={p}>
                    <button type="button" className='pokemon-btn' onClick={()=>{setSelectedPokemon(p);setTrigger(true);}}>
                        {p}
                    </button>
                </div>
            ))}
        </div>
        <div className='second-column-pokemon'>
          {favoritePokemon.slice(10,20).map(p => (
                <div  key={p}>
                    <button type="button" className='pokemon-btn' onClick={()=>{setSelectedPokemon(p);setTrigger(true); }}>
                        {p}
                    </button>
                </div>
            ))}
        </div>
    </>
}

export default PokemonList