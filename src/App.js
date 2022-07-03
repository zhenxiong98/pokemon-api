import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from './Pagination';
import Popup from './components/Popup';
import Navbar from './components/Navbar';
 
function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [trigger, setTrigger] = useState(false);
  const [favoritePokemon, setFavoritePokemon] = useState([]);
  const [viewFavorite, setViewFavorite] = useState(false);


  useEffect(() => {
    fetchInitialPokemon();
    fetchLocalStoragePokemon();
    
  }, [currentPageUrl])

  // useEffect(() => {
  //   fetchPokemon();
    
  // }, [allPokemon])

  const fetchLocalStoragePokemon = () =>{
    const pokemon = (JSON.parse(localStorage.getItem("Favorite Pokemon")))
    setFavoritePokemon(pokemon)
  }

  const fetchInitialPokemon = async () =>{
    setLoading(true)
    await axios.get(currentPageUrl).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setAllPokemon(res.data.results.map(p => p))
    })
  }

  function toggleFavorite(){
    if (viewFavorite) 
      setViewFavorite(false)
    else
      setViewFavorite(true)
  }

  function isFavorite(){
    if (viewFavorite) return "Return"
    return "View Favorite"
  }

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."
  
  return (
    <>
    <Navbar />
    <div className='btn' >
      <button onClick={toggleFavorite}>{isFavorite()}</button>
    </div>
    
      <div className='pokemon-list-container'>
        <PokemonList allPokemon={allPokemon} setTrigger={setTrigger} setSelectedPokemon={setSelectedPokemon} viewFavorite={viewFavorite} favoritePokemon={favoritePokemon}/>
      </div>
      <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
      <Popup trigger={trigger} setTrigger={setTrigger} selectedPokemon={selectedPokemon} favoritePokemon={favoritePokemon} setFavoritePokemon={setFavoritePokemon} viewFavorite={viewFavorite}>
      </Popup>
    </>
  );
}

export default App;