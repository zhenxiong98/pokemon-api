
import React from 'react'
import { useState, useEffect,useRef } from 'react';
import axios from 'axios';



function Popup({trigger,setTrigger,selectedPokemon,favoritePokemon,setFavoritePokemon}) {
  const [loading, setLoading] = useState(true);
  const [targetPokemon, setTargetPokemon] = useState();
  const firstRender = useRef(true);

  const typeColors = {
    bug: '#729f3f',
    dragon: '#53a4cf',
    fairy: '#fdb9e9',
    fire: '#fd7d24',
    ghost: '#7b62a3',
    ground: '#f7de3f',
    normal: '#a4acaf',
    pyschic: '#f366b9',
    steel: '#9eb7b',
    dark: '#707070',
    electric: '#eed535',
    fighting: '#d56723',
    flying: '#3dc7ef',
    grass: '#9bcc50',
    ice: '#51c4e7',
    poison: '#b97fc9',
    rock: '#a38c21',
    water: '#4592c4'
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const addToFavorite = (name) => {
    if (!favoritePokemon.includes(name)){
      setFavoritePokemon([...favoritePokemon, name], () => {
      })
      
      
    }
    else{
      let filteredArray = favoritePokemon.filter(p => p !== name)
      setFavoritePokemon(filteredArray);
      }
  }

  const isFavorite = name => {
    if (!favoritePokemon.includes(name)) return "Add to Favorite"
    return "Remove from Favorite"
  }
  
  
  const fetchPokemon = async () =>{
    setLoading(true)
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`).then(res => {
      setLoading(false)
      setTargetPokemon(res.data)
    })
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      fetchPokemon()
    };
  }, [selectedPokemon])

  useEffect(() => {
    localStorage.setItem("Favorite Pokemon",JSON.stringify(favoritePokemon))
  }, [favoritePokemon])

  if (loading) return ""

  return (trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
          <button className='close-btn' onClick={() => setTrigger(false)}>Close</button>
            <div className="Card">
            <div className="Card__img">
                <img src={targetPokemon.sprites.front_default} alt="" />
            </div>
            <div className="Card__name">
                {targetPokemon.name}
            </div>
            <div className="Card__types">
                {
                    targetPokemon.types.map(type => {
                        return (
                          <div className="Card__type" key={type.type.name} style={{ backgroundColor: typeColors[type.type.name] }}>
                            {capitalizeFirstLetter(type.type.name)}
                          </div>
                        )
                    })
                }
            </div>
            <div className="Card__info">
                <div className="Card__data Card__data--weight">
                    <p className="title">Weight</p>
                    <p>{targetPokemon.weight}</p>
                </div>
                <div className="Card__data Card__data--weight">
                    <p className="title">Height</p>
                    <p>{targetPokemon.height}</p>
                </div>
                <div className="Card__data Card__data--ability" >
                    <p className="title" >Ability</p>
                    {targetPokemon.abilities.map((abilities) => <p key={abilities.ability.name}>{capitalizeFirstLetter(abilities.ability.name)}</p>)}
                    
                </div>
            </div>
            <button className='fvr-btn' onClick={() => addToFavorite(targetPokemon.name)}>{isFavorite(targetPokemon.name)}</button>
          </div>
        </div>
      </div>
  ) : "";
}

export default Popup